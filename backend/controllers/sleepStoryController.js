import sleepStory from "../models/sleepstoryschema.js";
async function getSleepStory(req,res){
    try{
        const data=await sleepStory.find();
        res.json({sucess:true,data:data.map((item)=>{
            return {_id : item.id,
                    name : item.name,
                    url : item.url,
                    description : item.description,
                    thumbnail : item.thubnail,
                    length : item.length,
                    category : item.category,
                    outcomes : item.outcomes
                }
        })});
    }
    catch(error){
        res.json({success:false,message:"could not fetch sleep data"});
        
    }
    
}
async function addSleepStory(req,res){
    try{
        const data=await sleepStory.create(req.body);
        axios.get(`https://localhost:4000/createvectorsleepStorys/${data._id}`)
        res.json({sucess:true,data:data});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"couldn't add sleep story data"});
    }

}
export {getSleepStory,addSleepStory};