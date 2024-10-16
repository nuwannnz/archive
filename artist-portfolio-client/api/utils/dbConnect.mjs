import mongoose from "mongoose";

let client;

export const connectDB = async () => {
  try {
    if (!client) {
      // eslint-disable-next-line no-undef
      client = await mongoose.connect(Netlify.env.get("MONGODB_URI"));
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
