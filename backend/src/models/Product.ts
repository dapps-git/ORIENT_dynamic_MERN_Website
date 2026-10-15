import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecification {
  label: string;
  value: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  sku: string;
  category: mongoose.Types.ObjectId | string;
  categoryName?: string;
  shortDescription: string;
  fullDescription: string;
  specifications: ISpecification[];
  features: string[];
  images: string[];
  isFeatured: boolean;
  inStock: boolean;
  catalogueUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    sku: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    categoryName: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    specifications: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true }
      }
    ],
    features: [{ type: String }],
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    catalogueUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
