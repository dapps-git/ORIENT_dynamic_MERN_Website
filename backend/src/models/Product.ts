import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecification {
  label: string;
  value: string;
}

export interface IInnerSection {
  title: string;
  content: string;
  image?: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  sku: string;
  category: mongoose.Types.ObjectId | string;
  categoryName?: string;
  divisionSlug?: string;
  shortDescription: string;
  fullDescription: string;
  specifications: ISpecification[];
  features: string[];
  image: string;
  images: string[];
  innerSections?: IInnerSection[];
  whatsappMessage?: string;
  isFeatured: boolean;
  inStock: boolean;
  catalogueUrl?: string;
  // SEO & Google Rich Results Optimization
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  imageAlt?: string;
  imageTitle?: string;
  brand?: string;
  canonicalUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    sku: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
    categoryName: { type: String, default: '' },
    divisionSlug: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    specifications: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    features: [{ type: String }],
    image: { type: String, default: '' },
    images: [{ type: String }],
    innerSections: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, default: '' },
      },
    ],
    whatsappMessage: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    catalogueUrl: { type: String, default: '' },
    // SEO & Google Rich Results Optimization
    seoTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    secondaryKeywords: [{ type: String }],
    imageAlt: { type: String, default: '' },
    imageTitle: { type: String, default: '' },
    brand: { type: String, default: 'Orient Energy' },
    canonicalUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
