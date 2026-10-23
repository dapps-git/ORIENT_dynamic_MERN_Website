'use client';

import { useState, useEffect, useMemo } from 'react';

// Interfaces
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  division: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
}

interface Product {
  id: string;
  title: string;
  slug?: string;
  division: string;
  divisionSlug?: string;
  category?: string;
  image: string;
  images?: string[];
  shortDescription?: string;
  fullDescription?: string;
  features?: string[];
  whatsappMessage?: string;
  inStock: boolean;
  featured: boolean;
}

interface Division {
  id: string;
  name: string;
  slug: string;
  headline?: string;
  description?: string;
  detailedDescriptions?: string[];
  image?: string;
  subcategoriesTitle?: string;
  subcategories?: { name: string; image: string }[];
  productRangeTitle?: string;
  productRange?: string[];
  applicationsTitle?: string;
  applications?: string[];
  pills?: string[];
  productCount?: number;
}

interface FleetPoint {
  label: string;
  text: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
  introduction: string;
  fleetTitle?: string;
  fleetPoints?: FleetPoint[];
  whyChoosePoints?: string[];
  conclusion: string;
  isPublished: boolean;
}

const DEFAULT_ADMIN_EMAIL = 'orient@adminpanel.com';
const DEFAULT_ADMIN_PASS = 'orient@admin#1234';

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-1001',
    name: 'Fahad Al-Otaibi',
    email: 'fahad@aramco-contractor.sa',
    phone: '+966551234567',
    company: 'Al-Khobar EPC Consortium',
    division: 'Mechanical Supply Division',
    message: 'Need urgent quote for 150 pcs of Butterfly Valve Lever Handle SS Disc 6" and carbon steel seamless pipes.',
    date: '2026-10-16 14:20',
    status: 'new',
  },
  {
    id: 'INQ-1002',
    name: 'Tariq Mansoor',
    email: 'tmansoor@redsea-marine.com',
    phone: '+966509876543',
    company: 'Red Sea Marine Logistics',
    division: 'Marine Division',
    message: 'Requesting catalog and pricing for Lifejackets (foam/inflatable) and corded industrial ear-plugs for offshore crew.',
    date: '2026-10-16 11:45',
    status: 'contacted',
  },
  {
    id: 'INQ-1003',
    name: 'Sultan Al-Ghamdi',
    email: 'sultan@jubailfabrication.com',
    phone: '+966567890123',
    company: 'Jubail Industrial Fabrication',
    division: 'Welding Division',
    message: 'Need 12 units of Victor Contender EDGE 2.0 and 20 units of 280PL Series Welding Helmets.',
    date: '2026-10-15 16:30',
    status: 'quoted',
  },
  {
    id: 'INQ-1004',
    name: 'Ahmed Bin Salem',
    email: 'ahmed@riyadh-power.sa',
    phone: '+966543210987',
    company: 'Riyadh Energy Infrastructure',
    division: 'Electrical Division',
    message: 'BOM tender pricing required for Acti9 MCB circuit breakers and Schneider TeSys Giga 185A Contactors.',
    date: '2026-10-15 09:15',
    status: 'new',
  },
];

const INITIAL_PRODUCTS: Product[] = [
  // 13 Mechanical Division Products
  {
    id: 'mech-1',
    title: 'Breathing Hoses',
    slug: 'breathing-hoses',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Hoses, Hammer Unions & Rig Supplies',
    image: '/products/mechanical/breathing-hoses.png',
    images: ['/products/mechanical/breathing-hoses.png'],
    shortDescription: 'Industrial low-pressure and high-pressure breathing air hoses for critical offshore and plant environments.',
    fullDescription: 'High quality industrial breathing hoses designed for offshore, marine, and refinery operations. Meets international industrial safety standards with complete testing and certification.',
    features: ['Low Pressure & High Pressure Hoses', 'Quick Release Couplers', 'Manifolds', 'CGA Connectors', 'Isolation Valves'],
    inStock: true,
    featured: true,
  },
  {
    id: 'mech-2',
    title: 'Butterfly Valve',
    slug: 'butterfly-valve',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve.png',
    images: ['/products/mechanical/butterfly-valve.png'],
    shortDescription: 'Wafer and lug type resilient seated butterfly valve for bubble-tight bidirectional shut-off.',
    fullDescription: 'Heavy-duty industrial butterfly valves engineered for chemical, petrochemical, and water processing pipelines with API 609 compliant design.',
    features: ['Wafer and Lug Type Body Styles', 'API 609 / ASME B16.34 Compliant Design', 'Resilient Seated & High Performance Disc', 'Manual Lever, Gear Operator & Actuator Ready', 'Bubble-Tight Bidirectional Shut-Off'],
    inStock: true,
    featured: true,
  },
  {
    id: 'mech-3',
    title: 'Butterfly Valve Lever Handle SS Disc 3',
    slug: 'butterfly-valve-lever-handle-ss-disc-3',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png'],
    shortDescription: '3-Inch nominal bore with SS316 investment cast disc and 10-position locking lever.',
    fullDescription: '3-Inch butterfly valve with precision stainless steel disc, replaceable elastomer liner, and locking throttle handle.',
    features: ['3-Inch Nominal Bore Diameter', 'Stainless Steel 316 Investment Cast Disc', 'Ergonomic 10-Position Locking Lever Handle', 'EPDM / NBR Replaceable Liner', 'Working Pressure up to 16 Bar (232 PSI)'],
    inStock: true,
    featured: false,
  },
  {
    id: 'mech-4',
    title: 'Butterfly Valve Lever Handle SS Disc 4',
    slug: 'butterfly-valve-lever-handle-ss-disc-4',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png'],
    shortDescription: '4-Inch wafer pattern butterfly valve with polished stainless steel disc.',
    fullDescription: '4-Inch wafer body butterfly valve with pinless shaft design tested to API 598 pressure standards.',
    features: ['4-Inch Heavy-Duty Industrial Wafer Valve', 'Stainless Steel 316 Disc with Polished Edges', 'Rugged Lever Handle with Visual Position Indicator', 'Pinless Shaft Connection Preventing Leakage', 'Tested to API 598 Pressure Standards'],
    inStock: true,
    featured: false,
  },
  {
    id: 'mech-5',
    title: 'Butterfly Valve Lever Handle SS Disc 6',
    slug: 'butterfly-valve-lever-handle-ss-disc-6',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png'],
    shortDescription: '6-Inch heavy-duty process control valve with ductile iron body and epoxy coating.',
    fullDescription: '6-Inch industrial butterfly valve featuring high-performance ductile iron body, SS316 disc, and blowout-proof stem.',
    features: ['6-Inch Industrial Process Control Valve', 'Ductile Iron Body with Epoxy Powder Coating', 'Stainless Steel Disc for Aggressive Fluids', 'Blow-out Proof Stem with PTFE Bushings', 'Direct Mount ISO 5211 Actuator Flange'],
    inStock: true,
    featured: true,
  },
  {
    id: 'mech-6',
    title: 'Butterfly Valve Lever Handle SS Disc 8',
    slug: 'butterfly-valve-lever-handle-ss-disc-8',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png'],
    shortDescription: '8-Inch flanged wafer valve designed for high-capacity industrial cooling and hydrocarbon lines.',
    fullDescription: '8-Inch heavy industrial butterfly valve approved for major Saudi energy operators including Aramco & SABIC facilities.',
    features: ['8-Inch Flanged / Wafer Isolation Valve', 'Heavy Industrial Duty Gear or Lever Handle', 'Dual Shaft O-ring Stem Sealing', 'Suitable for Water, Glycol, Slurries & Hydrocarbons', 'Aramco & SABIC Plant Approved Specifications'],
    inStock: true,
    featured: false,
  },
  {
    id: 'mech-7',
    title: 'Hydraulic Hoses Fittings & Adaptors',
    slug: 'hydraulic-hoses-fittings-adaptors',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Hoses, Hammer Unions & Rig Supplies',
    image: '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
    images: ['/products/mechanical/hydraulic-hoses-fittings-adaptors.png'],
    shortDescription: 'High-pressure 1SN, 2SN, 4SP wire spiral hydraulic hoses with certified crimp fittings.',
    fullDescription: 'Comprehensive range of hydraulic hoses, BSP, JIC, and NPT crimp fittings and high-pressure quick disconnect swivels.',
    features: ['High Pressure Wire Braid & Spiral Hoses (1SN, 2SN, 4SP, 4SH)', 'BSP, JIC, NPT & ORFS Standard Crimp Fittings', 'Abrasion and Weather Resistant Outer Covers', 'Quick Disconnect Couplings & High-Pressure Swivels', 'Custom Crimping & Pressure Testing Certification'],
    inStock: true,
    featured: true,
  },
  {
    id: 'mech-8',
    title: 'Industrial & Large Bore Hoses',
    slug: 'industrial-large-bore-hoses',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Hoses, Hammer Unions & Rig Supplies',
    image: '/products/mechanical/industrial-large-bore-hoses.png',
    images: ['/products/mechanical/industrial-large-bore-hoses.png'],
    shortDescription: 'Large diameter composite, rubber & stainless steel hoses from 2" to 12" bore.',
    fullDescription: 'Heavy-duty industrial suction and discharge hoses for mud, oil, chemicals, and industrial fluids with camlock and hammer union ends.',
    features: ['Composite, Rubber & Stainless Steel Corrugated Hoses', 'Sizes from 2-Inch to 12-Inch Diameter', 'Built for Mud, Oil, Chemical & Water Suction/Discharge', 'Camlock, Hammer Union & Flanged End Terminations', 'Electrical Continuity Grounding Available'],
    inStock: true,
    featured: false,
  },
  {
    id: 'mech-9',
    title: 'Industrial Gasket and Seals',
    slug: 'industrial-gasket-and-seals',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Gaskets & Sealing Solutions',
    image: '/products/mechanical/industrial-gasket-and-seals.png',
    images: ['/products/mechanical/industrial-gasket-and-seals.png'],
    shortDescription: 'Spiral wound gaskets, Ring Type Joints (RTJ), and non-asbestos sheet seals.',
    fullDescription: 'Engineered sealing solutions conforming to ASME B16.20 and API 607 fire-safe standards for refineries and chemical plants.',
    features: ['Spiral Wound Gaskets (316SS with Graphite/PTFE Filler)', 'Ring Type Joint (RTJ) Gaskets for High Pressure Flanges', 'Non-Asbestos Fiber Sheet & Custom Cut Gaskets', 'EPDM, Viton, NBR & Silicone O-Rings and Mechanical Seals', 'Fire-Safe API 607 Compliant Sealing Solutions'],
    inStock: true,
    featured: true,
  },
  {
    id: 'mech-10',
    title: 'Isolation Valve, Ball Valve Steam High Temperature Ball Valve',
    slug: 'isolation-valve-ball-valve-steam-high-temperature-ball-valve',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png',
    images: ['/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png'],
    shortDescription: 'High-temperature forged steel 3-piece ball valve for steam service up to 450°C.',
    fullDescription: 'Industrial metal-to-metal and PEEK seated ball valves built for extreme temperature, high-pressure steam and hydrocarbons.',
    features: ['Forged Steel 3-Piece Bolted Body Construction', 'Metal-to-Metal & PEEK Seated for Steam Service', 'Operating Temperatures up to 450°C (842°F)', 'Full Bore Design Minimizing Pressure Drops', 'API 6D, Firesafe API 607 Tested & Certified'],
    inStock: true,
    featured: true,
  },
  {
    id: 'mech-11',
    title: 'Micro Linear Actuators',
    slug: 'micro-linear-actuators',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Actuators & Control Components',
    image: '/products/mechanical/micro-linear-actuators.png',
    images: ['/products/mechanical/micro-linear-actuators.png'],
    shortDescription: 'Precision electric linear actuators with IP66 protection and adjustable limit switches.',
    fullDescription: 'High-precision micro linear drive actuators for space-constrained industrial automation, damper controls, and valve positioning.',
    features: ['High Precision Electric Linear Stroke Drive', 'Compact Form Factor for Space-Constrained Industrial Automation', 'IP65 / IP66 Dust and Water Ingress Protection', 'Built-in Adjustable Limit Switches & Position Feedback', '12V / 24V DC Industrial Operating Voltage'],
    inStock: true,
    featured: false,
  },
  {
    id: 'mech-12',
    title: 'Carbon Steel Seamless & ERW Pipes',
    slug: 'carbon-steel-seamless-erw-pipes',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Pipes & Tubes',
    image: '/products/mechanical/carbon-steel-seamless-erw-pipes.png',
    images: ['/products/mechanical/carbon-steel-seamless-erw-pipes.png'],
    shortDescription: 'ASTM A106 Grade B & API 5L line pipes from 1/2" up to 36" diameter.',
    fullDescription: 'Certified seamless and electric resistance welded (ERW) carbon steel pipes with full hydrostatic and NDT testing.',
    features: ['ASTM A106 Grade B / API 5L Grade B & X-Grades', 'Schedules SCH 40, SCH 80, SCH 160 & XXS', 'Sizes ranging from 1/2" up to 36" Diameter', 'Beveled and Plain Ends with Protective Varnishing', 'Full Hydrostatic Testing and NDT Inspection Certified'],
    inStock: true,
    featured: true,
  },
  {
    id: 'mech-13',
    title: 'Black-Coated Steel Pipe Flanges Threaded',
    slug: 'black-coated-steel-pipe-flanges-threaded',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Flanges & Pipe Connections',
    image: '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png',
    images: ['/products/mechanical/black-coated-steel-pipe-flanges-threaded.png'],
    shortDescription: 'Threaded carbon steel pipe flanges Class 150/300/600 with black anti-corrosion coating.',
    fullDescription: 'High-strength forged carbon steel ASTM A105 threaded flanges for secure piping connections with complete MTR mill certification.',
    features: ['High Pressure ASME B16.5 Standard', 'Anti-Corrosive Black Protective Coating', 'Threaded Class 150/300/600 Pressure Ratings', 'Carbon Steel ASTM A105 / A350 Material', 'Complete MTR (Mill Test Report) Traceability'],
    inStock: true,
    featured: true,
  },

  // Other Divisions Highlights
  { id: 'wel-1', title: 'Contender EDGE 2.0 Gas System', division: 'Welding Division', divisionSlug: 'welding-division', category: 'Gas Systems', image: '/products/welding/contender-edge-2-0.png', inStock: true, featured: true },
  { id: 'wel-2', title: '280PL Series Welding Helmet Lift Front', division: 'Welding Division', divisionSlug: 'welding-division', category: 'Safety Helmets', image: '/products/welding/280pl-series-welding-helmet.png', inStock: true, featured: false },
  { id: 'elec-1', title: 'Acti9 Miniature Circuit Breaker C60H-DC', division: 'Electrical Division', divisionSlug: 'electrical-division', category: 'Circuit Breakers', image: '/products/electrical/acti9-mcb-c60h-dc-10a.png', inStock: true, featured: true },
  { id: 'elec-2', title: 'TeSys Giga Contactor 185A Wide Band', division: 'Electrical Division', divisionSlug: 'electrical-division', category: 'Switchgear', image: '/products/electrical/tesys-giga-contactor-185a.png', inStock: true, featured: true },
  { id: 'lift-1', title: 'Industrial Chain Blocks 5 Ton Rating', division: 'Lifting & Material Handling', divisionSlug: 'lifting-material-handling', category: 'Hoists & Rigging', image: '/products/lifting/chain-blocks.png', inStock: true, featured: true },
  { id: 'fast-1', title: 'Stainless Steel Hex Head Structural Bolts', division: 'Fasteners Division', divisionSlug: 'fasteners-division', category: 'Bolts & Screws', image: '/products/fasteners/stainless-steel-hex-head-bolts.png', inStock: true, featured: true },
  { id: 'coat-1', title: 'Jotun Hardtop XP 1005 Protective Paint', division: 'Coatings & Surface Protection', divisionSlug: 'coatings-surface-protection', category: 'Paints & Coatings', image: '/products/coatings/jotun-hardtop-xp-1005.png', inStock: true, featured: true },
];

