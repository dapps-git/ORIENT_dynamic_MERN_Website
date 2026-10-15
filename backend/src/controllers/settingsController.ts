import { Request, Response } from 'express';
import { CompanySetting } from '../models/CompanySetting';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Inquiry } from '../models/Inquiry';
import { Service } from '../models/Service';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await CompanySetting.findOne();
    if (!settings) {
      settings = new CompanySetting({});
      await settings.save();
    }
    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await CompanySetting.findOne();
    if (!settings) {
      settings = new CompanySetting(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalProducts, totalCategories, totalServices, totalInquiries, newInquiries] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Service.countDocuments({ isActive: true }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' })
    ]);

    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);
    const featuredProducts = await Product.find({ isFeatured: true })
      .populate('category', 'name')
      .limit(5)
      .select('title images inStock');

    res.json({
      success: true,
      data: {
        totalProducts,
        totalCategories,
        totalServices,
        totalInquiries,
        newInquiries,
        recentInquiries,
        featuredProducts
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
