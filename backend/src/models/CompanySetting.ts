import mongoose, { Document, Schema } from 'mongoose';

export interface ICompanySetting extends Document {
  companyName: string;
  tagline: string;
  aboutShort: string;
  aboutFull: string;
  phone: string;
  email: string;
  address: string;
  locations: string[];
  workingHours: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  stats: {
    experienceYears: number;
    productsDelivered: number;
    activeClients: number;
    satisfactionRate: number;
  };
}

const CompanySettingSchema: Schema = new Schema(
  {
    companyName: { type: String, default: 'Orient Energy' },
    tagline: { type: String, default: 'Industrial Supply & Engineering Solutions in Saudi Arabia' },
    aboutShort: {
      type: String,
      default: 'Orient Energy delivers world-class industrial equipment, engineering procurement, and field support across Saudi Arabia.'
    },
    aboutFull: {
      type: String,
      default: 'Orient Energy is a premier industrial solutions partner in the Kingdom of Saudi Arabia, catering to oil & gas, petrochemical, marine, heavy infrastructure, and energy sectors.'
    },
    phone: { type: String, default: '+966 13 888 0000' },
    email: { type: String, default: 'info@orientenergyco.com' },
    address: { type: String, default: 'King Fahd Road, Al Khobar / Dammam, Kingdom of Saudi Arabia' },
    locations: [{ type: String }],
    workingHours: { type: String, default: 'Sun - Thu: 8:00 AM - 5:30 PM' },
    socials: {
      linkedin: { type: String, default: 'https://linkedin.com' },
      instagram: { type: String, default: 'https://www.instagram.com/orientenergyco/' },
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' }
    },
    stats: {
      experienceYears: { type: Number, default: 15 },
      productsDelivered: { type: Number, default: 12500 },
      activeClients: { type: Number, default: 450 },
      satisfactionRate: { type: Number, default: 99 }
    }
  },
  { timestamps: true }
);

export const CompanySetting = mongoose.model<ICompanySetting>('CompanySetting', CompanySettingSchema);
