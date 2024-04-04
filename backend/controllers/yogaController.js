import Yoga from "../models/yogaschema.js";
import axios from "axios";

async function getYoga(req, res) {
  try {
    const data = await Yoga.find();
    res.json({ success: true, data: data });
  } catch (error) {
    res.json({ success: false, message: "could not fetch yoga data" });
  }
}

export async function createAllYogas(req,res){
  try{
      const data=await Yoga.find();
      data.forEach(async (element) => {
          await axios.get(`http://localhost:4000/createvectorsyoga/${element._id}`)
      });
      res.json({success:true,message:"vectors created"});
  }
  catch(error){
      res.json({success:false,message:"could not create vectors"});
  }
}

async function addYoga(req, res) {
  try {
    const data = await Yoga.create(req.body);
    axios.get(`http://localhost:4000/createvectorsyoga/${data._id}`)
    res.json({ success: true, data: data });
  } catch (error) {
    res.json({ success: false, message: "couldn't add yoga data" });
  }
}
export { getYoga, addYoga };
