import mongoose from 'mongoose'

const domainSchema = new mongoose.Schema(
  {
    name: String,
    contact_details: String,
    owner_name: String,
    total_capacity: Number,
    address: String,
    email: String,
    nic: String,
    reminder_from_email: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

export const DomainModal = mongoose.model('Domain', domainSchema)
