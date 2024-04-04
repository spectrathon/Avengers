import mongoose from "mongoose";

const schema = mongoose.Schema;
const userSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  streak: {
    type: Number,
    default: 0,
  },
  userReport: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
