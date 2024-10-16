import mongoose from "mongoose";
import { Booking } from "../types/booking";

const bookingSchema = new mongoose.Schema<Booking>(
  {
    booked_date: Date,
    event_date: Date,
    session: String,
    capacity: Number,
    client_name: String,
    client_contact: String,
    payment_status: String,
    paidAmount: Number,
    totalAmount: Number,
    notes: String,
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const BookingModal = mongoose.model<Booking>("Booking", bookingSchema);
