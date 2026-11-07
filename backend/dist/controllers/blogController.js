"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogBySlug = exports.getBlogs = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Blog_1 = require("../models/Blog");
const getBlogs = async (req, res) => {
    try {
        const { search, category, limit, page, all } = req.query;
        const query = {};
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
        const total = await Blog_1.Blog.countDocuments(query);
        const blogs = await Blog_1.Blog.find(query)
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBlogs = getBlogs;
const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        let blog = await Blog_1.Blog.findOne({ slug });
        if (!blog && mongoose_1.default.Types.ObjectId.isValid(slug)) {
            blog = await Blog_1.Blog.findById(slug);
        }
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Article not found' });
        }
        // Get related articles
        const relatedBlogs = await Blog_1.Blog.find({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBlogBySlug = getBlogBySlug;
const createBlog = async (req, res) => {
    try {
        const { title, slug, subtitle, image, readTime, date, author, category, introduction, fleetTitle, fleetPoints, whyChoosePoints, conclusion, isPublished, } = req.body;
        const cleanSlug = slug ||
            title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        const existing = await Blog_1.Blog.findOne({ slug: cleanSlug });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Blog with this slug already exists' });
        }
        const blog = new Blog_1.Blog({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.title && !updateData.slug) {
            updateData.slug = updateData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        let blog = null;
        if (mongoose_1.default.Types.ObjectId.isValid(id)) {
            blog = await Blog_1.Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        }
        if (!blog) {
            blog = await Blog_1.Blog.findOneAndUpdate({ slug: id }, updateData, { new: true, runValidators: true });
        }
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.json({ success: true, data: blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        let blog = null;
        if (mongoose_1.default.Types.ObjectId.isValid(id)) {
            blog = await Blog_1.Blog.findByIdAndDelete(id);
        }
        if (!blog) {
            blog = await Blog_1.Blog.findOneAndDelete({ slug: id });
        }
        if (!blog) {
            blog = await Blog_1.Blog.findOneAndDelete({ title: new RegExp(`^${id}$`, 'i') });
        }
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.json({ success: true, message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteBlog = deleteBlog;
