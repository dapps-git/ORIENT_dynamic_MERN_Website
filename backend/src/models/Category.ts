import mongoose, { Document, Schema } from 'mongoose';

export interface ISubcategory {
  name: string;
  image?: string;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  headline?: string;
  description: string;
  detailedDescriptions?: string[];
  image: string;
  icon?: string;
  productRangeTitle?: string;
  productRange?: string[];
  applicationsTitle?: string;
  applications?: string[];
  subcategoriesTitle?: string;
  subcategories?: ISubcategory[];
  pills?: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    headline: { type: String, default: '' },
    description: { type: String, default: '' },
    detailedDescriptions: [{ type: String }],
    image: { type: String, default: '' },
    icon: { type: String, default: '' },
    productRangeTitle: { type: String, default: 'Product Range' },
    productRange: [{ type: String }],
    applicationsTitle: { type: String, default: 'Applications' },
    applications: [{ type: String }],
    subcategoriesTitle: { type: String, default: 'Sub-Categories' },
    subcategories: [
      {
        name: { type: String, required: true },
        image: { type: String, default: '' },
      },
    ],
    pills: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
