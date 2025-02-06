import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    required: true,
    default: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModel = mongoose.model("Users", user);
