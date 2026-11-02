"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Brand_1 = require("../models/Brand");
const BEARINGS_BRANDS = [
    {
        name: 'SKF',
        category: 'bearings',
        filename: 'skf-logo.svg',
        websiteUrl: 'https://www.skf.com',
        description: 'World leader in rolling bearings, seals, mechatronics, and lubrication systems.',
        order: 1,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <path d="M35 15 L205 15 L195 65 L25 65 Z" fill="#005a9c"/>
      <text x="115" y="52" fill="#ffffff" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="34" letter-spacing="4" text-anchor="middle" font-style="italic">SKF</text>
    </svg>`
    },
    {
        name: 'FAG (Schaeffler)',
        category: 'bearings',
        filename: 'fag-logo.svg',
        websiteUrl: 'https://www.schaeffler.com',
        description: 'Precision ball and roller bearings for heavy industry, automotive, and aerospace.',
        order: 2,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="25" y="16" width="190" height="48" rx="6" fill="#e30613"/>
      <text x="120" y="51" fill="#ffffff" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="32" letter-spacing="3" text-anchor="middle">FAG</text>
    </svg>`
    },
    {
        name: 'NSK',
        category: 'bearings',
        filename: 'nsk-logo.svg',
        websiteUrl: 'https://www.nsk.com',
        description: 'High-precision motion & control industrial ball bearings and linear guides.',
        order: 3,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="120" y="54" fill="#e60012" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="44" letter-spacing="5" text-anchor="middle">NSK</text>
      <text x="120" y="70" fill="#4b5563" font-family="'Montserrat', sans-serif" font-weight="600" font-size="9" letter-spacing="2" text-anchor="middle">MOTION &amp; CONTROL</text>
    </svg>`
    },
    {
        name: 'TIMKEN',
        category: 'bearings',
        filename: 'timken-logo.svg',
        websiteUrl: 'https://www.timken.com',
        description: 'Engineered tapered roller bearings, alloy steels, and power transmission components.',
        order: 4,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="20" y="18" width="200" height="44" fill="#f37021"/>
      <text x="120" y="50" fill="#ffffff" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="28" letter-spacing="3" text-anchor="middle">TIMKEN</text>
    </svg>`
    },
    {
        name: 'NTN Bearings',
        category: 'bearings',
        filename: 'ntn-logo.svg',
        websiteUrl: 'https://www.ntnglobal.com',
        description: 'Global manufacturing of precision bearings, constant velocity joints, and precision equipment.',
        order: 5,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="120" y="55" fill="#004b97" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="42" letter-spacing="4" text-anchor="middle">NTN</text>
    </svg>`
    },
    {
        name: 'KOYO (JTEKT)',
        category: 'bearings',
        filename: 'koyo-logo.svg',
        websiteUrl: 'https://koyo.jtekt.co.jp/en/',
        description: 'Heavy machinery, automotive, and high-performance industrial bearings.',
        order: 6,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="120" y="52" fill="#c41230" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="36" letter-spacing="3" text-anchor="middle">Koyo</text>
    </svg>`
    },
    {
        name: 'NACHI',
        category: 'bearings',
        filename: 'nachi-logo.svg',
        websiteUrl: 'https://www.nachi-fujikoshi.co.jp/eng/',
        description: 'High-speed deep groove ball bearings and spherical roller bearings.',
        order: 7,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="120" y="54" fill="#d9251d" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="34" letter-spacing="4" text-anchor="middle">NACHI</text>
    </svg>`
    },
    {
        name: 'INA',
        category: 'bearings',
        filename: 'ina-logo.svg',
        websiteUrl: 'https://www.schaeffler.com',
        description: 'Needle roller bearings, linear guidance systems, and engine components.',
        order: 8,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="35" y="18" width="170" height="44" rx="4" fill="#00805a"/>
      <text x="120" y="50" fill="#ffffff" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="32" letter-spacing="6" text-anchor="middle">INA</text>
    </svg>`
    }
];
const FILTERING_BRANDS = [
    {
        name: 'Donaldson Filtration Solutions',
        category: 'filterings',
        filename: 'donaldson-logo.svg',
        websiteUrl: 'https://www.donaldson.com',
        description: 'Global leader in engine and industrial filtration systems for heavy equipment and oil & gas.',
        order: 1,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <circle cx="45" cy="40" r="18" fill="#005596"/>
      <path d="M45 27 L45 53 M32 40 L58 40" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <text x="145" y="45" fill="#005596" font-family="'Montserrat', sans-serif" font-weight="800" font-size="22" letter-spacing="1" text-anchor="middle">Donaldson.</text>
      <text x="145" y="60" fill="#64748b" font-family="'Montserrat', sans-serif" font-weight="600" font-size="8" letter-spacing="2" text-anchor="middle">FILTRATION SOLUTIONS</text>
    </svg>`
    },
    {
        name: 'Parker Filtration',
        category: 'filterings',
        filename: 'parker-filtration-logo.svg',
        websiteUrl: 'https://www.parker.com',
        description: 'Advanced hydraulic, fuel, lubrication, and process filtration solutions.',
        order: 2,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="25" y="16" width="190" height="48" fill="#000000"/>
      <polygon points="25,16 65,16 50,64 25,64" fill="#ffb81c"/>
      <text x="135" y="44" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="900" font-size="22" letter-spacing="2" text-anchor="middle">Parker</text>
      <text x="135" y="58" fill="#ffb81c" font-family="'Montserrat', sans-serif" font-weight="700" font-size="8" letter-spacing="3" text-anchor="middle">FILTRATION</text>
    </svg>`
    },
    {
        name: 'Fleetguard',
        category: 'filterings',
        filename: 'fleetguard-logo.svg',
        websiteUrl: 'https://www.cumminsfiltration.com',
        description: 'Heavy-duty Cummins filtration for lube, fuel, air, and coolant systems.',
        order: 3,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <path d="M30 40 Q45 20 60 40 T90 40" stroke="#d52b1e" stroke-width="5" fill="none"/>
      <text x="135" y="47" fill="#1e293b" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="22" letter-spacing="1" text-anchor="middle">Fleetguard</text>
      <text x="135" y="62" fill="#d52b1e" font-family="'Montserrat', sans-serif" font-weight="700" font-size="8" letter-spacing="1.5" text-anchor="middle">CUMMINS FILTRATION</text>
    </svg>`
    },
    {
        name: 'MANN-FILTER',
        category: 'filterings',
        filename: 'mann-filter-logo.svg',
        websiteUrl: 'https://www.mann-filter.com',
        description: 'Premium OEM and aftermarket oil, air, and hydraulic filters from Mann+Hummel.',
        order: 4,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="25" y="16" width="190" height="48" rx="8" fill="#ffed00"/>
      <text x="120" y="42" fill="#00802f" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="18" letter-spacing="1" text-anchor="middle">MANN</text>
      <text x="120" y="58" fill="#00802f" font-family="'Montserrat', sans-serif" font-weight="800" font-size="13" letter-spacing="3" text-anchor="middle">FILTER</text>
    </svg>`
    },
    {
        name: 'Baldwin Filters',
        category: 'filterings',
        filename: 'baldwin-logo.svg',
        websiteUrl: 'https://www.baldwinfilter.com',
        description: 'Heavy-duty protection filters for construction, mining, agriculture, and power generation.',
        order: 5,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <circle cx="45" cy="40" r="18" fill="#dc2626"/>
      <text x="45" y="47" fill="#ffffff" font-family="'Arial Black', sans-serif" font-weight="900" font-size="20" text-anchor="middle">B</text>
      <text x="135" y="44" fill="#0f172a" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="20" letter-spacing="1" text-anchor="middle">BALDWIN</text>
      <text x="135" y="58" fill="#dc2626" font-family="'Montserrat', sans-serif" font-weight="700" font-size="8" letter-spacing="2.5" text-anchor="middle">FILTERS</text>
    </svg>`
    },
    {
        name: 'Pall Corporation',
        category: 'filterings',
        filename: 'pall-logo.svg',
        websiteUrl: 'https://www.pall.com',
        description: 'High-technology filtration, separation, and purification solutions.',
        order: 6,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <circle cx="45" cy="40" r="18" fill="#004c97"/>
      <path d="M38 33 Q45 47 52 33" stroke="#ffffff" stroke-width="3" fill="none"/>
      <text x="135" y="48" fill="#004c97" font-family="'Montserrat', sans-serif" font-weight="900" font-size="28" letter-spacing="2" text-anchor="middle">PALL</text>
    </svg>`
    },
    {
        name: 'HYDAC',
        category: 'filterings',
        filename: 'hydac-logo.svg',
        websiteUrl: 'https://www.hydac.com',
        description: 'Hydraulic filtration systems, fluid conditioning, and contamination monitoring.',
        order: 7,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="25" y="16" width="190" height="48" rx="4" fill="#e3001b"/>
      <text x="120" y="51" fill="#ffffff" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="28" letter-spacing="4" text-anchor="middle">HYDAC</text>
    </svg>`
    },
    {
        name: 'MAHLE Industry',
        category: 'filterings',
        filename: 'mahle-logo.svg',
        websiteUrl: 'https://www.mahle.com',
        description: 'Industrial filtration for process fluids, hydraulic power, and dust collection.',
        order: 8,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="120" y="46" fill="#002b66" font-family="'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="26" letter-spacing="2" text-anchor="middle">MAHLE</text>
      <text x="120" y="62" fill="#64748b" font-family="'Montserrat', sans-serif" font-weight="700" font-size="8" letter-spacing="3" text-anchor="middle">INDUSTRIAL FILTRATION</text>
    </svg>`
    }
];
async function seed() {
    const frontendDir = path_1.default.resolve(__dirname, '../../../frontend/public/brands');
    const adminDir = path_1.default.resolve(__dirname, '../../../admin/public/brands');
    fs_1.default.mkdirSync(frontendDir, { recursive: true });
    fs_1.default.mkdirSync(adminDir, { recursive: true });
    const allItems = [...BEARINGS_BRANDS, ...FILTERING_BRANDS];
    for (const item of allItems) {
        const fPath = path_1.default.join(frontendDir, item.filename);
        const aPath = path_1.default.join(adminDir, item.filename);
        fs_1.default.writeFileSync(fPath, item.svg, 'utf-8');
        fs_1.default.writeFileSync(aPath, item.svg, 'utf-8');
        console.log(`Saved logo: /brands/${item.filename}`);
    }
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://helloidealenergy_db_user:WqX3zvfB2vUB1tuA@cluster0.bw7i70r.mongodb.net/orient_energy?retryWrites=true&w=majority';
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB Atlas');
    for (const item of allItems) {
        await Brand_1.Brand.findOneAndUpdate({ name: item.name }, {
            name: item.name,
            category: item.category,
            logo: `/brands/${item.filename}`,
            websiteUrl: item.websiteUrl,
            description: item.description,
            order: item.order,
            isActive: true,
        }, { upsert: true, new: true });
        console.log(`Upserted Brand: ${item.name} (${item.category})`);
    }
    console.log('Successfully seeded all Bearings and Filterings brand logos!');
    await mongoose_1.default.disconnect();
}
seed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});
