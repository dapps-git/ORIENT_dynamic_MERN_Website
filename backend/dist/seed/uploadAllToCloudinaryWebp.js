"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://helloidealenergy_db_user:WqX3zvfB2vUB1tuA@cluster0.bw7i70r.mongodb.net/test';
// Setup Cloudinary
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
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'kcltj31l',
        api_key: process.env.CLOUDINARY_API_KEY || '284332182897298',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'daY1jB8bz0Auiiz5zKYTPTOHOQs',
        secure: true,
    });
};
setupCloudinary();
const publicDir = path_1.default.resolve(__dirname, '../../../frontend/public');
async function migrateAllImagesToCloudinaryWebp() {
    try {
        console.log('🚀 Starting Cloudinary WebP Migration...');
        console.log('📡 Connecting to MongoDB Atlas...');
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas\n');
        const db = mongoose_1.default.connection.db;
        const categoriesCol = db.collection('categories');
        const productsCol = db.collection('products');
        const blogsCol = db.collection('blogs');
        const uploadedUrlMap = new Map();
        // Helper to upload a single local image to Cloudinary as WebP
        const uploadToCloudinaryWebp = async (localRelativePath) => {
            if (!localRelativePath || !localRelativePath.startsWith('/')) {
                return null;
            }
            if (uploadedUrlMap.has(localRelativePath)) {
                return uploadedUrlMap.get(localRelativePath);
            }
            // Check if file exists in frontend/public
            const relativeClean = localRelativePath.startsWith('/') ? localRelativePath.slice(1) : localRelativePath;
            const fullPath = path_1.default.join(publicDir, relativeClean);
            if (!fs_1.default.existsSync(fullPath)) {
                // Try admin/public fallback
                const adminPath = path_1.default.resolve(__dirname, '../../../admin/public', relativeClean);
                if (!fs_1.default.existsSync(adminPath)) {
                    console.warn(`   ⚠️ File not found locally: ${localRelativePath}`);
                    return null;
                }
            }
            const fileToUpload = fs_1.default.existsSync(fullPath) ? fullPath : path_1.default.resolve(__dirname, '../../../admin/public', relativeClean);
            const baseName = path_1.default.basename(fileToUpload, path_1.default.extname(fileToUpload))
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            try {
                const res = await cloudinary_1.v2.uploader.upload(fileToUpload, {
                    folder: 'orient_energy',
                    format: 'webp',
                    transformation: [{ quality: 'auto:good' }],
                    public_id: `${baseName}`,
                    overwrite: true,
                });
                uploadedUrlMap.set(localRelativePath, res.secure_url);
                console.log(`   ✅ Uploaded: ${localRelativePath} -> ${res.secure_url}`);
                return res.secure_url;
            }
            catch (err) {
                console.error(`   ❌ Failed uploading ${localRelativePath}:`, err.message);
                return null;
            }
        };
        // 1. Migrate Categories / Divisions
        console.log('📦 Checking Categories / Divisions...');
        const categories = await categoriesCol.find({}).toArray();
        let catUpdated = 0;
        for (const cat of categories) {
            if (cat.image && cat.image.startsWith('/')) {
                const cloudUrl = await uploadToCloudinaryWebp(cat.image);
                if (cloudUrl) {
                    await categoriesCol.updateOne({ _id: cat._id }, { $set: { image: cloudUrl, updatedAt: new Date() } });
                    catUpdated++;
                }
            }
        }
        console.log(`✨ Updated ${catUpdated}/${categories.length} Categories to Cloudinary WebP.\n`);
        // 2. Migrate Products
        console.log('📦 Checking Industrial Products...');
        const products = await productsCol.find({}).toArray();
        let prodUpdated = 0;
        for (const prod of products) {
            let isChanged = false;
            let newImage = prod.image;
            const newImages = [...(prod.images || [])];
            if (prod.image && prod.image.startsWith('/')) {
                const cloudUrl = await uploadToCloudinaryWebp(prod.image);
                if (cloudUrl) {
                    newImage = cloudUrl;
                    isChanged = true;
                }
            }
            for (let i = 0; i < newImages.length; i++) {
                if (newImages[i] && newImages[i].startsWith('/')) {
                    const cloudUrl = await uploadToCloudinaryWebp(newImages[i]);
                    if (cloudUrl) {
                        newImages[i] = cloudUrl;
                        isChanged = true;
                    }
                }
            }
            if (isChanged) {
                await productsCol.updateOne({ _id: prod._id }, { $set: { image: newImage, images: newImages, updatedAt: new Date() } });
                prodUpdated++;
            }
        }
        console.log(`✨ Updated ${prodUpdated}/${products.length} Products to Cloudinary WebP.\n`);
        // 3. Migrate Blogs
        console.log('📦 Checking Blog Articles...');
        const blogs = await blogsCol.find({}).toArray();
        let blogUpdated = 0;
        for (const blog of blogs) {
            if (blog.image && blog.image.startsWith('/')) {
                const cloudUrl = await uploadToCloudinaryWebp(blog.image);
                if (cloudUrl) {
                    await blogsCol.updateOne({ _id: blog._id }, { $set: { image: cloudUrl, updatedAt: new Date() } });
                    blogUpdated++;
                }
            }
        }
        console.log(`✨ Updated ${blogUpdated}/${blogs.length} Blogs to Cloudinary WebP.\n`);
        console.log('🎉 ALL IMAGES MIGRATED TO CLOUDINARY AS WEBP SUCCESSFULLY!');
        console.log(`Total unique images uploaded to Cloudinary: ${uploadedUrlMap.size}`);
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Migration Error:', err);
        process.exit(1);
    }
}
migrateAllImagesToCloudinaryWebp();
