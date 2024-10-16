import { Schema, model, Document } from 'mongoose';
import { ProductCategoryModal } from '../../shared/modals/product-category.modal';
import { DomainModal } from './domain.modal';

// Document interface
interface Product {
  name: string;
  quantity: number;
  price: number;
  cost: number;
  description: string;
  briefDescription: string;
  productCategoryId: Schema.Types.ObjectId;
  domainId: Schema.Types.ObjectId;
  isActive: boolean;
  images: string[];
}

export interface ProductDoc extends Document, Product {}

// Schema
const schema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    cost: { type: Number, required: true },
    briefDescription: {
      type: String,
      maxlength: 100,
      required: true,
    },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    productCategoryId: {
      type: Schema.Types.ObjectId,
      ref: ProductCategoryModal,
      required: true,
    },
    domainId: {
      type: Schema.Types.ObjectId,
      ref: DomainModal,
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const ProductModal = model('Product', schema);
