import { Schema, model, Document } from 'mongoose';
import { UserModal } from './user.modal';
import { ProductVariantModal } from './product-variant.modal';

// Document interface
interface ReservedProduct {
  userId: Schema.Types.ObjectId;
  productVariantId: Schema.Types.ObjectId;
  quantity: number;
  isActive: boolean;
}

export interface ReservedProductDoc extends Document, ReservedProduct {}

// Schema
const schema = new Schema<ReservedProductDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserModal,
      required: true,
    },
    productVariantId: {
      type: Schema.Types.ObjectId,
      ref: ProductVariantModal,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

schema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export const ReservedProductModal = model('ReservedProduct', schema);
