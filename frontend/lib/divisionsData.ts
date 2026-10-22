export interface ProductItem {
  id: string;
  title: string;
  slug?: string;
  image: string;
  images?: string[];
  category?: string;
  divisionSlug?: string;
  divisionName?: string;
  date?: string;
  comments?: string;
  features?: string[];
  shortDescription?: string;
  fullDescription?: string;
  whatsappMessage?: string;
}

export function getProductSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface SubcategoryItem {
  name: string;
  image?: string;
}

export interface DivisionData {
  id: string;
  name: string;
  headline: string;
  description: string[];
  productRangeTitle?: string;
  productRange?: string[];
  applicationsTitle?: string;
  applications?: string[];
  subcategories?: SubcategoryItem[];
  subcategoriesTitle?: string;
  pills?: string[];
  products: ProductItem[];
}

export const DIVISIONS_DATA: DivisionData[] = [
  // 1. Mechanical Supply Division
  {
    id: 'mechanical-division',
    name: 'Mechanical Supply Division',
    headline: 'Industrial Mechanical Products Supplier in Saudi Arabia',
    description: [
      'Orient Energy Trading Company, we supply a comprehensive range of industrial mechanical products designed to meet the demanding requirements of the Oil & Gas, Petrochemical, Power, Marine, Construction, and Manufacturing industries across Saudi Arabia.',
      'Our product portfolio includes valves, flanges, pipe fittings, fasteners, bearings, gaskets, seals, hydraulic components, industrial hoses, mechanical tools, and maintenance supplies sourced from globally recognized manufacturers. With a strong sourcing network, competitive pricing, and dependable delivery, we help contractors, EPC companies, and industrial facilities keep their operations running efficiently and reliably.',
    ],
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
      'Offshore Operations',
      'Industrial Plants',
    ],
    products: [
      {
        id: 'mech-1',
        title: 'Black-Coated Steel Pipe Flanges Threaded',
        slug: 'black-coated-steel-pipe-flanges-threaded',
        image: '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png',
        category: 'Flanges & Pipe Connections',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'High Pressure ASME B16.5 Standard',
          'Anti-Corrosive Black Protective Coating',
          'Threaded Class 150/300/600 Pressure Ratings',
          'Carbon Steel ASTM A105 / A350 Material',
          'Complete MTR (Mill Test Report) Traceability',
        ],
      },
      {
        id: 'mech-2',
        title: 'Breathing Hoses',
        slug: 'breathing-hoses',
        image: '/products/mechanical/breathing-hoses.png',
        category: 'Hoses, Hammer Unions & Rig Supplies',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'Low Pressure & High Pressure Hoses',
          'Quick Release Couplers',
          'Manifolds',
          'CGA Connectors',
          'Isolation Valves',
        ],
      },
      {
        id: 'mech-3',
        title: 'Butterfly Valve',
        slug: 'butterfly-valve',
        image: '/products/mechanical/butterfly-valve.png',
        category: 'Valves, Fittings & Tubing',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'Wafer and Lug Type Body Styles',
          'API 609 / ASME B16.34 Compliant Design',
          'Resilient Seated & High Performance Disc',
          'Manual Lever, Gear Operator & Actuator Ready',
          'Bubble-Tight Bidirectional Shut-Off',
        ],
      },
      {
        id: 'mech-4',
        title: 'Butterfly Valve Lever Handle SS Disc 3',
        slug: 'butterfly-valve-lever-handle-ss-disc-3',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png',
        category: 'Valves, Fittings & Tubing',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          '3-Inch Nominal Bore Diameter',
          'Stainless Steel 316 Investment Cast Disc',
          'Ergonomic 10-Position Locking Lever Handle',
          'EPDM / NBR Replaceable Liner',
          'Working Pressure up to 16 Bar (232 PSI)',
        ],
      },
      {
        id: 'mech-5',
        title: 'Butterfly Valve Lever Handle SS Disc 4',
        slug: 'butterfly-valve-lever-handle-ss-disc-4',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
        category: 'Valves, Fittings & Tubing',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          '4-Inch Heavy-Duty Industrial Wafer Valve',
          'Stainless Steel 316 Disc with Polished Edges',
          'Rugged Lever Handle with Visual Position Indicator',
          'Pinless Shaft Connection Preventing Leakage',
          'Tested to API 598 Pressure Standards',
        ],
      },
      {
        id: 'mech-6',
        title: 'Butterfly Valve Lever Handle SS Disc 6',
        slug: 'butterfly-valve-lever-handle-ss-disc-6',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
        category: 'Valves, Fittings & Tubing',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          '6-Inch Industrial Process Control Valve',
          'Ductile Iron Body with Epoxy Powder Coating',
          'Stainless Steel Disc for Aggressive Fluids',
          'Blow-out Proof Stem with PTFE Bushings',
          'Direct Mount ISO 5211 Actuator Flange',
        ],
      },
      {
        id: 'mech-7',
        title: 'Butterfly Valve Lever Handle SS Disc 8',
        slug: 'butterfly-valve-lever-handle-ss-disc-8',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png',
        category: 'Valves, Fittings & Tubing',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          '8-Inch Flanged / Wafer Isolation Valve',
          'Heavy Industrial Duty Gear or Lever Handle',
          'Dual Shaft O-ring Stem Sealing',
          'Suitable for Water, Glycol, Slurries & Hydrocarbons',
          'Aramco & SABIC Plant Approved Specifications',
        ],
      },
      {
        id: 'mech-8',
        title: 'Hydraulic Hoses Fittings & Adaptors',
        slug: 'hydraulic-hoses-fittings-adaptors',
        image: '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
        category: 'Hoses, Hammer Unions & Rig Supplies',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'High Pressure Wire Braid & Spiral Hoses (1SN, 2SN, 4SP, 4SH)',
          'BSP, JIC, NPT & ORFS Standard Crimp Fittings',
          'Abrasion and Weather Resistant Outer Covers',
          'Quick Disconnect Couplings & High-Pressure Swivels',
          'Custom Crimping & Pressure Testing Certification',
        ],
      },
      {
        id: 'mech-9',
        title: 'Industrial & Large Bore Hoses',
        slug: 'industrial-large-bore-hoses',
        image: '/products/mechanical/industrial-large-bore-hoses.png',
        category: 'Hoses, Hammer Unions & Rig Supplies',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'Composite, Rubber & Stainless Steel Corrugated Hoses',
          'Sizes from 2-Inch to 12-Inch Diameter',
          'Built for Mud, Oil, Chemical & Water Suction/Discharge',
          'Camlock, Hammer Union & Flanged End Terminations',
          'Electrical Continuity Grounding Available',
        ],
      },
      {
        id: 'mech-10',
        title: 'Industrial Gasket and Seals',
        slug: 'industrial-gasket-and-seals',
        image: '/products/mechanical/industrial-gasket-and-seals.png',
        category: 'Gaskets & Sealing Solutions',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'Spiral Wound Gaskets (316SS with Graphite/PTFE Filler)',
          'Ring Type Joint (RTJ) Gaskets for High Pressure Flanges',
          'Non-Asbestos Fiber Sheet & Custom Cut Gaskets',
          'EPDM, Viton, NBR & Silicone O-Rings and Mechanical Seals',
          'Fire-Safe API 607 Compliant Sealing Solutions',
        ],
      },
      {
        id: 'mech-11',
        title: 'Isolation Valve, Ball Valve Steam High Temperature Ball Valve',
        slug: 'isolation-valve-ball-valve-steam-high-temperature-ball-valve',
        image: '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png',
        category: 'Valves, Fittings & Tubing',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'Forged Steel 3-Piece Bolted Body Construction',
          'Metal-to-Metal & PEEK Seated for Steam Service',
          'Operating Temperatures up to 450°C (842°F)',
          'Full Bore Design Minimizing Pressure Drops',
          'API 6D, Firesafe API 607 Tested & Certified',
        ],
      },
      {
        id: 'mech-12',
        title: 'Micro Linear Actuators',
        slug: 'micro-linear-actuators',
        image: '/products/mechanical/micro-linear-actuators.png',
        category: 'Actuators & Control Components',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'High Precision Electric Linear Stroke Drive',
          'Compact Form Factor for Space-Constrained Industrial Automation',
          'IP65 / IP66 Dust and Water Ingress Protection',
          'Built-in Adjustable Limit Switches & Position Feedback',
          '12V / 24V DC Industrial Operating Voltage',
        ],
      },
      {
        id: 'mech-13',
        title: 'Carbon Steel Seamless & ERW Pipes',
        slug: 'carbon-steel-seamless-erw-pipes',
        image: '/products/mechanical/carbon-steel-seamless-erw-pipes.png',
        category: 'Pipes & Tubes',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'ASTM A106 Grade B / API 5L Grade B & X-Grades',
          'Schedules SCH 40, SCH 80, SCH 160 & XXS',
          'Sizes ranging from 1/2" up to 36" Diameter',
          'Beveled and Plain Ends with Protective Varnishing',
          'Full Hydrostatic Testing and NDT Inspection Certified',
        ],
      },
    ],
  },

  // 2. Welding Division
  {
    id: 'welding-division',
    name: 'Welding Division',
    headline: 'Welding Equipment Supplier in Saudi Arabia',
    description: [
      'Orient Energy Trading Company is a trusted welding equipment supplier in Saudi Arabia, delivering premium welding and cutting solutions for the Oil & Gas, Petrochemical, Power, Marine, Construction, and Industrial sectors. We supply a comprehensive range of high-performance welding equipment, gas cutting systems, regulators, torches, hoses, flashback arrestors, consumables, and accessories from globally recognized brands, including Victor. Whether you require equipment for fabrication, maintenance, pipeline projects, or heavy industrial applications, we provide reliable products at competitive prices with fast delivery across Saudi Arabia.',
      'Our commitment to quality, technical expertise, and dependable sourcing ensures that every product meets international industry standards, helping businesses improve productivity, safety, and operational efficiency.',
    ],
    pills: [
      'Gas Welding & Cutting Equipment',
      'General Safety Equipment (PPE)',
      'Grinding, Cutting & Surface Prep Tools',
      'Welding Consumables',
      'Welding Machines & Equipment',
      'Welding Protection & Safety Gear',
    ],
    products: [
      { id: 'weld-1', title: '280PL Series Welding Helmet – Lift Front – 4.25" x 2" – Black Model # : 280 PL WELDING HELMETS', image: '/products/welding/280pl-series-welding-helmet.png' },
      { id: 'weld-2', title: 'Airmax Elite PAPR System with LP80 Laser Welding Helmet', image: '/products/welding/airmax-elite-papr-system-lp80.png' },
      { id: 'weld-3', title: 'ARC FLASH FACE SHIELD', image: '/products/welding/arc-flash-face-shield.png' },
      { id: 'weld-4', title: 'CA 370 / WH 370FC', image: '/products/welding/ca-370-wh-370fc.png' },
      { id: 'weld-5', title: 'Contender EDGE 2.0', image: '/products/welding/contender-edge-2-0.png' },
      { id: 'weld-6', title: 'Cutter EDGE 2.0 ST2600FC', image: '/products/welding/cutter-edge-2-0-st2600fc.png' },
      { id: 'weld-7', title: 'EDGE Series 2.0 Regulators', image: '/products/welding/edge-series-2-0-regulators.png' },
      { id: 'weld-8', title: 'EDGE™ Series 2.0 ELC42 Regulators', image: '/products/welding/edge-series-2-0-elc42-regulators.png' },
      { id: 'weld-9', title: 'EDGE™ Series 2.0 ESS72 Regulators', image: '/products/welding/edge-series-2-0-ess72-regulators.png' },
      { id: 'weld-10', title: 'EHP Series High Pressure Cylinder Regulator', image: '/products/welding/ehp-series-high-pressure-regulator.png' },
      { id: 'weld-11', title: 'G150 Portable Tote', image: '/products/welding/g150-portable-tote.png' },
      { id: 'weld-12', title: 'G250 Regulators', image: '/products/welding/g250-regulators.png' },
      { id: 'weld-13', title: 'G350 Plus Regulators', image: '/products/welding/g350-plus-regulators.png' },
      { id: 'weld-14', title: 'HSL-100 Welding Helmet – Passive – 4.5" x 5.25" – Black Model # : HSL-100', image: '/products/welding/hsl-100-welding-helmet.png' },
      { id: 'weld-15', title: 'JACKSON SG with Black Frame and Clear Lens', image: '/products/welding/jackson-sg-glasses.png' },
      { id: 'weld-16', title: 'Journeyman II EDGE 2.0', image: '/products/welding/journeyman-ii-edge-2-0.png' },
    ],
  },

  // 3. Electrical Division
  {
    id: 'electrical-division',
    name: 'Electrical Division',
    headline: 'Industrial Electrical Products Supplier in KSA',
    description: [
      'Orient Energy Trading Company is a trusted industrial electrical products supplier in Riyadh, Jeddah, Dammam, and across Saudi Arabia, providing high-quality electrical products and power distribution solutions for the Oil & Gas, Petrochemical, Power, Manufacturing, Construction, Marine, and Infrastructure sectors.',
      'We supply a comprehensive range of industrial electrical components from globally recognized brands, ensuring reliable performance, safety, and compliance with international standards. From power distribution and industrial automation to backup power systems and hazardous area solutions, we deliver dependable products at competitive prices with fast nationwide delivery.',
    ],
    subcategoriesTitle: 'Electrical Sub-Categories',
    subcategories: [
      { name: 'Control & Automation Components', image: '/products/subcategories/elec-control-automation.jpg' },
      { name: 'Electrical Components & Switchgear Parts', image: '/products/subcategories/elec-switchgear-parts.jpg' },
      { name: 'Lighting Systems', image: '/products/subcategories/elec-lighting-systems.jpg' },
      { name: 'UPS Systems & Industrial Batteries', image: '/products/subcategories/elec-ups-systems.jpg' },
    ],
    products: [
      { id: 'elec-1', title: 'Acti9, Arc fault detection RCBO, Acti9 iDPN N VigiArc, 1P+N, 10 A, 10000 A, 30 mA, type A', image: '/products/electrical/acti9-arc-fault-detection-rcbo.png' },
      { id: 'elec-2', title: 'Acti9, Miniature circuit breaker (MCB), Acti9 C60H-DC, 1P, 10A, C curve, 6kA (IEC/EN 60947-2)', image: '/products/electrical/acti9-mcb-c60h-dc-10a.png' },
      { id: 'elec-3', title: 'Acti9, Miniature circuit breaker (MCB), Acti9 C60H-DC, 1P, 1A, C curve, 6kA (IEC/EN 60947-2)', image: '/products/electrical/acti9-mcb-c60h-dc-1a.png' },
      { id: 'elec-4', title: 'Acti9, Miniature circuit breaker (MCB), Acti9 C60H-DC, 1P, 25A, C curve, 6kA (IEC/EN 60947-2)', image: '/products/electrical/acti9-mcb-c60h-dc-25a.png' },
      { id: 'elec-5', title: 'Air circuit breaker HDW3', image: '/products/electrical/air-circuit-breaker-hdw3.png' },
      { id: 'elec-6', title: 'Automatic Transfer Switching Equipment – from 125 to 3200 A', image: '/products/electrical/automatic-transfer-switch-125-3200a.png' },
      { id: 'elec-7', title: 'EasyPact EXE Indoor MV Vacuum Circuit Breaker up to 17.5 kV', image: '/products/electrical/easypact-exe-indoor-mv-breaker.png' },
      { id: 'elec-8', title: 'High power contactor, TeSys Giga, 3 pole (3NO), AC-3 <=440V 115A, advanced version, 200...500V wide band AC/DC coil', image: '/products/electrical/tesys-giga-contactor-115a.png' },
      { id: 'elec-9', title: 'High power contactor TeSys Giga 150A', image: '/products/electrical/tesys-giga-contactor-150a.png' },
      { id: 'elec-10', title: 'High power contactor TeSys Giga 185A', image: '/products/electrical/tesys-giga-contactor-185a.png' },
      { id: 'elec-11', title: 'Load Break Switch Disconnector', image: '/products/electrical/load-break-switch-disconnector.png' },
      { id: 'elec-12', title: 'Earth Cable & Wires (Yellow/Green roll)', image: '/products/electrical/earth-cable-and-wires.png' },
    ],
  },

  // 4. Lifting & Material Handling
  {
    id: 'lifting-material-handling',
    name: 'Lifting & Material Handling',
    headline: 'Lifting Equipment Supplier in Saudi Arabia',
    description: [
      'Orient Energy Co. supplies lifting equipment and material handling solutions for industrial lifting operations, cargo handling, offshore projects, logistics operations, and construction industries.',
    ],
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
    products: [
      { id: 'lift-1', title: 'Chain Blocks', image: '/products/lifting/chain-blocks.png' },
      { id: 'lift-2', title: 'Chain Hoists', image: '/products/lifting/chain-hoists.png' },
      { id: 'lift-3', title: 'Chains & Wire Ropes', image: '/products/lifting/chains-and-wire-ropes.png' },
      { id: 'lift-4', title: 'Hooks & Shackles', image: '/products/lifting/hooks-and-shackles.png' },
      { id: 'lift-5', title: 'Lifting Clamps', image: '/products/lifting/lifting-clamps.png' },
      { id: 'lift-6', title: 'Lifting Trolleys', image: '/products/lifting/lifting-trolleys.png' },
      { id: 'lift-7', title: 'Snatch Blocks', image: '/products/lifting/snatch-blocks.png' },
      { id: 'lift-8', title: 'Steel Wire Rope Sling Assemblies', image: '/products/lifting/steel-wire-rope-sling-assemblies.png' },
    ],
  },

  // 5. Power System
  {
    id: 'power-system',
    name: 'Power System',
    headline: 'Industrial Power System Supplier in Saudi Arabia',
    description: [
      'We provide industrial power systems and energy support equipment designed for project sites, industrial operations, rigs, and infrastructure developments.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Diesel Engines',
      'Gas Engines',
      'Generators',
      'Mechanical Transmission Systems',
      'Electrical Transmission Systems',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Industrial Projects',
      'Energy Facilities',
      'Rig Operations',
      'Offshore Projects',
      'Backup Power Systems',
    ],
    products: [
      { id: 'pwr-1', title: 'Diesel Engines', image: '/products/power/diesel-engines.png' },
      { id: 'pwr-2', title: 'Electrical Transmission Systems', image: '/products/power/electrical-transmission-systems.png' },
      { id: 'pwr-3', title: 'Gas Engines', image: '/products/power/gas-engines.png' },
      { id: 'pwr-4', title: 'Generators', image: '/products/power/generators.png' },
    ],
  },

  // 6. Auxiliary Systems
  {
    id: 'auxiliary-systems',
    name: 'Auxiliary Systems',
    headline: 'Industrial Auxiliary Equipment Supplier in Saudi Arabia',
    description: [
      'Orient Energy Co. supplies auxiliary systems and operational support equipment for industrial camps, offshore facilities, and project site operations across Saudi Arabia.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Air Compressors',
      'Fuel Tanks',
      'Fiberglass Water Tanks',
      'PVC Water Tanks',
      'Water Filter Systems',
      'Water Coolers',
      'Kitchen Appliances',
      'Kitchen Utensils',
      'Pipe Handling Systems',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Industrial Camps',
      'Offshore Facilities',
      'Operational Support Systems',
      'Construction Camps',
      'Industrial Project Sites',
    ],
    products: [
      { id: 'aux-1', title: 'Rotary Screw Air Compressors', image: '/categories/auxiliary-systems.jpg' },
      { id: 'aux-2', title: 'Industrial Heavy-Duty Fuel Tanks', image: '/categories/power-system.jpg' },
      { id: 'aux-3', title: 'Fiberglass & PVC Water Storage Tanks', image: '/categories/all-fittings.jpeg' },
      { id: 'aux-4', title: 'Multi-Stage Industrial Water Filter Systems', image: '/categories/pumps-motors.jpg' },
      { id: 'aux-5', title: 'Industrial Camp Water Coolers & Chillers', image: '/categories/industrial-consumables.jpg' },
      { id: 'aux-6', title: 'Automated Pipe Handling Systems', image: '/categories/mechanical-supply-division.png' },
    ],
  },

  // 7. Marine Division
  {
    id: 'marine-division',
    name: 'Marine Division',
    headline: 'Marine & Offshore Products Supplier in Saudi Arabia',
    description: [
      'Our marine division supplies marine-grade products and offshore operational equipment designed for harsh maritime environments and offshore industrial applications.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Life Rafts & Life Jackets',
      'Fire-Fighting Equipment',
      'Marine Ropes',
      'Steel Wire Ropes',
      'Deck Equipment',
      'Anchors & Chains',
      'Marine Fenders & Buoys',
      'Navigation Lights & Signal Systems',
      'Marine Safety Equipment & Survival Kits',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Marine Vessels',
      'Offshore Platforms',
      'Shipyards',
      'Ports & Harbors',
      'Offshore Maintenance Operations',
    ],
    subcategoriesTitle: 'Marine Sub-Categories',
    subcategories: [
      { name: 'Lifeboats & Life-Saving Appliances (LSA)' },
      { name: 'Marine Coatings & Anti-Corrosion Systems' },
      { name: 'Marine Electrical & Navigation Equipment' },
      { name: 'Marine Hardware & Deck Equipment' },
      { name: 'Marine Safety Equipment' },
      { name: 'Marine Tools & Maintenance Supplies' },
    ],
    products: [
      { id: 'mar-1', title: 'Corded Blue Industrial Ear-Plugs', image: '/products/marine/ear-plug-blue-cord.png' },
      { id: 'mar-2', title: 'High-Visibility Foam Ear-Plugs', image: '/products/marine/ear-plug-orange.png' },
      { id: 'mar-3', title: 'Safety Corded Orange Ear-Plugs', image: '/products/marine/ear-plug-orange-cord.png' },
      { id: 'mar-4', title: 'Lifejackets (Foam / Inflatable)', image: '/products/marine/lifejackets-foam-inflatable.png' },
    ],
  },

  // 8. Steel & Structural Materials Division
  {
    id: 'steel-structural-materials-division',
    name: 'Steel & Structural Materials Division',
    headline: 'Structural Steel Supplier in Riyadh, Dammam & Jubail',
    description: [
      'Orient Energy Co. supplies structural steel materials and industrial steel products for infrastructure projects, fabrication industries, energy sector developments, and industrial engineering operations across Saudi Arabia.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Carbon Steel Products',
      'Stainless Steel Products',
      'Alloy Steel Materials',
      'Structural Beams (H-Beams, I-Beams, Channels)',
      'Grating Sheets',
      'Steel Plates & Sheets',
      'Pipes & Tubular Products',
      'Flanges & Connectors',
      'Fabricated Steel Components',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Infrastructure Projects',
      'Industrial Fabrication',
      'Construction Industry',
      'Offshore Structures',
      'Heavy Engineering',
    ],
    products: [
      { id: 'stl-1', title: '304 Stainless Steel Pipe', image: '/products/steel/304-stainless-steel-pipe.png' },
      { id: 'stl-2', title: 'Structural Steel BARS', image: '/products/steel/bars.png' },
      { id: 'stl-3', title: 'Carbon Steel 45° Elbow', image: '/products/steel/carbon-steel-45-elbow.png' },
      { id: 'stl-4', title: 'Carbon Steel 90° Elbow', image: '/products/steel/carbon-steel-90-elbow.png' },
      { id: 'stl-5', title: 'Carbon Steel Heavy PIPES', image: '/products/steel/pipes.png' },
      { id: 'stl-6', title: 'Hollow Section Steel TUBES', image: '/products/steel/tubes.png' },
      { id: 'stl-7', title: 'Venus Stainless Steel Tubes', image: '/products/steel/venus-stainless-steel-tubes.png' },
    ],
  },

  // 9. Coatings & Surface Protection Division
  {
    id: 'coatings-surface-protection',
    name: 'Coatings & Surface Protection Division',
    headline: 'Advanced Industrial & Protective Coating Solutions for Saudi Arabia',
    description: [
      'Orient Energy provides a comprehensive range of industrial coatings, protective paints, corrosion control systems, and surface protection solutions across Saudi Arabia.',
      'Our Coatings & Surface Protection Division serves the oil & gas, petrochemical, power generation, marine, construction, manufacturing, and infrastructure sectors with high-performance coating systems designed for demanding environments.',
      'We supply premium-quality coatings that protect steel structures, pipelines, storage tanks, equipment, industrial facilities, and marine assets from corrosion, chemical exposure, abrasion, moisture, UV radiation, and extreme temperatures.',
      'With a strong focus on quality, reliability, and technical support, Orient Energy delivers cost-effective coating solutions that enhance asset lifespan, reduce maintenance costs, and ensure long-term protection for critical projects throughout Saudi Arabia.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Industrial Protective Coatings',
      'Epoxy & Polyurethane Coatings',
      'Anti-Corrosion Paint Systems',
      'Marine & Offshore Coatings',
      'Fire-Resistant & Intumescent Coatings',
      'Tank & Pipeline Coatings',
      'Floor & Concrete Protection Systems',
      'Surface Preparation Materials',
      'Specialty Coatings for Harsh Environments',
      'Waterproofing & Protective Sealants',
    ],
    subcategoriesTitle: 'Coatings Sub-Categories',
    subcategories: [
      { name: 'Fireproofing & Protective Systems', image: '/products/subcategories/coat-fireproofing.jpg' },
      { name: 'Floor Coatings & Surface Protection', image: '/products/subcategories/coat-floor-coatings.jpg' },
      { name: 'Industrial Coatings', image: '/products/subcategories/coat-industrial-coatings.jpg' },
      { name: 'Marine Coatings' },
      { name: 'Solvents, Thinners & Surface Preparation Materials', image: '/products/subcategories/coat-solvents-thinners.jpg' },
    ],
    products: [
      { id: 'coat-1', title: 'Anti-Fouling Paints', image: '/products/coatings/anti-fouling-paints.png' },
      { id: 'coat-2', title: 'Fire Rated Intumescent Coatings Fire Retardant Coating For Wood', image: '/products/coatings/fire-rated-intumescent-coatings.png' },
      { id: 'coat-3', title: 'Gorilla Waterproof Patch', image: '/products/coatings/gorilla-waterproof-patch.png' },
      { id: 'coat-4', title: 'Jotun Fenomastic Pure Colours Interior Paint', image: '/products/coatings/jotun-fenomastic-interior-paint.png' },
      { id: 'coat-5', title: 'Jotun Hardtop XP 1005', image: '/products/coatings/jotun-hardtop-xp-1005.png' },
      { id: 'coat-6', title: 'National Guard Epoxy Filler S.F (A+B)', image: '/products/coatings/national-guard-epoxy-filler-sf.png' },
      { id: 'coat-7', title: 'National Paints Plastic Emulsion (001) – Off White', image: '/products/coatings/national-paints-plastic-emulsion.png' },
      { id: 'coat-8', title: 'Penguard Topcoat A + B', image: '/products/coatings/penguard-topcoat-ab.png' },
    ],
  },

  // 10. Pumps & Motors Division
  {
    id: 'pumps-motors',
    name: 'Pumps & Motors Division',
    headline: 'Industrial Pumps & Electric Motors Supplier in Saudi Arabia',
    description: [
      'Orient Energy Co. supplies high-performance industrial pumps, electric motors, compressors, and fluid management systems designed for oil & gas, petrochemical, marine, and industrial applications across Saudi Arabia.',
      'Our pump and motor solutions meet API 610, ISO, and SASO standards, delivering maximum operational uptime and energy efficiency.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Centrifugal Process Pumps (API 610)',
      'Submersible Drainage & Sewage Pumps',
      'Multistage High-Pressure Booster Pumps',
      'Positive Displacement & Gear Pumps',
      'Industrial Electric Motors (IE3 / IE4 Efficiency)',
      'Variable Frequency Drives (VFD) & Soft Starters',
      'Chemical Metering & Dosing Pumps',
      'High-Pressure Water Jetting Pumps',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Petrochemical Plants & Refineries',
      'Water Treatment & Desalination Facilities',
      'Offshore Drilling Rigs & Platforms',
      'Power Generation Stations',
      'Heavy Manufacturing & Mining',
    ],
    products: [
      { id: 'pmp-1', title: 'API 610 Centrifugal Process Pump', image: '/categories/pumps-motors.jpg' },
      { id: 'pmp-2', title: 'Heavy-Duty Submersible Slurry Pump', image: '/categories/mechanical-supply-division.png' },
      { id: 'pmp-3', title: 'High-Efficiency Industrial Electric Motor', image: '/categories/power-system.jpg' },
      { id: 'pmp-4', title: 'Multistage High-Pressure Feed Pump', image: '/categories/all-fittings.jpeg' },
    ],
  },

  // 11. Fasteners Division
  {
    id: 'fasteners-division',
    name: 'Fasteners Division',
    headline: 'Industrial Fasteners Supplier in Saudi Arabia',
    description: [
      'Orient Energy Co. supplies high-quality industrial fasteners for oil & gas projects, construction industries, fabrication facilities, marine operations, infrastructure developments, and heavy engineering sectors across Saudi Arabia.',
      'Our Fasteners Division provides reliable fastening solutions designed for industrial durability, structural integrity, corrosion resistance, and long-term performance in demanding operating environments.',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Oil & Gas Facilities',
      'Construction Projects',
      'Steel Fabrication',
      'Industrial Plants',
      'Marine & Offshore Operations',
      'Infrastructure Developments',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Hex Bolts, Heavy Hex Bolts, Anchor Bolts, Stud Bolts, U-Bolts',
      'Machine Screws, Self-Tapping Screws, Socket Head Cap Screws',
      'Hex Nuts, Lock Nuts, Flange Nuts',
      'Washers, Spring Washers, Flat Washers',
      'Threaded Rods & Studs',
      'Stainless Steel Fasteners (A2, A4, 316)',
      'High Tensile Fasteners (Grade 8.8, 10.9, 12.9, B7, L7)',
      'Galvanized & Coated Structural Fasteners',
    ],
    subcategoriesTitle: 'Fasteners Sub-Categories',
    subcategories: [
      { name: 'Anchors', image: '/products/subcategories/fast-anchors.jpg' },
      { name: 'Bolts', image: '/products/subcategories/fast-bolts.jpg' },
      { name: 'Nuts', image: '/products/subcategories/fast-nuts.jpg' },
      { name: 'Screws', image: '/products/subcategories/fast-screws.jpg' },
      { name: 'Special Fasteners', image: '/products/subcategories/fast-special-fasteners.jpg' },
      { name: 'Stud Bolts', image: '/products/subcategories/fast-stud-bolts.jpg' },
      { name: 'Washers' },
    ],
    products: [
      { id: 'fst-1', title: 'Anti Theft Screw', image: '/products/fasteners/anti-theft-screw.png' },
      { id: 'fst-2', title: 'BS Stud Bolt', image: '/products/fasteners/bs-stud-bolt.png' },
      { id: 'fst-3', title: 'Carriage Bolt', image: '/products/fasteners/carriage-bolt.png' },
      { id: 'fst-4', title: 'Color Painted Farmer Screw', image: '/products/fasteners/color-painted-farmer-screw.png' },
      { id: 'fst-5', title: 'Drop in Anchor', image: '/products/fasteners/drop-in-anchor.png' },
      { id: 'fst-6', title: 'Drywall Screw', image: '/products/fasteners/drywall-screw.png' },
      { id: 'fst-7', title: 'Eye Bolt Torn Shield Anchor', image: '/products/fasteners/eye-bolt-torn-shield-anchor.png' },
      { id: 'fst-8', title: 'Eye Hex Bolt', image: '/products/fasteners/eye-hex-bolt.png' },
      { id: 'fst-9', title: 'Fanged Elevator Bolt', image: '/products/fasteners/fanged-elevator-bolt.png' },
      { id: 'fst-10', title: 'Gravity Toggle Anchor', image: '/products/fasteners/gravity-toggle-anchor.png' },
      { id: 'fst-11', title: 'Hex Bolt', image: '/products/fasteners/hex-bolt.png' },
      { id: 'fst-12', title: 'Hex Flange Bolt', image: '/products/fasteners/hex-flange-bolt.png' },
      { id: 'fst-13', title: 'Hex Socket Cap Screw', image: '/products/fasteners/hex-socket-cap-screw.png' },
      { id: 'fst-14', title: 'Self Drilling Screw', image: '/products/fasteners/self-drilling-screw.png' },
      { id: 'fst-15', title: 'Square T Head Bolt', image: '/products/fasteners/square-t-head-bolt.png' },
      { id: 'fst-16', title: 'Stainless Steel Hex Head Bolts', image: '/products/fasteners/stainless-steel-hex-head-bolts.png' },
    ],
  },

  // 12. Substructure
  {
    id: 'substructure',
    name: 'Substructure',
    headline: 'Rig Substructure & Industrial Support Systems',
    description: [
      'We provide industrial substructure products and support systems designed for rig stability, operational safety, and industrial equipment support.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Rig Floors',
      'Base Frames',
      'Spill Containment Systems',
      'Ground Protection Mats',
      'Cable Trays & Heavy Ramps',
      'Drilling Substructure Steel Foundations',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Rig Operations',
      'Oil & Gas Projects',
      'Industrial Engineering',
      'Offshore Platforms',
      'Drilling Camp Logistics',
    ],
    products: [
      { id: 'sub-1', title: 'Engineered Rig Floors & Anti-Skid Decking', image: '/categories/substructure.png' },
      { id: 'sub-2', title: 'Heavy Structural Base Frames', image: '/categories/steel-structural-materials-division.jpg' },
      { id: 'sub-3', title: 'Industrial Spill Containment Systems', image: '/categories/auxiliary-systems.jpg' },
      { id: 'sub-4', title: 'Heavy-Duty Ground Protection Cable Ramps', image: '/categories/tools-maintenance.jpg' },
    ],
  },
];

