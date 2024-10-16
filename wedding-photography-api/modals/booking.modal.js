import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  booked_date: Date,
  event_date: Date,
  session: String,
  capacity: Number,
  client_name: String,
  client_contact: String,
  payment_status: String,
  paid_amount: Number,
  total_amount: Number,
  notes: String,
  booking_status: String,
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain'
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

export const BookingModal = mongoose.model('Booking', bookingSchema)
