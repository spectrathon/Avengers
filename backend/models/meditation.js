import mongoose from "mongoose";

const schema = mongoose.Schema;
const meditationScema = new schema({
  name: {
    type: String,
    required: true,
  },
  script: {
    type: String,
    required: true,
  },
  thumbnail: {
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
  }
});

const Meditation = mongoose.model("Meditation", meditationScema);
export default Meditation;
