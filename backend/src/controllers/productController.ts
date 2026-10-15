import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, featured, inStock, limit, page } = req.query;
    const query: any = {};

    if (category) {
      if (category.toString().match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const catDoc = await Category.findOne({ slug: category.toString() });
        if (catDoc) {
          query.category = catDoc._id;
        }
      }
    }

    if (search) {
      query.$or = [
        { title: { $regex: search.toString(), $options: 'i' } },
        { shortDescription: { $regex: search.toString(), $options: 'i' } },
        { sku: { $regex: search.toString(), $options: 'i' } }
      ];
    }

    if (featured !== undefined) {
      query.isFeatured = featured === 'true';
    }

    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    const pageSize = limit ? parseInt(limit.toString(), 10) : 50;
    const pageNum = page ? parseInt(page.toString(), 10) : 1;
    const skip = (pageNum - 1) * pageSize;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate('category', 'name slug description');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get related products in the same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      .limit(4)
      .select('title slug images shortDescription inStock');

    res.json({
      success: true,
      data: {
        ...product.toObject(),
        relatedProducts
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      sku,
      category,
      shortDescription,
      fullDescription,
      specifications,
      features,
      images,
      isFeatured,
      inStock,
      catalogueUrl
    } = req.body;

    const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await Product.findOne({ slug: cleanSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Product with this slug already exists' });
    }

    let categoryDoc = null;
    if (category.match(/^[0-9a-fA-F]{24}$/)) {
      categoryDoc = await Category.findById(category);
    } else {
      categoryDoc = await Category.findOne({ slug: category });
    }

    if (!categoryDoc) {
      return res.status(400).json({ success: false, message: 'Invalid category specified' });
    }

    const product = new Product({
      title,
      slug: cleanSlug,
      sku: sku || `OETC-${Math.floor(1000 + Math.random() * 9000)}`,
      category: categoryDoc._id,
      categoryName: categoryDoc.name,
      shortDescription,
      fullDescription,
      specifications: specifications || [],
      features: features || [],
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
      isFeatured: Boolean(isFeatured),
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      catalogueUrl: catalogueUrl || ''
    });

    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (updateData.category) {
      const categoryDoc = await Category.findById(updateData.category);
      if (categoryDoc) {
        updateData.categoryName = categoryDoc.name;
      }
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
