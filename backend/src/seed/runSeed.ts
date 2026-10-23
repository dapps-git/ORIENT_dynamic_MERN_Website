import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Service } from '../models/Service';
import { AdminUser } from '../models/AdminUser';
import { CompanySetting } from '../models/CompanySetting';
import { Blog } from '../models/Blog';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orient_energy';

const divisions = [
  {
    name: 'Mechanical Supply Division',
    slug: 'mechanical-division',
    headline: 'Industrial Mechanical Products Supplier in Saudi Arabia',
    description: 'Orient Energy Trading Company supplies a comprehensive range of industrial mechanical products designed to meet demanding requirements.',
    detailedDescriptions: [
      'Orient Energy Trading Company, we supply a comprehensive range of industrial mechanical products designed to meet the demanding requirements of the Oil & Gas, Petrochemical, Power, Marine, Construction, and Manufacturing industries across Saudi Arabia.',
      'Our product portfolio includes valves, flanges, pipe fittings, fasteners, bearings, gaskets, seals, hydraulic components, industrial hoses, mechanical tools, and maintenance supplies sourced from globally recognized manufacturers. With a strong sourcing network, competitive pricing, and dependable delivery, we help contractors, EPC companies, and industrial facilities keep their operations running efficiently and reliably.',
    ],
    image: '/categories/mechanical-supply-division.png',
    productRangeTitle: 'Product Range',
    productRange: [
      'Industrial Valves (Gate, Globe, Ball, Butterfly, Check Valves)',
      'Pipes & Tubes (Carbon Steel, Stainless Steel, Alloy Steel)',
      'Flanges (Weld Neck, Slip-On, Blind, Threaded)',
      'Pipe Fittings (Tee, Coupling, Reducers, Bushings, End Caps)',
      'Gaskets & Sealing Solutions',
      'Pumps & Compressors',
      'Electric, Pneumatic & Hydraulic Actuators',
      'Hammer Unions & High-Pressure Fittings',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Oil & Gas Facilities',
      'Pipeline Projects',
      'Refineries',
      'Petrochemical Industries',
      'Water Treatment & Power Plants',
      'Manufacturing & Fabrication Yards',
    ],
    order: 1,
    featured: true,
  },
  {
    name: 'Welding Division',
    slug: 'welding-division',
    headline: 'Welding Equipment, Systems & Consumables Supplier in Saudi Arabia',
    description: 'We supply high-performance welding machines, torches, regulators, electrodes, and safety apparel for heavy industrial welding.',
    detailedDescriptions: [
      'We supply high-performance welding machines, torches, regulators, electrodes, filler wires, and safety apparel designed for heavy industrial welding, structural fabrication, pipeline construction, and maintenance projects throughout Saudi Arabia.',
      'Our products meet stringent international standards including AWS, ASME, and ISO to ensure weld integrity, operator safety, and operational excellence.',
    ],
    image: '/categories/welding-safety.jpg',
    subcategoriesTitle: 'Sub-Categories',
    subcategories: [
      { name: 'Gas Cutting & Heating Equipment' },
      { name: 'Regulators & Flowmeters' },
      { name: 'Torches, Handles & Attachments' },
      { name: 'Welding Helmets, PAPR & Face Shields' },
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'SMAW, GMAW (MIG), GTAW (TIG) and SAW Welding Machines',
      'Victor EDGE 2.0 Gas Cutting & Heating Outfits',
      'Welding Regulators & Flowmeters',
      'Welding Helmets with Auto-Darkening & PAPR Systems',
      'Arc Flash Face Shields & Safety Glasses',
      'Welding Electrodes, MIG Wires & TIG Rods',
      'Anti-Spatter Sprays, Gauges & Welding Accessories',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Pipeline Construction & Field Welding',
      'Structural Steel Fabrication Yards',
      'Refinery & Petrochemical Maintenance',
      'Shipyard & Offshore Rig Repair',
      'Heavy Equipment Maintenance',
    ],
    order: 2,
    featured: true,
  },
  {
    name: 'Electrical Division',
    slug: 'electrical-division',
    headline: 'Industrial Electrical, Power Distribution & Automation Supplier in Saudi Arabia',
    description: 'Orient Energy supplies premium industrial electrical components, power distribution equipment, switchgear, automation systems, and uninterrupted power supply (UPS) units.',
    detailedDescriptions: [
      'Orient Energy supplies premium industrial electrical components, power distribution equipment, switchgear, automation systems, and uninterrupted power supply (UPS) units for industrial plants, utilities, and commercial infrastructure.',
      'Partnering with global brands like Schneider Electric, ABB, and Eaton, we deliver certified low and medium voltage solutions engineered for extreme desert operating temperatures.',
    ],
    image: '/categories/electrical-ups-systems.jpg',
    subcategoriesTitle: 'Electrical Sub-Categories',
    subcategories: [
      { name: 'Control & Automation Components', image: '/products/subcategories/elec-control-automation.jpg' },
      { name: 'Lighting Systems', image: '/products/subcategories/elec-lighting-systems.jpg' },
      { name: 'Switchgear & Power Distribution Parts', image: '/products/subcategories/elec-switchgear-parts.jpg' },
      { name: 'UPS Systems', image: '/products/subcategories/elec-ups-systems.jpg' },
    ],
    order: 3,
    featured: true,
  },
  {
    name: 'Lifting & Material Handling',
    slug: 'lifting-material-handling',
    headline: 'Lifting Equipment Supplier in Saudi Arabia',
    description: 'Orient Energy Co. supplies lifting equipment and material handling solutions for industrial lifting operations, cargo handling, offshore projects, logistics operations, and construction industries.',
    detailedDescriptions: [
      'Orient Energy Co. supplies lifting equipment and material handling solutions for industrial lifting operations, cargo handling, offshore projects, logistics operations, and construction industries.',
    ],
    image: '/categories/lifting-material-handling.jpg',
    productRangeTitle: 'Product Range',
    productRange: [
      'Chain Blocks',
      'Chain Hoists',
      'Lifting Trolleys',
      'Chains & Wire Ropes',
      'Steel Wire Rope Sling Assemblies',
      'Hooks & Shackles',
      'Lifting Clamps',
      'Fall Protection Equipment',
      'Snatch Blocks',
      'Fixed & Moving Pulleys',
      'Web Slings & Cargo Accessories',
    ],
    order: 4,
    featured: true,
  },
  {
    name: 'Power System',
    slug: 'power-system',
    headline: 'Industrial Power System Supplier in Saudi Arabia',
    description: 'We provide industrial power systems and energy support equipment designed for project sites, industrial operations, rigs, and infrastructure developments.',
    detailedDescriptions: [
      'We provide industrial power systems and energy support equipment designed for project sites, industrial operations, rigs, and infrastructure developments.',
    ],
    image: '/categories/power-system.jpg',
    order: 5,
    featured: true,
  },
  {
    name: 'Auxiliary Systems',
    slug: 'auxiliary-systems',
    headline: 'Industrial Auxiliary Equipment Supplier in Saudi Arabia',
    description: 'Orient Energy Co. supplies auxiliary systems and operational support equipment for industrial camps, offshore facilities, and project site operations across Saudi Arabia.',
    detailedDescriptions: [
      'Orient Energy Co. supplies auxiliary systems and operational support equipment for industrial camps, offshore facilities, and project site operations across Saudi Arabia.',
    ],
    image: '/categories/auxiliary-systems.jpg',
    order: 6,
    featured: false,
  },
  {
    name: 'Marine Division',
    slug: 'marine-division',
    headline: 'Marine & Offshore Products Supplier in Saudi Arabia',
    description: 'Our marine division supplies marine-grade products and offshore operational equipment designed for harsh maritime environments and offshore industrial applications.',
    detailedDescriptions: [
      'Our marine division supplies marine-grade products and offshore operational equipment designed for harsh maritime environments and offshore industrial applications.',
    ],
    image: '/categories/marine-division.jpg',
    order: 7,
    featured: true,
  },
  {
    name: 'Steel & Structural Materials Division',
    slug: 'steel-structural-materials-division',
    headline: 'Structural Steel & Industrial Materials Supplier in Saudi Arabia',
    description: 'We supply high-grade structural steel, carbon steel pipes, fittings, flanges, and fabrication materials for heavy construction and industrial infrastructure.',
    detailedDescriptions: [
      'We supply high-grade structural steel, carbon steel pipes, fittings, flanges, and fabrication materials for heavy construction and industrial infrastructure.',
    ],
    image: '/categories/steel-structural-materials-division.jpg',
    order: 8,
    featured: false,
  },
  {
    name: 'Coatings & Surface Protection Division',
    slug: 'coatings-surface-protection',
    headline: 'Advanced Industrial & Protective Coating Solutions for Saudi Arabia',
    description: 'Orient Energy provides a comprehensive range of industrial coatings, protective paints, corrosion control systems, and surface protection solutions across Saudi Arabia.',
    detailedDescriptions: [
      'Orient Energy provides a comprehensive range of industrial coatings, protective paints, corrosion control systems, and surface protection solutions across Saudi Arabia.',
      'Our Coatings & Surface Protection Division serves the oil & gas, petrochemical, power generation, marine, construction, manufacturing, and infrastructure sectors with high-performance coating systems designed for demanding environments.',
    ],
    image: '/categories/coatings-surface-protection.png',
    subcategoriesTitle: 'Coatings Sub-Categories',
    subcategories: [
      { name: 'Fireproofing & Protective Systems', image: '/products/subcategories/coat-fireproofing.jpg' },
      { name: 'Floor Coatings & Surface Protection', image: '/products/subcategories/coat-floor-coatings.jpg' },
      { name: 'Industrial Coatings', image: '/products/subcategories/coat-industrial-coatings.jpg' },
      { name: 'Marine Coatings' },
      { name: 'Solvents, Thinners & Surface Preparation Materials', image: '/products/subcategories/coat-solvents-thinners.jpg' },
    ],
    order: 9,
    featured: true,
  },
  {
    name: 'Pumps & Motors Division',
    slug: 'pumps-motors',
    headline: 'Industrial Pumps & Electric Motors Supplier in Saudi Arabia',
    description: 'Orient Energy Co. supplies high-performance industrial pumps, electric motors, compressors, and fluid management systems designed for oil & gas, petrochemical, marine, and industrial applications.',
    detailedDescriptions: [
      'Orient Energy Co. supplies high-performance industrial pumps, electric motors, compressors, and fluid management systems designed for oil & gas, petrochemical, marine, and industrial applications across Saudi Arabia.',
    ],
    image: '/categories/pumps-motors.jpg',
    order: 10,
    featured: true,
  },
  {
    name: 'Fasteners Division',
    slug: 'fasteners-division',
    headline: 'Industrial Fasteners Supplier in Saudi Arabia',
    description: 'Orient Energy Co. supplies high-quality industrial fasteners for oil & gas projects, construction industries, fabrication facilities, marine operations, and heavy engineering.',
    detailedDescriptions: [
      'Orient Energy Co. supplies high-quality industrial fasteners for oil & gas projects, construction industries, fabrication facilities, marine operations, infrastructure developments, and heavy engineering sectors across Saudi Arabia.',
    ],
    image: '/categories/fasteners.jpg',
    subcategoriesTitle: 'Fasteners Sub-Categories',
    subcategories: [
      { name: 'Anchors', image: '/products/subcategories/fast-anchors.jpg' },
      { name: 'Bolts', image: '/products/subcategories/fast-bolts.jpg' },
      { name: 'Nuts', image: '/products/subcategories/fast-nuts.jpg' },
      { name: 'Screws', image: '/products/subcategories/fast-screws.jpg' },
      { name: 'Special Fasteners', image: '/products/subcategories/fast-special-fasteners.jpg' },
      { name: 'Stud Bolts', image: '/products/subcategories/fast-stud-bolts.jpg' },
    ],
    order: 11,
    featured: false,
  },
];

