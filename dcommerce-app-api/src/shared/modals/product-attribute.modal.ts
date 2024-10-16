import { Schema, model, Document } from 'mongoose';
import { DomainModal } from './domain.modal';

// Document interface
interface ProductAttribute {
  name: string;
  domainId: Schema.Types.ObjectId;
  options: { id: string; name: string; isActive: boolean }[];
  isActive: boolean;
}

export interface ProductAttributeDoc extends Document, ProductAttribute {}

// Schema
const schema = new Schema<ProductAttributeDoc>(
  {
    name: { type: String, required: true },
    options: { type: [Object], required: true },
    domainId: { type: Schema.Types.ObjectId, ref: DomainModal, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const ProductAttributeModal = model('ProductAttribute', schema);
