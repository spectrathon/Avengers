import User from '../models/userschema.js'

async function pushUser(req,res){
    try{
        const {userId} = req.body;
        const dbUser = User.findOne({userId});
        if(userId == dbUser.userId){
            return res.json({success : false, msg : "user already registered"});
        }else{
            const user = await User.create({userId});
            await user.save();
            return res.json({success : true, msg : "New User registered"});
        }
    }catch(e){
        res.json({success : false , msg : "Unable to parse the body parameters."});
    }
}

export {pushUser};

