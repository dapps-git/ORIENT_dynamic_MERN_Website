"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Robust Cloudinary configuration from env
const setupCloudinary = () => {
    const cloudUrl = process.env.CLOUDINARY_URL;
    if (cloudUrl) {
        const urlMatch = cloudUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
        if (urlMatch) {
            cloudinary_1.v2.config({
                api_key: urlMatch[1],
                api_secret: urlMatch[2],
                cloud_name: urlMatch[3],
                secure: true,
            });
            return;
        }
    }
    if (process.env.CLOUDINARY_CLOUD_NAME) {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
    }
    else {
        cloudinary_1.v2.config();
    }
};
setupCloudinary();
const router = (0, express_1.Router)();
// Test Cloudinary connection
router.get('/ping', async (_req, res) => {
    try {
        const result = await cloudinary_1.v2.api.ping();
        res.json({ success: true, message: 'Cloudinary connected successfully', result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Cloudinary connection error', error: error.message });
    }
});
// Endpoint to upload base64 image or file (Auto-converts PNG / JPEG to WebP via Cloudinary)
router.post('/', async (req, res) => {
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
            const uploadOptions = {
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
            const uploadRes = await cloudinary_1.v2.uploader.upload(image, uploadOptions);
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
        }
        catch (cloudErr) {
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
            if (mimeType.includes('png'))
                ext = 'png';
            else if (mimeType.includes('svg'))
                ext = 'svg';
            else if (mimeType.includes('jpg') || mimeType.includes('jpeg'))
                ext = 'jpg';
        }
        const filename = `${safeName}-${Date.now()}.${ext}`;
        const frontendDir = path_1.default.resolve(__dirname, '../../../frontend/public/uploads');
        const adminDir = path_1.default.resolve(__dirname, '../../../admin/public/uploads');
        if (!fs_1.default.existsSync(frontendDir)) {
            fs_1.default.mkdirSync(frontendDir, { recursive: true });
        }
        if (!fs_1.default.existsSync(adminDir)) {
            fs_1.default.mkdirSync(adminDir, { recursive: true });
        }
        fs_1.default.writeFileSync(path_1.default.join(frontendDir, filename), buffer);
        fs_1.default.writeFileSync(path_1.default.join(adminDir, filename), buffer);
        const publicUrl = `/uploads/${filename}`;
        res.json({
            success: true,
            url: publicUrl,
            filename,
            format: ext,
            warning: 'Uploaded to local fallback storage'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = router;
