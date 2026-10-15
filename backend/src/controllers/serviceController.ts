import { Request, Response } from 'express';
import { Service } from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1, title: 1 });
    res.json({ success: true, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug, isActive: true });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, slug, shortDescription, fullDescription, icon, image, features, benefits, order, isActive } = req.body;
    const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await Service.findOne({ slug: cleanSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Service with this slug already exists' });
    }

    const service = new Service({
      title, slug: cleanSlug, shortDescription, fullDescription,
      icon: icon || 'wrench', image: image || '',
      features: features || [], benefits: benefits || [],
      order: Number(order) || 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true
    });

    await service.save();
    res.status(201).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
