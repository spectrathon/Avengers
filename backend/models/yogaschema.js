import mongoose from "mongoose";

const schema = mongoose.Schema;
const yogaScema = new schema({
  name: {
    type: String,
    required: true,
  },
  thubnail: {
    type: String,
    return: true,
  },
  category: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  outcomes: {
    type: String,
    required: true,
  },
});

const Yoga = mongoose.model("Yoga", yogaScema);
export default Yoga;
