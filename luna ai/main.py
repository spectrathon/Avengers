from fastapi import Body, FastAPI, Request, responses
from langchain_community.document_loaders import PyPDFLoader
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI,OpenAIEmbeddings
import os
import json
from langchain.chains import RetrievalQA
from fastapi.middleware.cors import CORSMiddleware
from langchain.chains import LLMChain,SequentialChain
from pymongo.mongo_client import MongoClient
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
import uvicorn
from bson.objectid import ObjectId
from os.path import join, dirname
from fastapi import FastAPI, File, UploadFile
from dotenv import load_dotenv
import aiofiles
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel


class ProcessQuery(BaseModel):
    query: str

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = FastAPI()
client = MongoClient(os.getenv("MONGO_URI"))
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    'http://localhost:5173',
    'https://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/userMedicalDetails/{id}")
async def generate_report(id:str,file: UploadFile = File()):
    out_file_loc = file.filename
    async with aiofiles.open(out_file_loc, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content) 
    loader = PyPDFLoader(out_file_loc,extract_images=True)
    pages = loader.load()
    details = ""
    for i in range(len(pages)):
        details += pages[i].page_content
    doctor_ai = ChatGoogleGenerativeAI(model="gemini-pro",verbose=True)
    output_format= '''{
        "CBP": "complete blood picture report",
        "LIPID PROFILE": "lipid profile report",
        "SERUM IRON": "serum iron report",
        "SERUM CALCIUM": "serum calcium report",
        "URIC ACID": "uric acid report",
        "HBA1C": "hba1c report",
        "VIT D": "vitamin d report",
        "VIT B12": "vitamin b12 report",
        "Thyroid": "thyroid report",
    }'''

    prompt1 = PromptTemplate(input_variables=["details","output_format"],template=
         '''As an expert dietician, you are looking for a patient's health report. 
                Please generate a comprehensive report for the patient, including the following parameters: 
                - CBP (Complete Blood Picture)
                - Lipid Profile
                - Serum Iron
                - Serum Calcium
                - Uric Acid
                - HBA1C
                - Vitamin D
                - Vitamin B12
                - Thyroid

                Please ignore personal details such as age, gender, and name. The patient's details are as follows:
                {details}

                Please provide the {output_format} of the patient's health report, including any additional data with units of measurement.
                "Please Note:- string must be enclosed in double quotes only."
                '''
    )
    chain_1 = LLMChain(llm=doctor_ai, prompt=prompt1,output_key="data")
    output2_format = '''{"report": "health report of the patient","prevention_measures": "prevention methods of patient problems"}
    }'''
    prompt2 = PromptTemplate(input_variables=["data","output2_format"],template=''' 
                             The patient's health report is as follows: {data}
                            Please provide the health report and preventive measures for the patient.
                            provide the output in {output2_format} of the patient's health report,
    ''')
    chain_2 = LLMChain(llm=doctor_ai, prompt=prompt2,output_key="report")
    parent_chain=SequentialChain(
        chains=[chain_1,chain_2],input_variables=['details','output_format','output2_format'],output_variables=['data','report'],verbose=True)
    result = parent_chain.invoke({"details":details,"output_format":output_format,"output2_format":output2_format})
    collection = client["nirvana"]["users"]
    collection.update_one({"userId": id}, {"$set": {"userReport": result}})
    return result


@app.get("/luna/{user_id}")
async def process_query(user_id:str,user_q:str):
    luna = ChatOpenAI(model="gpt-4",verbose=True)
    collection = client["nirvana"]["users"]
    user =  collection.find_one({"userId": user_id})
    user_details = user["userReport"]
    output_format = '''{"success": true,"message": "your response","recommended_meditations": [{"title":"meditation_title","description": "meditation_description",}],"recommended_yogas": [{"title":"yoga_title","description": "yoga_description",}],
    "recommended_sleep_stories": [{"title":"sleep_story_title","description": "sleep_story_description",}],
    "diet": {"breakfast": {"name": "breakfast_name", ex: "idly""description": "breakfast_description","quantity": "breakfast_quantity" ex: "2 idly 1 cup sambar"},"lunch": {"name": "lunch_name","description":"lunch_description","quantity": "lunch_quantity"},"dinner": {"name": "dinner_name","description": "dinner_description","quantity": "dinner_quantity"}}}
'''
    prompt = PromptTemplate(input_variables=["user_details","user_query","output_format"],template='''
                          'you are a expert doctor luna with empathy your job is to
                        1. provide a response to the patient's query empathetically and give personal support.
                        2. recommend meditation, yoga, sleep story.
                        3. recommend diet plan by analysing  the patient's medical history.
                        4. provide a response to the patient's query.
                         user_report: {user_details}
                         user_query: {user_query}
                        the output should be in the following format.
                        OUTPUT FORMAT:{output_format}
                        
                        you dont had to fill all the fields in the OUTPUT FORMAT such as recommended_meditations, recommended_yogas, recommended_sleep_stories, diet. you can fill the fields which are necessary and relavent to user query make sure it should be valid json with key value pairs.
                        ''')
    luna_chain = LLMChain(llm=luna, prompt=prompt,output_key="response")
    result = luna_chain.invoke({"output_format":output_format,"user_query":user_q,"user_details":user_details,output_format:output_format})
    output = json.loads(result["response"])
    return output

@app.get("/createvectorSleep/{id}")
def handle_create_vector_sleep(id:str):
    collection = client["nirvana"]["sleepstories"]
    document = collection.find_one({"_id": ObjectId(id)})
    keys = document.keys()
    keys_to_remove = ["_id", "thubnail", "url"]
    for key in keys_to_remove:
        if key in keys:
            del document[key]

    if document:
        vector = embeddings.embed_query(json.dumps(document))
        collection.update_one({"_id": ObjectId(id)}, {"$set": {"embedding": vector}})
        return {"success":True,"message":"updated successfully"}
    else:
        return {"error": "Document not found"}
    
@app.get("/createvectorMeditations/{id}")
async def handle_create_vector_meditations(id:str):
    # check here once on errors
    collection = client["nirvana"]["meditations"]
    document = collection.find_one({"_id": ObjectId(id)})
    keys = document.keys()

    keys_to_remove = ["_id", "url", "thubnail"]
    for key in keys_to_remove:
        if key in keys:
            del document[key]

    if document:
        vector = embeddings.embed_query(json.dumps(document))
        collection.update_one({"_id": ObjectId(id)}, {"$set": {"embedding": vector}})
        return {"success":True,"message":"updated successfully"}
    else:
        return {"error": "Document not found"}
    
@app.get("/createvectorsyoga/{id}")
def handle_create_vector_meditations(id:str):
    # check here once on errors
    collection = client["nirvana"]["yogas"]
    document = collection.find_one({"_id": ObjectId(id)})
    keys = document.keys()

    keys_to_remove = ["_id", "url", "thubnail"]
    for key in keys_to_remove:
        if key in keys:
            del document[key]

    if document:
        vector = embeddings.embed_query(json.dumps(document))
        collection.update_one({"_id": ObjectId(id)}, {"$set": {"embedding": vector}})
        return {"success":True,"message":"updated successfully"}
    else:
        return {"error": "Document not found"}
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)