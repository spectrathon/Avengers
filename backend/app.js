import express  from "express";
import meditationRoutes from "./routes/meditationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import yogaRoutes from "./routes/yogaRoutes.js";
import journalRouter from "./routes/journalRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./models/userschema.js";
import sleepRoutes from "./routes/sleepStoryRoute.js";

const app = express();
app.use(cors({origin : 'http://localhost:5173'}));
app.use(bodyParser.json());
app.get("/user_id/:userId",async (req,res)=>{
    const usrId = req.params.userId;
    const user = await User.find({userId:usrId});
    res.json({user_id : user._id});
})
app.use('/meditation',meditationRoutes);
app.use('/users',userRoutes);
app.use('/sleep',sleepRoutes);
app.use('/yoga',yogaRoutes);
app.use('/journal',journalRouter);
app.get('*',()=>{
    console.log("hello");
});

export default app;