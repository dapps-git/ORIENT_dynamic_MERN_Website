import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry';

export const submitInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, type, productTitle, serviceTitle, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, phone and message are required.' });
    }
    const inquiry = new Inquiry({ name, email, phone, company, type: type || 'general', productTitle, serviceTitle, message });
    await inquiry.save();
    res.status(201).json({ success: true, message: 'Your inquiry has been submitted. We will contact you shortly.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const { status, type, page, limit } = req.query;
    const query: any = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const pageSize = limit ? parseInt(limit.toString(), 10) : 20;
    const pageNum = page ? parseInt(page.toString(), 10) : 1;
    const skip = (pageNum - 1) * pageSize;

    const total = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize);

    res.json({
      success: true,
      data: inquiries,
      pagination: { total, page: pageNum, pages: Math.ceil(total / pageSize) }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status, notes }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, data: inquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
