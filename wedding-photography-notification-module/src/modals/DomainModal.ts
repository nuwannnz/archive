import mongoose from "mongoose";
import { Domain } from "../types/domain";

const domainSchema = new mongoose.Schema<Domain>(
  {
    name: String,
    contact_details: String,
    owner_name: String,
    total_capacity: Number,
    address: String,
    email: String,
    nic: String,
    reminder_from_email: String,
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const DomainModal = mongoose.model<Domain>("Domain", domainSchema);
