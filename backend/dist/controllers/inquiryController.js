"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInquiry = exports.updateInquiryStatus = exports.getInquiries = exports.submitInquiry = void 0;
const Inquiry_1 = require("../models/Inquiry");
const submitInquiry = async (req, res) => {
    try {
        const { name, email, phone, company, type, productTitle, serviceTitle, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ success: false, message: 'Name, email, phone and message are required.' });
        }
        const inquiry = new Inquiry_1.Inquiry({ name, email, phone, company, type: type || 'general', productTitle, serviceTitle, message });
        await inquiry.save();
        res.status(201).json({ success: true, message: 'Your inquiry has been submitted. We will contact you shortly.' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.submitInquiry = submitInquiry;
const getInquiries = async (req, res) => {
    try {
        const { status, type, page, limit } = req.query;
        const query = {};
        if (status)
            query.status = status;
        if (type)
            query.type = type;
        const pageSize = limit ? parseInt(limit.toString(), 10) : 20;
        const pageNum = page ? parseInt(page.toString(), 10) : 1;
        const skip = (pageNum - 1) * pageSize;
        const total = await Inquiry_1.Inquiry.countDocuments(query);
        const inquiries = await Inquiry_1.Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
        res.json({
            success: true,
            data: inquiries,
            pagination: { total, page: pageNum, pages: Math.ceil(total / pageSize) }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getInquiries = getInquiries;
const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        const inquiry = await Inquiry_1.Inquiry.findByIdAndUpdate(id, { status, notes }, { new: true });
        if (!inquiry)
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        res.json({ success: true, data: inquiry });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateInquiryStatus = updateInquiryStatus;
const deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        await Inquiry_1.Inquiry.findByIdAndDelete(id);
        res.json({ success: true, message: 'Inquiry deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteInquiry = deleteInquiry;
