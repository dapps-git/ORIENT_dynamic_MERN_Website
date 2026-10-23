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

    // Get related products in the same category or division
    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { divisionSlug: product.divisionSlug },
        { categoryName: product.categoryName }
      ],
      _id: { $ne: product._id }
    })
      .limit(6)
      .select('title slug image images shortDescription inStock categoryName divisionSlug whatsappMessage');

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
      image,
      images,
      whatsappMessage,
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
    if (category && typeof category === 'string' && category.match(/^[0-9a-fA-F]{24}$/)) {
      categoryDoc = await Category.findById(category);
    } else if (category && typeof category === 'string') {
      categoryDoc = await Category.findOne({ slug: category });
    }
    if (!categoryDoc && (req.body.categoryName || req.body.division)) {
      categoryDoc = await Category.findOne({ name: req.body.categoryName || req.body.division });
    }

    const primaryImage = image || (images && images.length ? images[0] : '/categories/all-fittings.jpeg');
    const imageList = images && images.length ? images : [primaryImage];

    const product = new Product({
      title,
      slug: cleanSlug,
      sku: sku || `OETC-${Math.floor(1000 + Math.random() * 9000)}`,
      category: categoryDoc ? categoryDoc._id : undefined,
      categoryName: categoryDoc ? categoryDoc.name : (req.body.categoryName || req.body.division || 'General Industrial'),
      divisionSlug: categoryDoc ? categoryDoc.slug : (req.body.divisionSlug || 'mechanical-division'),
      shortDescription: shortDescription || '',
      fullDescription: fullDescription || '',
      specifications: specifications || [],
      features: features || [],
      image: primaryImage,
      images: imageList,
      whatsappMessage: whatsappMessage || `Hello Orient Energy, I am interested in inquiring about ${title}.`,
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

    if (updateData.category && typeof updateData.category === 'string' && updateData.category.match(/^[0-9a-fA-F]{24}$/)) {
      const categoryDoc = await Category.findById(updateData.category);
      if (categoryDoc) {
        if (!updateData.categoryName) {
          updateData.categoryName = categoryDoc.name;
        }
        if (!updateData.divisionSlug) updateData.divisionSlug = categoryDoc.slug;
      }
    } else if (updateData.divisionSlug && !updateData.category) {
      const cat = await Category.findOne({ slug: updateData.divisionSlug });
      if (cat) {
        updateData.category = cat._id;
        if (!updateData.categoryName) {
          updateData.categoryName = cat.name;
        }
      }
    }

    if (updateData.image && (!updateData.images || updateData.images.length === 0)) {
      updateData.images = [updateData.image];
    } else if (updateData.images && updateData.images.length > 0 && !updateData.image) {
      updateData.image = updateData.images[0];
    }

    const isObjectId = Boolean(id && id.match(/^[0-9a-fA-F]{24}$/));
    const product = isObjectId
      ? await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      : await Product.findOneAndUpdate({ slug: id }, updateData, { new: true, runValidators: true });
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
