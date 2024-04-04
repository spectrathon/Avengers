import mongoose from "mongoose";

const schema = mongoose.Schema;
const sleepStoryScema = new schema({
  name: {
    type: String,
    required: true,
  },
  thubnail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    default: 0,
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

const sleepStory = mongoose.model("sleepStory", sleepStoryScema);
export default sleepStory;
