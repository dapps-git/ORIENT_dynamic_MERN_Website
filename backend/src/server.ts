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
import bcrypt from 'bcryptjs';
import { AdminUser } from './models/AdminUser';
import { Category } from './models/Category';
import { Product } from './models/Product';

const app = express();
const PORT = process.env.PORT || 5000;

// Universal path normalization for cPanel / LiteSpeed / Phusion Passenger subfolders
app.use((req, _res, next) => {
  if (req.url === '/' || req.url === '/orient' || req.url === '/orient/') {
    req.url = '/';
  } else {
    const match = req.url.match(/(\/(?:api|health|admin|categories|products|services|inquiries|blogs|upload|brands)(?:[\/?].*)?)$/i);
    if (match) {
      req.url = match[1];
    }
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
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.url,
    originalUrl: req.originalUrl,
    method: req.method
  });
});

// Auto-ensure default admin credentials exist and match environment variables
const ensureAdminUser = async () => {
  try {
    const adminEmail = (process.env.ADMIN_SEED_EMAIL || process.env.ADMIN_EMAIL || 'orient@adminpanel.com').toLowerCase();
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || process.env.ADMIN_PASSWORD || 'orient@admin#1234';

    const existingAdmin = await AdminUser.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await AdminUser.create({
        name: 'Orient Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log(`[AUTH] 🛡️ Initial Admin user auto-seeded: ${adminEmail}`);
    } else {
      const isMatch = await bcrypt.compare(adminPassword, existingAdmin.password);
      if (!isMatch) {
        existingAdmin.password = await bcrypt.hash(adminPassword, 12);
        await existingAdmin.save();
        console.log(`[AUTH] 🛡️ Admin password synchronized with environment settings.`);
      }
    }
    console.log(`[AUTH] ✅ Admin account ready: ${adminEmail} (Credentials secured)`);
  } catch (error: any) {
    console.error('[AUTH] ⚠️ Note on admin user check:', error.message);
  }
};

const ensureDefaultCategoriesAndProducts = async () => {
  try {
    const defaultCats = [
      {
        name: 'Bearings',
        slug: 'bearings',
        headline: 'Industrial Bearings, Mechanical Seals & Pillow Block Units in Saudi Arabia',
        description: 'Orient Energy Trading Company supplies high-precision industrial bearings, ball bearings, spherical roller bearings, and pillow blocks across Saudi Arabia.',
        detailedDescriptions: [
          'Orient Energy Trading Company supplies high-precision industrial ball and roller bearings across Saudi Arabia for oil & gas refineries, petrochemical plants, power utilities, marine installations, and heavy manufacturing.',
        ],
        image: '/categories/bearings.jpg',
        productRangeTitle: 'Product Range',
        productRange: [
          'Deep Groove Ball Bearings & Angular Contact Bearings',
          'Spherical & Tapered Roller Bearings',
          'Pillow Block & Flange Mounted Bearing Units',
          'Thrust Ball Bearings & Needle Roller Bearings',
          'High-Temperature & High-Speed Bearing Grease',
          'Mechanical Seals, Gaskets & Shaft O-Rings',
        ],
        applicationsTitle: 'Applications',
        applications: [
          'Refinery Pumps & Process Turbines',
          'Mining, Quarry & Aggregate Equipment',
          'Automotive & Industrial Fleet Machinery',
          'Manufacturing & Production Conveyor Systems',
          'Power Plants & Compressor Stations',
          'Offshore Drilling Rigs & Marine Deck Winches',
        ],
        order: 14,
        featured: true,
      },
      {
        name: 'Filters',
        slug: 'filters',
        headline: 'Industrial Hydraulic, Oil, Fuel & Air Filtration Systems in Saudi Arabia',
        description: 'Orient Energy Trading Company supplies high-efficiency industrial filters, hydraulic oil filters, heavy machinery fuel and air filters, suction strainers, and replacement cartridge elements across Saudi Arabia.',
        detailedDescriptions: [
          'Our filtration division provides high-efficiency hydraulic oil filters, heavy machinery fuel and air filters, suction strainers, and replacement cartridge elements to guarantee peak equipment uptime.',
        ],
        image: '/categories/filters.jpg',
        productRangeTitle: 'Product Range',
        productRange: [
          'Hydraulic Oil & Lube Return Line Filter Elements',
          'Heavy Duty Air & Fuel Filtration Systems',
          'Industrial Duplex & Simplex Basket Strainers',
          'High-Pressure Hydraulic Filters',
          'Suction Strainers & Breather Caps',
          'Replacement Cartridge Elements',
        ],
        applicationsTitle: 'Applications',
        applications: [
          'Heavy Earth-Moving & Construction Equipment',
          'Oil & Gas Hydraulic Power Units (HPUs)',
          'Diesel Generator Sets & Engines',
          'Industrial Manufacturing Lubrication Systems',
          'Marine Propulsion & Deck Machinery',
        ],
        order: 15,
        featured: true,
      },
    ];

    for (const cat of defaultCats) {
      const exists = await Category.findOne({ slug: cat.slug });
      if (!exists) {
        await Category.create(cat);
        console.log(`[CATEGORIES] 🏷️ Auto-seeded missing category: ${cat.name} (${cat.slug})`);
      }
    }

    const defaultProducts = [
      {
        title: 'Deep Groove Ball Bearing 6200 Series',
        slug: 'deep-groove-ball-bearing-6200-series',
        divisionSlug: 'bearings',
        categoryName: 'Ball Bearings',
        image: '/categories/bearings.jpg',
        images: ['/categories/bearings.jpg'],
        shortDescription: 'High-speed precision deep groove radial ball bearing with low friction torque for industrial machinery.',
        fullDescription: 'Orient Energy supplies high-precision single row deep groove ball bearings engineered for high radial and axial loads at extreme rotational speeds. Sourced from world-leading manufacturers including SKF, FAG, NSK, and TIMKEN, these bearings feature vacuum-degassed chrome steel (GCr15), optimized raceway geometry, and quiet C3 internal clearance.',
        features: [
          'High Precision Chrome Steel (GCr15) Construction',
          'Double Rubber Seals (2RS) or Metal Shields (ZZ)',
          'Low Friction Torque and Quiet C3 Internal Clearance',
          'Wide Operating Temperature: -30°C to +120°C',
          'Pre-Lubricated with High-Performance Synthetic Grease',
        ],
        specifications: [
          { label: 'Bore Diameter', value: '10 mm - 160 mm standard ISO series' },
          { label: 'Dynamic Load Rating', value: 'Up to 198 kN' },
          { label: 'Operating Temperature', value: '-30°C to +120°C continuous' },
          { label: 'Cage Material', value: 'Pressed steel / Machined brass' },
          { label: 'Sealing Options', value: 'Open, 2RS Dual Rubber Seals, ZZ Metal Shields' },
        ],
        innerSections: [
          {
            title: 'Precision Radial Raceways and High Speed Capability',
            content: 'Engineered with uninterrupted deep raceway grooves that deliver superior dynamic load ratings and minimal rolling resistance. Essential for industrial electric motors, centrifugal process pumps, and heavy gearboxes operating across Saudi industrial facilities.',
            image: '/categories/bearings.jpg',
          },
        ],
        whatsappMessage: 'Hello Orient Energy, I am interested in inquiring about Deep Groove Ball Bearing 6200 Series.',
        inStock: true,
        isFeatured: true,
      },
      {
        title: 'Heavy Duty Pillow Block Bearing UCP Series',
        slug: 'heavy-duty-pillow-block-bearing-ucp-series',
        divisionSlug: 'bearings',
        categoryName: 'Pillow Blocks',
        image: '/categories/bearings.jpg',
        images: ['/categories/bearings.jpg'],
        shortDescription: 'Cast iron self-aligning pillow block mounted bearing unit with grease fitting for conveyor and drives.',
        fullDescription: 'Heavy-duty self-aligning pillow block bearing unit featuring an ASTM Class 30 gray cast iron housing (HT200) and a precision spherical chrome steel insert bearing. Features dual set screw shaft locking and a brass grease zerk fitting for convenient on-site relubrication in harsh quarry, mining, and manufacturing environments.',
        features: [
          'Heavy Cast Iron Rigid Housing (HT200)',
          'Self-Aligning Spherical Insert Bearing with Dual Set Screws',
          'Brass Grease Zerk Nipple for Easy Relubrication',
          'Dual Contact Rubber Flinger Dust Seals',
          'High Shock and Vibration Resistance',
        ],
        specifications: [
          { label: 'Shaft Diameter', value: '20 mm to 90 mm (Metric) / 3/4" to 3-1/2" (Inch)' },
          { label: 'Housing Material', value: 'Cast Iron HT200 with anti-rust gray primer' },
          { label: 'Locking Mechanism', value: 'Dual set screws at 120 offset' },
          { label: 'Grease Fitting', value: 'Standard 1/4"-28 UNF brass zerk nipple' },
        ],
        innerSections: [
          {
            title: 'Self-Aligning Mounting and Flinger Dust Protection',
            content: 'Accommodates up to ±2 degrees of initial mounting angular misalignment without binding. Heavy-duty cast iron foot pads absorb shock loads from belt-driven conveyors, aggregate sorting screens, and plant overhaul machinery.',
            image: '/categories/bearings.jpg',
          },
        ],
        whatsappMessage: 'Hello Orient Energy, I am interested in inquiring about Heavy Duty Pillow Block Bearing UCP Series.',
        inStock: true,
        isFeatured: true,
      },
      {
        title: 'High-Pressure Hydraulic Return Line Filter Element',
        slug: 'high-pressure-hydraulic-return-line-filter-element',
        divisionSlug: 'filters',
        categoryName: 'Hydraulic Filters',
        image: '/categories/filters.jpg',
        images: ['/categories/filters.jpg'],
        shortDescription: 'Microglass fiber hydraulic filter element for high-pressure fluid cleanliness in industrial systems.',
        fullDescription: 'High dirt-holding capacity inorganic microglass filter cartridge engineered to capture particulate contamination down to 3, 5, 10, or 25 microns absolute. Extensively multi-pass tested per ISO 16889 to protect proportional servo valves and hydrostatic pumps from abrasive wear.',
        features: [
          'Multi-Layer Inorganic Microglass Depth Media',
          'Beta Ratio Beta >= 1000 per ISO 16889 Multi-Pass Testing',
          'Collapse Pressure Rating up to 210 Bar',
          'Compatible with Petroleum Oils, Water Glycols and Synthetic Fluids',
          'Zinc-Plated Steel End Caps with Buna-N O-Ring Seals',
        ],
        specifications: [
          { label: 'Micron Rating', value: '3, 5, 10, or 25 micron absolute' },
          { label: 'Beta Ratio', value: 'Beta >= 1000 per ISO 16889' },
          { label: 'Collapse Pressure Rating', value: 'Up to 210 Bar' },
          { label: 'Flow Direction', value: 'Outside-to-inside radial flow' },
        ],
        innerSections: [
          {
            title: 'Contamination Control for Severe Hydraulic Power Units',
            content: 'Provides maximum fluid cleanliness in high-pressure oil & gas HPUs, offshore drilling rig iron roughnecks, and plastic injection molding machinery, preventing expensive downtime.',
            image: '/categories/filters.jpg',
          },
        ],
        whatsappMessage: 'Hello Orient Energy, I am interested in inquiring about High-Pressure Hydraulic Return Line Filter Element.',
        inStock: true,
        isFeatured: true,
      },
      {
        title: 'Heavy Industrial Machinery Air & Fuel Filter Assembly',
        slug: 'heavy-industrial-machinery-air-fuel-filter-assembly',
        divisionSlug: 'filters',
        categoryName: 'Air & Fuel Filters',
        image: '/categories/filters.jpg',
        images: ['/categories/filters.jpg'],
        shortDescription: 'Dual-stage intake air and diesel fuel water separator assembly for heavy industrial engines.',
        fullDescription: 'Heavy-duty filtration assembly designed for diesel generator sets, heavy earth-moving equipment, and marine propulsion engines. Combines radial seal air filtration with high-efficiency water-separating diesel fuel filtration to ensure clean combustion in dusty desert operations.',
        features: [
          'Radial Seal Polyurethane Air End Caps',
          'Hydrophobic Water Separating Cellulose Media (>= 98% Water Stripping)',
          'High Particle Separation Efficiency >= 99.9%',
          'Corrosion-Resistant Coated Steel Housing with Self-Venting Drain',
          'Spin-On Design for Fast Maintenance Turnarounds',
        ],
        specifications: [
          { label: 'Air Flow Capacity', value: 'Up to 1200 CFM' },
          { label: 'Water Separation Efficiency', value: '>= 98% per SAE J1488' },
          { label: 'Operating Temperature', value: '-40C to +110C' },
          { label: 'Bowl Material', value: 'Clear impact-resistant polycarbonate with drain valve' },
        ],
        innerSections: [
          {
            title: 'Desert Dust and Moisture Protection for Heavy Engines',
            content: 'Specially engineered for extreme Middle East operating conditions where fine silica sand and fuel storage condensation threaten diesel fuel injectors and cylinder liners.',
            image: '/categories/filters.jpg',
          },
        ],
        whatsappMessage: 'Hello Orient Energy, I am interested in inquiring about Heavy Industrial Machinery Air & Fuel Filter Assembly.',
        inStock: true,
        isFeatured: true,
      },
    ];

    for (const prod of defaultProducts) {
      const exists = await Product.findOne({ slug: prod.slug });
      if (!exists) {
        const cat = await Category.findOne({ slug: prod.divisionSlug });
        await Product.create({
          ...prod,
          category: cat ? cat._id : undefined,
        });
        console.log(`[PRODUCTS] 📦 Auto-seeded missing product: ${prod.title} (${prod.slug})`);
      }
    }
  } catch (error: any) {
    console.error('[CATEGORIES/PRODUCTS] ⚠️ Auto-seed note:', error.message);
  }
};

// Start listening immediately
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB()
    .then(async () => {
      await ensureAdminUser();
      await ensureDefaultCategoriesAndProducts();
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
});

export default app;
