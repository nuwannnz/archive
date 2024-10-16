import { Schema, model, Document } from 'mongoose';

// Document interface
interface Domain {
  name: string;
  isActive: boolean;
}

export interface DomainDoc extends Document, Domain {}

// Schema
const schema = new Schema<DomainDoc>(
  {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const DomainModal = model('Domain', schema);
