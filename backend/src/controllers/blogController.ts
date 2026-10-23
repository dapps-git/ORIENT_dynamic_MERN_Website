import { Request, Response } from 'express';
import { Blog } from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const { search, category, limit, page, all } = req.query;
    const query: any = {};

    // Only show published unless 'all=true' (for admin)
    if (all !== 'true') {
      query.isPublished = true;
    }

    if (category) {
      query.category = category.toString();
    }

    if (search) {
      query.$or = [
        { title: { $regex: search.toString(), $options: 'i' } },
        { subtitle: { $regex: search.toString(), $options: 'i' } },
        { introduction: { $regex: search.toString(), $options: 'i' } },
      ];
    }

    const pageSize = limit ? parseInt(limit.toString(), 10) : 50;
    const pageNum = page ? parseInt(page.toString(), 10) : 1;
    const skip = (pageNum - 1) * pageSize;

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Get related articles
    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      isPublished: true,
    })
      .limit(3)
      .select('title slug image readTime date');

    res.json({
      success: true,
      data: {
        ...blog.toObject(),
        relatedBlogs,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      subtitle,
      image,
      readTime,
      date,
      author,
      category,
      introduction,
      fleetTitle,
      fleetPoints,
      whyChoosePoints,
      conclusion,
      isPublished,
    } = req.body;

    const cleanSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const existing = await Blog.findOne({ slug: cleanSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Blog with this slug already exists' });
    }

    const blog = new Blog({
      title,
      slug: cleanSlug,
      subtitle,
      image: image || '/blog/blog-1.jpg',
      readTime: readTime || '8 Minute Read',
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: author || 'Orient Energy Team',
      category: category || 'Industrial Insights',
      introduction,
      fleetTitle: fleetTitle || 'Fleet and Services:',
      fleetPoints: fleetPoints || [],
      whyChoosePoints: whyChoosePoints || [],
      conclusion,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    await blog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
