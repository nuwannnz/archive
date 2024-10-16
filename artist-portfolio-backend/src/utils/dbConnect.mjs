import mongoose from "mongoose";

let client;

export const connectDB = async () => {
  try {
    if (!client) {
      client = await mongoose.connect(
        "mongodb+srv://Thilini:12345@cluster0.wwssvno.mongodb.net/?retryWrites=true&w=majority"
      );
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
