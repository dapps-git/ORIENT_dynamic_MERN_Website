"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.getBrandById = exports.getBrands = void 0;
const Brand_1 = require("../models/Brand");
const getBrands = async (req, res) => {
    try {
        const { category, active } = req.query;
        const filter = {};
        if (category && typeof category === 'string' && category !== 'all') {
            filter.category = category.toLowerCase().trim();
        }
        if (active === 'true') {
            filter.isActive = true;
        }
        const brands = await Brand_1.Brand.find(filter).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, count: brands.length, data: brands });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBrands = getBrands;
const getBrandById = async (req, res) => {
    try {
        const brand = await Brand_1.Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }
        res.json({ success: true, data: brand });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getBrandById = getBrandById;
const createBrand = async (req, res) => {
    try {
        const { name, category, logo, websiteUrl, description, order, isActive } = req.body;
        if (!name || !logo) {
            return res.status(400).json({ success: false, message: 'Brand name and logo are required' });
        }
        const validCategory = ['general', 'bearings', 'filterings'].includes(category)
            ? category
            : 'general';
        const brand = await Brand_1.Brand.create({
            name: name.trim(),
            category: validCategory,
            logo: logo.trim(),
            websiteUrl: websiteUrl ? websiteUrl.trim() : '',
            description: description ? description.trim() : '',
            order: typeof order === 'number' ? order : 0,
            isActive: isActive !== undefined ? Boolean(isActive) : true,
        });
        res.status(201).json({ success: true, data: brand });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createBrand = createBrand;
const updateBrand = async (req, res) => {
    try {
        const { name, category, logo, websiteUrl, description, order, isActive } = req.body;
        const brand = await Brand_1.Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }
        if (name)
            brand.name = name.trim();
        if (category && ['general', 'bearings', 'filterings'].includes(category)) {
            brand.category = category;
        }
        if (logo)
            brand.logo = logo.trim();
        if (websiteUrl !== undefined)
            brand.websiteUrl = websiteUrl.trim();
        if (description !== undefined)
            brand.description = description.trim();
        if (order !== undefined)
            brand.order = Number(order);
        if (isActive !== undefined)
            brand.isActive = Boolean(isActive);
        const updated = await brand.save();
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateBrand = updateBrand;
const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand_1.Brand.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }
        res.json({ success: true, message: 'Brand deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteBrand = deleteBrand;
