import mongoose, { Document, Schema } from 'mongoose';

export interface IFleetPoint {
  label: string;
  text: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  subtitle: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
  introduction: string;
  fleetTitle?: string;
  fleetPoints: IFleetPoint[];
  whyChoosePoints: string[];
  conclusion: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    subtitle: { type: String, default: '' },
    image: { type: String, default: '/blog/blog-1.jpg' },
    readTime: { type: String, default: '5 Minute Read' },
    date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    author: { type: String, default: 'Orient Energy Team' },
    category: { type: String, default: 'Industrial Insights' },
    introduction: { type: String, required: true },
    fleetTitle: { type: String, default: 'Key Capabilities & Fleet:' },
    fleetPoints: [
      {
        label: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    whyChoosePoints: [{ type: String }],
    conclusion: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
