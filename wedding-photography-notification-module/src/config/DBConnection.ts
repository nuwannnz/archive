import mongoose from "mongoose";
import { logger } from "../util/logger";

export const connectToDB = async () => {
  try {
    logger.info("==> creating db client");
    await mongoose.connect(process.env.MONGODB_URI ?? "");
  } catch (error) {
    logger.error(" - connectToDb - Failed to connect to the database", error);
    process.exit(1);
  }
};
