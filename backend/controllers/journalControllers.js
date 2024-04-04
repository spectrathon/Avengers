import Journal from "../models/journal.js";
import User from "../models/userschema.js";

const storeJournal = async function(req,res){
    try{
    const {userId , title , des} = req.body;
    if(userId && title && des){
        const user = await User.findOne({userId});
        if(!user) return res.json({success : false , msg : "Are you logged In"});
        const jData = await Journal.create({userId : user._id , title , description : des});
        await jData.save();
        res.json({success : true });
    }else{
        return res.json({success : false , msg : "Are you logged In"});
    }
}catch(e){
    return res.json({success : false , msg : "Internal error !"});
}
}

const getJournal = async function(req,res){
    try{
        const userId = req.headers.userid;
        const user = await User.findOne({userId});
        const journels = await Journal.find({userId : user._id});
        if(journels[0]  != null) return res.json({success : true , journels});
        return res.json({success : false , msg : "TunTun mausi error"});
    }catch(e){
        return res.json({success : false , msg : "Internal error !"});
    }
}
export {storeJournal , getJournal};