const sampleProducts = [
  // 1. Mechanical Supply Division (All 13 Products)
  {
    title: 'Black-Coated Steel Pipe Flanges Threaded',
    slug: 'black-coated-steel-pipe-flanges-threaded',
    divisionSlug: 'mechanical-division',
    categoryName: 'Flanges & Pipe Connections',
    image: '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png',
    images: ['/products/mechanical/black-coated-steel-pipe-flanges-threaded.png'],
    shortDescription: 'Industrial threaded black-coated steel pipe flanges ASME B16.5.',
    fullDescription: 'High-pressure threaded carbon steel flanges featuring a corrosion-resistant black protective finish. Manufactured to ASME B16.5 and ASTM A105 standards for severe industrial process piping, refineries, and petrochemical utility lines.',
    features: [
      'High Pressure ASME B16.5 Standard',
      'Anti-Corrosive Black Protective Coating',
      'Threaded Class 150/300/600 Pressure Ratings',
      'Carbon Steel ASTM A105 / A350 Material',
      'Complete MTR (Mill Test Report) Traceability',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Breathing Hoses',
    slug: 'breathing-hoses',
    divisionSlug: 'mechanical-division',
    categoryName: 'Hoses, Hammer Unions & Rig Supplies',
    image: '/products/mechanical/breathing-hoses.png',
    images: ['/products/mechanical/breathing-hoses.png'],
    shortDescription: 'Industrial air breathing supply hoses with quick release couplers and manifolds.',
    fullDescription: 'Certified high-performance industrial breathing air hose assembly designed for personnel safety in confined spaces, hazardous gas environments, and rig maintenance operations across Saudi industrial sites.',
    features: [
      'Low Pressure & High Pressure Hoses',
      'Quick Release Couplers',
      'Manifolds',
      'CGA Connectors',
      'Isolation Valves',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Butterfly Valve',
    slug: 'butterfly-valve',
    divisionSlug: 'mechanical-division',
    categoryName: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve.png',
    images: ['/products/mechanical/butterfly-valve.png'],
    shortDescription: 'Resilient seated wafer and lug type butterfly valves for industrial flow control.',
    fullDescription: 'Industrial bidirectional butterfly valves engineered for water, oil, gas, and utility piping systems. Features a ductile iron or cast steel body, resilient EPDM or Viton seat, and smooth quarter-turn operation.',
    features: [
      'Wafer and Lug Type Body Styles',
      'API 609 / ASME B16.34 Compliant Design',
      'Resilient Seated & High Performance Disc',
      'Manual Lever, Gear Operator & Actuator Ready',
      'Bubble-Tight Bidirectional Shut-Off',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Butterfly Valve Lever Handle SS Disc 3',
    slug: 'butterfly-valve-lever-handle-ss-disc-3',
    divisionSlug: 'mechanical-division',
    categoryName: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png'],
    shortDescription: '3-inch stainless steel disc butterfly valve with ergonomic lever handle.',
    fullDescription: 'Precision 3" wafer butterfly valve equipped with a durable 316 stainless steel investment cast disc, reliable 10-position locking notch plate, and bubble-tight shut-off for aggressive fluid management.',
    features: [
      '3-Inch Nominal Bore Diameter',
      'Stainless Steel 316 Investment Cast Disc',
      'Ergonomic 10-Position Locking Lever Handle',
      'EPDM / NBR Replaceable Liner',
      'Working Pressure up to 16 Bar (232 PSI)',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Butterfly Valve Lever Handle SS Disc 4',
    slug: 'butterfly-valve-lever-handle-ss-disc-4',
    divisionSlug: 'mechanical-division',
    categoryName: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png'],
    shortDescription: '4-inch stainless steel disc butterfly valve with lever control.',
    fullDescription: 'Heavy-duty 4" industrial wafer valve engineered for water treatment plants, HVAC chillers, and petrochemical cooling systems. Features polished stainless disc edges to prolong liner life.',
    features: [
      '4-Inch Heavy-Duty Industrial Wafer Valve',
      'Stainless Steel 316 Disc with Polished Edges',
      'Rugged Lever Handle with Visual Position Indicator',
      'Pinless Shaft Connection Preventing Leakage',
      'Tested to API 598 Pressure Standards',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Butterfly Valve Lever Handle SS Disc 6',
    slug: 'butterfly-valve-lever-handle-ss-disc-6',
    divisionSlug: 'mechanical-division',
    categoryName: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png'],
    shortDescription: '6-inch high-performance butterfly valve with stainless steel disc and lever.',
    fullDescription: 'Process-grade 6" butterfly valve featuring a ductile iron epoxy-coated body, blow-out proof stainless stem, and ISO 5211 direct mounting pad for future pneumatic or electric actuation.',
    features: [
      '6-Inch Industrial Process Control Valve',
      'Ductile Iron Body with Epoxy Powder Coating',
      'Stainless Steel Disc for Aggressive Fluids',
      'Blow-out Proof Stem with PTFE Bushings',
      'Direct Mount ISO 5211 Actuator Flange',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Butterfly Valve Lever Handle SS Disc 8',
    slug: 'butterfly-valve-lever-handle-ss-disc-8',
    divisionSlug: 'mechanical-division',
    categoryName: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png',
    images: ['/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png'],
    shortDescription: '8-inch industrial isolation butterfly valve with SS316 disc.',
    fullDescription: 'High-capacity 8" isolation butterfly valve engineered for main process headers, cooling water loops, and wastewater discharge in refineries and heavy industrial facilities.',
    features: [
      '8-Inch Flanged / Wafer Isolation Valve',
      'Heavy Industrial Duty Gear or Lever Handle',
      'Dual Shaft O-ring Stem Sealing',
      'Suitable for Water, Glycol, Slurries & Hydrocarbons',
      'Aramco & SABIC Plant Approved Specifications',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Hydraulic Hoses Fittings & Adaptors',
    slug: 'hydraulic-hoses-fittings-adaptors',
    divisionSlug: 'mechanical-division',
    categoryName: 'Hoses, Hammer Unions & Rig Supplies',
    image: '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
    images: ['/products/mechanical/hydraulic-hoses-fittings-adaptors.png'],
    shortDescription: 'High-pressure hydraulic hoses with crimped end fittings and adaptors.',
    fullDescription: 'Complete hydraulic hose assemblies engineered for extreme pressures up to 6,000 PSI. Supplied with standard BSP, JIC, NPT, and ORFS fittings, complete with hydrostatic pressure testing certification.',
    features: [
      'High Pressure Wire Braid & Spiral Hoses (1SN, 2SN, 4SP, 4SH)',
      'BSP, JIC, NPT & ORFS Standard Crimp Fittings',
      'Abrasion and Weather Resistant Outer Covers',
      'Quick Disconnect Couplings & High-Pressure Swivels',
      'Custom Crimping & Pressure Testing Certification',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Industrial & Large Bore Hoses',
    slug: 'industrial-large-bore-hoses',
    divisionSlug: 'mechanical-division',
    categoryName: 'Hoses, Hammer Unions & Rig Supplies',
    image: '/products/mechanical/industrial-large-bore-hoses.png',
    images: ['/products/mechanical/industrial-large-bore-hoses.png'],
    shortDescription: 'Heavy-duty industrial large bore suction and discharge hoses.',
    fullDescription: 'Reinforced industrial large bore hoses designed for mud transfer, crude oil suction/discharge, drilling rig supply, chemical transport, and bulk dry cement loading across Saudi operations.',
    features: [
      'Composite, Rubber & Stainless Steel Corrugated Hoses',
      'Sizes from 2-Inch to 12-Inch Diameter',
      'Built for Mud, Oil, Chemical & Water Suction/Discharge',
      'Camlock, Hammer Union & Flanged End Terminations',
      'Electrical Continuity Grounding Available',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Industrial Gasket and Seals',
    slug: 'industrial-gasket-and-seals',
    divisionSlug: 'mechanical-division',
    categoryName: 'Gaskets & Sealing Solutions',
    image: '/products/mechanical/industrial-gasket-and-seals.png',
    images: ['/products/mechanical/industrial-gasket-and-seals.png'],
    shortDescription: 'Spiral wound, RTJ, and non-asbestos industrial gaskets and elastomeric seals.',
    fullDescription: 'Engineered sealing solutions designed to withstand extreme thermal cycling, corrosive chemicals, and high pipeline pressures. Certified to ASME B16.20 and API 6A standards.',
    features: [
      'Spiral Wound Gaskets (316SS with Graphite/PTFE Filler)',
      'Ring Type Joint (RTJ) Gaskets for High Pressure Flanges',
      'Non-Asbestos Fiber Sheet & Custom Cut Gaskets',
      'EPDM, Viton, NBR & Silicone O-Rings and Mechanical Seals',
      'Fire-Safe API 607 Compliant Sealing Solutions',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Isolation Valve, Ball Valve Steam High Temperature Ball Valve',
    slug: 'isolation-valve-ball-valve-steam-high-temperature-ball-valve',
    divisionSlug: 'mechanical-division',
    categoryName: 'Valves, Fittings & Tubing',
    image: '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png',
    images: ['/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png'],
    shortDescription: 'High-temperature forged steel 3-piece ball valve for steam isolation.',
    fullDescription: 'Heavy-duty forged 3-piece ball valve designed for high-pressure steam distribution, thermal oil circuits, and boiler feed lines. Rated up to 450°C with fire-safe certified construction.',
    features: [
      'Forged Steel 3-Piece Bolted Body Construction',
      'Metal-to-Metal & PEEK Seated for Steam Service',
      'Operating Temperatures up to 450°C (842°F)',
      'Full Bore Design Minimizing Pressure Drops',
      'API 6D, Firesafe API 607 Tested & Certified',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Micro Linear Actuators',
    slug: 'micro-linear-actuators',
    divisionSlug: 'mechanical-division',
    categoryName: 'Actuators & Control Components',
    image: '/products/mechanical/micro-linear-actuators.png',
    images: ['/products/mechanical/micro-linear-actuators.png'],
    shortDescription: 'Precision electric micro linear actuators for industrial automation.',
    fullDescription: 'Compact and reliable DC linear stroke actuators for dampers, miniature valve positioning, access panel hatches, and industrial automation equipment in harsh ambient conditions.',
    features: [
      'High Precision Electric Linear Stroke Drive',
      'Compact Form Factor for Space-Constrained Industrial Automation',
      'IP65 / IP66 Dust and Water Ingress Protection',
      'Built-in Adjustable Limit Switches & Position Feedback',
      '12V / 24V DC Industrial Operating Voltage',
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'Carbon Steel Seamless & ERW Pipes',
    slug: 'carbon-steel-seamless-erw-pipes',
    divisionSlug: 'mechanical-division',
    categoryName: 'Pipes & Tubes',
    image: '/products/mechanical/carbon-steel-seamless-erw-pipes.png',
    images: ['/products/mechanical/carbon-steel-seamless-erw-pipes.png'],
    shortDescription: 'ASTM A106 Grade B and API 5L carbon steel seamless and ERW pipes.',
    fullDescription: 'Full schedule heavy wall carbon steel piping stock for oil & gas transport, refinery headers, structural pilings, and plant utilities. Supplied with complete mill test certificates.',
    features: [
      'ASTM A106 Grade B / API 5L Grade B & X-Grades',
      'Schedules SCH 40, SCH 80, SCH 160 & XXS',
      'Sizes ranging from 1/2" up to 36" Diameter',
      'Beveled and Plain Ends with Protective Varnishing',
      'Full Hydrostatic Testing and NDT Inspection Certified',
    ],
    inStock: true,
    isFeatured: true,
  },
  // 2. Welding Division
  {
    title: 'Contender EDGE 2.0 Gas Outfit',
    slug: 'contender-edge-2-0',
    divisionSlug: 'welding-division',
    categoryName: 'Gas Systems',
    image: '/products/welding/contender-edge-2-0.png',
    images: ['/products/welding/contender-edge-2-0.png'],
    shortDescription: 'Heavy-duty oxy-fuel cutting and welding outfit.',
    fullDescription: 'Features ESS42 series regulators, torch handle with built-in flashback arrestors, and cutting attachment.',
    features: ['ESS42 High-Capacity Regulators', 'Built-in Flashback Arrestors', 'Cuts up to 8" steel with optional tips'],
    inStock: true,
    isFeatured: true,
  },
  {
    title: '280PL Series Welding Helmet Lift Front',
    slug: '280pl-series-welding-helmet',
    divisionSlug: 'welding-division',
    categoryName: 'Safety Helmets',
    image: '/products/welding/280pl-series-welding-helmet.png',
    images: ['/products/welding/280pl-series-welding-helmet.png'],
    shortDescription: 'Lightweight industrial welding helmet with lift front.',
    fullDescription: 'Durable thermoplastic shell with flip-up front for easy inspection and grinding operations.',
    features: ['Lightweight Thermoplastic Shell', 'Lift-Front Inspection Filter', 'Extended Neck Coverage'],
    inStock: true,
    isFeatured: false,
  },
  // 3. Electrical Division
  {
    title: 'Acti9 Miniature Circuit Breaker C60H-DC',
    slug: 'acti9-mcb-c60h-dc-10a',
    divisionSlug: 'electrical-division',
    categoryName: 'Circuit Breakers',
    image: '/products/electrical/acti9-mcb-c60h-dc-10a.png',
    images: ['/products/electrical/acti9-mcb-c60h-dc-10a.png'],
    shortDescription: 'Direct current miniature circuit breaker for industrial panels.',
    fullDescription: 'Multi-standard DC circuit breaker providing overload and short-circuit protection for photovoltaic and UPS systems.',
    features: ['10A DC Multi-standard Breaker', 'High Breaking Capacity 10kA', 'VisiSafe & VisiTrip Indicators'],
    inStock: true,
    isFeatured: true,
  },
  {
    title: 'TeSys Giga Contactor 185A Wide Band',
    slug: 'tesys-giga-contactor-185a',
    divisionSlug: 'electrical-division',
    categoryName: 'Switchgear',
    image: '/products/electrical/tesys-giga-contactor-185a.png',
    images: ['/products/electrical/tesys-giga-contactor-185a.png'],
    shortDescription: 'Advanced electronic coil contactor for high-power motors.',
    fullDescription: 'High reliability 3-pole contactor with wide-band control voltage and integrated wear diagnosis.',
    features: ['185A AC-3 Rating', 'Wide-band electronic coil 100-250V', 'Wear diagnosis & modular design'],
    inStock: true,
    isFeatured: true,
  },
  // 4. Lifting Division
  {
    title: 'Chain Blocks Heavy Duty 5 Ton',
    slug: 'chain-blocks',
    divisionSlug: 'lifting-material-handling',
    categoryName: 'Hoists & Rigging',
    image: '/products/lifting/chain-blocks.png',
    images: ['/products/lifting/chain-blocks.png'],
    shortDescription: 'Manual chain hoist with Grade 80 load chain.',
    fullDescription: 'Tested and certified industrial chain hoist with dual-pawl brake mechanism and forged safety hooks.',
    features: ['5-Ton Rated Capacity', 'Grade 80 Alloy Steel Load Chain', 'Dual-Pawl Automatic Brake'],
    inStock: true,
    isFeatured: true,
  },
  // 5. Fasteners Division
  {
    title: 'High Tensile Hex Head Structural Bolts Grade 8.8 / 10.9',
    slug: 'high-tensile-hex-bolts',
    divisionSlug: 'fasteners-division',
    categoryName: 'Bolts & Screws',
    image: '/products/subcategories/fast-bolts.jpg',
    images: ['/products/subcategories/fast-bolts.jpg'],
    shortDescription: 'Heavy hex bolts for structural steel and equipment anchoring.',
    fullDescription: 'Hot-dip galvanized and black oxide coated structural bolts manufactured to ISO 4014 / DIN 931.',
    features: ['Grade 8.8 and 10.9 High Tensile Steel', 'Hot Dip Galvanized ASTM A153', 'Full MTR Certificate Included'],
    inStock: true,
    isFeatured: true,
  },
  // 6. Coatings Division
  {
    title: 'Jotun Hardtop XP 1005 Protective Paint',
    slug: 'jotun-hardtop-xp-1005',
    divisionSlug: 'coatings-surface-protection',
    categoryName: 'Paints & Coatings',
    image: '/products/coatings/jotun-hardtop-xp-1005.png',
    images: ['/products/coatings/jotun-hardtop-xp-1005.png'],
    shortDescription: 'Two-pack polyurethane topcoat with high gloss and color retention.',
    fullDescription: 'Industrial protective polyurethane coating designed for atmospheric exposure in aggressive marine and industrial environments.',
    features: ['Two-pack Aliphatic Polyurethane', 'High Gloss & Color Retention', 'Certified for Marine & Industrial C5-M'],
    inStock: true,
    isFeatured: true,
  },
];

const sampleBlogs = [
  {
    title: 'Reliable Heavy Equipment Rental Across Saudi Arabia',
    slug: 'reliable-heavy-equipment-rental-across-saudi-arabia',
    subtitle: 'Why Orient Energy Co. is the Go-To Heavy Equipment Rental Provider in Saudi Arabia',
    image: '/blog/blog-1.jpg',
    readTime: '11 Minute Read',
    date: 'May 23, 2026',
    author: 'Orient Energy Heavy Equipment Division',
    category: 'Heavy Equipment & Rentals',
    introduction:
      'In Saudi Arabia’s fast-paced industrial landscape, having reliable heavy equipment is crucial. Orient Energy Trading Company (OETC) – Rental Equipments Division offers top-tier machinery and equipment rental solutions for construction, oil & gas, and industrial projects.',
    fleetTitle: 'Fleet and Services:',
    fleetPoints: [
      {
        label: 'Extensive Fleet',
        text: 'Thousands of specialized equipment units, from mobile cranes and bulldozers to earth-moving machines and rollers.',
      },
      {
        label: 'Rental Flexibility',
        text: 'Options for short-term projects, long-term contracts, and emergency requirements.',
      },
      {
        label: 'Support Services',
        text: 'Equipment maintenance, heavy lifting solutions, industrial cleaning, dewatering services, and temporary site facilities.',
      },
    ],
    whyChoosePoints: [
      'ISO-certified operations and SAP-driven management.',
      'Aramco-certified operators ensuring safety and expertise.',
      'Coverage across urban and rural project sites throughout Saudi Arabia.',
    ],
    conclusion:
      'For industries seeking dependable, efficient, and well-maintained heavy machinery, Orient Energy Co. provides a one-stop rental solution tailored to meet the rigorous demands of Saudi Arabia’s industrial sector.',
    isPublished: true,
  },
  {
    title: 'Comprehensive Industrial Supply Solutions',
    slug: 'comprehensive-industrial-supply-solutions',
    subtitle: 'How Orient Energy Supports Industrial Growth Across Saudi Arabia',
    image: '/blog/blog-2.jpg',
    readTime: '10 Minute Read',
    date: 'May 20, 2026',
    author: 'Technical Procurement Team',
    category: 'Industrial Supplies',
    introduction:
      'Orient Energy Co. is a leading industrial products supplier in Saudi Arabia, catering to demanding sectors including oil & gas, petrochemical, manufacturing, and energy infrastructure. With rapid project expansions under Vision 2030, timely access to certified materials and mechanical parts is the difference between seamless operations and costly delays.',
    fleetTitle: 'Material Portfolio & Supply Capabilities:',
    fleetPoints: [
      {
        label: 'Mechanical & Piping',
        text: 'Certified valves, flanges, seamless pipes, and specialized alloy fittings compliant with ASTM, API, and DIN standards.',
      },
      {
        label: 'Electrical & Instrumentation',
        text: 'Explosion-proof enclosures, switchgear, cabling, sensors, and telemetry modules for high-hazard processing plants.',
      },
      {
        label: 'Safety & Welding',
        text: 'Complete PPE assortments, multi-operator welding machines, consumables, and site containment equipment.',
      },
    ],
    whyChoosePoints: [
      'Global OEM vendor relationships with traceable mill test certificates.',
      'Robust warehousing and rapid fulfillment hubs in Eastern Province.',
      'Dedicated technical engineers assisting with product cross-referencing and specifications.',
    ],
    conclusion:
      'By streamlining the procurement lifecycle and maintaining relentless quality control, Orient Energy empowers Saudi industrial operators to execute their most demanding facilities with complete assurance.',
    isPublished: true,
  },
  {
    title: 'Integrated Engineering & Procurement Solutions',
    slug: 'integrated-engineering-procurement-solutions',
    subtitle: 'Your Partner for Industrial Efficiency and Operational Excellence',
    image: '/blog/blog-3.jpg',
    readTime: '9 Minute Read',
    date: 'May 16, 2026',
    author: 'Engineering Solutions Division',
    category: 'Engineering & EPC',
    introduction:
      'Modern industrial infrastructure requires more than standalone parts—it demands turnkey engineering expertise, synchronized global supply chains, and seasoned on-site coordination. Orient Energy Trading Company bridges the gap between engineering design and project execution.',
    fleetTitle: 'Integrated Solutions Scope:',
    fleetPoints: [
      {
        label: 'Procurement Engineering',
        text: 'Translating complex client drawings and data sheets into audited vendor packages with strict quality assurance.',
      },
      {
        label: 'Shutdown & Turnaround Support',
        text: 'Pre-shutdown material kitting, expedited emergency deliveries, and on-site vendor management.',
      },
      {
        label: 'Asset Integrity & Protection',
        text: 'Delivering cathodic protection, industrial coatings, and specialized mechanical seals to preserve multi-billion dollar installations.',
      },
    ],
    whyChoosePoints: [
      'Single-point accountability for diverse multi-discipline material requirements.',
      'Strict adherence to SABIC, SEC, and Saudi Aramco specification standards.',
      'Deep technical catalog support and CAD drawing cross-referencing.',
    ],
    conclusion:
      'As Saudi Arabia builds the next generation of mega-refineries, clean energy grids, and maritime hubs, Orient Energy stands ready as an engineering and procurement partner that delivers excellence on schedule.',
    isPublished: true,
  },
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
      AdminUser.deleteMany({}),
      Blog.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed Divisions / Categories
    const createdCategories = await Category.insertMany(divisions);
    console.log(`✅ Seeded ${createdCategories.length} divisions/categories`);

    // Map division IDs to products
    const productsToInsert = sampleProducts.map((p: any) => {
      const match = createdCategories.find((c) => c.slug === p.divisionSlug);
      return {
        ...p,
        category: match ? match._id : createdCategories[0]._id,
        categoryName: p.categoryName || (match ? match.name : 'General Industrial'),
        divisionSlug: p.divisionSlug,
        image: p.image,
        images: p.images || [p.image],
        features: p.features || [],
        shortDescription: p.shortDescription || '',
        fullDescription: p.fullDescription || '',
        whatsappMessage:
          p.whatsappMessage ||
          `Hello Orient Energy, I am interested in inquiring about ${p.title}.`,
      };
    });

    await Product.insertMany(productsToInsert);
    console.log(`✅ Seeded ${productsToInsert.length} sample products`);

    // Seed Blogs
    await Blog.insertMany(sampleBlogs);
    console.log(`✅ Seeded ${sampleBlogs.length} blog articles`);

    // Seed Admin User
    const hashedPwd = await bcrypt.hash('orient@admin#1234', 12);
    await AdminUser.create({
      name: 'Orient Admin',
      email: 'orient@adminpanel.com',
      password: hashedPwd,
      role: 'admin',
    });
    console.log('✅ Admin user created: orient@adminpanel.com / orient@admin#1234');

    // Seed Company Settings
    await CompanySetting.deleteMany({});
    await CompanySetting.create({
      companyName: 'Orient Energy',
      tagline: 'Industrial Supply & Engineering Solutions in Saudi Arabia',
      aboutShort:
        'Reliable industrial supply and engineering solutions in Saudi Arabia for oil & gas, energy, marine, drilling, and infrastructure projects.',
      aboutFull:
        'Orient Energy is a premier industrial solutions partner in the Kingdom of Saudi Arabia. We provide world-class industrial equipment, engineering procurement, and comprehensive field support to the oil & gas, petrochemical, marine, heavy infrastructure, and energy sectors across the Kingdom.',
      phone: '+966 13 888 0000',
      email: 'info@orientenergyco.com',
      address: 'King Fahd Road, Al Khobar / Dammam, Kingdom of Saudi Arabia',
      locations: ['Al Khobar', 'Dammam', 'Riyadh'],
      workingHours: 'Sun – Thu: 8:00 AM – 5:30 PM',
      socials: {
        instagram: 'https://www.instagram.com/orientenergyco?dlrf=MWptcnpienk0eDVxbQ==',
        facebook: 'https://www.facebook.com/share/1FvBC9RFuK/?mibextid=wwXIfr',
        linkedin: 'https://linkedin.com',
        twitter: '',
      },
      stats: { experienceYears: 15, productsDelivered: 12500, activeClients: 450, satisfactionRate: 99 },
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
