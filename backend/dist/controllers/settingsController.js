"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.updateSettings = exports.getSettings = void 0;
const CompanySetting_1 = require("../models/CompanySetting");
const Product_1 = require("../models/Product");
const Category_1 = require("../models/Category");
const Inquiry_1 = require("../models/Inquiry");
const Service_1 = require("../models/Service");
const getSettings = async (req, res) => {
    try {
        let settings = await CompanySetting_1.CompanySetting.findOne();
        if (!settings) {
            settings = new CompanySetting_1.CompanySetting({});
            await settings.save();
        }
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        let settings = await CompanySetting_1.CompanySetting.findOne();
        if (!settings) {
            settings = new CompanySetting_1.CompanySetting(req.body);
        }
        else {
            Object.assign(settings, req.body);
        }
        await settings.save();
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateSettings = updateSettings;
const getDashboardStats = async (req, res) => {
    try {
        const [totalProducts, totalCategories, totalServices, totalInquiries, newInquiries] = await Promise.all([
            Product_1.Product.countDocuments(),
            Category_1.Category.countDocuments(),
            Service_1.Service.countDocuments({ isActive: true }),
            Inquiry_1.Inquiry.countDocuments(),
            Inquiry_1.Inquiry.countDocuments({ status: 'new' })
        ]);
        const recentInquiries = await Inquiry_1.Inquiry.find().sort({ createdAt: -1 }).limit(5);
        const featuredProducts = await Product_1.Product.find({ isFeatured: true })
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getDashboardStats = getDashboardStats;
