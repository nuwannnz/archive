import { Schema, model, Document } from 'mongoose';
import { DomainModal } from 'src/shared/modals/domain.modal';
import { UserRoleModal } from 'src/shared/modals/user-role.modal';

// Document interface
interface User {
  domainId: Schema.Types.ObjectId;
  userRoleId: Schema.Types.ObjectId;
  userSub: string;
  isActive: boolean;
}

export interface UserDoc extends Document, User {}

// Schema
const schema = new Schema<UserDoc>(
  {
    domainId: {
      type: Schema.Types.ObjectId,
      ref: DomainModal,
      required: true,
    },
    userRoleId: {
      type: Schema.Types.ObjectId,
      ref: UserRoleModal,
      required: true,
    },
    userSub: {
      type: String,
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const UserModal = model('User', schema);
