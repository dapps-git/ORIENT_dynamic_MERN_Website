import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// Endpoint to upload base64 image or file
router.post('/', async (req: Request, res: Response) => {
  try {
    const { image, name } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    // If it's already a URL (http or /path), just return it
    if (image.startsWith('http') || (image.startsWith('/') && !image.startsWith('data:'))) {
      return res.json({ success: true, url: image });
    }

    // Extract base64 data
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Invalid base64 string' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Extension from mimeType
    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('webp')) ext = 'webp';
    else if (mimeType.includes('svg')) ext = 'svg';

    const safeName = (name || 'upload')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const filename = `${safeName}-${Date.now()}.${ext}`;

    // Target upload directories in both frontend and admin
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
    res.json({ success: true, url: publicUrl, filename });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
