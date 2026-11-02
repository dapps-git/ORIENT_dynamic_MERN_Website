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
// Handle optional cPanel subfolder prefix (e.g. /orient/api/... -> /api/...)
app.use((req, _res, next) => {
    if (req.url === '/orient') {
        req.url = '/';
    }
    else if (req.url.startsWith('/orient/')) {
        req.url = req.url.slice(7);
    }
    next();
});
// Universal CORS Middleware with preflight handling
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health checks - works at /, /health, /api, /api/health
const healthHandler = (_req, res) => {
    res.json({
        success: true,
        message: 'Orient Energy API is running 🚀',
        timestamp: new Date().toISOString()
    });
};
app.get('/', healthHandler);
app.get('/health', healthHandler);
app.get('/api', healthHandler);
app.get('/api/health', healthHandler);
// Routes - mounted on BOTH /api/* and /* so it works with any URL configuration
app.use('/api/categories', categoryRoutes_1.default);
app.use('/categories', categoryRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/products', productRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/services', serviceRoutes_1.default);
app.use('/api/inquiries', inquiryRoutes_1.default);
app.use('/inquiries', inquiryRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
app.use('/blogs', blogRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.use('/upload', uploadRoutes_1.default);
app.use('/api/brands', brandRoutes_1.default);
app.use('/brands', brandRoutes_1.default);
// 404
app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});
// Start listening immediately so cPanel / Passenger detects the socket right away
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    (0, db_1.default)().catch((err) => {
        console.error('MongoDB connection error:', err);
    });
});
exports.default = app;
