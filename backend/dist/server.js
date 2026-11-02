"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const inquiryRoutes_1 = __importDefault(require("./routes/inquiryRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (origin.includes('localhost') ||
            origin.includes('vercel.app') ||
            origin.includes('tweaki.pw') ||
            origin === process.env.CLIENT_URL ||
            origin === process.env.ADMIN_URL) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'Orient Energy API is running 🚀', timestamp: new Date().toISOString() });
});
// Routes
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/inquiries', inquiryRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.use('/api/brands', brandRoutes_1.default);
// 404
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});
// Start
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
exports.default = app;
