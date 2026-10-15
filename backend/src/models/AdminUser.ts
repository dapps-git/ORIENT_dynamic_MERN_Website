import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' }
  },
  { timestamps: true }
);

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