const INITIAL_DIVISIONS: Division[] = [
  { id: 'div-1', name: 'Mechanical Supply Division', slug: 'mechanical-division', headline: 'Industrial Mechanical Valves, Pipes & Structural Fittings', description: 'Certified valves, seamless pipes, and specialized alloy fittings.', productCount: 13 },
  { id: 'div-2', name: 'Welding Division', slug: 'welding-division', headline: 'Industrial Welding Machinery, Gas Apparatus & Consumables', description: 'Cutting torches, regulators, auto helmets, Victor systems.', productCount: 16 },
  { id: 'div-3', name: 'Electrical Division', slug: 'electrical-division', headline: 'Industrial Power Distribution, UPS Systems & Switchgear', description: 'Circuit breakers, switchgear, UPS systems, cables.', productCount: 12 },
  { id: 'div-4', name: 'Lifting & Material Handling', slug: 'lifting-material-handling', headline: 'Heavy Lifting Tackles, Hoists & Rigging Equipment', description: 'Chain blocks, hoists, wire rope slings, snatch blocks.', productCount: 8 },
  { id: 'div-5', name: 'Power System', slug: 'power-system', headline: 'High-Output Generators & Heavy-Duty Power Equipment', description: 'Industrial generators, diesel & gas engines.', productCount: 4 },
  { id: 'div-6', name: 'Auxiliary Systems', slug: 'auxiliary-systems', headline: 'Pneumatics, Compressed Air & Plant Utility Equipment', description: 'Air compressors, water tanks, camp logistics equipment.', productCount: 6 },
  { id: 'div-7', name: 'Marine Division', slug: 'marine-division', headline: 'Offshore Deck Hardware, Safety & Marine Operations Support', description: 'Lifejackets, life-saving appliances, deck equipment.', productCount: 4 },
  { id: 'div-8', name: 'Steel & Structural Materials', slug: 'steel-structural-materials-division', headline: 'Structural Steel Beams, Heavy Plates & Piping Solutions', description: 'Seamless pipes, structural beams, stainless tubes.', productCount: 7 },
  { id: 'div-9', name: 'Coatings & Surface Protection', slug: 'coatings-surface-protection', headline: 'Protective Coatings, Industrial Paints & Blasting Abrasives', description: 'Jotun, National Paints, intumescent fire coatings.', productCount: 8 },
  { id: 'div-10', name: 'Pumps & Motors Division', slug: 'pumps-motors', headline: 'API Industrial Fluid Transfer Pumps & Electric Motors', description: 'API 610 pumps, electric motors, high-pressure boosters.', productCount: 4 },
  { id: 'div-11', name: 'Fasteners Division', slug: 'fasteners-division', headline: 'High-Tensile Structural Fasteners, Studs & Anchors', description: 'Hex bolts, stud bolts, carriage bolts, anchors.', productCount: 16 },
  { id: 'div-12', name: 'Substructure', slug: 'substructure', headline: 'Rigging Mats, Rig Floors & Environmental Containment', description: 'Rig floors, base frames, spill containment systems.', productCount: 4 },
];

const INITIAL_BLOGS: Blog[] = [
  {
    id: 'b-1',
    title: 'Reliable Heavy Equipment Rental Across Saudi Arabia',
    slug: 'reliable-heavy-equipment-rental-across-saudi-arabia',
    subtitle: 'Why Orient Energy Co. is the Go-To Heavy Equipment Rental Provider in Saudi Arabia',
    image: '/blog/blog-1.jpg',
    readTime: '11 Minute Read',
    date: 'May 23, 2026',
    author: 'Orient Energy Heavy Equipment Division',
    category: 'Heavy Equipment Rental',
    introduction: 'In Saudi Arabia’s fast-paced industrial landscape, having reliable heavy equipment is crucial. Orient Energy Trading Company offers top-tier machinery and equipment rental solutions.',
    fleetTitle: 'Fleet and Services:',
    fleetPoints: [
      { label: 'Extensive Fleet', text: 'Thousands of specialized equipment units, from mobile cranes to bulldozers.' },
      { label: 'Rental Flexibility', text: 'Options for short-term projects, long-term contracts, and emergency requirements.' },
    ],
    whyChoosePoints: ['ISO-certified operations', 'Aramco-certified operators', 'Kingdom-wide coverage'],
    conclusion: 'For industries seeking dependable heavy machinery, Orient Energy provides a one-stop rental solution.',
    isPublished: true,
  },
  {
    id: 'b-2',
    title: 'Comprehensive Industrial Supply Solutions',
    slug: 'comprehensive-industrial-supply-solutions',
    subtitle: 'How Orient Energy Supports Industrial Growth Across Saudi Arabia',
    image: '/blog/blog-2.jpg',
    readTime: '10 Minute Read',
    date: 'May 20, 2026',
    author: 'Orient Energy Procurement Engineering Team',
    category: 'Industrial Supply',
    introduction: 'Orient Energy Co. is a leading industrial products supplier in Saudi Arabia, catering to demanding sectors including oil & gas and petrochemical.',
    fleetTitle: 'Material Portfolio & Capabilities:',
    fleetPoints: [
      { label: 'Mechanical & Piping', text: 'Certified valves, flanges, seamless pipes, and specialized alloy fittings.' },
      { label: 'Electrical & Switchgear', text: 'Explosion-proof enclosures, switchgear, cabling, and sensors.' },
    ],
    whyChoosePoints: ['Global OEM vendor relationships', 'Eastern Province fulfillment hubs', 'Dedicated technical engineers'],
    conclusion: 'By streamlining procurement, Orient Energy empowers Saudi industrial operators.',
    isPublished: true,
  },
  {
    id: 'b-3',
    title: 'Integrated Engineering & Procurement Solutions',
    slug: 'integrated-engineering-procurement-solutions',
    subtitle: 'Your Partner for Industrial Efficiency and Operational Excellence',
    image: '/blog/blog-3.jpg',
    readTime: '9 Minute Read',
    date: 'May 16, 2026',
    author: 'Orient Energy Operations & Technical Services',
    category: 'Engineering & Procurement',
    introduction: 'Modern industrial infrastructure requires turnkey engineering expertise, synchronized global supply chains, and seasoned on-site coordination.',
    fleetTitle: 'Integrated Solutions Scope:',
    fleetPoints: [
      { label: 'Procurement Engineering', text: 'Translating complex client drawings into audited vendor packages.' },
      { label: 'Shutdown & Turnaround Support', text: 'Pre-shutdown inventory staging and rapid tool delivery.' },
    ],
    whyChoosePoints: ['Over two decades of proven delivery', 'Strict international compliance', 'Single-point accountability'],
    conclusion: 'Orient Energy delivers integrated solutions that maximize uptime and long-term asset reliability.',
    isPublished: true,
  },
];

interface StaticImageItem {
  id: string;
  name: string;
  url: string;
  division: string;
  divisionSlug: string;
}

