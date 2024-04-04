import 'dotenv/config';
import mongoose from 'mongoose'
export function Connection(){
    mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("Medical Report Database connected.");
})
.catch(err => {
    console.log("Can Not Connect to Mongo Database ...")
    console.log(err)
});

}