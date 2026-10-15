import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Service } from '../models/Service';
import { AdminUser } from '../models/AdminUser';
import { CompanySetting } from '../models/CompanySetting';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orient_energy';

const categories = [
  { name: 'Tools & Maintenance', slug: 'tools-maintenance', description: 'Professional tools and maintenance equipment for industrial operations.', icon: 'wrench', featured: true, order: 1 },
  { name: 'Auxiliary Systems', slug: 'auxiliary-systems', description: 'Auxiliary systems for industrial and power infrastructure.', icon: 'settings', featured: false, order: 2 },
  { name: 'Coatings & Surface Protection', slug: 'coatings-surface-protection', description: 'Industrial coatings and surface protection solutions.', icon: 'shield', featured: true, order: 3 },
  { name: 'Electrical Division', slug: 'electrical-ups-systems', description: 'Electrical systems, UPS, and power distribution equipment.', icon: 'zap', featured: true, order: 4 },
  { name: 'Fasteners Division', slug: 'fasteners', description: 'High-grade fasteners and fixing solutions for industrial use.', icon: 'anchor', featured: false, order: 5 },
  { name: 'Fittings', slug: 'all-fittings', description: 'Pipe fittings, camlock, and fluid connection products.', icon: 'link', featured: false, order: 6 },
  { name: 'Industrial Consumables & PPE', slug: 'industrial-consumables', description: 'Safety consumables, PPE, and workplace essentials.', icon: 'hard-hat', featured: true, order: 7 },
  { name: 'Industrial Hoses & Couplings', slug: 'industrial-hoses-hose-couplings', description: 'Heavy-duty hoses and coupling systems.', icon: 'circle', featured: false, order: 8 },
  { name: 'Lifting & Material Handling', slug: 'lifting-material-handling', description: 'Hoists, cranes, slings, and lifting equipment.', icon: 'arrow-up', featured: false, order: 9 },
  { name: 'Lubricants & Chemicals', slug: 'lubricants-chemicals', description: 'Industrial lubricants, oils, and specialty chemicals.', icon: 'droplets', featured: false, order: 10 },
  { name: 'Marine Division', slug: 'marine-division', description: 'Marine-grade components and offshore-rated equipment.', icon: 'anchor', featured: true, order: 11 },
  { name: 'Mechanical Supply Division', slug: 'mechanical-supply-division', description: 'Bearings, seals, valves, and mechanical components.', icon: 'cog', featured: false, order: 12 },
  { name: 'Power System', slug: 'power-system', description: 'Generators, gas engines, and electrical transmission systems.', icon: 'battery', featured: true, order: 13 },
  { name: 'PPE & Safety Equipment', slug: 'ppe-safety-equpments', description: 'Personal protective equipment and safety gear.', icon: 'shield-check', featured: false, order: 14 },
  { name: 'Pumps & Motors', slug: 'pumps-motors', description: 'Industrial pumps, motors, and fluid handling systems.', icon: 'activity', featured: true, order: 15 },
  { name: 'Steel & Structural Materials', slug: 'steel-structural-materials-division', description: 'Structural steel, plates, and fabrication materials.', icon: 'layers', featured: false, order: 16 },
  { name: 'Substructure', slug: 'substructure', description: 'Foundation materials and substructure components for drilling rigs.', icon: 'box', featured: false, order: 17 },
  { name: 'Welding Division', slug: 'welding-safety', description: 'Welding equipment, consumables, and safety products.', icon: 'flame', featured: false, order: 18 }
];

const services = [
  { title: 'Industrial Supply Solutions', slug: 'industrial-supply-solutions', shortDescription: 'Complete industrial supply chain management for MRO and operational needs.', icon: 'package', features: ['Single-vendor supply convenience', 'Global sourcing network', 'Custom kitting and packaging'], order: 1 },
  { title: 'Engineering & Technical Support', slug: 'engineering-technical-support', shortDescription: 'On-site and remote technical support from qualified engineers.', icon: 'hard-hat', features: ['Dedicated engineering team', 'Site inspections and assessments', 'Technical documentation'], order: 2 },
  { title: 'Global Procurement Network', slug: 'global-procurement-network', shortDescription: 'Access to over 500+ global manufacturers for OEM and aftermarket parts.', icon: 'globe', features: ['OEM direct sourcing', 'Expedited procurement', 'Quality certification handling'], order: 3 },
  { title: 'Project & Shutdown Support', slug: 'project-shutdown-support', shortDescription: 'Turnkey supply and logistics for plant shutdowns and major projects.', icon: 'calendar', features: ['Shutdown planning assistance', 'Critical spares management', 'On-site inventory management'], order: 4 },
  { title: 'Custom Fabrication & Metal Works', slug: 'custom-fabrication-metal-works', shortDescription: 'Bespoke fabrication services for industrial components and assemblies.', icon: 'settings', features: ['CNC machining', 'Structural steel fabrication', 'Pipe spooling and assemblies'], order: 5 },
  { title: 'Compliance & Quality Assurance', slug: 'compliance-quality-assurance', shortDescription: 'Ensuring all products meet SASO, ARAMCO, and international standards.', icon: 'check-circle', features: ['Third-party inspection coordination', 'Material traceability', 'Mill test report management'], order: 6 }
];

