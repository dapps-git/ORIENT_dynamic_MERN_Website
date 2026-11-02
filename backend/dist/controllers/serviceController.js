"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.createService = exports.getServiceBySlug = exports.getServices = void 0;
const Service_1 = require("../models/Service");
const getServices = async (req, res) => {
    try {
        const services = await Service_1.Service.find({ isActive: true }).sort({ order: 1, title: 1 });
        res.json({ success: true, data: services });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getServices = getServices;
const getServiceBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const service = await Service_1.Service.findOne({ slug, isActive: true });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getServiceBySlug = getServiceBySlug;
const createService = async (req, res) => {
    try {
        const { title, slug, shortDescription, fullDescription, icon, image, features, benefits, order, isActive } = req.body;
        const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const existing = await Service_1.Service.findOne({ slug: cleanSlug });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Service with this slug already exists' });
        }
        const service = new Service_1.Service({
            title, slug: cleanSlug, shortDescription, fullDescription,
            icon: icon || 'wrench', image: image || '',
            features: features || [], benefits: benefits || [],
            order: Number(order) || 0,
            isActive: isActive !== undefined ? Boolean(isActive) : true
        });
        await service.save();
        res.status(201).json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createService = createService;
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service_1.Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!service)
            return res.status(404).json({ success: false, message: 'Service not found' });
        res.json({ success: true, data: service });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateService = updateService;
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service_1.Service.findByIdAndDelete(id);
        if (!service)
            return res.status(404).json({ success: false, message: 'Service not found' });
        res.json({ success: true, message: 'Service deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteService = deleteService;
