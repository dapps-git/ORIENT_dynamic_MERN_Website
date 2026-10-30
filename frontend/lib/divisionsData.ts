export interface ProductInnerSection {
  title: string;
  content: string;
  image?: string;
}

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
  innerSections?: ProductInnerSection[];
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
  // 1. Pipe Fittings and Flanges (Mechanical Division)
  {
    id: 'mechanical-division',
    name: 'Pipe Fittings and Flanges',
    headline: 'Pipe Fittings, Flanges & Industrial Mechanical Products Supplier in Saudi Arabia',
    description: [
      'Orient Energy Trading Company, we supply a comprehensive range of industrial pipe fittings, flanges, valves, pumps, motors, and mechanical products designed to meet the demanding requirements of the Oil & Gas, Petrochemical, Power, Marine, Construction, and Manufacturing industries across Saudi Arabia.',
      'Our product portfolio includes ASME B16.5 flanges, butt weld and socket weld fittings, industrial valves, centrifugal and submersible pumps, electric motors, fasteners, bearings, gaskets, seals, hydraulic components, industrial hoses, mechanical tools, and maintenance supplies sourced from globally recognized manufacturers. With a strong sourcing network, competitive pricing, and dependable delivery, we help contractors, EPC companies, and industrial facilities keep their operations running efficiently and reliably.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Industrial Valves (Gate, Globe, Ball, Butterfly, Check Valves)',
      'Pipes & Tubes (Carbon Steel, Stainless Steel, Alloy Steel)',
      'Flanges (Weld Neck, Slip-On, Blind, Threaded)',
      'Pipe Fittings (Tee, Coupling, Reducers, Bushings, End Caps)',
      'Centrifugal Process Pumps (API 610)',
      'Submersible Drainage & Sewage Pumps',
      'Multistage High-Pressure Booster Pumps',
      'Positive Displacement & Gear Pumps',
      'Industrial Electric Motors (IE3 / IE4 Efficiency)',
      'Variable Frequency Drives (VFD) & Soft Starters',
      'Chemical Metering & Dosing Pumps',
      'High-Pressure Water Jetting Pumps',
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
      'Water Treatment & Desalination Facilities',
      'Offshore Drilling Rigs & Platforms',
      'Power Generation Stations',
      'Heavy Manufacturing & Industrial Plants',
    ],
    products: [
      {
        id: 'mech-0',
        title: 'Aluminum Camlock Couplings',
        slug: 'aluminum-camlock-couplings',
        image: '/uploads/aluminumcamlock.webp',
        images: [
          '/uploads/aluminumcamlock.webp',
          '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
        ],
        category: 'Hoses, Hammer Unions & Rig Supplies',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'Precision Die-Cast Aluminum Body',
          'Stainless Steel Cam Arms and Safety Pins',
          'NBR / Buna-N Leak-Proof Gaskets Included',
          'Working Pressure up to 250 PSI',
          'Complies with MIL-C-27487 / A-A-59326 Specifications',
        ],
        innerSections: [
          {
            title: 'Rapid Disconnect Fluid Transfer Couplings',
            content: 'Manufactured for high-efficiency fuel, fluid, and industrial water hose assemblies. Fast tool-free operation with robust safety locking handles.',
            image: '/uploads/aluminumcamlock.webp',
          },
        ],
      },
      {
        id: 'mech-1',
        title: 'Black-Coated Steel Pipe Flanges Threaded',
        slug: 'black-coated-steel-pipe-flanges-threaded',
        image: '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png',
        images: [
          '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png',
          '/products/mechanical/carbon-steel-seamless-erw-pipes.png',
          '/products/mechanical/industrial-gasket-and-seals.png',
        ],
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
        innerSections: [
          {
            title: 'Flange Pressure Classes & Dimensional Accuracy',
            content: 'Manufactured to strict ASME/ANSI B16.5 standards, these threaded flanges provide exceptional structural reliability in high-vibration piping systems. Features precision-tapered NPT threads that create leak-tight mechanical seals without requiring on-site welding.',
            image: '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png',
          },
        ],
      },
      {
        id: 'mech-2',
        title: 'Breathing Hoses',
        slug: 'breathing-hoses',
        image: '/products/mechanical/breathing-hoses.png',
        images: [
          '/products/mechanical/breathing-hoses.png',
          '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
          '/products/mechanical/industrial-large-bore-hoses.png',
        ],
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
        innerSections: [
          {
            title: 'Critical Breathing Air Safety Standards',
            content: 'Engineered for offshore rig safety and industrial refinery turnaround projects. Complies with EN 14593/EN 14594 breathing apparatus standards, with anti-static inner core lining and ozone-resistant synthetic outer cover.',
            image: '/products/mechanical/breathing-hoses.png',
          },
        ],
      },
      {
        id: 'mech-3',
        title: 'Butterfly Valve',
        slug: 'butterfly-valve',
        image: '/uploads/butterflyvalve.jpg',
        images: [
          '/uploads/butterflyvalve.jpg',
          '/products/mechanical/butterfly-valve.png',
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
        ],
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
        innerSections: [
          {
            title: 'High-Integrity Bidirectional Sealing',
            content: 'Designed with a vulcanized resilient seat that eliminates internal stem leaks. Ideal for both isolation and throttling duties across chemical dosing, cooling water, and desalination installations.',
            image: '/products/mechanical/butterfly-valve.png',
          },
        ],
      },
      {
        id: 'mech-4',
        title: 'Butterfly Valve Lever Handle SS Disc 3',
        slug: 'butterfly-valve-lever-handle-ss-disc-3',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png',
        images: [
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png',
          '/products/mechanical/butterfly-valve.png',
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
        ],
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
        innerSections: [
          {
            title: 'Precision Throttle Lever with 10-Position Lock',
            content: 'Equipped with a notched locking quadrant plate allowing precise flow control from 0 to 90 degrees. Investment-cast SS316 disc ensures maximum corrosion resistance against saline marine fluids.',
            image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-3.png',
          },
        ],
      },
      {
        id: 'mech-5',
        title: 'Butterfly Valve Lever Handle SS Disc 4',
        slug: 'butterfly-valve-lever-handle-ss-disc-4',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
        images: [
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
          '/products/mechanical/butterfly-valve.png',
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
        ],
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
        innerSections: [
          {
            title: 'Heavy Wafer Pattern Body & Direct ISO Mounting',
            content: 'Universal wafer body fits seamlessly between ANSI Class 150, PN10, and PN16 counter-flanges. Features an ISO 5211 direct-mount actuator pad for effortless pneumatic or electric actuator retrofits.',
            image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-4.png',
          },
        ],
      },
      {
        id: 'mech-6',
        title: 'Butterfly Valve Lever Handle SS Disc 6',
        slug: 'butterfly-valve-lever-handle-ss-disc-6',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
        images: [
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png',
          '/products/mechanical/butterfly-valve.png',
        ],
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
        innerSections: [
          {
            title: 'Epoxy Powder-Coated Ductile Iron Construction',
            content: 'Fusion-bonded epoxy coating (250+ microns) protects the valve body against corrosive atmospheric salt spray. Blow-out proof stem design ensures safe maintenance under full operational pressure.',
            image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
          },
        ],
      },
      {
        id: 'mech-7',
        title: 'Butterfly Valve Lever Handle SS Disc 8',
        slug: 'butterfly-valve-lever-handle-ss-disc-8',
        image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png',
        images: [
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png',
          '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png',
          '/products/mechanical/butterfly-valve.png',
        ],
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
        innerSections: [
          {
            title: 'Heavy Industrial Isolation & Slurry Capability',
            content: 'Engineered for high-volume piping lines in petrochemical refineries and municipal treatment facilities. Dual O-ring stem seals and heavy-duty gear/lever operators provide low operating torque.',
            image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-8.png',
          },
        ],
      },
      {
        id: 'mech-8',
        title: 'Hydraulic Hoses Fittings & Adaptors',
        slug: 'hydraulic-hoses-fittings-adaptors',
        image: '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
        images: [
          '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
          '/products/mechanical/industrial-large-bore-hoses.png',
          '/products/mechanical/breathing-hoses.png',
        ],
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
        innerSections: [
          {
            title: 'High-Pressure Hydraulic Crimp Assembly Certification',
            content: 'Tested up to 6,000 PSI operating pressure with high-tensile 4-spiral steel reinforcement. Available with BSP, JIC, and ORFS fittings, crimped and pressure-certified to international SAE 100R standards.',
            image: '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
          },
        ],
      },
      {
        id: 'mech-9',
        title: 'Industrial & Large Bore Hoses',
        slug: 'industrial-large-bore-hoses',
        image: '/products/mechanical/industrial-large-bore-hoses.png',
        images: [
          '/products/mechanical/industrial-large-bore-hoses.png',
          '/products/mechanical/hydraulic-hoses-fittings-adaptors.png',
          '/products/mechanical/breathing-hoses.png',
        ],
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
        innerSections: [
          {
            title: 'Heavy Mud & Chemical Transfer Performance',
            content: 'Engineered for extreme suction and discharge duties in offshore rig transfer operations. Built with oil-resistant synthetic rubber lining and dual-helix high-tensile wire for vacuum resistance.',
            image: '/products/mechanical/industrial-large-bore-hoses.png',
          },
        ],
      },
      {
        id: 'mech-10',
        title: 'Industrial Gasket and Seals',
        slug: 'industrial-gasket-and-seals',
        image: '/products/mechanical/industrial-gasket-and-seals.png',
        images: [
          '/products/mechanical/industrial-gasket-and-seals.png',
          '/products/mechanical/black-coated-steel-pipe-flanges-threaded.png',
          '/categories/all-fittings.jpeg',
        ],
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
        innerSections: [
          {
            title: 'Spiral Wound & RTJ High-Temperature Sealing',
            content: 'Manufactured with high-purity flexible graphite windings and 316 stainless steel guide rings. Resists thermal cycling and mechanical shock in petrochemical cracking and steam headers.',
            image: '/products/mechanical/industrial-gasket-and-seals.png',
          },
        ],
      },
      {
        id: 'mech-11',
        title: 'Isolation Valve, Ball Valve Steam High Temperature Ball Valve',
        slug: 'isolation-valve-ball-valve-steam-high-temperature-ball-valve',
        image: '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png',
        images: [
          '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png',
          '/products/mechanical/butterfly-valve.png',
          '/categories/all-fittings.jpeg',
        ],
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
        innerSections: [
          {
            title: 'Firesafe Metal-Seated Steam Isolation',
            content: 'Three-piece bolted body in forged carbon or stainless steel, with Stellite hard-faced ball and seat. Tested to API 607 firesafe guidelines, delivering zero-leakage shutoff in high-pressure superheated steam.',
            image: '/products/mechanical/isolation-valve-ball-valve-steam-high-temperature-ball-valve.png',
          },
        ],
      },
      {
        id: 'mech-12',
        title: 'Micro Linear Actuators',
        slug: 'micro-linear-actuators',
        image: '/products/mechanical/micro-linear-actuators.png',
        images: [
          '/products/mechanical/micro-linear-actuators.png',
          '/products/mechanical/butterfly-valve.png',
          '/categories/all-fittings.jpeg',
        ],
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
        innerSections: [
          {
            title: 'Compact Electric Positioning & Ingress Protection',
            content: 'Engineered for industrial automation and remote dampener actuation. Features IP66 waterproof casing, high-reduction planetary gearbox, and internal potentiometer feedback.',
            image: '/products/mechanical/micro-linear-actuators.png',
          },
        ],
      },
      {
        id: 'mech-13',
        title: 'Carbon Steel Seamless & ERW Pipes',
        slug: 'carbon-steel-seamless-erw-pipes',
        image: '/uploads/carbonsteel.webp',
        images: [
          '/uploads/carbonsteel.webp',
          '/products/mechanical/carbon-steel-seamless-erw-pipes.png',
          '/products/steel/pipes.png',
          '/products/steel/304-stainless-steel-pipe.png',
        ],
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
        innerSections: [
          {
            title: 'Aramco & API Specification Compliance',
            content: 'Supplied strictly to ASTM A106 Grade B and API 5L PSL2 standards with complete Charpy V-Notch impact testing and HIC (Hydrogen Induced Cracking) resistance for sour gas service.',
            image: '/products/mechanical/carbon-steel-seamless-erw-pipes.png',
          },
        ],
      },
      {
        id: 'pmp-1',
        title: 'API 610 Centrifugal Process Pump',
        slug: 'api-610-centrifugal-process-pump',
        image: '/categories/pumps-motors.jpg',
        images: ['/categories/pumps-motors.jpg', '/categories/mechanical-supply-division.png'],
        category: 'Pumps & Fluid Handling',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'API 610 11th / 12th Edition Compliant (OH2 / BB2 / BB3)',
          'Heavy-Duty Casing Design for High Pressure & Temperature Services',
          'Single or Double Mechanical Cartridge Seals to API 682',
          'Precision Cast Impellers in Carbon Steel, Duplex & Alloy 20',
          'Hydrostatic Pressure Tested & Vibration Certified',
        ],
        innerSections: [
          {
            title: 'API 610 Refinery & Petrochemical Process Standards',
            content: 'Designed specifically for harsh hydrocarbon and refining applications. Engineered with centerline mounted casings, robust bearing housings, and compliance with Saudi Aramco and SABIC engineering standards.',
            image: '/categories/pumps-motors.jpg',
          },
        ],
      },
      {
        id: 'pmp-2',
        title: 'Heavy-Duty Submersible Slurry Pump',
        slug: 'heavy-duty-submersible-slurry-pump',
        image: '/categories/mechanical-supply-division.png',
        images: ['/categories/mechanical-supply-division.png', '/categories/pumps-motors.jpg'],
        category: 'Pumps & Fluid Handling',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'High-Chrome Abrasion-Resistant Wet End (28% Cr)',
          'Integrated Agitator for High Solids Concentration Handling',
          'Class H Motor Insulation with Thermal Overload Sensors',
          'Heavy-Duty Double Silicon Carbide Mechanical Seals',
          'Rugged Cast Iron / Ductile Iron Motor Housing',
        ],
        innerSections: [
          {
            title: 'Severe Abrasion & Slurry Pumping Capabilities',
            content: 'Engineered for sumps, wastewater settling ponds, and mining tailings. Equipped with a heavy-duty agitator to break up compacted solids and maintain high throughput.',
            image: '/categories/mechanical-supply-division.png',
          },
        ],
      },
      {
        id: 'pmp-3',
        title: 'High-Efficiency Industrial Electric Motor',
        slug: 'high-efficiency-industrial-electric-motor',
        image: '/categories/power-system.jpg',
        images: ['/categories/power-system.jpg', '/categories/pumps-motors.jpg'],
        category: 'Electric Motors & Drives',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'IE3 / IE4 Premium Efficiency Rating (IEC 60034-30-1)',
          'Cast Iron Frame with Cast Integral Feet for Maximum Rigidity',
          'IP55 / IP66 Ingress Protection for Severe Industrial Ambient',
          'Class F Insulation with Class B Temperature Rise (105K)',
          'VFD Inverter Duty Capable with Insulated Non-Drive Bearings',
        ],
        innerSections: [
          {
            title: 'Industrial Heavy Duty Inverter Duty Electric Motor',
            content: 'Designed for continuous heavy-duty duty cycles in industrial refineries, chemical plants, and utility pumping stations. Built with premium grade electrical steel laminations for minimal core losses.',
            image: '/categories/power-system.jpg',
          },
        ],
      },
      {
        id: 'pmp-4',
        title: 'Multistage High-Pressure Feed Pump',
        slug: 'multistage-high-pressure-feed-pump',
        image: '/categories/all-fittings.jpeg',
        images: ['/categories/all-fittings.jpeg', '/categories/pumps-motors.jpg'],
        category: 'Pumps & Fluid Handling',
        date: 'December 15, 2025',
        comments: '0 Comment',
        features: [
          'High-Pressure Multistage Impeller Design up to 100+ Bar',
          'Stainless Steel AISI 316 / Super Duplex Wet End Construction',
          'Cartridge Mechanical Seal for Easy Rapid Maintenance',
          'Balanced Thrust Drum or Balancing Disc Mechanism',
          'Optimal for Boiler Feed, Desalination SWRO & Reverse Osmosis',
        ],
        innerSections: [
          {
            title: 'High-Pressure Booster & Desalination Performance',
            content: 'Supplied for high-pressure industrial reverse osmosis, boiler feedwater systems, and municipal water pressure boosting, offering quiet operation and high hydraulic efficiency.',
            image: '/categories/all-fittings.jpeg',
          },
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
      { id: 'weld-0', title: 'Victor Oxygen Regulator', slug: 'victor-oxygen-regulator', image: '/uploads/victoroxygenregulator.jpg' },
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

  // 5. Marine Division
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
      'Structural Beams (H-Beams, I-Beams, Channels)',
      'Grating Sheets',
      'Steel Plates & Sheets',
      'Pipes & Tubular Products',
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
      { id: 'stl-2', title: 'Structural Steel BARS', image: '/products/steel/bars.png' },
      { id: 'stl-3', title: 'Carbon Steel 45° Elbow', image: '/products/steel/carbon-steel-45-elbow.png' },
      { id: 'stl-4', title: 'Carbon Steel 90° Elbow', image: '/products/steel/carbon-steel-90-elbow.png' },
      { id: 'stl-5', title: 'Carbon Steel Heavy PIPES', image: '/products/steel/pipes.png' },
      { id: 'stl-6', title: 'Hollow Section Steel TUBES', image: '/products/steel/tubes.png' },
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

  // 10. Fasteners Division
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

  // 11. PPE & Safety Equipment Division
  {
    id: 'ppe-safety-equipment',
    name: 'PPE & Safety Equipment',
    headline: 'PPE & Industrial Safety Equipment Supplier in Saudi Arabia',
    description: [
      'We supply industrial safety products, PPE equipment, and industrial consumables designed to improve workplace safety and operational efficiency across industrial sectors in Saudi Arabia.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Safety Helmets',
      'Gloves & Coveralls',
      'Eye & Face Protection',
      'Safety Shoes',
      'Respiratory Protection',
      'Industrial Adhesives & Sealants',
      'Abrasives & Grinding Discs',
      'Industrial Tapes',
      'Packing Materials',
    ],
    applicationsTitle: 'Applications',
    applications: [
      'Oil & Gas Sites',
      'Construction Projects',
      'Manufacturing Industries',
      'Industrial Maintenance',
      'Offshore Operations',
    ],
    products: [
      { id: 'ppe-1', title: '3M 6700 Full Face Respirator', slug: '3m-6700', image: '/products/ppe/3m-6700-full-face-respirator.png', category: 'Respiratory Protection' },
      { id: 'ppe-2', title: '3M 6800 Full Face Respirator', slug: '3m-6800-full-mask', image: '/products/ppe/3m-6800-full-face-respirator.png', category: 'Respiratory Protection' },
      { id: 'ppe-3', title: '3M 6900 Fullface Mask Large', slug: '3m-6900-fullface-mask-larg', image: '/products/ppe/3m-6900-full-face-respirator-large.png', category: 'Respiratory Protection' },
      { id: 'ppe-4', title: '3M 7093 Particulate Filter', slug: '3m-7093', image: '/products/ppe/3m-7093-particulate-filter.png', category: 'Respiratory Protection' },
      { id: 'ppe-5', title: '3M FF 402 Full Facepiece Respirator', slug: '3m-ff-402', image: '/products/ppe/3m-ff-402-full-facepiece-respirator.png', category: 'Respiratory Protection' },
      { id: 'ppe-6', title: '6100 Half Mask', slug: '6100-half-mask', image: '/products/ppe/3m-6100-half-facepiece-respirator.png', category: 'Respiratory Protection' },
      { id: 'ppe-7', title: '6200 Half Mask', slug: '6200-half-mask', image: '/products/ppe/3m-6200-half-facepiece-respirator.png', category: 'Respiratory Protection' },
      { id: 'ppe-8', title: '6300 Half Mask', slug: '6300-half-mask', image: '/products/ppe/3m-6300-half-facepiece-respirator.png', category: 'Respiratory Protection' },
      { id: 'ppe-9', title: '7502 Half Mask', slug: '7502-half-mask', image: '/products/ppe/3m-7502-silicone-half-mask.png', category: 'Respiratory Protection' },
      { id: 'ppe-10', title: '7503 Half Mask', slug: '7503-half-mask', image: '/products/ppe/3m-7503-silicone-half-mask.png', category: 'Respiratory Protection' },
      { id: 'ppe-11', title: 'Catridge Filter 2097', slug: 'catridge-filter-2097', image: '/products/ppe/3m-2097-particulate-filter.png', category: 'Respiratory Protection' },
      { id: 'ppe-12', title: 'Catridge Filter 501', slug: 'catridge-filter-501', image: '/products/ppe/3m-501-filter-retainer.png', category: 'Respiratory Protection' },
      { id: 'ppe-13', title: 'Catridge Filter 5N11', slug: 'catridge-filter-5n11', image: '/products/ppe/3m-5n11-n95-particulate-filter.png', category: 'Respiratory Protection' },
      { id: 'ppe-14', title: 'Catridge Filter 6001', slug: 'catridge-filter-6001', image: '/products/ppe/3m-6001-organic-vapor-cartridge.png', category: 'Respiratory Protection' },
      { id: 'ppe-15', title: 'Catridge Filter 6002', slug: 'catridge-filter-6002', image: '/products/ppe/3m-6002-acid-gas-cartridge.png', category: 'Respiratory Protection' },
      { id: 'ppe-16', title: 'Catridge Filter 6003', slug: 'catridge-filter-6003', image: '/products/ppe/3m-6003-organic-vapor-acid-gas-cartridge.png', category: 'Respiratory Protection' },
      { id: 'ppe-17', title: 'Catridge Filter 6004', slug: 'catridge-filter-6004', image: '/products/ppe/3m-6004-ammonia-methylamine-cartridge.png', category: 'Respiratory Protection' },
      { id: 'ppe-18', title: 'Catridge Filter 6005', slug: 'catridge-filter-6005', image: '/products/ppe/3m-6005-formaldehyde-organic-vapor-cartridge.png', category: 'Respiratory Protection' },
      { id: 'ppe-19', title: 'Catridge Filter 6006', slug: 'catridge-filter-6006', image: '/products/ppe/3m-6006-multi-gas-vapor-cartridge.png', category: 'Respiratory Protection' },
      { id: 'ppe-20', title: 'Catridge Filter 6051', slug: 'catridge-filter-6051', image: '/products/ppe/3m-6051-organic-vapor-filter.png', category: 'Respiratory Protection' },
      { id: 'ppe-21', title: 'Catridge Filter 6057', slug: 'catridge-filter-6057', image: '/products/ppe/3m-6057-inorganic-gas-acid-filter.png', category: 'Respiratory Protection' },
      { id: 'ppe-22', title: 'Catridge Filter 6059', slug: 'catridge-filter-6059', image: '/products/ppe/3m-6059-multi-gas-vapor-filter.png', category: 'Respiratory Protection' },
      { id: 'ppe-23', title: 'Disposable Masks (Box Pack)', slug: 'disposable-masks-box', image: '/products/ppe/3m-disposable-particulate-respirator-masks-box.png', category: 'Respiratory Protection' },
      { id: 'ppe-24', title: 'Disposable Particulate Masks', slug: 'disposable-masks', image: '/products/ppe/3m-disposable-particulate-respirator-masks.png', category: 'Respiratory Protection' },
    ],
  },

  // 12. Bearings and Filters Division
  {
    id: 'bearings-and-filters',
    name: 'Bearings and Filters',
    headline: 'Industrial Bearings, Mechanical Seals & Filtration Systems in Saudi Arabia',
    description: [
      'Orient Energy Trading Company supplies high-precision industrial bearings, mechanical seals, and heavy filtration systems across Saudi Arabia for oil & gas refineries, petrochemical plants, power utilities, marine installations, and heavy manufacturing.',
      'Our comprehensive bearings catalog includes deep groove ball bearings, spherical roller bearings, tapered roller bearings, pillow blocks, and linear guides from premium world-leading manufacturers. Alongside bearings, our filtration division provides high-efficiency hydraulic oil filters, heavy machinery fuel and air filters, suction strainers, and replacement cartridge elements to guarantee peak equipment uptime.',
    ],
    productRangeTitle: 'Product Range',
    productRange: [
      'Deep Groove Ball Bearings & Angular Contact Bearings',
      'Spherical & Tapered Roller Bearings',
      'Pillow Block & Flange Mounted Bearing Units',
      'Hydraulic Oil & Lube Return Line Filter Elements',
      'Heavy Duty Air & Fuel Filtration Systems',
      'Industrial Duplex & Simplex Basket Strainers',
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
    subcategoriesTitle: 'Bearings & Filters Sub-Categories',
    subcategories: [
      { name: 'Ball & Roller Bearings' },
      { name: 'Pillow Block Bearing Units' },
      { name: 'Hydraulic & Oil Filtration' },
      { name: 'Industrial Air & Fuel Filters' },
    ],
    pills: [
      'Ball Bearings',
      'Roller Bearings',
      'Pillow Blocks',
      'Hydraulic Filters',
      'Oil & Fuel Filters',
      'Air Filters',
      'Mechanical Seals',
    ],
    products: [
      {
        id: 'bf-1',
        title: 'Deep Groove Ball Bearing 6200 Series',
        slug: 'deep-groove-ball-bearing-6200-series',
        image: '/products/subcategories/fast-bolts.jpg',
        category: 'Ball Bearings',
        shortDescription: 'High-speed precision deep groove radial ball bearing with low friction torque.',
        fullDescription: 'Single row deep groove ball bearing engineered for high radial and axial loads at extreme rotational speeds in industrial electric motors and gearboxes.',
        features: [
          'High Precision Chrome Steel (GCr15)',
          'Double Rubber Seals (2RS) or Metal Shields (ZZ)',
          'Low Noise and Low Vibration Class C3',
          'Operating Temperature from -30°C to +120°C',
        ],
      },
      {
        id: 'bf-2',
        title: 'Heavy Duty Pillow Block Bearing UCP Series',
        slug: 'heavy-duty-pillow-block-bearing-ucp-series',
        image: '/products/subcategories/fast-anchors.jpg',
        category: 'Pillow Blocks',
        shortDescription: 'Cast iron self-aligning pillow block bearing unit with grease fitting.',
        fullDescription: 'Rigid cast iron housing fitted with a self-aligning chrome steel insert bearing, set screw locking mechanism, and anti-dust flinger seals.',
        features: [
          'Heavy Cast Iron Rigid Housing (HT200)',
          'Spherical Self-Aligning Insert Bearing',
          'Brass Grease Zerk Nipple for Easy Relubrication',
          'Dual Contact Rubber Seals Protecting Against Dirt and Moisture',
        ],
      },
      {
        id: 'bf-3',
        title: 'High-Pressure Hydraulic Return Line Filter Element',
        slug: 'high-pressure-hydraulic-return-line-filter-element',
        image: '/products/subcategories/coat-industrial-coatings.jpg',
        category: 'Hydraulic Filters',
        shortDescription: 'Microglass fiber hydraulic filter element for high-pressure fluid cleanliness.',
        fullDescription: 'High-dirt-holding capacity inorganic microglass filter cartridge engineered to capture particulate contamination down to 3, 5, or 10 microns.',
        features: [
          'Inorganic Microglass Depth Filter Media',
          'Beta Ratio βx(c) >= 1000 Multi-Pass Tested',
          'Collapse Pressure Rating up to 210 Bar',
          'Compatible with Petroleum Oils, Glycols & Synthetic Fluids',
        ],
      },
      {
        id: 'bf-4',
        title: 'Heavy Industrial Machinery Air & Fuel Filter Assembly',
        slug: 'heavy-industrial-machinery-air-fuel-filter-assembly',
        image: '/products/subcategories/fast-special-fasteners.jpg',
        category: 'Air & Fuel Filters',
        shortDescription: 'Primary and secondary dual-stage engine intake air and diesel fuel filter.',
        fullDescription: 'Heavy-duty filtration assembly designed for diesel generator sets, heavy earth-moving equipment, and marine propulsion engines.',
        features: [
          'Radial Seal Air Filtration Technology',
          'Water Separating Fuel Filter with Drain Valve',
          'Corrosion-Resistant Coated Steel Housing',
          'High Particle Separation Efficiency >= 99.9%',
        ],
      },
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
