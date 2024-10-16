import { Schema, model, Document } from 'mongoose';
import { DomainModal } from 'src/shared/modals/domain.modal';

// Document interface
interface ProductCategory {
  name: string;
  domainId: Schema.Types.ObjectId;
  isActive: boolean;
}

export interface ProductCategoryDoc extends Document, ProductCategory {}

// Schema
const schema = new Schema<ProductCategoryDoc>(
  {
    name: { type: String, required: true },
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

export const ProductCategoryModal = model('ProductCategory', schema);
