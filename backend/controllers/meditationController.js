import mongoose from "mongoose";
import Meditation from "../models/meditation.js";
import BodyParser from 'body-parser'
import axios from "axios";


async function addMeditation(req,res){
    try{
        const created_data= await Meditation.create(req.body);
        axios.get(`http://localhost:4000/createvectorMeditations/${created_data._id}`)
        res.json({success:true,message:"entered data",created_data});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"could not add data"});
    }
}

async function createAllMeditationsVector(req,res){
    try{
        const data=await Meditation.find();
        data.forEach(async (element) => {
            axios.get(`http://localhost:4000/createvectorMeditations/${element._id}`)
        });
        res.json({success:true,message:"vectors created"});
    }
    catch(error){
        res.json({success:false,message:"could not create vectors"});
    }
}

async function getMedData(req,res){
    try{
        const data=await Meditation.find();
        if(!data){res.json({success:false,message:"no data"});}
        res.json({success:true,data});
    }
    catch(error){
        res.json({success:false,message:"could not fetch meditation data"});
    }
}


export {addMeditation,getMedData};