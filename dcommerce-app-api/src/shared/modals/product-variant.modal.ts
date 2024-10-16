import { Schema, model, Document } from 'mongoose';
import { ProductAttributeModal } from './product-attribute.modal';
import { ProductModal } from './product.modal';

// Document interface
interface ProductVariant {
  productId: Schema.Types.ObjectId;
  attributes: {
    productAttributeId: Schema.Types.ObjectId;
    productAttributeOptionId: string;
  }[];
  price: number;
  quantity: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface ProductVariantDoc extends Document, ProductVariant {}

// Schema
const schema = new Schema<ProductVariantDoc>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: ProductModal,
      required: true,
    },
    attributes: [
      {
        productAttributeId: {
          type: Schema.Types.ObjectId,
          ref: ProductAttributeModal,
          required: true,
        },
        productAttributeOptionId: {
          type: String,
          required: true,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const ProductVariantModal = model('ProductVariant', schema);