export function getAllStaticProducts(): { product: ProductItem; division: DivisionData }[] {
  const result: { product: ProductItem; division: DivisionData }[] = [];
  DIVISIONS_DATA.forEach((div) => {
    div.products.forEach((prod) => {
      result.push({
        product: {
          ...prod,
          slug: prod.slug || getProductSlug(prod.title),
          category: prod.category || div.name,
          divisionSlug: div.id,
          divisionName: div.name,
        },
        division: div,
      });
    });
  });
  return result;
}

export function findStaticProductBySlug(slug: string): {
  product: ProductItem;
  division: DivisionData;
  related: ProductItem[];
} | null {
  const cleanSlug = slug.toLowerCase();
  for (const div of DIVISIONS_DATA) {
    const match = div.products.find(
      (p) => (p.slug && p.slug.toLowerCase() === cleanSlug) || getProductSlug(p.title) === cleanSlug
    );
    if (match) {
      const fullProd: ProductItem = {
        ...match,
        slug: match.slug || getProductSlug(match.title),
        category: match.category || div.name,
        divisionSlug: div.id,
        divisionName: div.name,
        date: match.date || 'December 15, 2025',
        comments: match.comments || '0 Comment',
        features:
          match.features && match.features.length > 0
            ? match.features
            : [
                'High quality certified industrial grade specification',
                'Compliant with international and Saudi industrial standards',
                'Traceable mill test reports and manufacturer certification',
                'Engineered for maximum reliability and operational safety',
                'Rapid availability and distribution across Saudi Arabia',
              ],
      };

      // Prioritize related products in the same category/family (e.g. Hoses with other Hoses)
      const sameCategory = div.products.filter(
        (p) => p.id !== match.id && p.category && match.category && p.category === match.category
      );
      const otherCategory = div.products.filter(
        (p) => p.id !== match.id && (!match.category || p.category !== match.category)
      );
      const related = [...sameCategory, ...otherCategory]
        .slice(0, 4)
        .map((p) => ({
          ...p,
          slug: p.slug || getProductSlug(p.title),
          category: p.category || div.name,
          divisionSlug: div.id,
          divisionName: div.name,
        }));

      return {
        product: fullProd,
        division: div,
        related,
      };
    }
  }
  return null;
}
