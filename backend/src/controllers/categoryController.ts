import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ order: 1, name: 1 });
    // Also include count of products for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id });
        return {
          ...cat.toObject(),
          productCount: count
        };
      })
    );
    res.json({ success: true, data: categoriesWithCount });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const products = await Product.find({
      $or: [{ category: category._id }, { divisionSlug: category.slug }]
    }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: {
        ...category.toObject(),
        products
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      headline,
      description,
      detailedDescriptions,
      image,
      icon,
      productRangeTitle,
      productRange,
      applicationsTitle,
      applications,
      subcategoriesTitle,
      subcategories,
      pills,
      featured,
      order,
    } = req.body;
    const cleanSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const existing = await Category.findOne({ slug: cleanSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category with this slug already exists' });
    }

    const category = new Category({
      name,
      slug: cleanSlug,
      headline: headline || '',
      description: description || '',
      detailedDescriptions: detailedDescriptions || [],
      image: image || '',
      icon: icon || '',
      productRangeTitle: productRangeTitle || 'Product Range',
      productRange: productRange || [],
      applicationsTitle: applicationsTitle || 'Applications',
      applications: applications || [],
      subcategoriesTitle: subcategoriesTitle || 'Sub-Categories',
      subcategories: subcategories || [],
      pills: pills || [],
      featured: Boolean(featured),
      order: Number(order) || 0
    });

    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category removed successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
