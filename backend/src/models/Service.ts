import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    icon: { type: String, default: 'wrench' },
    image: { type: String, default: '' },
    features: [{ type: String }],
    benefits: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