async function runSeed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Category.deleteMany({}),
      Product.deleteMany({}),
      Service.deleteMany({}),
      AdminUser.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed Categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Seeded ${createdCategories.length} categories`);

    // Seed sample Products
    const powerCat = createdCategories.find(c => c.slug === 'power-system');
    const fittingCat = createdCategories.find(c => c.slug === 'all-fittings');
    const pumpCat = createdCategories.find(c => c.slug === 'pumps-motors');

    const sampleProducts = [
      {
        title: 'Aluminium Camlock Type A',
        slug: 'aluminium-camlock-type-a',
        sku: 'OETC-CAM-001',
        category: fittingCat!._id,
        categoryName: fittingCat!.name,
        shortDescription: 'High-pressure aluminium camlock coupling Type A for industrial fluid transfer.',
        fullDescription: 'Manufactured from die-cast aluminium alloy, our Type A camlock couplings deliver superior corrosion resistance and pressure performance. Suitable for petroleum, chemicals, water, and agricultural applications.',
        specifications: [
          { label: 'Material', value: 'Aluminium Alloy' },
          { label: 'Standard', value: 'MIL-C-27487' },
          { label: 'Pressure Rating', value: 'Up to 250 PSI' },
          { label: 'Temperature Range', value: '-20°C to +120°C' }
        ],
        features: ['Quick connect/disconnect', 'Leakproof sealing', 'Multiple size options 1" to 8"'],
        images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
        isFeatured: true,
        inStock: true
      },
      {
        title: 'Aluminium Camlock Type B',
        slug: 'aluminium-camlock-type-b',
        sku: 'OETC-CAM-002',
        category: fittingCat!._id,
        categoryName: fittingCat!.name,
        shortDescription: 'Type B camlock male adapter — male camlock × female thread.',
        fullDescription: 'Orient Energy Type B camlock male adapters offer secure, vibration-resistant connections for heavy-duty fluid transfer in oil & gas, marine, and agriculture industries.',
        specifications: [
          { label: 'Material', value: 'Aluminium Alloy' },
          { label: 'Thread Type', value: 'BSP / NPT (specify)' },
          { label: 'Operating Pressure', value: 'Up to 250 PSI' }
        ],
        features: ['Interchangeable with standard camlocks', 'Positive locking arms', 'Polished finish'],
        images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
        isFeatured: true,
        inStock: true
      },
      {
        title: 'Industrial Generators',
        slug: 'generators',
        sku: 'OETC-GEN-001',
        category: powerCat!._id,
        categoryName: powerCat!.name,
        shortDescription: 'Diesel and gas-powered generators for critical industrial and offshore applications.',
        fullDescription: 'Orient Energy supplies prime and standby generators from globally certified brands, ranging from 50 kVA to 3,000 kVA. Ideal for oil fields, construction sites, factories, and infrastructure projects.',
        specifications: [
          { label: 'Power Range', value: '50 kVA — 3,000 kVA' },
          { label: 'Fuel Type', value: 'Diesel / Natural Gas' },
          { label: 'Certification', value: 'ISO 8528, CE Marked' },
          { label: 'Voltage', value: '380V / 415V / Custom' }
        ],
        features: ['Automatic voltage regulation (AVR)', 'Auto-start capability', 'Deep Sea or ComAp controller'],
        images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'],
        isFeatured: true,
        inStock: true
      },
      {
        title: 'Centrifugal Pumps',
        slug: 'centrifugal-pumps',
        sku: 'OETC-PMP-001',
        category: pumpCat!._id,
        categoryName: pumpCat!.name,
        shortDescription: 'API 610 compliant centrifugal pumps for oil & gas and petrochemical processes.',
        fullDescription: 'We supply a comprehensive range of end-suction, split-case, and multistage centrifugal pumps for demanding industrial environments. All pumps meet API 610 / ISO 5199 standards for critical applications.',
        specifications: [
          { label: 'Standard', value: 'API 610 / ISO 5199' },
          { label: 'Capacity', value: 'Up to 5000 m³/hr' },
          { label: 'Head', value: 'Up to 600 m' },
          { label: 'Temperature', value: 'Up to +350°C' }
        ],
        features: ['Various impeller configurations', 'Mechanical seal options', 'ATEX-rated available'],
        images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'],
        isFeatured: false,
        inStock: true
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${sampleProducts.length} sample products`);

    // Seed Services
    await Service.insertMany(services.map(s => ({ ...s, isActive: true })));
    console.log(`✅ Seeded ${services.length} services`);

    // Seed Admin User
    const hashedPwd = await bcrypt.hash('Admin@Orient2026', 12);
    await AdminUser.create({ name: 'Orient Admin', email: 'admin@orientenergyco.com', password: hashedPwd, role: 'admin' });
    console.log('✅ Admin user created: admin@orientenergyco.com / Admin@Orient2026');

    // Seed Company Settings
    await CompanySetting.deleteMany({});
    await CompanySetting.create({
      companyName: 'Orient Energy',
      tagline: 'Industrial Supply & Engineering Solutions in Saudi Arabia',
      aboutShort: 'Reliable industrial supply and engineering solutions in Saudi Arabia for oil & gas, energy, marine, drilling, and infrastructure projects.',
      aboutFull: 'Orient Energy is a premier industrial solutions partner in the Kingdom of Saudi Arabia. We provide world-class industrial equipment, engineering procurement, and comprehensive field support to the oil & gas, petrochemical, marine, heavy infrastructure, and energy sectors across the Kingdom.',
      phone: '+966 13 888 0000',
      email: 'info@orientenergyco.com',
      address: 'King Fahd Road, Al Khobar / Dammam, Kingdom of Saudi Arabia',
      locations: ['Al Khobar', 'Dammam', 'Riyadh'],
      workingHours: 'Sun – Thu: 8:00 AM – 5:30 PM',
      socials: { instagram: 'https://www.instagram.com/orientenergyco/', linkedin: 'https://linkedin.com', twitter: '', facebook: '' },
      stats: { experienceYears: 15, productsDelivered: 12500, activeClients: 450, satisfactionRate: 99 }
    });
    console.log('✅ Company settings seeded');

    console.log('\n🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

runSeed();
