import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import serviceRoutes from './routes/serviceRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import adminRoutes from './routes/adminRoutes';
import blogRoutes from './routes/blogRoutes';
import uploadRoutes from './routes/uploadRoutes';
import brandRoutes from './routes/brandRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Handle optional cPanel subfolder prefix (e.g. /orient/api/... -> /api/...)
app.use((req, _res, next) => {
  if (req.url === '/orient') {
    req.url = '/';
  } else if (req.url.startsWith('/orient/')) {
    req.url = req.url.slice(7);
  }
  next();
});

// Universal CORS Middleware with preflight handling
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
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

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

// Health checks - works at /, /health, /api, /api/health
const healthHandler = (_req: express.Request, res: express.Response) => {
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
app.use('/api/categories', categoryRoutes);
app.use('/categories', categoryRoutes);

app.use('/api/products', productRoutes);
app.use('/products', productRoutes);

app.use('/api/services', serviceRoutes);
app.use('/services', serviceRoutes);

app.use('/api/inquiries', inquiryRoutes);
app.use('/inquiries', inquiryRoutes);

app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);

app.use('/api/blogs', blogRoutes);
app.use('/blogs', blogRoutes);

app.use('/api/upload', uploadRoutes);
app.use('/upload', uploadRoutes);

app.use('/api/brands', brandRoutes);
app.use('/brands', brandRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start listening immediately so cPanel / Passenger detects the socket right away
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB().catch((err) => {
    console.error('MongoDB connection error:', err);
  });
});

export default app;
