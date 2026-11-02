import mongoose, { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  category: 'general' | 'bearings' | 'filterings';
  logo: string;
  websiteUrl?: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['general', 'bearings', 'filterings'],
      default: 'general',
      required: true,
      index: true,
    },
    logo: { type: String, required: true, trim: true },
    websiteUrl: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Brand = mongoose.model<IBrand>('Brand', BrandSchema);
