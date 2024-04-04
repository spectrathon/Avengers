import mongoose from "mongoose";
const journalSchema= new mongoose.Schema({

    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

    title:{
        type: String,
        required:true,
    },

    description:{
        type: String,
        required: true,
    },
})
const Journal = mongoose.model("Journals",journalSchema);
export default Journal;