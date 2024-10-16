import { Schema, model, Document } from 'mongoose';

// Document interface
interface UserRole {
  name: string;
  permissions: string[];
  isActive: boolean;
}

export interface UserRoleDoc extends Document, UserRole {}

// Schema
const schema = new Schema<UserRoleDoc>(
  {
    name: { type: String, required: true },
    permissions: {
      type: [
        {
          type: String,
        },
      ],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const UserRoleModal = model('UserRole', schema);
