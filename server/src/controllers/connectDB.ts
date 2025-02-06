import mongoose from "mongoose";

require("dotenv").config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch (error) {
    console.log("Failed to connect mongodb");
    console.error(error);
  }
}
