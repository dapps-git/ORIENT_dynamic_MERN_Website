import { Request, Response } from 'express';
import { Brand } from '../models/Brand';

export const getBrands = async (req: Request, res: Response) => {
  try {
    const { category, active } = req.query;
    const filter: any = {};

    if (category && typeof category === 'string' && category !== 'all') {
      filter.category = category.toLowerCase().trim();
    }

    if (active === 'true') {
      filter.isActive = true;
    }

    const brands = await Brand.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: brands.length, data: brands });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.json({ success: true, data: brand });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name, category, logo, websiteUrl, description, order, isActive } = req.body;

    if (!name || !logo) {
      return res.status(400).json({ success: false, message: 'Brand name and logo are required' });
    }

    const validCategory = ['general', 'bearings', 'filterings'].includes(category)
      ? category
      : 'general';

    const brand = await Brand.create({
      name: name.trim(),
      category: validCategory,
      logo: logo.trim(),
      websiteUrl: websiteUrl ? websiteUrl.trim() : '',
      description: description ? description.trim() : '',
      order: typeof order === 'number' ? order : 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json({ success: true, data: brand });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { name, category, logo, websiteUrl, description, order, isActive } = req.body;
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    if (name) brand.name = name.trim();
    if (category && ['general', 'bearings', 'filterings'].includes(category)) {
      brand.category = category;
    }
    if (logo) brand.logo = logo.trim();
    if (websiteUrl !== undefined) brand.websiteUrl = websiteUrl.trim();
    if (description !== undefined) brand.description = description.trim();
    if (order !== undefined) brand.order = Number(order);
    if (isActive !== undefined) brand.isActive = Boolean(isActive);

    const updated = await brand.save();
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.json({ success: true, message: 'Brand deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