const STATIC_CATALOG_IMAGES: StaticImageItem[] = [
  // Mechanical Division (13 Products)
  { id: 'm-1', name: 'Breathing Hoses', url: '/products/mechanical/breathing-hoses.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-2', name: 'Butterfly Valve', url: '/products/mechanical/butterfly-valve.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-3', name: 'Butterfly Valve 3"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-4', name: 'Butterfly Valve 4"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-5', name: 'Butterfly Valve 6"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-6', name: 'Butterfly Valve 8"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-7', name: 'Threaded Flanges', url: '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-8', name: 'Seamless & ERW Pipes', url: '/products/mechanical/carbon-steel-seamless-erw-pipes.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-9', name: 'Hydraulic Hoses & Adaptors', url: '/products/mechanical/hydraulic-hoses-fittings-adaptors.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-10', name: 'Large Bore Hoses', url: '/products/mechanical/industrial-large-bore-hoses.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-11', name: 'Gasket & Seals', url: '/products/mechanical/industrial-gasket-and-seals.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-12', name: 'High Temp Ball Valve', url: '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },
  { id: 'm-13', name: 'Micro Linear Actuators', url: '/products/mechanical/micro-linear-actuators.png', division: 'Mechanical Supply Division', divisionSlug: 'mechanical-division' },

  // Welding Division
  { id: 'w-1', name: 'Contender EDGE 2.0', url: '/products/welding/contender-edge-2-0.png', division: 'Welding Division', divisionSlug: 'welding-division' },
  { id: 'w-2', name: '280PL Welding Helmet', url: '/products/welding/280pl-series-welding-helmet.png', division: 'Welding Division', divisionSlug: 'welding-division' },
  { id: 'w-3', name: 'Airmax PAPR System', url: '/products/welding/airmax-elite-papr-system-lp80.png', division: 'Welding Division', divisionSlug: 'welding-division' },
  { id: 'w-4', name: 'EDGE Series Regulators', url: '/products/welding/edge-series-2-0-regulators.png', division: 'Welding Division', divisionSlug: 'welding-division' },
  { id: 'w-5', name: 'Cutter Edge Torch', url: '/products/welding/cutter-edge-2-0-st2600fc.png', division: 'Welding Division', divisionSlug: 'welding-division' },

  // Electrical Division
  { id: 'e-1', name: 'Acti9 MCB 10A Breaker', url: '/products/electrical/acti9-mcb-c60h-dc-10a.png', division: 'Electrical Division', divisionSlug: 'electrical-division' },
  { id: 'e-2', name: 'TeSys Giga Contactor', url: '/products/electrical/tesys-giga-contactor-185a.png', division: 'Electrical Division', divisionSlug: 'electrical-division' },
  { id: 'e-3', name: 'Air Circuit Breaker HDW3', url: '/products/electrical/air-circuit-breaker-hdw3.png', division: 'Electrical Division', divisionSlug: 'electrical-division' },
  { id: 'e-4', name: 'Automatic Transfer Switch', url: '/products/electrical/automatic-transfer-switch-125-3200a.png', division: 'Electrical Division', divisionSlug: 'electrical-division' },
  { id: 'e-5', name: 'Earth Cables & Wires', url: '/products/electrical/earth-cable-and-wires.png', division: 'Electrical Division', divisionSlug: 'electrical-division' },

  // Lifting & Material Handling
  { id: 'l-1', name: 'Chain Blocks 5 Ton', url: '/products/lifting/chain-blocks.png', division: 'Lifting & Material Handling', divisionSlug: 'lifting-material-handling' },
  { id: 'l-2', name: 'Chain Hoists', url: '/products/lifting/chain-hoists.png', division: 'Lifting & Material Handling', divisionSlug: 'lifting-material-handling' },
  { id: 'l-3', name: 'Snatch Blocks', url: '/products/lifting/snatch-blocks.png', division: 'Lifting & Material Handling', divisionSlug: 'lifting-material-handling' },
  { id: 'l-4', name: 'Hooks & Shackles', url: '/products/lifting/hooks-and-shackles.png', division: 'Lifting & Material Handling', divisionSlug: 'lifting-material-handling' },

  // Fasteners Division
  { id: 'f-1', name: 'Hex Head Structural Bolts', url: '/products/fasteners/stainless-steel-hex-head-bolts.png', division: 'Fasteners Division', divisionSlug: 'fasteners-division' },
  { id: 'f-2', name: 'BS Stud Bolt', url: '/products/fasteners/bs-stud-bolt.png', division: 'Fasteners Division', divisionSlug: 'fasteners-division' },
  { id: 'f-3', name: 'Carriage Bolt', url: '/products/fasteners/carriage-bolt.png', division: 'Fasteners Division', divisionSlug: 'fasteners-division' },
  { id: 'f-4', name: 'Drop-In Anchor', url: '/products/fasteners/drop-in-anchor.png', division: 'Fasteners Division', divisionSlug: 'fasteners-division' },

  // Coatings & Surface Protection
  { id: 'c-1', name: 'Jotun Hardtop XP 1005', url: '/products/coatings/jotun-hardtop-xp-1005.png', division: 'Coatings & Surface Protection', divisionSlug: 'coatings-surface-protection' },
  { id: 'c-2', name: 'Intumescent Fire Coatings', url: '/products/coatings/fire-rated-intumescent-coatings.png', division: 'Coatings & Surface Protection', divisionSlug: 'coatings-surface-protection' },

  // Power System & Marine
  { id: 'p-1', name: 'Industrial Diesel Engines', url: '/products/power/diesel-engines.png', division: 'Power System', divisionSlug: 'power-system' },
  { id: 'p-2', name: 'Industrial Generators', url: '/products/power/generators.png', division: 'Power System', divisionSlug: 'power-system' },
  { id: 'mr-1', name: 'Lifejackets Inflatable', url: '/products/marine/lifejackets-foam-inflatable.png', division: 'Marine Division', divisionSlug: 'marine-division' },
  { id: 'mr-2', name: 'Industrial Ear Plugs', url: '/products/marine/ear-plug-orange-cord.png', division: 'Marine Division', divisionSlug: 'marine-division' },

  // Categories & Division Banners
  { id: 'cat-1', name: 'All Fittings & Valves', url: '/categories/all-fittings.jpeg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-2', name: 'Mechanical Supply Banner', url: '/categories/mechanical-supply-division.png', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-3', name: 'Welding & Safety', url: '/categories/welding-safety.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-4', name: 'Electrical & UPS Systems', url: '/categories/electrical-ups-systems.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-5', name: 'Fasteners Banner', url: '/categories/fasteners.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-6', name: 'Lifting & Rigging', url: '/categories/lifting-material-handling.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-7', name: 'Coatings & Protection', url: '/categories/coatings-surface-protection.png', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-8', name: 'Power System Banner', url: '/categories/power-system.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-9', name: 'Marine Deck Hardware', url: '/categories/marine-division.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-10', name: 'Pumps & Motors Banner', url: '/categories/pumps-motors.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-11', name: 'Steel & Structural Materials', url: '/categories/steel-structural-materials-division.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-12', name: 'Substructure Rig Floors', url: '/categories/substructure.png', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-13', name: 'Industrial Hoses & Couplings', url: '/categories/industrial-hoses-hose-couplings.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-14', name: 'PPE & Safety Equipment', url: '/categories/ppe-safety-equpments.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-15', name: 'Tools & Maintenance', url: '/categories/tools-maintenance.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
  { id: 'cat-16', name: 'Auxiliary Systems', url: '/categories/auxiliary-systems.jpg', division: 'Categories & Banners', divisionSlug: 'categories' },
];

export const MECHANICAL_13_STATIC_IMAGES = [
  { name: 'Breathing Hoses', url: '/products/mechanical/breathing-hoses.png', slug: 'breathing-hoses' },
  { name: 'Butterfly Valve', url: '/products/mechanical/butterfly-valve.png', slug: 'butterfly-valve' },
  { name: 'Butterfly Valve 3"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png', slug: 'butterfly-valve-lever-handle-ss-disc-3' },
  { name: 'Butterfly Valve 4"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png', slug: 'butterfly-valve-lever-handle-ss-disc-4' },
  { name: 'Butterfly Valve 6"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png', slug: 'butterfly-valve-lever-handle-ss-disc-6' },
  { name: 'Butterfly Valve 8"', url: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png', slug: 'butterfly-valve-lever-handle-ss-disc-8' },
  { name: 'Threaded Pipe Flanges', url: '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png', slug: 'black-coated-steel-pipe-flanges-threaded' },
  { name: 'Seamless & ERW Pipes', url: '/products/mechanical/carbon-steel-seamless-erw-pipes.png', slug: 'carbon-steel-seamless-erw-pipes' },
  { name: 'Hydraulic Hoses & Adaptors', url: '/products/mechanical/hydraulic-hoses-fittings-adaptors.png', slug: 'hydraulic-hoses-fittings-adaptors' },
  { name: 'Large Bore Hoses', url: '/products/mechanical/industrial-large-bore-hoses.png', slug: 'industrial-large-bore-hoses' },
  { name: 'Gasket & Seals', url: '/products/mechanical/industrial-gasket-and-seals.png', slug: 'industrial-gasket-and-seals' },
  { name: 'High Temp Ball Valve', url: '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png', slug: 'isolation-valve-ball-valve-steam-high-temperature-ball-valve' },
  { name: 'Micro Linear Actuators', url: '/products/mechanical/micro-linear-actuators.png', slug: 'micro-linear-actuators' },
];

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inquiries' | 'mechanical' | 'products' | 'divisions' | 'blogs' | 'settings'>('mechanical');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Login form state
  const [email, setEmail] = useState<string>(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState<string>(DEFAULT_ADMIN_PASS);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Core App data states
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [divisions, setDivisions] = useState<Division[]>(INITIAL_DIVISIONS);
  const [blogs, setBlogs] = useState<Blog[]>(INITIAL_BLOGS);

  // Filters & Toast
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [staticFilter, setStaticFilter] = useState<string>('mechanical-division');
  const [blogSearchTerm, setBlogSearchTerm] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // Modals state
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [showBlogModal, setShowBlogModal] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [showDivisionModal, setShowDivisionModal] = useState<boolean>(false);
  const [editingDivision, setEditingDivision] = useState<Division | null>(null);

  // Product Form state
  const [productForm, setProductForm] = useState({
    title: '',
    slug: '',
    division: 'Mechanical Supply Division',
    divisionSlug: 'mechanical-division',
    category: 'Valves & Fittings',
    image: '/categories/all-fittings.jpeg',
    imagesText: '',
    shortDescription: '',
    fullDescription: '',
    featuresText: '',
    whatsappMessage: '',
    inStock: true,
    featured: false,
  });

  // Blog Form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    subtitle: '',
    slug: '',
    category: 'Heavy Equipment Rental',
    author: 'Orient Energy Editorial',
    readTime: '8 Minute Read',
    image: '/blog/blog-1.jpg',
    introduction: '',
    fleetTitle: 'Fleet and Services:',
    fleetPoints: [{ label: '', text: '' }],
    whyChoosePoints: [''],
    conclusion: '',
    isPublished: true,
  });

  // Division Form state
  const [divisionForm, setDivisionForm] = useState({
    id: '',
    name: '',
    slug: '',
    headline: '',
    descriptionText: '',
    image: '',
    subcategoriesTitle: 'Product Categories',
    subcategories: [{ name: '', image: '' }],
    productRangeTitle: 'Product Range',
    productRangeText: '',
    applicationsTitle: 'Applications',
    applicationsText: '',
    pillsText: '',
  });

  // Settings form state
  const [settings, setSettings] = useState({
    companyName: 'Orient Energy Trading Company',
    whatsappPhone: '+966552400778',
    email: 'info@orientenergy.com.sa',
    phone: '+966138901234',
    address: 'King Abdulaziz Road, Al Khobar, Eastern Province, Saudi Arabia',
    crNumber: '2051234567',
    vatNumber: '310987654300003',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Dedicated list of the 13 Mechanical Products
  const mechanical13List = useMemo(() => {
    return MECHANICAL_13_STATIC_IMAGES.map((item, index) => {
      // 1. Look in loaded products state (MongoDB / API)
      const found = products.find(
        (p) =>
          p.slug === item.slug ||
          (p.title && p.title.toLowerCase().trim() === item.name.toLowerCase().trim())
      );
      if (found) {
        return {
          ...found,
          num: index + 1,
          staticName: item.name,
          image: found.image || item.url,
          slug: found.slug || item.slug,
        };
      }
      // 2. Look in INITIAL_PRODUCTS
      const initFound = INITIAL_PRODUCTS.find((p) => p.slug === item.slug) || INITIAL_PRODUCTS[index];
      return {
        ...initFound,
        num: index + 1,
        staticName: item.name,
        image: initFound?.image || item.url,
        slug: initFound?.slug || item.slug,
      };
    });
  }, [products]);

  // Check login token
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('orient_admin_token') : null;
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch live data from backend when authenticated
  const loadAllData = async () => {
    // 1. Fetch Inquiries
    fetch('http://localhost:5000/api/inquiries')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setInquiries(
            data.data.map((inq: any) => ({
              id: inq._id || inq.id,
              name: inq.name,
              email: inq.email,
              phone: inq.phone || '',
              company: inq.company || 'Direct Client',
              division: inq.division || 'General Inquiry',
              message: inq.message || '',
              date: inq.createdAt ? new Date(inq.createdAt).toISOString().slice(0, 16).replace('T', ' ') : '2026-10-21',
              status: inq.status || 'new',
            }))
          );
        }
      })
      .catch(() => {});

    // 2. Fetch Products
    fetch('http://localhost:5000/api/products?limit=200')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const allDivs = divisions.length > 0 ? divisions : INITIAL_DIVISIONS;
          setProducts(
            data.data.map((p: any) => {
              let divName = 'Mechanical Supply Division';
              let divSlug = p.divisionSlug || (p.category && p.category.slug) || 'mechanical-division';

              if (p.category && typeof p.category === 'object' && p.category.name) {
                divName = p.category.name;
              } else if (p.divisionSlug) {
                const match = allDivs.find((d) => d.slug === p.divisionSlug);
                if (match) divName = match.name;
              }

              const imageGallery = Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : []);

              return {
                id: p._id || p.id,
                title: p.title,
                slug: p.slug,
                division: divName,
                divisionSlug: divSlug,
                category: p.categoryName || 'General Industrial',
                image: p.image || (imageGallery[0]) || '/categories/all-fittings.jpeg',
                images: imageGallery,
                shortDescription: p.shortDescription || '',
                fullDescription: p.fullDescription || '',
                features: Array.isArray(p.features) ? p.features : [],
                whatsappMessage: p.whatsappMessage || '',
                inStock: p.inStock !== false,
                featured: Boolean(p.isFeatured),
              };
            })
          );
        }
      })
      .catch(() => {});

    // 3. Fetch Categories / Divisions
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setDivisions(
            data.data.map((cat: any) => ({
              id: cat._id || cat.id,
              name: cat.name,
              slug: cat.slug,
              headline: cat.headline || cat.name,
              description: cat.description || '',
              detailedDescriptions: cat.detailedDescriptions || [],
              image: cat.image || '',
              subcategoriesTitle: cat.subcategoriesTitle || 'Categories',
              subcategories: cat.subcategories || [],
              productRangeTitle: cat.productRangeTitle || 'Product Range',
              productRange: cat.productRange || [],
              applicationsTitle: cat.applicationsTitle || 'Applications',
              applications: cat.applications || [],
              pills: cat.pills || [],
              productCount: cat.productCount || 0,
            }))
          );
        }
      })
      .catch(() => {});

    // 4. Fetch Blogs
    fetch('http://localhost:5000/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setBlogs(
            data.data.map((b: any) => ({
              id: b._id || b.id,
              title: b.title,
              slug: b.slug,
              subtitle: b.subtitle || '',
              image: b.image || '/blog/blog-1.jpg',
              readTime: b.readTime || '8 Minute Read',
              date: b.date || 'Orient Energy Insight',
              author: b.author || 'Orient Energy Editorial',
              category: b.category || 'General',
              introduction: b.introduction || '',
              fleetTitle: b.fleetTitle || 'Fleet and Services:',
              fleetPoints: b.fleetPoints || [],
              whyChoosePoints: b.whyChoosePoints || [],
              conclusion: b.conclusion || '',
              isPublished: b.isPublished !== false,
            }))
          );
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Image Upload helper using /api/upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>, onUrlUploaded: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, name: file.name }),
        });
        const data = await res.json();
        setIsUploadingImage(false);
        if (data.success && data.url) {
          onUrlUploaded(data.url);
          showToast('Image uploaded successfully!');
        } else {
          showToast(data.message || 'Image upload failed');
        }
      } catch {
        setIsUploadingImage(false);
        showToast('Image upload failed');
      }
    };
    reader.readAsDataURL(file);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('orient_admin_token', data.token || 'orient-admin-jwt');
        setIsAuthenticated(true);
        showToast('Logged in successfully!');
        setIsLoading(false);
        return;
      }
    } catch {
      // Backend offline fallback
    }

    if (
      email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
      password === DEFAULT_ADMIN_PASS
    ) {
      localStorage.setItem('orient_admin_token', 'demo-token-orient-admin');
      setIsAuthenticated(true);
      showToast('Logged in successfully!');
    } else {
      setLoginError('Invalid credentials. Use the default login provided.');
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('orient_admin_token');
    setIsAuthenticated(false);
    showToast('Logged out');
  };

  const handleStatusChange = (id: string, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    fetch(`http://localhost:5000/api/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }).catch(() => {});
    showToast(`Inquiry status updated to ${newStatus}`);
  };

  // ---------------- PRODUCT HANDLERS ---------------- //
  const openAddProductModal = () => {
    setEditingProduct(null);
    setStaticFilter('mechanical-division');
    setProductForm({
      title: '',
      slug: '',
      division: divisions[0]?.name || 'Mechanical Supply Division',
      divisionSlug: divisions[0]?.slug || 'mechanical-division',
      category: 'Valves & Fittings',
      image: '/categories/all-fittings.jpeg',
      imagesText: '',
      shortDescription: '',
      fullDescription: '',
      featuresText: '',
      whatsappMessage: '',
      inStock: true,
      featured: false,
    });
    setShowProductModal(true);
  };

  const openEditProductModal = (p: Product) => {
    setEditingProduct(p);
    setStaticFilter(p.divisionSlug || 'mechanical-division');
    const gallery = Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : []);
    setProductForm({
      title: p.title,
      slug: p.slug || '',
      division: p.division,
      divisionSlug: p.divisionSlug || 'mechanical-division',
      category: p.category || 'General Industrial',
      image: p.image || gallery[0] || '/categories/all-fittings.jpeg',
      imagesText: gallery.join('\n'),
      shortDescription: p.shortDescription || '',
      fullDescription: p.fullDescription || '',
      featuresText: (p.features || []).join('\n'),
      whatsappMessage: p.whatsappMessage || '',
      inStock: p.inStock,
      featured: p.featured,
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title) return;

    const cleanSlug = (productForm.slug.trim() || productForm.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const featuresList = productForm.featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const galleryList = productForm.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (productForm.image && !galleryList.includes(productForm.image)) {
      galleryList.unshift(productForm.image);
    }

    const allDivs = divisions.length > 0 ? divisions : INITIAL_DIVISIONS;
    const matchedDiv = allDivs.find(
      (d) => d.name === productForm.division || d.slug === productForm.divisionSlug
    );

    const payload = {
      title: productForm.title,
      slug: cleanSlug,
      division: productForm.division,
      divisionSlug: matchedDiv ? matchedDiv.slug : productForm.divisionSlug,
      category: matchedDiv ? matchedDiv.id : undefined,
      categoryName: productForm.category || productForm.division,
      image: productForm.image || (galleryList[0] || '/categories/all-fittings.jpeg'),
      images: galleryList.length > 0 ? galleryList : [productForm.image || '/categories/all-fittings.jpeg'],
      shortDescription: productForm.shortDescription,
      fullDescription: productForm.fullDescription,
      features: featuresList,
      whatsappMessage:
        productForm.whatsappMessage ||
        `Hello Orient Energy Trading Co., I would like to order or request a quote for: ${productForm.title}.`,
      inStock: productForm.inStock,
      isFeatured: productForm.featured,
    };

    const token = typeof window !== 'undefined' ? localStorage.getItem('orient_admin_token') : null;
    const reqHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      reqHeaders['Authorization'] = `Bearer ${token}`;
    }

    if (editingProduct) {
      // Update existing
      try {
        const targetId = editingProduct.id || editingProduct.slug || cleanSlug;
        let res = await fetch(`http://localhost:5000/api/products/${targetId}`, {
          method: 'PUT',
          headers: reqHeaders,
          body: JSON.stringify(payload),
        });
        if (!res.ok && editingProduct.slug) {
          res = await fetch(`http://localhost:5000/api/products/${editingProduct.slug}`, {
            method: 'PUT',
            headers: reqHeaders,
            body: JSON.stringify(payload),
          });
        }
        if (res.ok) {
          const resData = await res.json();
          const updated = resData.data;
          setProducts((prev) =>
            prev.map((item) =>
              item.id === editingProduct.id || item.slug === editingProduct.slug
                ? {
                    ...item,
                    title: updated.title,
                    slug: updated.slug || cleanSlug,
                    division: productForm.division,
                    divisionSlug: updated.divisionSlug || productForm.divisionSlug,
                    category: productForm.category,
                    image: updated.image || productForm.image,
                    images: Array.isArray(updated.images) && updated.images.length > 0 ? updated.images : galleryList,
                    shortDescription: updated.shortDescription,
                    fullDescription: updated.fullDescription,
                    features: Array.isArray(updated.features) ? updated.features : featuresList,
                    whatsappMessage: updated.whatsappMessage,
                    inStock: updated.inStock,
                    featured: updated.isFeatured,
                  }
                : item
            )
          );
          showToast('Product and Inner Page updated successfully!');
          setShowProductModal(false);
          return;
        }
      } catch {
        // Fallback update locally
      }

      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id || item.slug === editingProduct.slug
            ? {
                ...item,
                ...payload,
                category: productForm.category,
                division: productForm.division,
                images: galleryList,
                fullDescription: productForm.fullDescription,
                id: editingProduct.id,
                featured: productForm.featured,
              }
            : item
        )
      );
      showToast('Product and Inner Page updated!');
      setShowProductModal(false);
    } else {
      // Create new product
      try {
        const res = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const resData = await res.json();
          const created = resData.data;
          const newItem: Product = {
            id: created._id || String(Date.now()),
            title: created.title,
            slug: created.slug || cleanSlug,
            division: productForm.division,
            divisionSlug: created.divisionSlug || productForm.divisionSlug,
            category: productForm.category,
            image: created.image || productForm.image,
            images: Array.isArray(created.images) && created.images.length > 0 ? created.images : galleryList,
            shortDescription: created.shortDescription,
            fullDescription: created.fullDescription,
            features: Array.isArray(created.features) ? created.features : featuresList,
            whatsappMessage: created.whatsappMessage,
            inStock: created.inStock,
            featured: created.isFeatured,
          };
          setProducts((prev) => [newItem, ...prev]);
          showToast('Product created and published!');
          setShowProductModal(false);
          return;
        }
      } catch {
        // Fallback create locally
      }

      const newItem: Product = {
        id: String(Date.now()),
        title: productForm.title,
        slug: cleanSlug,
        division: productForm.division,
        divisionSlug: productForm.divisionSlug,
        category: productForm.category,
        image: productForm.image,
        images: galleryList,
        shortDescription: productForm.shortDescription,
        fullDescription: productForm.fullDescription,
        features: featuresList,
        whatsappMessage: productForm.whatsappMessage,
        inStock: productForm.inStock,
        featured: productForm.featured,
      };
      setProducts((prev) => [newItem, ...prev]);
      showToast('Product added!');
      setShowProductModal(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
    } catch {}
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted');
  };

  // ---------------- BLOG HANDLERS ---------------- //
  const openAddBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      subtitle: '',
      slug: '',
      category: 'Heavy Equipment Rental',
      author: 'Orient Energy Editorial',
      readTime: '8 Minute Read',
      image: '/blog/blog-1.jpg',
      introduction: '',
      fleetTitle: 'Fleet and Services:',
      fleetPoints: [{ label: 'Key Capability', text: 'Comprehensive high-grade solution.' }],
      whyChoosePoints: ['ISO-certified quality assurance', 'Aramco & SABIC approved standards'],
      conclusion: '',
      isPublished: true,
    });
    setShowBlogModal(true);
  };

  const openEditBlogModal = (b: Blog) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title,
      subtitle: b.subtitle || '',
      slug: b.slug,
      category: b.category,
      author: b.author || 'Orient Energy Editorial',
      readTime: b.readTime || '8 Minute Read',
      image: b.image || '/blog/blog-1.jpg',
      introduction: b.introduction,
      fleetTitle: b.fleetTitle || 'Fleet and Services:',
      fleetPoints: b.fleetPoints && b.fleetPoints.length > 0 ? b.fleetPoints : [{ label: '', text: '' }],
      whyChoosePoints: b.whyChoosePoints && b.whyChoosePoints.length > 0 ? b.whyChoosePoints : [''],
      conclusion: b.conclusion || '',
      isPublished: b.isPublished,
    });
    setShowBlogModal(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title) return;

    const payload = {
      title: blogForm.title,
      subtitle: blogForm.subtitle,
      slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: blogForm.category,
      author: blogForm.author,
      readTime: blogForm.readTime,
      image: blogForm.image || '/blog/blog-1.jpg',
      introduction: blogForm.introduction,
      fleetTitle: blogForm.fleetTitle,
      fleetPoints: blogForm.fleetPoints.filter((fp) => fp.label || fp.text),
      whyChoosePoints: blogForm.whyChoosePoints.filter((pt) => pt.trim() !== ''),
      conclusion: blogForm.conclusion,
      isPublished: blogForm.isPublished,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    if (editingBlog) {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const resData = await res.json();
          const updated = resData.data;
          setBlogs((prev) =>
            prev.map((b) => (b.id === editingBlog.id ? { ...b, ...updated, id: editingBlog.id } : b))
          );
          showToast('Blog article updated successfully!');
          setShowBlogModal(false);
          return;
        }
      } catch {}

      setBlogs((prev) =>
        prev.map((b) => (b.id === editingBlog.id ? { ...b, ...payload, id: editingBlog.id } : b))
      );
      showToast('Blog article updated!');
      setShowBlogModal(false);
    } else {
      try {
        const res = await fetch('http://localhost:5000/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const resData = await res.json();
          const created = resData.data;
          const newBlog: Blog = {
            id: created._id || String(Date.now()),
            ...created,
          };
          setBlogs((prev) => [newBlog, ...prev]);
          showToast('Blog article published successfully!');
          setShowBlogModal(false);
          return;
        }
      } catch {}

      const newBlog: Blog = {
        id: String(Date.now()),
        ...payload,
      };
      setBlogs((prev) => [newBlog, ...prev]);
      showToast('Blog article created!');
      setShowBlogModal(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog article?')) return;
    try {
      await fetch(`http://localhost:5000/api/blogs/${id}`, { method: 'DELETE' });
    } catch {}
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    showToast('Blog article deleted');
  };

  // ---------------- DIVISION / INNER PAGE HANDLERS ---------------- //
  const openEditDivisionModal = (div: Division) => {
    setEditingDivision(div);
    const descriptions = div.detailedDescriptions && div.detailedDescriptions.length > 0
      ? div.detailedDescriptions.join('\n\n')
      : (div.description || '');

    setDivisionForm({
      id: div.id,
      name: div.name,
      slug: div.slug,
      headline: div.headline || div.name,
      descriptionText: descriptions,
      image: div.image || '',
      subcategoriesTitle: div.subcategoriesTitle || 'Categories',
      subcategories: div.subcategories && div.subcategories.length > 0 ? div.subcategories : [{ name: '', image: '' }],
      productRangeTitle: div.productRangeTitle || 'Product Range',
      productRangeText: div.productRange ? div.productRange.join('\n') : '',
      applicationsTitle: div.applicationsTitle || 'Applications',
      applicationsText: div.applications ? div.applications.join('\n') : '',
      pillsText: div.pills ? div.pills.join(', ') : '',
    });
    setShowDivisionModal(true);
  };

  const handleSaveDivision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDivision) return;

    const detailedDescriptions = divisionForm.descriptionText
      .split('\n\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const productRange = divisionForm.productRangeText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const applications = divisionForm.applicationsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const pills = divisionForm.pillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const validSubcategories = divisionForm.subcategories.filter((s) => s.name.trim() !== '');

    const payload = {
      headline: divisionForm.headline,
      description: detailedDescriptions[0] || '',
      detailedDescriptions,
      image: divisionForm.image,
      subcategoriesTitle: divisionForm.subcategoriesTitle,
      subcategories: validSubcategories,
      productRangeTitle: divisionForm.productRangeTitle,
      productRange,
      applicationsTitle: divisionForm.applicationsTitle,
      applications,
      pills,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/categories/${editingDivision.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const resData = await res.json();
        const updated = resData.data;
        setDivisions((prev) =>
          prev.map((d) => (d.id === editingDivision.id ? { ...d, ...updated, id: editingDivision.id } : d))
        );
        showToast('Division inner page updated successfully!');
        setShowDivisionModal(false);
        return;
      }
    } catch {}

    setDivisions((prev) =>
      prev.map((d) => (d.id === editingDivision.id ? { ...d, ...payload } : d))
    );
    showToast('Division details updated!');
    setShowDivisionModal(false);
  };

  // Filtered lists
  const filteredProducts = products.filter((p) => {
    const matchesDiv =
      divisionFilter === 'all' ||
      p.division.toLowerCase().includes(divisionFilter.toLowerCase()) ||
      (p.divisionSlug && p.divisionSlug.toLowerCase().includes(divisionFilter.toLowerCase()));
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  const filteredBlogs = blogs.filter((b) => {
    return (
      b.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearchTerm.toLowerCase())
    );
  });

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-wrap">
              <img src="/logo.png" alt="Orient Energy" style={{ height: '44px', objectFit: 'contain' }} />
            </div>
            <div className="badge-admin">ADMIN PORTAL</div>
            <h1>Secure Control Center</h1>
            <p>Orient Energy Trading Company — Operations &amp; Catalog Management</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {loginError && <div className="alert-error">{loginError}</div>}

            <div className="form-group">
              <label htmlFor="email">Admin Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="orient@adminpanel.com"
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Security Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="input-field"
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? 'Signing In...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>

          <div className="credentials-helper">
            <div className="cred-title">Default Admin Credentials:</div>
            <div className="cred-item">
              <span>Email:</span> <code>{DEFAULT_ADMIN_EMAIL}</code>
            </div>
            <div className="cred-item">
              <span>Password:</span> <code>{DEFAULT_ADMIN_PASS}</code>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail(DEFAULT_ADMIN_EMAIL);
                setPassword(DEFAULT_ADMIN_PASS);
                showToast('Default credentials loaded');
              }}
              className="btn-fill"
            >
              Fill Default Credentials
            </button>
          </div>
        </div>

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .login-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
          }
          .login-header {
            text-align: center;
            margin-bottom: 24px;
          }
          .logo-wrap {
            margin-bottom: 14px;
          }
          .badge-admin {
            display: inline-block;
            background: #e0e7ff;
            color: #2e3191;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 9999px;
            letter-spacing: 0.08em;
            margin-bottom: 8px;
          }
          .login-header h1 {
            font-size: 1.45rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 4px;
          }
          .login-header p {
            font-size: 0.84rem;
            color: #64748b;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .alert-error {
            background: #fee2e2;
            color: #dc2626;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 0.82rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .form-group label {
            font-size: 0.80rem;
            font-weight: 600;
            color: #334155;
          }
          .input-field {
            padding: 11px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            font-size: 0.90rem;
            outline: none;
            transition: border-color 0.2s;
          }
          .input-field:focus {
            border-color: #2e3191;
          }
          .btn-primary {
            background: #2e3191;
            color: #ffffff;
            border: none;
            padding: 13px;
            border-radius: 8px;
            font-size: 0.92rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 6px;
            transition: background 0.2s;
          }
          .btn-primary:hover {
            background: #1f2268;
          }
          .credentials-helper {
            margin-top: 24px;
            padding: 14px;
            background: #f8fafc;
            border: 1px dashed #cbd5e1;
            border-radius: 10px;
            font-size: 0.78rem;
          }
          .cred-title {
            font-weight: 700;
            color: #475569;
            margin-bottom: 6px;
          }
          .cred-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            color: #64748b;
          }
          .cred-item code {
            background: #e2e8f0;
            padding: 2px 6px;
            border-radius: 4px;
            color: #0f172a;
            font-weight: 600;
          }
          .btn-fill {
            width: 100%;
            margin-top: 10px;
            padding: 6px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 0.76rem;
            font-weight: 600;
            color: #2e3191;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  // Admin Dashboard Main View
  return (
    <div className="admin-wrapper">
      {/* Toast Notification */}
      {toastMessage && <div className="admin-toast">{toastMessage}</div>}

      {/* Top Navbar */}
      <header className="admin-header">
        <div className="header-left">
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>
          <div className="header-logo">
            <img src="/logo.png" alt="Orient Energy" style={{ height: '36px', objectFit: 'contain' }} />
          </div>
          <span className="portal-badge">Admin Dashboard</span>
        </div>

        <div className="header-right">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="live-site-link"
          >
            <span>Live Website</span> &rarr;
          </a>
          <div className="user-profile">
            <div className="avatar">OE</div>
            <div className="user-info">
              <span className="user-name">Administrator</span>
              <span className="user-email">{DEFAULT_ADMIN_EMAIL}</span>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="btn-logout" title="Sign Out">
            Logout
          </button>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="admin-body">
        {/* Sidebar Nav */}
        <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <button
              type="button"
              className={`nav-item ${activeTab === 'mechanical' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('mechanical');
                setMobileMenuOpen(false);
              }}
              style={{
                background: activeTab === 'mechanical' ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(30, 64, 175, 0.18))' : undefined,
                borderLeft: activeTab === 'mechanical' ? '3px solid #2563eb' : undefined,
                fontWeight: activeTab === 'mechanical' ? 700 : undefined,
              }}
            >
              <span className="nav-icon" style={{ fontSize: '1.15rem' }}>⚙️</span>
              <span>13 Mechanical Products</span>
              <span className="badge-count" style={{ background: '#2563eb', color: '#fff', fontWeight: 800 }}>
                13
              </span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">📊</span>
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('inquiries');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">💬</span>
              <span>Quotes &amp; Inquiries</span>
              <span className="badge-count">
                {inquiries.filter((i) => i.status === 'new').length}
              </span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('products');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">📦</span>
              <span>Products Catalog</span>
              <span className="badge-count">{products.length}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'divisions' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('divisions');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">🏭</span>
              <span>Divisions &amp; Units</span>
              <span className="badge-count">{divisions.length}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('blogs');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">📰</span>
              <span>Blogs &amp; Insights</span>
              <span className="badge-count">{blogs.length}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">⚙️</span>
              <span>Company Settings</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="system-status">
              <span className="status-dot"></span>
              <span>API Connected &bull; MongoDB Live</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-content">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              <div className="page-heading">
                <h1>Executive Operations Dashboard</h1>
                <p>Real-time industrial quotation requests, dynamic catalog products, and publication management.</p>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Pending Inquiries</span>
                    <span className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#b45309' }}>💬</span>
                  </div>
                  <div className="stat-val">{inquiries.filter((i) => i.status === 'new').length}</div>
                  <div className="stat-hint">Needs quotation review</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Total Inquiries</span>
                    <span className="stat-icon-wrap" style={{ background: '#dbeafe', color: '#1e40af' }}>📈</span>
                  </div>
                  <div className="stat-val">{inquiries.length}</div>
                  <div className="stat-hint">Across all 11+ divisions</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Catalog Products</span>
                    <span className="stat-icon-wrap" style={{ background: '#dcfce7', color: '#15803d' }}>📦</span>
                  </div>
                  <div className="stat-val">{products.length}</div>
                  <div className="stat-hint">Managed via Admin</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Published Articles</span>
                    <span className="stat-icon-wrap" style={{ background: '#ede9fe', color: '#6d28d9' }}>📰</span>
                  </div>
                  <div className="stat-val">{blogs.length}</div>
                  <div className="stat-hint">Live news &amp; insights</div>
                </div>
              </div>

              {/* Recent Inquiries Section */}
              <div className="panel-box" style={{ marginTop: '28px' }}>
                <div className="panel-head">
                  <h2>Recent Industrial Quote Requests</h2>
                  <button type="button" onClick={() => setActiveTab('inquiries')} className="btn-link">
                    View All &rarr;
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Client &amp; Company</th>
                        <th>Division</th>
                        <th>Message Preview</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 4).map((inq) => (
                        <tr key={inq.id}>
                          <td>
                            <strong>{inq.name}</strong>
                            <div className="cell-sub">{inq.company}</div>
                          </td>
                          <td>
                            <span className="pill-division">{inq.division}</span>
                          </td>
                          <td style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {inq.message}
                          </td>
                          <td>{inq.date}</td>
                          <td>
                            <span className={`status-pill ${inq.status}`}>{inq.status}</span>
                          </td>
                          <td>
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${inq.name}, Orient Energy is reaching out regarding your quotation inquiry: ${inq.message}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-wa-action"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="inquiries-view">
              <div className="page-heading">
                <h1>Quotations &amp; RFQ Inquiries</h1>
                <p>Manage, respond to, and track inbound quotation requests from Saudi contractors.</p>
              </div>

              <div className="panel-box">
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Division</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Quick Dispatch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inq) => (
                        <tr key={inq.id}>
                          <td>
                            <strong>{inq.name}</strong>
                            <div className="cell-sub">{inq.date}</div>
                          </td>
                          <td>{inq.company}</td>
                          <td>
                            <div>{inq.email}</div>
                            <div className="cell-sub">{inq.phone}</div>
                          </td>
                          <td>
                            <span className="pill-division">{inq.division}</span>
                          </td>
                          <td style={{ maxWidth: '300px' }}>{inq.message}</td>
                          <td>
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                              className={`select-status ${inq.status}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="quoted">Quoted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td>
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${inq.name}, Orient Energy is reaching out regarding your quotation inquiry: ${inq.message}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-wa-action"
                            >
                              Reply on WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: 13 MECHANICAL PRODUCTS & INNER PAGES */}
          {activeTab === 'mechanical' && (
            <div className="mechanical-view">
              <div className="page-heading flex-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="pill-division" style={{ background: '#2563eb', color: '#fff', fontWeight: 700, padding: '4px 12px', borderRadius: '6px' }}>
                      Mechanical Supply Division
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
                      All 13 Products &amp; Inner Pages Live
                    </span>
                  </div>
                  <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                    13 Products &amp; Inner Pages Manager
                  </h1>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', margin: 0, maxWidth: '820px', lineHeight: 1.5 }}>
                    Here are all 13 products with their dedicated live inner pages. Click <strong>&quot;Replace Photo &amp; Edit Inner Page&quot;</strong> on any product to select from original static photos or upload a camera photo, update titles, and change inner page descriptions.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <a
                    href="http://localhost:3000/division/mechanical-division"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-live-mechanical"
                  >
                    <span>🌐 View Live Mechanical Catalog ↗</span>
                  </a>
                </div>
              </div>

              {/* 13 Products Grid */}
              <div className="mech-grid">
                {mechanical13List.map((product, index) => {
                  const productNumber = index + 1;
                  const liveSlug = product.slug || product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  const liveUrl = `http://localhost:3000/product/${liveSlug}`;

                  return (
                    <div key={product.id || product.slug || index} className="mech-card">
                      {/* Card Header with Number and Status */}
                      <div className="mech-card-top">
                        <span className="mech-badge-num">Product #{productNumber}</span>
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mech-badge-live"
                          title="Click to view live page"
                        >
                          🟢 Live Page ↗
                        </a>
                      </div>

                      {/* Product Image Frame */}
                      <div className="mech-img-frame">
                        <img
                          src={product.image || '/categories/all-fittings.jpeg'}
                          alt={product.title}
                          className="mech-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/categories/all-fittings.jpeg';
                          }}
                        />
                      </div>

                      {/* Product Content */}
                      <div className="mech-card-content">
                        <span className="mech-category-label">
                          {product.category || 'Mechanical Supply'}
                        </span>
                        <h3 className="mech-title" title={product.title}>
                          {product.title}
                        </h3>
                        <p className="mech-description">
                          {product.shortDescription || (product.fullDescription ? product.fullDescription.slice(0, 100) + '...' : 'Heavy-duty industrial mechanical equipment.')}
                        </p>

                        <div className="mech-specs-badge">
                          <span>📌 {product.features?.length || 5} Specifications configured</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mech-card-actions">
                        <button
                          type="button"
                          onClick={() => openEditProductModal(product)}
                          className="btn-mech-primary"
                        >
                          <span>✏️ Replace Photo &amp; Edit Inner Page</span>
                        </button>
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-mech-secondary"
                          title="Open live inner page in new tab"
                        >
                          <span>View ↗</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div className="products-view">
              <div className="page-heading flex-between">
                <div>
                  <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                    Industrial Products Catalog ({products.length})
                  </h1>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '4px 0 0' }}>
                    Add new products, replace photos with real camera uploads, edit specifications, and manage inner pages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddProductModal}
                  className="btn-primary-action"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px' }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>+</span> Add New Product
                </button>
              </div>

              {/* Quick Division Filter Pills */}
              <div className="division-pills-bar">
                <button
                  type="button"
                  onClick={() => setDivisionFilter('all')}
                  className={`div-filter-pill ${divisionFilter === 'all' ? 'active' : ''}`}
                >
                  All Products <span className="pill-count">{products.length}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDivisionFilter('Mechanical Supply Division')}
                  className={`div-filter-pill ${divisionFilter === 'Mechanical Supply Division' ? 'active' : ''}`}
                >
                  Mechanical Division{' '}
                  <span className="pill-count">
                    {products.filter((p) => p.divisionSlug === 'mechanical-division' || p.division.includes('Mechanical')).length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDivisionFilter('Welding Division')}
                  className={`div-filter-pill ${divisionFilter === 'Welding Division' ? 'active' : ''}`}
                >
                  Welding{' '}
                  <span className="pill-count">
                    {products.filter((p) => p.divisionSlug === 'welding-division' || p.division.includes('Welding')).length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDivisionFilter('Electrical Division')}
                  className={`div-filter-pill ${divisionFilter === 'Electrical Division' ? 'active' : ''}`}
                >
                  Electrical{' '}
                  <span className="pill-count">
                    {products.filter((p) => p.divisionSlug === 'electrical-division' || p.division.includes('Electrical')).length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDivisionFilter('Lifting & Material Handling')}
                  className={`div-filter-pill ${divisionFilter === 'Lifting & Material Handling' ? 'active' : ''}`}
                >
                  Lifting{' '}
                  <span className="pill-count">
                    {products.filter((p) => p.divisionSlug === 'lifting-material-handling' || p.division.includes('Lifting')).length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setDivisionFilter('Fasteners Division')}
                  className={`div-filter-pill ${divisionFilter === 'Fasteners Division' ? 'active' : ''}`}
                >
                  Fasteners{' '}
                  <span className="pill-count">
                    {products.filter((p) => p.divisionSlug === 'fasteners-division' || p.division.includes('Fasteners')).length}
                  </span>
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="filter-bar" style={{ marginTop: '14px' }}>
                <input
                  type="text"
                  placeholder="🔍 Search products by title or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  style={{ flex: 1 }}
                />
                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Divisions ({products.length})</option>
                  {divisions.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {divisionFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setDivisionFilter('all')}
                    className="btn-edit-action"
                    style={{ fontSize: '0.80rem' }}
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              <div className="panel-box">
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th style={{ width: '85px' }}>Photo</th>
                        <th>Product Details</th>
                        <th>Division &amp; Family</th>
                        <th>Stock</th>
                        <th>Featured</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td style={{ width: '85px', verticalAlign: 'middle' }}>
                            <div className="product-table-thumb">
                              <img src={p.image} alt={p.title} />
                            </div>
                          </td>
                          <td>
                            <strong style={{ fontSize: '0.94rem', color: '#0f172a' }}>{p.title}</strong>
                            {p.category && (
                              <div style={{ marginTop: '3px' }}>
                                <span className="cat-tag-pill">{p.category}</span>
                              </div>
                            )}
                            {p.shortDescription && (
                              <div className="cell-sub" style={{ marginTop: '4px', maxWidth: '380px' }}>
                                {p.shortDescription}
                              </div>
                            )}
                          </td>
                          <td>
                            <span className="pill-division">{p.division}</span>
                          </td>
                          <td>
                            <span className={`status-pill ${p.inStock ? 'quoted' : 'closed'}`}>
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td>{p.featured ? '⭐ Featured' : '—'}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="action-buttons-wrap" style={{ justifyContent: 'flex-end' }}>
                              <button
                                type="button"
                                onClick={() => openEditProductModal(p)}
                                className="btn-edit-product-prominent"
                                title="Edit product and replace photo"
                              >
                                ✏️ Edit &amp; Replace Photo
                              </button>
                              <a
                                href={`http://localhost:3000/product/${p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-view-live"
                                title="View Live Product Inner Page"
                              >
                                View ↗
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p.id)}
                                className="btn-delete"
                                title="Delete Product"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DIVISIONS & INNER PAGES */}
          {activeTab === 'divisions' && (
            <div className="divisions-view">
              <div className="page-heading flex-between">
                <div>
                  <h1>Divisions &amp; Inner Pages Management</h1>
                  <p>Customize headlines, descriptions, subcategory photos, product ranges, and applications for all division pages.</p>
                </div>
              </div>

              <div className="divisions-grid">
                {divisions.map((div) => (
                  <div key={div.id} className="division-card">
                    <div className="division-card-header">
                      <h3>{div.name}</h3>
                      <span className="count-pill">{div.productCount || 0} products</span>
                    </div>
                    {div.headline && <div className="div-headline-badge">{div.headline}</div>}
                    <p>{div.description || 'Dedicated division providing specialized industrial supplies across Saudi Arabia.'}</p>
                    
                    <div className="division-card-actions">
                      <button
                        type="button"
                        onClick={() => openEditDivisionModal(div)}
                        className="btn-edit-div"
                      >
                        ✏️ Edit Inner Page Details
                      </button>
                      <a
                        href={`http://localhost:3000/products/${div.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="div-link"
                      >
                        View Live Page &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BLOGS & ARTICLES */}
          {activeTab === 'blogs' && (
            <div className="blogs-view">
              <div className="page-heading flex-between">
                <div>
                  <h1>News, Insights &amp; Blogs Management</h1>
                  <p>Publish and update industrial insights, heavy equipment rental guides, and company news.</p>
                </div>
                <button
                  type="button"
                  onClick={openAddBlogModal}
                  className="btn-primary-action"
                >
                  + Add New Article
                </button>
              </div>

              <div className="filter-bar">
                <input
                  type="text"
                  placeholder="Search articles by title or category..."
                  value={blogSearchTerm}
                  onChange={(e) => setBlogSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="panel-box">
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Thumbnail</th>
                        <th>Article Title &amp; Category</th>
                        <th>Author &amp; Read Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.map((b) => (
                        <tr key={b.id}>
                          <td style={{ width: '80px' }}>
                            <div className="blog-thumb-box">
                              <img src={b.image} alt={b.title} />
                            </div>
                          </td>
                          <td>
                            <strong>{b.title}</strong>
                            <div className="cell-sub">
                              <span className="pill-division">{b.category}</span> &bull; {b.date}
                            </div>
                          </td>
                          <td>
                            <div>{b.author}</div>
                            <div className="cell-sub">{b.readTime}</div>
                          </td>
                          <td>
                            <span className={`status-pill ${b.isPublished ? 'quoted' : 'closed'}`}>
                              {b.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons-wrap">
                              <button
                                type="button"
                                onClick={() => openEditBlogModal(b)}
                                className="btn-edit-action"
                              >
                                Edit
                              </button>
                              <a
                                href={`http://localhost:3000/blog/${b.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-view-live"
                              >
                                View
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteBlog(b.id)}
                                className="btn-delete"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COMPANY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="settings-view">
              <div className="page-heading">
                <h1>Company Operational Settings</h1>
                <p>Manage contact info, WhatsApp dispatch numbers, and Saudi legal credentials.</p>
              </div>

              <div className="panel-box" style={{ maxWidth: '780px' }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('Settings saved successfully!');
                  }}
                  className="settings-form"
                >
                  <div className="form-group">
                    <label>Company Trading Name</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>WhatsApp Orders Phone</label>
                      <input
                        type="text"
                        value={settings.whatsappPhone}
                        onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div className="form-group">
                      <label>Official Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Commercial Registration (CR) Number</label>
                    <input
                      type="text"
                      value={settings.crNumber}
                      onChange={(e) => setSettings({ ...settings, crNumber: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label>Operating Address (Kingdom of Saudi Arabia)</label>
                    <textarea
                      rows={3}
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <button type="submit" className="btn-primary-action" style={{ alignSelf: 'flex-start' }}>
                    Save Settings
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= MODAL: EDIT PRODUCT & INNER PAGE ================= */}
      {showProductModal && (
        <div className="modal-backdrop" onClick={() => setShowProductModal(false)}>
          <div
            className="modal-card modal-card-clean"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-clean-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="pill-division" style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#2e3191' }}>
                    {productForm.division || 'Mechanical Supply Division'}
                  </span>
                  {productForm.slug && (
                    <a
                      href={`http://localhost:3000/product/${productForm.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="live-preview-link"
                    >
                      🔗 Open Live Inner Page ↗
                    </a>
                  )}
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {editingProduct ? `Edit Product: ${productForm.title || editingProduct.title}` : 'Add Product'}
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#64748b' }}>
                  Select from existing static photos, upload a real camera photo, and configure inner page details.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="btn-close"
                aria-label="Close Modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="modal-clean-form">
              <div className="modal-clean-body">
                {/* SECTION 1: PHOTO STUDIO */}
                <div className="clean-section-card">
                  <div className="clean-section-title">
                    <span className="step-num">1</span>
                    <div>
                      <strong>Product &amp; Inner Page Photo</strong>
                      <span className="step-subtitle">Click any static photo below to select it, or upload a real photo from your computer.</span>
                    </div>
                  </div>

                  <div className="photo-selection-layout">
                    {/* Active Preview */}
                    <div className="active-preview-box">
                      <div className="active-preview-label">Active Photo Preview</div>
                      <div className="active-preview-img-wrap">
                        <img
                          src={productForm.image || '/categories/all-fittings.jpeg'}
                          alt="Product Preview"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/categories/all-fittings.jpeg';
                          }}
                        />
                      </div>
                      <label className="btn-clean-upload">
                        <span>📤 Upload Real Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleImageFileChange(e, (url) => {
                              setProductForm((prev) => ({
                                ...prev,
                                image: url,
                                imagesText: prev.imagesText ? `${url}\n${prev.imagesText}` : url,
                              }));
                              showToast('Photo uploaded and selected!');
                            })
                          }
                        />
                      </label>
                    </div>

                    {/* 13 Static Photos Picker */}
                    <div className="static-photos-picker">
                      <div className="picker-header">
                        <strong>🖼️ Original 13 Static Catalog Photos (Click to Select):</strong>
                      </div>
                      <div className="static-13-grid">
                        {MECHANICAL_13_STATIC_IMAGES.map((imgItem) => {
                          const isSelected = productForm.image === imgItem.url;
                          return (
                            <div
                              key={imgItem.slug}
                              className={`static-pick-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                setProductForm((prev) => ({
                                  ...prev,
                                  image: imgItem.url,
                                  imagesText: prev.imagesText ? `${imgItem.url}\n${prev.imagesText}` : imgItem.url,
                                }));
                                showToast(`Selected "${imgItem.name}"`);
                              }}
                              title={`Click to use: ${imgItem.name}`}
                            >
                              <div className="static-pick-img-wrap">
                                <img
                                  src={imgItem.url}
                                  alt={imgItem.name}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/categories/all-fittings.jpeg';
                                  }}
                                />
                                {isSelected && <span className="pick-check">✓ ACTIVE</span>}
                              </div>
                              <span className="static-pick-name">{imgItem.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: PRODUCT & INNER PAGE DETAILS */}
                <div className="clean-section-card" style={{ marginTop: '20px' }}>
                  <div className="clean-section-title">
                    <span className="step-num">2</span>
                    <div>
                      <strong>Product &amp; Inner Page Content</strong>
                      <span className="step-subtitle">Configure the title, description, and key specifications shown on the website.</span>
                    </div>
                  </div>

                  <div className="clean-fields-stack">
                    {/* Title */}
                    <div className="form-group">
                      <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                        Product Title / Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Butterfly Valve Lever Handle SS Disc 6 Inch"
                        value={productForm.title}
                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                        className="input-field"
                        style={{ fontSize: '1rem', padding: '10px 14px', fontWeight: 600 }}
                      />
                    </div>

                    {/* Inner Page Full Description */}
                    <div className="form-group" style={{ marginTop: '14px' }}>
                      <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                        Inner Page Description (Appears under the Description Tab on the website)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detailed technical description, material construction, pressure ratings, and industrial applications..."
                        value={productForm.fullDescription}
                        onChange={(e) => setProductForm({ ...productForm, fullDescription: e.target.value })}
                        className="input-field"
                        style={{ fontSize: '0.90rem', lineHeight: 1.5, resize: 'vertical' }}
                      />
                    </div>

                    {/* Specifications Bullet Points */}
                    <div className="form-group" style={{ marginTop: '14px' }}>
                      <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                        Key Specifications &amp; Features (One bullet point per line)
                      </label>
                      <textarea
                        rows={4}
                        placeholder={`6-Inch Industrial Process Control Valve\nDuctile Iron Body with Epoxy Powder Coating\nASTM A351 CF8M (316SS) Disc\nEPDM Resilient Seat for Bidirectional Bubble-Tight Shut-Off\nManual 10-Position Locking Notch Lever Handle`}
                        value={productForm.featuresText}
                        onChange={(e) => setProductForm({ ...productForm, featuresText: e.target.value })}
                        className="input-field"
                        style={{ fontFamily: 'monospace', fontSize: '0.84rem', lineHeight: 1.5, resize: 'vertical' }}
                      />
                      <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                        💡 Each line here creates a clean square bullet point (▪) on the product&apos;s inner page.
                      </span>
                    </div>

                    {/* In Stock toggle */}
                    <div style={{ marginTop: '12px' }}>
                      <label className="checkbox-pill" style={{ cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={productForm.inStock}
                          onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        />
                        <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>🟢 Product In Stock &amp; Ready for Order</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Sticky Footer */}
              <div className="modal-clean-footer">
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Live URL: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>/product/{productForm.slug || 'product-slug'}</code>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button type="button" onClick={() => setShowProductModal(false)} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-clean-save">
                    💾 Save &amp; Update Inner Page
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT DIVISION INNER PAGE ================= */}
      {showDivisionModal && editingDivision && (
        <div className="modal-backdrop">
          <div className="modal-card modal-card-wide">
            <div className="modal-header">
              <div>
                <h2>Edit Division Inner Page Details</h2>
                <div className="modal-subtitle">{divisionForm.name} (/products/{divisionForm.slug})</div>
              </div>
              <button type="button" onClick={() => setShowDivisionModal(false)} className="btn-close">
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveDivision} className="modal-form">
              <div className="form-group">
                <label>Main Headline (Shown on Inner Page) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. INDUSTRIAL MECHANICAL VALVES, PIPES & STRUCTURAL FITTINGS"
                  value={divisionForm.headline}
                  onChange={(e) => setDivisionForm({ ...divisionForm, headline: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Detailed Descriptions (Separate paragraphs by double enter/blank line)</label>
                <textarea
                  rows={5}
                  placeholder="Paragraph 1 about division capabilities...&#10;&#10;Paragraph 2 about quality compliance and standards..."
                  value={divisionForm.descriptionText}
                  onChange={(e) => setDivisionForm({ ...divisionForm, descriptionText: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Division Banner / Feature Image</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={divisionForm.image}
                    onChange={(e) => setDivisionForm({ ...divisionForm, image: e.target.value })}
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <label className="btn-upload-file">
                    {isUploadingImage ? 'Uploading...' : '📁 Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageFileChange(e, (url) => setDivisionForm({ ...divisionForm, image: url }))}
                    />
                  </label>
                </div>
              </div>

              {/* Subcategories (Images & Titles) */}
              <div className="inner-section-box">
                <div className="inner-section-head">
                  <label style={{ fontWeight: 700 }}>Subcategories Photo Cards</label>
                  <button
                    type="button"
                    onClick={() =>
                      setDivisionForm({
                        ...divisionForm,
                        subcategories: [...divisionForm.subcategories, { name: '', image: '' }],
                      })
                    }
                    className="btn-add-inline"
                  >
                    + Add Subcategory
                  </button>
                </div>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Subcategories Section Title (e.g. Mechanical Product Categories)"
                    value={divisionForm.subcategoriesTitle}
                    onChange={(e) => setDivisionForm({ ...divisionForm, subcategoriesTitle: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="dynamic-subcat-list">
                  {divisionForm.subcategories.map((sub, idx) => (
                    <div key={idx} className="subcat-row">
                      <input
                        type="text"
                        placeholder="Subcategory Name (e.g. Industrial Valves)"
                        value={sub.name}
                        onChange={(e) => {
                          const updated = [...divisionForm.subcategories];
                          updated[idx].name = e.target.value;
                          setDivisionForm({ ...divisionForm, subcategories: updated });
                        }}
                        className="input-field"
                        style={{ flex: 1 }}
                      />
                      <input
                        type="text"
                        placeholder="Image URL (/categories/...)"
                        value={sub.image}
                        onChange={(e) => {
                          const updated = [...divisionForm.subcategories];
                          updated[idx].image = e.target.value;
                          setDivisionForm({ ...divisionForm, subcategories: updated });
                        }}
                        className="input-field"
                        style={{ flex: 1 }}
                      />
                      <label className="btn-upload-file" style={{ padding: '8px 12px' }}>
                        📁
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) =>
                            handleImageFileChange(e, (url) => {
                              const updated = [...divisionForm.subcategories];
                              updated[idx].image = url;
                              setDivisionForm({ ...divisionForm, subcategories: updated });
                            })
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = divisionForm.subcategories.filter((_, i) => i !== idx);
                          setDivisionForm({ ...divisionForm, subcategories: updated });
                        }}
                        className="btn-remove-inline"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Range & Applications */}
              <div className="form-row">
                <div className="form-group">
                  <label>Product Range Items (One item per line)</label>
                  <textarea
                    rows={4}
                    placeholder="Gate Valves, Globe Valves, Ball Valves&#10;Check Valves, Butterfly Valves&#10;Seamless Carbon Steel Pipes"
                    value={divisionForm.productRangeText}
                    onChange={(e) => setDivisionForm({ ...divisionForm, productRangeText: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Applications Items (One item per line)</label>
                  <textarea
                    rows={4}
                    placeholder="Oil & Gas Exploration & Production&#10;Petrochemical Refineries&#10;Water Desalination Plants"
                    value={divisionForm.applicationsText}
                    onChange={(e) => setDivisionForm({ ...divisionForm, applicationsText: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Filter Pills / Badges (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Aramco Certified, ASTM Compliant, API Spec 6D, ISO 9001"
                  value={divisionForm.pillsText}
                  onChange={(e) => setDivisionForm({ ...divisionForm, pillsText: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowDivisionModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-action">
                  Save Division Inner Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT BLOG ARTICLE ================= */}
      {showBlogModal && (
        <div className="modal-backdrop">
          <div className="modal-card modal-card-wide">
            <div className="modal-header">
              <h2>{editingBlog ? 'Edit Blog Article' : 'Add New Blog Article'}</h2>
              <button type="button" onClick={() => setShowBlogModal(false)} className="btn-close">
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveBlog} className="modal-form">
              <div className="form-group">
                <label>Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reliable Heavy Equipment Rental Across Saudi Arabia"
                  value={blogForm.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setBlogForm({
                      ...blogForm,
                      title: val,
                      slug: blogForm.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                    });
                  }}
                  className="input-field"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Slug URL (/blog/[slug])</label>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="Heavy Equipment Rental">Heavy Equipment Rental</option>
                    <option value="Industrial Supply">Industrial Supply</option>
                    <option value="Engineering & Procurement">Engineering &amp; Procurement</option>
                    <option value="Safety & Quality">Safety &amp; Quality</option>
                    <option value="Marine & Offshore">Marine &amp; Offshore</option>
                    <option value="Energy & Vision 2030">Energy &amp; Vision 2030</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Subtitle / Secondary Heading</label>
                <input
                  type="text"
                  placeholder="e.g. Why Orient Energy Co. is the Go-To Heavy Equipment Rental Provider"
                  value={blogForm.subtitle}
                  onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Minute Read"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Featured Image (URL or Upload)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="/blog/blog-1.jpg or upload"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <label className="btn-upload-file">
                    {isUploadingImage ? 'Uploading...' : '📁 Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageFileChange(e, (url) => setBlogForm({ ...blogForm, image: url }))}
                    />
                  </label>
                </div>
                {blogForm.image && (
                  <div className="img-preview-row">
                    <img src={blogForm.image} alt="Preview" />
                    <span>Featured Image Preview</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Introduction *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the introduction paragraph of the article..."
                  value={blogForm.introduction}
                  onChange={(e) => setBlogForm({ ...blogForm, introduction: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Fleet & Services Points */}
              <div className="inner-section-box">
                <div className="inner-section-head">
                  <label style={{ fontWeight: 700 }}>Key Capabilities / Fleet Bullet Points</label>
                  <button
                    type="button"
                    onClick={() =>
                      setBlogForm({
                        ...blogForm,
                        fleetPoints: [...blogForm.fleetPoints, { label: '', text: '' }],
                      })
                    }
                    className="btn-add-inline"
                  >
                    + Add Point
                  </button>
                </div>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Section Title (e.g. Fleet and Services:)"
                    value={blogForm.fleetTitle}
                    onChange={(e) => setBlogForm({ ...blogForm, fleetTitle: e.target.value })}
                    className="input-field"
                  />
                </div>
                {blogForm.fleetPoints.map((pt, idx) => (
                  <div key={idx} className="subcat-row">
                    <input
                      type="text"
                      placeholder="Label (e.g. Extensive Fleet)"
                      value={pt.label}
                      onChange={(e) => {
                        const updated = [...blogForm.fleetPoints];
                        updated[idx].label = e.target.value;
                        setBlogForm({ ...blogForm, fleetPoints: updated });
                      }}
                      className="input-field"
                      style={{ width: '200px' }}
                    />
                    <input
                      type="text"
                      placeholder="Description text..."
                      value={pt.text}
                      onChange={(e) => {
                        const updated = [...blogForm.fleetPoints];
                        updated[idx].text = e.target.value;
                        setBlogForm({ ...blogForm, fleetPoints: updated });
                      }}
                      className="input-field"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = blogForm.fleetPoints.filter((_, i) => i !== idx);
                        setBlogForm({ ...blogForm, fleetPoints: updated });
                      }}
                      className="btn-remove-inline"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Why Choose Points */}
              <div className="inner-section-box">
                <div className="inner-section-head">
                  <label style={{ fontWeight: 700 }}>Why Choose Us Highlights</label>
                  <button
                    type="button"
                    onClick={() =>
                      setBlogForm({
                        ...blogForm,
                        whyChoosePoints: [...blogForm.whyChoosePoints, ''],
                      })
                    }
                    className="btn-add-inline"
                  >
                    + Add Highlight
                  </button>
                </div>
                {blogForm.whyChoosePoints.map((pt, idx) => (
                  <div key={idx} className="subcat-row">
                    <input
                      type="text"
                      placeholder="e.g. ISO-certified operations and SAP-driven management."
                      value={pt}
                      onChange={(e) => {
                        const updated = [...blogForm.whyChoosePoints];
                        updated[idx] = e.target.value;
                        setBlogForm({ ...blogForm, whyChoosePoints: updated });
                      }}
                      className="input-field"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = blogForm.whyChoosePoints.filter((_, i) => i !== idx);
                        setBlogForm({ ...blogForm, whyChoosePoints: updated });
                      }}
                      className="btn-remove-inline"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Conclusion *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Closing thoughts and call to action..."
                  value={blogForm.conclusion}
                  onChange={(e) => setBlogForm({ ...blogForm, conclusion: e.target.value })}
                  className="input-field"
                />
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={blogForm.isPublished}
                  onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                />
                <span>Publish Immediately to Website</span>
              </label>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowBlogModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-action">
                  {editingBlog ? 'Save Article Changes' : 'Publish Blog Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Styles */}
      <style jsx>{`
        .admin-wrapper {
          min-height: 100vh;
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .admin-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #0f172a;
          color: #ffffff;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 500;
          z-index: 9999;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.25s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .admin-header {
          height: 64px;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: 1px solid #e2e8f0;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .portal-badge {
          background-color: #e0e7ff;
          color: #2e3191;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .live-site-link {
          font-size: 0.84rem;
          color: #2e3191;
          font-weight: 600;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 6px;
          background-color: #f1f5f9;
          transition: background 0.2s;
        }

        .live-site-link:hover {
          background-color: #e2e8f0;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2e3191;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.82rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .user-name {
          font-size: 0.84rem;
          font-weight: 600;
          color: #0f172a;
        }

        .user-email {
          font-size: 0.72rem;
          color: #64748b;
        }

        .btn-logout {
          background: none;
          border: 1px solid #e2e8f0;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.80rem;
          font-weight: 600;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background-color: #fee2e2;
        }

        .admin-body {
          display: flex;
          flex: 1;
        }

        .admin-sidebar {
          width: 250px;
          background-color: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 14px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 8px;
          border: none;
          background: none;
          color: #475569;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .nav-item.active {
          background-color: #2e3191;
          color: #ffffff;
          font-weight: 600;
        }

        .nav-icon {
          font-size: 1.05rem;
        }

        .badge-count {
          margin-left: auto;
          background: #e2e8f0;
          color: #334155;
          font-size: 0.70rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .nav-item.active .badge-count {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .system-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: #64748b;
          padding: 10px 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
        }

        .admin-content {
          flex: 1;
          padding: 28px 32px;
          max-width: 1400px;
        }

        .page-heading {
          margin-bottom: 24px;
        }

        .page-heading h1 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .page-heading p {
          font-size: 0.88rem;
          color: #64748b;
        }

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #64748b;
        }

        .stat-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
        }

        .stat-val {
          font-size: 1.85rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .stat-hint {
          font-size: 0.76rem;
          color: #94a3b8;
        }

        .panel-box {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .panel-head {
          padding: 18px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panel-head h2 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f172a;
        }

        .btn-link {
          background: none;
          border: none;
          color: #2e3191;
          font-weight: 600;
          font-size: 0.84rem;
          cursor: pointer;
        }

        .filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 240px;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 0.88rem;
          outline: none;
        }

        .filter-select {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.88rem;
          cursor: pointer;
          outline: none;
        }

        .table-wrapper {
          overflow-x: auto;
          width: 100%;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.86rem;
        }

        .data-table th {
          background: #f8fafc;
          padding: 12px 18px;
          font-weight: 600;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }

        .data-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .thumb-box {
          width: 48px;
          height: 48px;
          background: #f8fafc;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8f0;
        }

        .thumb-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .blog-thumb-box {
          width: 64px;
          height: 44px;
          border-radius: 6px;
          overflow: hidden;
          background: #0f172a;
        }

        .blog-thumb-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cell-sub {
          font-size: 0.76rem;
          color: #64748b;
          margin-top: 3px;
        }

        .pill-division {
          display: inline-block;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 0.74rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .status-pill {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          text-transform: capitalize;
        }

        .status-pill.new {
          background: #fef3c7;
          color: #92400e;
        }
        .status-pill.contacted {
          background: #e0e7ff;
          color: #3730a3;
        }
        .status-pill.quoted {
          background: #dcfce7;
          color: #166534;
        }
        .status-pill.closed {
          background: #f1f5f9;
          color: #64748b;
        }

        .select-status {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.78rem;
          border: 1px solid #cbd5e1;
          font-weight: 600;
          cursor: pointer;
        }

        .action-buttons-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-edit-action {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-edit-action:hover {
          background: #e2e8f0;
        }

        .btn-view-live {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          text-decoration: none;
        }

        .btn-wa-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #25d366;
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }

        .btn-wa-action:hover {
          background-color: #1ebe5d;
        }

        .btn-delete {
          background: none;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          cursor: pointer;
        }

        .btn-delete:hover {
          background: #fef2f2;
        }

        .btn-primary-action {
          background-color: #2e3191;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-primary-action:hover {
          background-color: #1f2268;
        }

        .divisions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .division-card {
          background: #ffffff;
          padding: 22px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .division-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .division-card-header h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
        }

        .div-headline-badge {
          font-size: 0.72rem;
          font-weight: 600;
          color: #2e3191;
          background: #e0e7ff;
          padding: 4px 8px;
          border-radius: 6px;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .count-pill {
          background: #f1f5f9;
          color: #475569;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
        }

        .division-card p {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 18px;
        }

        .division-card-actions {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .btn-edit-div {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          padding: 9px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-edit-div:hover {
          background: #e2e8f0;
        }

        .div-link {
          color: #2e3191;
          font-weight: 600;
          font-size: 0.82rem;
          text-decoration: none;
          text-align: center;
        }

        .settings-form {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Modals */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }

        .modal-card {
          background: #ffffff;
          border-radius: 14px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }

        .modal-card-wide {
          max-width: 720px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 12px;
        }

        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .modal-subtitle {
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 2px;
        }

        .btn-close {
          background: none;
          border: none;
          font-size: 1.6rem;
          cursor: pointer;
          color: #64748b;
          line-height: 1;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .btn-upload-file {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-upload-file:hover {
          background: #e2e8f0;
        }

        .img-preview-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
          background: #f8fafc;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .img-preview-row img {
          width: 50px;
          height: 40px;
          object-fit: contain;
          background: #ffffff;
          border-radius: 4px;
        }

        .img-preview-row span {
          font-size: 0.78rem;
          color: #64748b;
        }

        .inner-section-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 16px;
        }

        .inner-section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .btn-add-inline {
          background: #e0e7ff;
          color: #2e3191;
          border: none;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
        }

        .subcat-row {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
          align-items: center;
        }

        .btn-remove-inline {
          background: #fee2e2;
          color: #dc2626;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 700;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.86rem;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 14px;
          border-top: 1px solid #f1f5f9;
          padding-top: 14px;
        }

        .btn-cancel {
          background: none;
          border: 1px solid #cbd5e1;
          padding: 9px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
        }

        /* ---------------- PRETTY PRODUCT MODAL (2-COLUMN ARCHITECTURE) ---------------- */
        .modal-card-xlarge {
          max-width: 1120px !important;
          width: 96% !important;
          max-height: 94vh !important;
          padding: 0 !important;
          background: #ffffff !important;
          border-radius: 16px !important;
          box-shadow: 0 30px 70px -15px rgba(15, 23, 42, 0.45) !important;
          border: 1px solid #cbd5e1 !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
        }

        .modal-header-sticky {
          padding: 20px 28px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 20;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .modal-form-wrapper {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex: 1;
        }

        .modal-body-scroll {
          padding: 24px 28px;
          overflow-y: auto;
          flex: 1;
          background: #f8fafc;
        }

        .modal-footer-sticky {
          padding: 16px 28px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          position: sticky;
          bottom: 0;
          z-index: 20;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.03);
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 28px;
          align-items: start;
        }

        .live-preview-link {
          font-size: 0.74rem;
          font-weight: 700;
          color: #2e3191;
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          padding: 3px 10px;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.18s ease;
        }

        .live-preview-link:hover {
          background: #2e3191;
          color: #ffffff;
        }

        /* ---------------- LEFT COLUMN: PHOTO STUDIO ---------------- */
        .modal-photo-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .section-badge-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 8px;
          border-bottom: 1.5px solid #e2e8f0;
        }

        .section-badge-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #2e3191;
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 800;
          box-shadow: 0 2px 6px rgba(46, 49, 145, 0.3);
        }

        .section-badge-header h3 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        /* Current Active Photo Card */
        .current-photo-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1.5px solid #cbd5e1;
          padding: 16px;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .photo-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .photo-status-badge {
          font-size: 0.74rem;
          font-weight: 700;
          color: #15803d;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.02em;
        }

        .photo-path-hint {
          font-size: 0.72rem;
          color: #64748b;
          font-family: monospace;
          max-width: 190px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .main-photo-frame {
          width: 100%;
          height: 220px;
          background: radial-gradient(circle, #ffffff 60%, #f1f5f9 100%);
          border: 1.5px dashed #94a3b8;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .main-photo-frame img {
          max-width: 92%;
          max-height: 92%;
          object-fit: contain;
          transition: transform 0.22s ease;
        }

        .main-photo-frame:hover img {
          transform: scale(1.04);
        }

        .no-image-placeholder {
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 600;
        }

        /* Big Real Photo Upload Button */
        .btn-upload-real-photo {
          display: flex;
          align-items: center;
          gap: 14px;
          background: linear-gradient(135deg, #1e40af 0%, #2e3191 100%);
          color: #ffffff;
          padding: 13px 18px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(30, 64, 175, 0.25);
          border: 1px solid #1e3a8a;
          user-select: none;
        }

        .btn-upload-real-photo:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(30, 64, 175, 0.35);
          background: linear-gradient(135deg, #1d4ed8 0%, #3730a3 100%);
        }

        .upload-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .upload-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }

        .upload-text-wrap strong {
          font-size: 0.88rem;
          font-weight: 700;
        }

        .upload-text-wrap span {
          font-size: 0.72rem;
          opacity: 0.90;
        }

        .manual-path-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .input-compact {
          font-size: 0.76rem !important;
          padding: 8px 12px !important;
          font-family: monospace;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
        }

        .btn-reset-sample {
          background: #e2e8f0;
          color: #334155;
          border: 1px solid #cbd5e1;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        .btn-reset-sample:hover {
          background: #cbd5e1;
          color: #0f172a;
        }

        /* ---------------- EXISTING STATIC IMAGES VISUAL PICKER ---------------- */
        .static-picker-section {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
        }

        .static-picker-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .static-division-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .static-div-tab {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          padding: 5px 11px;
          border-radius: 18px;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .static-div-tab:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .static-div-tab.active {
          background: #2e3191;
          color: #ffffff;
          border-color: #2e3191;
          box-shadow: 0 2px 6px rgba(46, 49, 145, 0.25);
        }

        .static-images-scroll-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          max-height: 250px;
          overflow-y: auto;
          padding: 6px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
        }

        .static-thumbnail-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          padding: 6px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          transition: all 0.18s ease;
          position: relative;
        }

        .static-thumbnail-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.22);
          transform: translateY(-2px);
        }

        .static-thumbnail-card.is-selected {
          border-color: #16a34a;
          background: #f0fdf4;
          box-shadow: 0 0 0 2.5px rgba(22, 163, 74, 0.4);
        }

        .thumb-img-wrapper {
          width: 100%;
          height: 66px;
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .thumb-img-wrapper img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }

        .selected-badge {
          position: absolute;
          top: 3px;
          right: 3px;
          background: #16a34a;
          color: #ffffff;
          font-size: 0.60rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .thumb-item-name {
          font-size: 0.68rem;
          font-weight: 600;
          color: #334155;
          text-align: center;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Inner Page Gallery Box */
        .gallery-section-box {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
        }

        .gallery-box-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-add-gallery-file {
          background: #e0e7ff;
          color: #2e3191;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 6px;
          cursor: pointer;
          border: 1px solid #c7d2fe;
          transition: all 0.15s ease;
        }

        .btn-add-gallery-file:hover {
          background: #2e3191;
          color: #ffffff;
        }

        /* ---------------- RIGHT COLUMN: PRODUCT INFO & CARDS ---------------- */
        .modal-info-col {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .info-section-card {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
        }

        .input-lg {
          font-size: 1rem !important;
          font-weight: 600 !important;
          padding: 12px 14px !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
        }

        .checkbox-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          border: 1.5px solid #cbd5e1;
          padding: 9px 18px;
          border-radius: 20px;
          font-size: 0.84rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }

        .checkbox-pill:hover {
          background: #e2e8f0;
          border-color: #94a3b8;
        }

        .checkbox-pill input[type="checkbox"] {
          width: 17px;
          height: 17px;
          accent-color: #2e3191;
          cursor: pointer;
        }

        .btn-save-product-primary {
          background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
          color: #ffffff;
          font-size: 0.94rem;
          font-weight: 700;
          padding: 11px 26px;
          border-radius: 8px;
          border: 1px solid #166534;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.28);
          transition: all 0.18s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-save-product-primary:hover {
          background: linear-gradient(135deg, #166534 0%, #15803d 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(22, 163, 74, 0.38);
        }

        /* ---------------- CATALOG TABLE & DIVISION PILLS BAR ---------------- */
        .division-pills-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
          padding: 12px 16px;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .div-filter-pill {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 7px 15px;
          border-radius: 20px;
          font-size: 0.80rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }

        .div-filter-pill:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #94a3b8;
        }

        .div-filter-pill.active {
          background: #2e3191;
          color: #ffffff;
          border-color: #2e3191;
          box-shadow: 0 2px 8px rgba(46, 49, 145, 0.25);
        }

        .div-filter-pill .pill-count {
          background: rgba(0, 0, 0, 0.08);
          color: inherit;
          padding: 1px 7px;
          border-radius: 10px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .div-filter-pill.active .pill-count {
          background: rgba(255, 255, 255, 0.25);
        }

        .product-table-thumb {
          width: 70px;
          height: 70px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 4px;
        }

        .product-table-thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .cat-tag-pill {
          background: #f1f5f9;
          color: #475569;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
        }

        .btn-edit-product-prominent {
          background: #eef2ff;
          color: #2e3191;
          border: 1.5px solid #c7d2fe;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: 6px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.18s ease;
        }

        .btn-edit-product-prominent:hover {
          background: #2e3191;
          color: #ffffff;
          border-color: #2e3191;
          box-shadow: 0 3px 10px rgba(46, 49, 145, 0.25);
        }

        .btn-view-live {
          background: #f8fafc;
          color: #0284c7;
          border: 1px solid #bae6fd;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 7px 11px;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.15s ease;
        }

        .btn-view-live:hover {
          background: #e0f2fe;
          color: #0369a1;
        }

        .action-buttons-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ================= 13 MECHANICAL PRODUCTS VIEW ================= */
        .mechanical-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .btn-live-mechanical {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          background: #ffffff;
          border: 1.5px solid #2563eb;
          color: #2563eb;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          transition: all 0.18s ease;
          box-shadow: 0 2px 6px rgba(37, 99, 235, 0.1);
        }

        .btn-live-mechanical:hover {
          background: #2563eb;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }

        .mech-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 1200px) {
          .mech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .mech-grid {
            grid-template-columns: 1fr;
          }
        }

        .mech-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .mech-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
          border-color: #93c5fd;
        }

        .mech-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
          background: #f8fafc;
        }

        .mech-badge-num {
          background: #2563eb;
          color: #ffffff;
          font-size: 0.74rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.04em;
        }

        .mech-badge-live {
          color: #16a34a;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          background: #f0fdf4;
          padding: 3px 9px;
          border-radius: 6px;
          border: 1px solid #bbf7d0;
          transition: background 0.15s ease;
        }

        .mech-badge-live:hover {
          background: #dcfce7;
        }

        .mech-img-frame {
          height: 190px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .mech-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .mech-card:hover .mech-img {
          transform: scale(1.04);
        }

        .mech-card-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mech-category-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .mech-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px 0;
          line-height: 1.35;
        }

        .mech-description {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.45;
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .mech-specs-badge {
          margin-top: auto;
          font-size: 0.76rem;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 5px 10px;
          border-radius: 6px;
          display: inline-block;
          align-self: flex-start;
        }

        .mech-card-actions {
          display: flex;
          gap: 8px;
          padding: 14px 16px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
        }

        .btn-mech-primary {
          flex: 1;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 10px 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
          transition: all 0.18s ease;
        }

        .btn-mech-primary:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
          transform: translateY(-1px);
        }

        .btn-mech-secondary {
          background: #ffffff;
          color: #0284c7;
          border: 1.5px solid #bae6fd;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 10px 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .btn-mech-secondary:hover {
          background: #e0f2fe;
          color: #0369a1;
          border-color: #7dd3fc;
        }

        /* ================= CLEAN MODAL STYLES ================= */
        .modal-card-clean {
          max-width: 900px !important;
          width: 95%;
          max-height: 90vh;
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .modal-clean-header {
          padding: 20px 24px;
          background: #ffffff;
          border-bottom: 1.5px solid #e2e8f0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .modal-clean-form {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }

        .modal-clean-body {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .clean-section-card {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
        }

        .clean-section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .clean-section-title strong {
          font-size: 1.05rem;
          color: #0f172a;
          display: block;
        }

        .step-subtitle {
          font-size: 0.78rem;
          color: #64748b;
          display: block;
        }

        .photo-selection-layout {
          display: flex;
          gap: 20px;
          align-items: stretch;
        }

        @media (max-width: 768px) {
          .photo-selection-layout {
            flex-direction: column;
          }
        }

        .active-preview-box {
          width: 200px;
          flex-shrink: 0;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .active-preview-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #16a34a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .active-preview-img-wrap {
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          padding: 6px;
        }

        .active-preview-img-wrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .btn-clean-upload {
          width: 100%;
          background: #eff6ff;
          color: #2563eb;
          border: 1.5px solid #bfdbfe;
          border-radius: 8px;
          padding: 9px 12px;
          font-size: 0.82rem;
          font-weight: 700;
          text-align: center;
          cursor: pointer;
          transition: all 0.15s ease;
          display: block;
        }

        .btn-clean-upload:hover {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        .static-photos-picker {
          flex: 1;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .picker-header {
          font-size: 0.82rem;
          color: #334155;
        }

        .static-13-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          max-height: 240px;
          overflow-y: auto;
          padding-right: 4px;
        }

        @media (max-width: 600px) {
          .static-13-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .static-pick-card {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 6px;
          cursor: pointer;
          background: #ffffff;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .static-pick-card:hover {
          border-color: #93c5fd;
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .static-pick-card.selected {
          border-color: #16a34a;
          background: #f0fdf4;
          box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
        }

        .static-pick-img-wrap {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .static-pick-img-wrap img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .pick-check {
          position: absolute;
          top: 0;
          right: 0;
          background: #16a34a;
          color: #ffffff;
          font-size: 0.60rem;
          font-weight: 800;
          padding: 2px 5px;
          border-radius: 4px;
        }

        .static-pick-name {
          font-size: 0.70rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 4px;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .clean-fields-stack {
          display: flex;
          flex-direction: column;
        }

        .modal-clean-footer {
          padding: 16px 24px;
          background: #ffffff;
          border-top: 1.5px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          bottom: 0;
          z-index: 10;
        }

        .btn-clean-save {
          background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
          color: #ffffff;
          border: none;
          font-size: 0.94rem;
          font-weight: 700;
          padding: 11px 26px;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.28);
          transition: all 0.18s ease;
        }

        .btn-clean-save:hover {
          background: linear-gradient(135deg, #166534 0%, #15803d 100%);
          box-shadow: 0 6px 18px rgba(22, 163, 74, 0.38);
          transform: translateY(-1px);
        }

        /* Responsive Mobile Styles */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .modal-form-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .admin-header {
            padding: 0 16px;
          }
          .mobile-toggle {
            display: inline-block !important;
          }
          .user-info, .portal-badge {
            display: none !important;
          }
          .admin-sidebar {
            position: fixed;
            top: 64px;
            bottom: 0;
            left: 0;
            z-index: 99;
            transform: translateX(-100%);
            transition: transform 0.28s ease;
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
          }
          .admin-sidebar.open {
            transform: translateX(0) !important;
          }
          .admin-content {
            padding: 20px 16px !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
          .divisions-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
