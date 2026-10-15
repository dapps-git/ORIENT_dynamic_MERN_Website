import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    icon: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
