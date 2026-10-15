import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: 'quote' | 'contact' | 'service' | 'general';
  productTitle?: string;
  serviceTitle?: string;
  message: string;
  status: 'new' | 'in_review' | 'contacted' | 'resolved';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, default: '' },
    type: {
      type: String,
      enum: ['quote', 'contact', 'service', 'general'],
      default: 'general'
    },
    productTitle: { type: String, default: '' },
    serviceTitle: { type: String, default: '' },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_review', 'contacted', 'resolved'],
      default: 'new'
    },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema);
