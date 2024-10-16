import { Schema, model, Document } from 'mongoose';
import { ProductModal } from './product.modal';
import { UserModal } from './user.modal';

// Document interface
interface CartItem {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  quantity: number;
  isActive: boolean;
}

export interface CartItemDoc extends Document, CartItem {}

// Schema
const schema = new Schema<CartItemDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserModal,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: ProductModal,
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

export const CartItemModal = model('CartItem', schema);
