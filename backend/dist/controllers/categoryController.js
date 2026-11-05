"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryBySlug = exports.getCategories = void 0;
const Category_1 = require("../models/Category");
const Product_1 = require("../models/Product");
const getCategories = async (req, res) => {
    try {
        const categories = await Category_1.Category.find().sort({ order: 1, name: 1 });
        // Also include count of products for each category
        const categoriesWithCount = await Promise.all(categories.map(async (cat) => {
            const count = await Product_1.Product.countDocuments({
                $or: [{ category: cat._id }, { divisionSlug: cat.slug }]
            });
            return {
                ...cat.toObject(),
                productCount: count
            };
        }));
        res.json({ success: true, data: categoriesWithCount });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCategories = getCategories;
const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category_1.Category.findOne({ slug });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const products = await Product_1.Product.find({
            $or: [{ category: category._id }, { divisionSlug: category.slug }]
        }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: {
                ...category.toObject(),
                products
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getCategoryBySlug = getCategoryBySlug;
const createCategory = async (req, res) => {
    try {
        const { name, slug, headline, description, detailedDescriptions, image, icon, productRangeTitle, productRange, applicationsTitle, applications, subcategoriesTitle, subcategories, pills, featured, order, } = req.body;
        const cleanSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const existing = await Category_1.Category.findOne({ slug: cleanSlug });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Category with this slug already exists' });
        }
        const category = new Category_1.Category({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.name && !updateData.slug) {
            updateData.slug = updateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        const isObjectId = Boolean(id && id.match(/^[0-9a-fA-F]{24}$/));
        const category = isObjectId
            ? await Category_1.Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            : await Category_1.Category.findOneAndUpdate({ $or: [{ slug: id }, { name: id }] }, updateData, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const isObjectId = Boolean(id && id.match(/^[0-9a-fA-F]{24}$/));
        const category = isObjectId
            ? await Category_1.Category.findByIdAndDelete(id)
            : await Category_1.Category.findOneAndDelete({ $or: [{ slug: id }, { name: id }] });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.json({ success: true, message: 'Category removed successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteCategory = deleteCategory;
