import { Router, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Robust Cloudinary configuration from env
const setupCloudinary = () => {
  const cloudUrl = process.env.CLOUDINARY_URL;
  if (cloudUrl) {
    const urlMatch = cloudUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
    if (urlMatch) {
      cloudinary.config({
        api_key: urlMatch[1],
        api_secret: urlMatch[2],
        cloud_name: urlMatch[3],
        secure: true,
      });
      return;
    }
  }

  if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  } else {
    cloudinary.config();
  }
};

setupCloudinary();

const router = Router();

// Test Cloudinary connection
router.get('/ping', async (_req: Request, res: Response) => {
  try {
    const result = await cloudinary.api.ping();
    res.json({ success: true, message: 'Cloudinary connected successfully', result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Cloudinary connection error', error: error.message });
  }
});

// Endpoint to upload base64 image or file (Auto-converts PNG / JPEG to WebP via Cloudinary)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { image, name, convertToWebp = true, folder = 'orient_energy' } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    // If it's already an existing external Cloudinary URL, return as is
    if (image.startsWith('https://res.cloudinary.com/')) {
      return res.json({ success: true, url: image, format: 'webp' });
    }

    const safeName = (name || 'upload')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Try Cloudinary upload with automatic WebP conversion
    try {
      setupCloudinary();

      const uploadOptions: any = {
        folder,
        resource_type: 'image',
        public_id: `${safeName}-${Date.now()}`,
      };

      // Convert PNG/JPEG/etc. to WebP format if requested (default: true)
      if (convertToWebp !== false) {
        uploadOptions.format = 'webp';
        uploadOptions.transformation = [
          { quality: 'auto:good', fetch_format: 'webp' }
        ];
      }

      const uploadRes = await cloudinary.uploader.upload(image, uploadOptions);

      return res.json({
        success: true,
        url: uploadRes.secure_url,
        format: uploadRes.format || 'webp',
        public_id: uploadRes.public_id,
        bytes: uploadRes.bytes,
        width: uploadRes.width,
        height: uploadRes.height,
        message: 'Image converted to WebP and saved in Cloudinary successfully',
      });
    } catch (cloudErr: any) {
      console.error('Cloudinary upload error, falling back to local storage:', cloudErr.message);
    }

    // Local fallback if Cloudinary credentials or internet not available
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Invalid image format or base64 string' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = convertToWebp !== false ? 'webp' : 'png';
    if (!convertToWebp) {
      if (mimeType.includes('png')) ext = 'png';
      else if (mimeType.includes('svg')) ext = 'svg';
      else if (mimeType.includes('jpg') || mimeType.includes('jpeg')) ext = 'jpg';
    }

    const filename = `${safeName}-${Date.now()}.${ext}`;
    const frontendDir = path.resolve(__dirname, '../../../frontend/public/uploads');
    const adminDir = path.resolve(__dirname, '../../../admin/public/uploads');

    if (!fs.existsSync(frontendDir)) {
      fs.mkdirSync(frontendDir, { recursive: true });
    }
    if (!fs.existsSync(adminDir)) {
      fs.mkdirSync(adminDir, { recursive: true });
    }

    fs.writeFileSync(path.join(frontendDir, filename), buffer);
    fs.writeFileSync(path.join(adminDir, filename), buffer);

    const publicUrl = `/uploads/${filename}`;
    res.json({
      success: true,
      url: publicUrl,
      filename,
      format: ext,
      warning: 'Uploaded to local fallback storage'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
