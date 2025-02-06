import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    optional: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  createrName: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const projectModel = mongoose.model("Projects", projectSchema);
