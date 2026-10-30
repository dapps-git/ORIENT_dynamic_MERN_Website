export interface SectorApplication {
  title: string;
  description: string;
  icon?: string;
}

export interface SectorProductCategory {
  categoryName: string;
  divisionSlug: string;
  divisionName: string;
  items: string[];
}

export interface SectorData {
  id: string; // slug e.g. 'oil-gas'
  num: string; // '01'
  title: string;
  shortTitle: string;
  tagline: string;
  image: string;
  heroImage: string;
  overview: string[];
  keyApplications: SectorApplication[];
  suppliedProducts: SectorProductCategory[];
  standardsAndCompliance: string[];
  whyOrient: string[];
  keyClientsOrProjects: string[];
  metaDescription: string;
}

export const SECTORS_DATA: SectorData[] = [
  {
    id: 'oil-gas',
    num: '01',
    title: 'Oil & Gas Industry Supplier in Saudi Arabia',
    shortTitle: 'Oil & Gas',
    tagline: 'High-Integrity Piping, Valves, Flanges & Critical Industrial Supplies for Upstream, Midstream & Downstream Operations',
    image: '/sectors/oil-gas.png',
    heroImage: '/sectors/oil-gas.png',
    metaDescription:
      'Orient Energy Co. is an approved industrial supplier for Saudi Aramco, SABIC, and EPC contractors, supplying API 6D valves, high-pressure fittings, ASTM pipes, and safety gear across Saudi Arabia.',
    overview: [
      'Orient Energy Trading Company is a premier industrial supply partner serving the Oil & Gas sector throughout the Kingdom of Saudi Arabia. From onshore drilling rigs in Shaybah and Ghawar to offshore platforms in Marjan, Berri, and Safaniya, and downstream mega-refineries in Jubail, Yanbu, and Ras Tanura, we supply mission-critical equipment engineered to withstand extreme pressures, corrosive H2S sour service, and harsh desert environments.',
      'Our deep alignment with Saudi Aramco, SABIC, and major EPC contractors ensures that every valve, flange, pipe fitting, gasket, and instrumentation component adheres strictly to 9COM/9CAT standards, API specifications, and ASME/ASTM codes. We support routine maintenance turnaround, emergency shutdowns (TAR), and multi-billion-dollar greenfield expansions with rapid material staging from our Eastern Province distribution hubs.',
      'Through partnerships with globally certified manufacturers, we deliver full material traceability, Mill Test Certificates (EN 10204 3.1 / 3.2), NDT inspection reports, and positive material identification (PMI) to guarantee absolute reliability on your production line.',
    ],
    keyApplications: [
      {
        title: 'Upstream Drilling & Extraction',
        description: 'Supplying heavy drilling mud hoses, high-pressure hammer unions, wellhead choke valves, and blowout preventer auxiliary lines.',
        icon: '🛢️',
      },
      {
        title: 'Midstream Pipeline & Transmission',
        description: 'Carbon steel seamless API 5L line pipes, high-yield induction bends, piggable ball valves, and cathodic protection materials.',
        icon: '⚡',
      },
      {
        title: 'Downstream Refining & Petrochemicals',
        description: 'Alloy 20 and Super Duplex valves, ASME B16.5 heavy flanges, spiral wound gaskets, and thermal insulation solutions.',
        icon: '🏭',
      },
      {
        title: 'Turnaround & Shutdown Operations (TAR)',
        description: '24/7 emergency supply of replacement gaskets, stud bolts, hydraulic bolting consumables, and industrial safety PPE.',
        icon: '⏱️',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'High Pressure Valves & Flow Control',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'API 6D Trunnion & Floating Ball Valves',
          'Cast & Forged Steel Gate, Globe & Check Valves',
          'Triple Offset Butterfly Valves (ANSI 150 - 2500)',
          'High-Temperature Steam Isolation Valves',
        ],
      },
      {
        categoryName: 'Piping, Flanges & Specialized Fittings',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'ASTM A106 Gr. B & API 5L Seamless Line Pipes',
          'Forged Steel Flanges (WN, BLRF, SO, RTJ - Class 150 to 2500)',
          'High Pressure Forged Fittings (Socket Weld & Threaded 3000# / 6000#)',
          'Spiral Wound & Kammprofile Metallic Gaskets',
        ],
      },
      {
        categoryName: 'Welding & Heavy Cutting Systems',
        divisionSlug: 'welding-division',
        divisionName: 'Welding Division',
        items: [
          'Engine-Driven Welder Generators for Pipeline Field Crews',
          'Lincoln & Victor Gas Cutting Torches, Regulators & Flashback Arrestors',
          'Low Hydrogen E7018 & Stainless Steel Welding Electrodes',
          'Pipe Purging Systems & Heavy Duty Clamps',
        ],
      },
      {
        categoryName: 'Electrical Power & Safety Consumables',
        divisionSlug: 'electrical-division',
        divisionName: 'Electrical Division',
        items: [
          'ATEX / IECEx Explosion-Proof Enclosures & Lighting',
          'Heavy Armoured XLPE Power Cables & Cable Glands',
          'Aramco-Compliant Flame Resistant (FR) Coveralls & PPE',
        ],
      },
    ],
    standardsAndCompliance: [
      'Saudi Aramco 9COM / 9CAT Compliant Sources',
      'API Spec 6D, 6A & API 598 Pressure Testing',
      'ASME / ANSI B16.5, B16.9, B16.11 & B16.34',
      'NACE MR0175 / ISO 15156 Sour Gas Resistance',
      'EN 10204 3.1 & 3.2 Certified Mill Test Reports (MTR)',
      'ISO 9001:2015 Quality Management Certified Supply Chain',
    ],
    whyOrient: [
      'Strategically positioned warehouses in Al Khobar, Dammam, and Jubail for immediate site delivery.',
      'Complete documentation package included with every shipment: MTRs, CoC, and third-party inspection.',
      'Approved vendor list (AVL) cross-referencing to match your exact EPC project approved manufacturers.',
      'Dedicated bilingual engineering sales team with extensive Saudi Aramco & SABIC project experience.',
    ],
    keyClientsOrProjects: [
      'Saudi Aramco Marjan & Berri Increment Programs',
      'SABIC Petrochemical Complexes (Kemya, Yanpet, Sharq)',
      'Fadhili & Wasit Gas Plant Operations',
      'Major EPC Contractors (Saipem, Sinopec, Petrofac, L&T, Zamil)',
    ],
  },
  {
    id: 'marine-offshore',
    num: '02',
    title: 'Marine & Offshore Industry Supplier in Saudi Arabia',
    shortTitle: 'Marine & Offshore',
    tagline: 'Certified Ship Chandlery, Rigging, Marine Hoses, Anodes & Deck Equipment for Arabian Gulf & Red Sea Fleets',
    image: '/sectors/marine-offshore.png',
    heroImage: '/sectors/marine-offshore.png',
    metaDescription:
      'Orient Energy supplies certified marine equipment, mooring ropes, zinc anodes, offshore lifting slings, and marine valves to shipyards, ports, and offshore vessels in Saudi Arabia.',
    overview: [
      'Orient Energy Trading Company is a dependable marine and offshore supply partner operating across the Kingdom’s vital maritime hubs—including King Abdulaziz Port (Dammam), Ras Tanura Port, Jubail Commercial Port, King Fahd Industrial Port, and Jeddah Islamic Port on the Red Sea.',
      'We support offshore drilling rigs, anchor handling tug supply (AHTS) vessels, barges, dredgers, and commercial shipping fleets with certified marine deck stores, engine room spare parts, sacrificial zinc/aluminum anodes, certified offshore lifting rigging, and heavy-duty marine bunker hoses.',
      'All our marine materials conform to IACS member classification standards (ABS, DNV, Lloyd’s Register, Bureau Veritas) and SOLAS requirements, ensuring seamless maritime safety, corrosion mitigation, and operational continuity under harsh saline conditions.',
    ],
    keyApplications: [
      {
        title: 'Offshore Jackup & Semi-Submersible Rigs',
        description: 'Supplying marine mud delivery hoses, non-sparking deck tools, high-strength alloy anchor chains, and corrosion-resistant fasteners.',
        icon: '⚓',
      },
      {
        title: 'Shipyards & Vessel Dry-Docking',
        description: 'Sacrificial zinc and aluminum hull anodes, marine epoxy paints, ballast tank coatings, and certified sea chest valves.',
        icon: '🚢',
      },
      {
        title: 'Port Facilities & Offshore Berths',
        description: 'Marine pneumatic rubber fenders, bollard mooring ropes, hawser lines, and quay-side electrical shore power cables.',
        icon: '🌊',
      },
      {
        title: 'Subsea & Diving Operations',
        description: 'High-visibility safety lines, stainless steel 316 marine fittings, and subsea lifting slings certified to DNV 2.7-1.',
        icon: '🤿',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'Marine Rigging & Offshore Lifting',
        divisionSlug: 'lifting-material-handling',
        divisionName: 'Lifting & Material Handling',
        items: [
          'DNV 2.7-1 Certified Offshore Wire Rope Slings & Shackles',
          'HMPE & Polypropylene Braided Mooring Hawsers',
          'Stainless Steel 316 Turnbuckles, Eye Bolts & Swivels',
          'Pneumatic & Manual Chain Hoists with Marine Spark Resistance',
        ],
      },
      {
        categoryName: 'Marine Valves & Fluid Systems',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Bronze & Gunmetal Flanged Sea Water Valves',
          'Cast Iron & Ductile Iron Marine Butterfly Valves',
          'Flexible Marine Exhaust & Bellow Connectors',
          'Heavy Bore Marine Fuel Oil Bunkering Hoses & Camlocks',
        ],
      },
      {
        categoryName: 'Cathodic Protection & Coatings',
        divisionSlug: 'coatings-surface-protection',
        divisionName: 'Coatings & Surface Protection Division',
        items: [
          'Weld-On & Bolt-On High Purity Zinc & Aluminum Anodes',
          'Heavy Marine Antifouling & Ballast Tank Epoxy Coatings',
          'Denso Anti-Corrosion Petrolatum Marine Wrapping Tapes',
        ],
      },
    ],
    standardsAndCompliance: [
      'IACS Class Societies Compliance (ABS, DNV, BV, LR)',
      'SOLAS & IMO Maritime Safety Standards',
      'DNV 2.7-1 / BS EN 12079 Offshore Container & Rigging Certs',
      'ASTM B418 High-Purity Zinc Anode Specifications',
      'Traceable Mill Test & Break-Load Certification',
    ],
    whyOrient: [
      '24/7 emergency dispatch directly to port quaysides, shipyards, and offshore supply terminals.',
      'Broad stocking of marine-grade Stainless 316, Super Duplex, and Bronze components resistant to salt mist.',
      'Comprehensive ship chandlery and deck hardware under one reliable procurement contract.',
    ],
    keyClientsOrProjects: [
      'Zamil Offshore Operations & Shipyards',
      'International Maritime Industries (IMI) Ras Al Khair',
      'Rawabi Vallianz Offshore Fleets',
      'King Abdulaziz Port Dammam Vessel Support Services',
    ],
  },
  {
    id: 'construction',
    num: '03',
    title: 'Construction & Infrastructure Supplier in Saudi Arabia',
    shortTitle: 'Construction & Infrastructure',
    tagline: 'High-Tensile Structural Fasteners, Piping Systems, Lifting Equipment & Site Safety for Giga-Projects & Smart Cities',
    image: '/sectors/construction.png',
    heroImage: '/sectors/construction.png',
    metaDescription:
      'Orient Energy delivers certified construction supplies, structural fasteners (ASTM A325/A490), piping systems, and site safety materials to NEOM, Red Sea, Qiddiya, and civil infrastructure across Saudi Arabia.',
    overview: [
      'The Kingdom of Saudi Arabia is experiencing an unprecedented construction revolution driven by Vision 2030 giga-projects, including NEOM, The Red Sea Project, Qiddiya, ROSHN, Diriyah Gate, and major urban infrastructure developments in Riyadh, Jeddah, and the Eastern Province.',
      'Orient Energy Trading Company is proud to serve tier-1 general contractors, MEP specialists, structural steel fabricators, and infrastructure developers with high-strength ASTM structural bolting assemblies, certified crane rigging, site electrical distribution, industrial pumps, and job-site safety equipment.',
      'We combine vast inventory holding with streamlined delivery logistics across Saudi Arabia, ensuring that high-volume project orders are delivered on time, within specification, and fully backed by certified test certificates.',
    ],
    keyApplications: [
      {
        title: 'Mega Structural Steel Erection',
        description: 'Supplying ASTM A325, A490, and Grade 8.8 / 10.9 hot-dip galvanized structural bolt assemblies, anchor bolts, and tension indicators.',
        icon: '🏗️',
      },
      {
        title: 'Commercial & High-Rise MEP Services',
        description: 'Grooved pipe couplings, ductile iron balancing valves, seismic vibration isolators, and fire protection piping materials.',
        icon: '🏢',
      },
      {
        title: 'Civil & Earthmoving Infrastructure',
        description: 'Heavy dewatering pumps, layflat discharge hoses, trench shoring hardware, and heavy equipment rigging supplies.',
        icon: '🚧',
      },
      {
        title: 'Site Safety & Worker Welfare Facilities',
        description: 'OSHA/SASO compliant edge-protection nets, safety harnesses, fall arrestors, first aid equipment, and high-visibility PPE.',
        icon: '🦺',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'Structural Bolting & Fasteners',
        divisionSlug: 'fasteners-division',
        divisionName: 'Fasteners Division',
        items: [
          'ASTM A325 / A490 Type 1 Heavy Hex Structural Bolts',
          'Grade 8.8, 10.9 & 12.9 Hot-Dip Galvanized Hex Bolts & Nuts',
          'Full-Thread Stud Bolts with 2H Nuts (ASTM A193 B7 / A194 2H)',
          'Heavy Chemical & Mechanical Concrete Wedge Anchors',
        ],
      },
      {
        categoryName: 'Lifting Slings & Crane Hardware',
        divisionSlug: 'lifting-material-handling',
        divisionName: 'Lifting & Material Handling',
        items: [
          'High-Tenacity Polyester Webbing Slings & Round Slings',
          'Grade 80 & Grade 100 Alloy Steel Lifting Chains',
          'Crosby-Style Heavy Safety Shackles & Swivel Hoist Rings',
          'Wire Rope Pulling Hoists (Tirfor) & Lever Block Hoists',
        ],
      },
      {
        categoryName: 'Piping & MEP Drainage Systems',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Ductile Iron Pipes & Flexible Expansion Joints',
          'Grooved Mechanical Fittings & Couplings for HVAC / Firefighting',
          'Cast Iron & Stainless Strainers (Y-Type & Basket Type)',
        ],
      },
    ],
    standardsAndCompliance: [
      'SASO (Saudi Standards, Metrology and Quality Organization) Certified',
      'ASTM A325, A490, A193, A194 & F436 Structural Bolting Standards',
      'EN 12385 Steel Wire Rope & EN 1492 Polyester Sling Certs',
      'Third-party TPI Inspection Available on Request (SGS, TUV, Bureau Veritas)',
    ],
    whyOrient: [
      'High-volume ready stock for instant mobilization to remote project camps across NEOM and the Western Province.',
      'Flexible credit facilities and project-based call-off contracts for major general contractors.',
      'Complete test documentation with 100% heat traceability on all structural hardware.',
    ],
    keyClientsOrProjects: [
      'NEOM Industrial & Linear Cities Projects',
      'Red Sea Global Coastal & Island Resorts',
      'Riyadh Metro & King Salman Park Developments',
      'Major Contractors (Al Bawani, Nesma, El Seif, Shapoorji Pallonji)',
    ],
  },
  {
    id: 'manufacturing',
    num: '04',
    title: 'Manufacturing Industry Supplier in Saudi Arabia',
    shortTitle: 'Manufacturing Industry',
    tagline: 'Reliable Industrial Supplies, Bearings, Motors, Pneumatics & Tooling for Modern Production Facilities',
    image: '/sectors/manufacturing.jpg',
    heroImage: '/sectors/manufacturing.jpg',
    metaDescription:
      'Orient Energy provides continuous MRO supplies, electric motors, pneumatics, conveyor components, and precision maintenance tools to manufacturing plants across Saudi Arabia.',
    overview: [
      'Manufacturing represents a cornerstone of Saudi Arabia’s National Industrial Development and Logistics Program (NIDLP). From food and beverage processing plants in Sudair and Jeddah to plastics, packaging, and advanced automotive manufacturing complexes in Jubail and Ras Al Khair, factory uptime is critical.',
      'Orient Energy Trading Company operates as a trusted single-source procurement partner for manufacturing plant managers and maintenance engineers. We provide a complete spectrum of MRO (Maintenance, Repair, and Operations) materials, electric motors, pneumatic actuators, bearings, lubricants, and workshop tooling.',
      'With dedicated account management and vendor-managed inventory (VMI) capabilities, we help plants eliminate costly production downtime, streamline supply chains, and maintain optimal operational efficiency.',
    ],
    keyApplications: [
      {
        title: 'Automated Assembly & Conveyor Lines',
        description: 'Heavy conveyor belting, roller chains, electric gear motors, variable frequency drives (VFD), and micro linear actuators.',
        icon: '⚙️',
      },
      {
        title: 'Pneumatic & Hydraulic Automation',
        description: 'Pneumatic cylinders, directional solenoid valves, air preparation units (FRL), and high-pressure hydraulic hose assemblies.',
        icon: '💨',
      },
      {
        title: 'Machine Tooling & Preventive Maintenance',
        description: 'Carbide cutting tools, torque wrenches, precision measurement instruments, and vibration monitoring equipment.',
        icon: '🔧',
      },
      {
        title: 'Plant Safety & Environmental Control',
        description: 'Spill containment pallets, chemical-resistant safety suits, lockout/tagout (LOTO) kits, and dust extraction consumables.',
        icon: '🛡️',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'Electric Motors & Power Drives',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Three-Phase High Efficiency Industrial Electric Motors (IE3 / IE4)',
          'Helical Gearboxes & Variable Speed Drive Units',
          'Micro Linear Actuators for Automated Production Lines',
        ],
      },
      {
        categoryName: 'Industrial Valves & Fluid Transfer',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Stainless Steel 316 Sanitary Ball & Butterfly Valves',
          'Pneumatically Actuated Control Valves',
          'Food-Grade and Chemical-Resistant Transfer Hoses',
        ],
      },
      {
        categoryName: 'MRO Tools & Maintenance Supplies',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Professional Power Tools (DeWalt, Makita, Bosch)',
          'Precision Calibrated Torque Wrenches & Hand Tool Sets',
          'Specialized Anti-Seize Lubricants & Industrial Sealants',
        ],
      },
    ],
    standardsAndCompliance: [
      'IEC / NEMA Electric Motor Efficiency Standards',
      'FDA & EC Compliant Materials for Food & Beverage Plants',
      'ISO 9001:2015 Traceable Supply Chain',
      'CE & SASO Certified Electrical and Tooling Gear',
    ],
    whyOrient: [
      'Scheduled recurring MRO deliveries to keep your factory stockrooms constantly replenished.',
      'Technical support to help select exact drop-in replacements for obsolete machinery parts.',
      'Direct partnerships with tier-1 international brands for genuine components with warranty.',
    ],
    keyClientsOrProjects: [
      'MODON Industrial Cities (Riyadh 2nd & 3rd, Dammam 2nd, Jeddah 1st & 2nd)',
      'Food & Beverage Giants (Almarai, Savola, Nada)',
      'Plastic & Chemical Conversion Facilities in Jubail',
    ],
  },
  {
    id: 'power-energy',
    num: '05',
    title: 'Energy & Power Sector Supplier in Saudi Arabia',
    shortTitle: 'Energy & Power',
    tagline: 'High-Voltage Switchgear Supplies, Transformers, UPS Systems, Cables & Substation Materials',
    image: '/sectors/power-energy.png',
    heroImage: '/sectors/power-energy.png',
    metaDescription:
      'Orient Energy supplies SEC-approved electrical equipment, switchgear components, industrial UPS systems, high-voltage cables, and substation hardware across Saudi Arabia.',
    overview: [
      'Saudi Arabia’s energy grid is expanding rapidly to meet escalating industrial demand and ambitious renewable energy targets under Vision 2030, including large-scale solar PV farms, combined-cycle power plants, and extensive high-voltage transmission networks.',
      'Orient Energy Trading Company delivers certified electrical and mechanical supplies to Saudi Electricity Company (SEC) contractors, independent power producers (IPPs), and renewable energy developers across the Kingdom.',
      'We supply medium- and high-voltage power cables, cable termination kits, substation hardware, industrial UPS and battery backup systems, Earthing / lightning protection systems, and high-temperature steam valves for power generation turbines.',
    ],
    keyApplications: [
      {
        title: 'Thermal & Combined Cycle Power Plants',
        description: 'High-temperature alloy steel steam valves, boiler feed pump mechanical seals, and heat exchanger titanium tubing.',
        icon: '⚡',
      },
      {
        title: 'Substations & Grid Distribution',
        description: 'MV / HV cable joints and terminations, disconnect switches, busbar copper hardware, and composite post insulators.',
        icon: '🔌',
      },
      {
        title: 'Industrial UPS & Critical Power Backups',
        description: 'Heavy online double-conversion UPS systems, VRLA and nickel-cadmium battery banks, and automatic transfer switches (ATS).',
        icon: '🔋',
      },
      {
        title: 'Solar PV & Renewable Farms',
        description: 'UV-resistant solar cables (H1Z2Z2-K), MC4 connectors, combiner boxes, and DC string surge protection devices.',
        icon: '☀️',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'Electrical Infrastructure & Switchgear',
        divisionSlug: 'electrical-division',
        divisionName: 'Electrical Division',
        items: [
          'Industrial UPS Systems & DC Power Battery Banks',
          'Schneider Electric & ABB Certified Switchgear Components',
          'Heavy Power & Control Armoured Cables (Copper & Aluminum)',
          'Heat Shrink Medium-Voltage Cable Joints & Terminations (Raychem)',
        ],
      },
      {
        categoryName: 'Power Plant Mechanical Systems',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'High-Temperature / High-Pressure Steam Ball & Gate Valves',
          'Alloy Steel Seamless Pipes (ASTM A335 P11, P22, P91)',
          'Flexible Metal Bellow Expansion Joints for Turbine Exhaust',
        ],
      },
      {
        categoryName: 'Earthing & Lightning Protection',
        divisionSlug: 'electrical-division',
        divisionName: 'Electrical Division',
        items: [
          'Solid Copper Earth Rods & Exothermic Welding Powder (Cadweld)',
          'Bare Copper Tinned Grounding Tape & Cable Conductors',
          'Earth Pits & Ground Resistance Enhancement Materials',
        ],
      },
    ],
    standardsAndCompliance: [
      'SEC (Saudi Electricity Company) Specifications & Vendor Approvals',
      'IEC 60227, IEC 60502-1 & IEC 60502-2 Cable Standards',
      'IEEE 80 Substation Grounding Safety Codes',
      'UL & CE Certified Electrical & UPS Equipment',
    ],
    whyOrient: [
      'Thorough understanding of SEC material codes and approval submission workflows.',
      'High-capacity power cable stocking with custom reel cutting and expedited dispatch.',
      'Certified engineering support for critical power backup sizing and UPS commissioning.',
    ],
    keyClientsOrProjects: [
      'Saudi Electricity Company (SEC) Generation & Transmission Projects',
      'ACWA Power Independent Water & Power Plants (IWPP)',
      'Sudair & Sakaka Solar PV Mega Installations',
      'Substation EPC Contractors (Alfanar, Al-Babtain, Hyundai E&C)',
    ],
  },
  {
    id: 'heavy-engineering',
    num: '06',
    title: 'Heavy Engineering Industry Supplier in Saudi Arabia',
    shortTitle: 'Heavy Engineering',
    tagline: 'Heavy Industrial Steel, High-Capacity Lifting Chains, Hydraulic Tooling & Specialized Mechanical Components',
    image: '/sectors/heavy-engineering.jpg',
    heroImage: '/sectors/heavy-engineering.jpg',
    metaDescription:
      'Orient Energy provides heavy engineering supplies, high-capacity hydraulic cylinders, Grade 100 lifting chains, structural plates, and precision machining tools in Saudi Arabia.',
    overview: [
      'Heavy engineering facilities across Saudi Arabia fabricate massive pressure vessels, heat exchangers, offshore modules, storage tanks, and industrial cranes that power the nation’s core infrastructure.',
      'Orient Energy Trading Company supplies heavy fabrication yards with high-tensile structural steel plates, ASME-grade pipe fittings, heavy hydraulic jacking systems, certified spreader beams, and heavy-duty machining tooling.',
      'We understand that in heavy engineering, precision tolerances and metallurgical integrity are paramount. Every material we deliver comes with comprehensive chemical and physical mill test reports to satisfy the most demanding QA/QC inspection regimes.',
    ],
    keyApplications: [
      {
        title: 'Pressure Vessel & Column Fabrication',
        description: 'Dished heads, thick-walled seamless nozzles, SA516 Gr. 70 HIC-tested plates, and heavy forging flanges.',
        icon: '🛢️',
      },
      {
        title: 'Heavy Lift & Module Rigging',
        description: 'Modular spreader bars, 100-ton hydraulic jacks, multi-leg Grade 100 chain slings, and synchronized lift monitoring.',
        icon: '🏗️',
      },
      {
        title: 'Storage Tank Erection (API 650 / 620)',
        description: 'Tank jacking equipment, annular plate welding flux, floating roof seal materials, and emergency vacuum relief valves.',
        icon: '🗼',
      },
      {
        title: 'Hydraulic Bolting & Machining',
        description: 'Hydraulic torque wrenches, bolt tensioners, flange facing machines, and magnetic base heavy drills.',
        icon: '🔩',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'High-Capacity Lifting & Rigging',
        divisionSlug: 'lifting-material-handling',
        divisionName: 'Lifting & Material Handling',
        items: [
          'Grade 100 Heavy Duty Alloy Steel Lifting Chains & Master Links',
          'Heavy Forged Shackle Assemblies (up to 250 Ton Capacity)',
          'Hydraulic Cylinders & Electric High-Pressure Power Packs',
          'Heavy Duty Plate Clamps & Beam Tongs',
        ],
      },
      {
        categoryName: 'Heavy Structural Steel & Pipes',
        divisionSlug: 'steel-structural-materials-division',
        divisionName: 'Steel & Structural Materials Division',
        items: [
          'ASME SA516 Gr. 70 Boiler & Pressure Vessel Quality Plates',
          'High Yield Heavy Wall Seamless Steel Pipes & Heavy Forgings',
          'Heavy Structural Beams (W-Shapes, HEB, HEA to ASTM A992)',
        ],
      },
      {
        categoryName: 'Heavy Bolting & Stud Assemblies',
        divisionSlug: 'fasteners-division',
        divisionName: 'Fasteners Division',
        items: [
          'Heavy Hex Alloy Studs (ASTM A193 B7 / B16 with A194 2H / Gr. 7 Nuts)',
          'Xylan / PTFE Fluoropolymer Coated Studs for Corrosive Service',
        ],
      },
    ],
    standardsAndCompliance: [
      'ASME Section VIII Boiler and Pressure Vessel Code',
      'API 650 / 620 Welded Tanks for Oil Storage',
      'EN 10204 3.1 & 3.2 Material Test Certs with Ultrasonic Testing (UT)',
      'NACE MR0175 / HIC (Hydrogen Induced Cracking) Tested Steel',
    ],
    whyOrient: [
      'Ability to source specialized exotic alloys (Inconel, Monel, Duplex) with short lead times.',
      'Deep technical familiarity with heavy fabrication codes and third-party inspection sign-offs.',
      'Complete lifting gear test and recertification documentation.',
    ],
    keyClientsOrProjects: [
      'Zamil Heavy Industries (ZHI)',
      'Al-Mojil Fabrication Yards & Arabian Pipeline Piping Co.',
      'Petrojet Saudi Arabia & Gulf Stevedoring Contracting',
    ],
  },
  {
    id: 'maintenance',
    num: '07',
    title: 'Industrial Maintenance Supplier in Saudi Arabia',
    shortTitle: 'Industrial Maintenance',
    tagline: 'Comprehensive MRO Consumables, Hydraulic Seals, Flange Management Tools & Fast-Turnaround Supplies',
    image: '/sectors/maintenance.jpeg',
    heroImage: '/sectors/maintenance.jpeg',
    metaDescription:
      'Orient Energy is a rapid-response industrial maintenance (MRO) supplier in Saudi Arabia, providing gaskets, packing seals, lubricants, hand tools, and safety gear to refineries and plants.',
    overview: [
      'Planned preventative maintenance and sudden unscheduled outages dictate plant profitability. Plant maintenance teams need an agile supply partner who can deliver the exact replacement seal, valve, hose, or tool within hours—not weeks.',
      'Orient Energy Trading Company specializes in fast-response MRO procurement for refineries, petrochemical plants, desalination stations, cement mills, and steel works across Jubail, Dammam, Yanbu, and Rabigh.',
      'Our expansive inventory includes industrial gaskets, gland packing, mechanical seals, pneumatic fittings, hydraulic hoses with crimping services, precision torque equipment, anti-corrosion lubricants, and personal protective equipment.',
    ],
    keyApplications: [
      {
        title: 'Flange Management & Leak Prevention',
        description: 'Spiral wound gaskets, ring joint gaskets (RTJ), flange insulation kits, and ultrasonic bolt elongation meters.',
        icon: '⭕',
      },
      {
        title: 'Pump & Rotating Equipment Overhauls',
        description: 'Mechanical pump seals, PTFE/Graphite gland packing, precision shims, and laser alignment accessories.',
        icon: '🔄',
      },
      {
        title: 'Hydraulic & Pneumatic Line Re-Hosing',
        description: 'On-demand high-pressure hydraulic hose assemblies, crimped fittings, quick disconnect couplings, and ball valves.',
        icon: '🚰',
      },
      {
        title: 'Corrosion Remediation & Surface Care',
        description: 'Needle scalers, pneumatic wire brushes, zinc-rich cold galvanizing sprays, and rust converter chemicals.',
        icon: '🧪',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'Gaskets, Seals & Fluid Containment',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Spiral Wound Gaskets (SS316 / Graphite / Inner & Outer Rings)',
          'Non-Asbestos Compressed Sheet Gaskets & Custom Cut Gaskets',
          'Pure Expanded Graphite & PTFE Valve Gland Packing',
          'Flange Insulating Gasket Kits (Pikotek / VCS Type) for Cathodic Isolation',
        ],
      },
      {
        categoryName: 'Hydraulic Hoses & Industrial Couplings',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          '1SN, 2SN & 4SP High-Pressure Wire-Braided Hydraulic Hoses',
          'Quick Release Couplings & Camlock Couplings (SS316 / Brass / Aluminum)',
          'Industrial Air, Water, Chemical & Steam Hoses',
        ],
      },
      {
        categoryName: 'Specialized Maintenance Chemicals',
        divisionSlug: 'coatings-surface-protection',
        divisionName: 'Coatings & Surface Protection Division',
        items: [
          'High-Temperature Copper & Nickel Anti-Seize Compounds',
          'Industrial Solvent Degreasers & Electrical Contact Cleaners',
          'Loctite Threadlockers, Retaining Compounds & Pipe Sealants',
        ],
      },
    ],
    standardsAndCompliance: [
      'ASME B16.20 Metallic Gaskets for Pipe Flanges',
      'DIN / ISO Hydraulic Hose & Fitting Standards',
      'RoHS & REACH Compliant Maintenance Chemicals',
      'Full Material Traceability & Batch Certificates',
    ],
    whyOrient: [
      '24/7 on-call dispatch service during scheduled plant turnarounds (TAR).',
      'Central warehouse location within 30 minutes of Jubail and Dammam Industrial Areas.',
      'Flexible minimum order quantities—from single emergency gaskets to complete plant outage packages.',
    ],
    keyClientsOrProjects: [
      'SABIC Plant Maintenance Outages (Yanpet, Kemya, Ibn Zahr)',
      'Aramco Gas Plant Maintenance Divisions',
      'Marafiq Utility Maintenance Operations in Jubail',
    ],
  },
  {
    id: 'metals-fabrication',
    num: '08',
    title: 'Fabrication & Welding Supplier in Saudi Arabia',
    shortTitle: 'Fabrication & Welding',
    tagline: 'Leading Welding Machines, Victor Gas Cutting Gear, Electrodes, Abrasives & Pipe Purging Equipment',
    image: '/sectors/metals-fabrication.png',
    heroImage: '/sectors/metals-fabrication.png',
    metaDescription:
      'Orient Energy is an authorized distributor of Lincoln Electric, Victor gas cutting gear, welding electrodes, grinding abrasives, and metal fabrication tools in Saudi Arabia.',
    overview: [
      'Metal fabrication and welding shops form the structural backbone of Saudi Arabia’s industrial ecosystem. From pipeline double-jointing yards to architectural metalwork and storage tank fabrication, the quality of welds directly impacts structural safety and compliance.',
      'Orient Energy Trading Company is an established distributor of world-class welding machines, gas apparatus, filler metals, grinding abrasives, and pipe fit-up tools. We partner with top international manufacturers including Lincoln Electric, Victor Technologies, and leading electrode producers.',
      'We supply complete welding setups—from heavy multi-operator DC power sources to automatic orbital welders, oxy-fuel cutting outfits, flashback arrestors, and welder safety gear—guaranteeing peak productivity, high deposition rates, and X-ray defect-free welds.',
    ],
    keyApplications: [
      {
        title: 'Cross-Country Pipeline Welding',
        description: 'Engine-driven diesel welder generators, cellulosic E6010 / low hydrogen E7018 electrodes, and internal line-up clamps.',
        icon: '🔥',
      },
      {
        title: 'Heavy Structural Steel Welding (SMAW / FCAW)',
        description: 'Multi-process inverter welding machines, flux-cored gas-shielded wires, and sub-arc welding flux and wire combinations.',
        icon: '⚡',
      },
      {
        title: 'High-Purity Stainless & Alloy TIG Welding',
        description: 'High-frequency TIG welders, high-purity argon regulators, ceramic gas lenses, and soluble pipe purging dams.',
        icon: '✨',
      },
      {
        title: 'Metal Surface Prep & Weld Grinding',
        description: 'High-performance zirconia and ceramic grinding wheels, flap discs, wire cup brushes, and pneumatic angle grinders.',
        icon: '🪚',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'Welding Machines & Power Sources',
        divisionSlug: 'welding-division',
        divisionName: 'Welding Division',
        items: [
          'Lincoln Electric Multi-Process Inverters (MIG, TIG, Stick)',
          'Heavy Diesel Engine-Driven Welder / Generators (400A - 600A)',
          'Air Carbon Arc Gouging Torches & Heavy Gouging Carbons',
        ],
      },
      {
        categoryName: 'Gas Apparatus & Cutting Torches',
        divisionSlug: 'welding-division',
        divisionName: 'Welding Division',
        items: [
          'Victor Heavy Duty Oxy-Acetylene & Oxy-Propane Cutting Outfits',
          'Certified Flashback Arrestors & Pressure Regulators with Gauges',
          'Twin Welding Hoses (Grade T & R) with Solid Brass Fittings',
        ],
      },
      {
        categoryName: 'Welding Consumables & Abrasives',
        divisionSlug: 'welding-division',
        divisionName: 'Welding Division',
        items: [
          'AWS A5.1 / A5.5 Stick Electrodes (E6010, E7018, E8018, E308L, E316L)',
          'ER70S-6 Solid MIG Wire & Gas-Shielded Flux-Cored Wires (E71T-1)',
          'Heavy Duty Depressed Center Grinding Wheels & Cut-Off Wheels',
          'Auto-Darkening Welding Helmets & Leather Welder Apparel',
        ],
      },
    ],
    standardsAndCompliance: [
      'AWS (American Welding Society) Filler Metal Classifications',
      'ASME Section IX Welding & Brazing Qualifications',
      'EN ISO 2503 Gas Pressure Regulator Safety Codes',
      'OSHA & SASO Welder Safety Standards',
    ],
    whyOrient: [
      'Genuine factory-sealed welding wire and electrodes stored in climate-controlled warehouses.',
      'Comprehensive inventory of Victor torches, tips, and regulators for immediate site dispatch.',
      'Competitive wholesale container pricing for large-scale fabrication yards.',
    ],
    keyClientsOrProjects: [
      'Pipeline Contractors (Al-Rashid, Sinopec, Arkad)',
      'Structural Steel Fabricators in Dammam & Riyadh Industrial Cities',
      'Offshore Fabricators in Ras Al Khair & Dammam Shipyards',
    ],
  },
  {
    id: 'water-utility',
    num: '09',
    title: 'Water & Utility Projects Supplier in Saudi Arabia',
    shortTitle: 'Water & Utility',
    tagline: 'Ductile Iron Pipes, Large Bore Valves, Submersible Pumps, Desalination Supplies & Treatment Equipment',
    image: '/sectors/water-utility.jpg',
    heroImage: '/sectors/water-utility.jpg',
    metaDescription:
      'Orient Energy supplies SWCC & NWC-approved ductile iron piping, resilient seat gate valves, high-capacity pumps, and desalination materials across Saudi Arabia.',
    overview: [
      'Water transmission, seawater desalination, and wastewater treatment are vital national priorities in Saudi Arabia, spearheaded by the Saline Water Conversion Corporation (SWCC), the National Water Company (NWC), and Marafiq.',
      'Orient Energy Trading Company supplies certified piping materials, large-diameter flow control valves, submersible pumps, and corrosion-resistant hardware for drinking water transmission networks, wastewater treatment plants, and reverse osmosis (RO) desalination complexes.',
      'We specialize in materials that resist severe saline and chemical corrosion, including Super Duplex stainless steel valves, high-density polyethylene (HDPE) electrofusion fittings, ductile iron pipes with polyurethane coatings, and cathodic protection systems.',
    ],
    keyApplications: [
      {
        title: 'Seawater Reverse Osmosis (RO) Desalination',
        description: 'Super Duplex 2507 high-pressure pump valves, energy recovery piping, membrane pressure vessel fittings, and titanium materials.',
        icon: '💧',
      },
      {
        title: 'Municipal Water Transmission Schemes',
        description: 'Large-diameter ductile iron pipes (DN100 - DN2000), resilient seated gate valves, air release valves, and dismantling joints.',
        icon: '🚰',
      },
      {
        title: 'Wastewater & Sewage Treatment Plants (STP)',
        description: 'Non-clog submersible sewage pumps, eccentric plug valves, ductile iron flap valves, and mechanical aerator spares.',
        icon: '🌱',
      },
      {
        title: 'District Cooling & Chilled Water Networks',
        description: 'Pre-insulated piping accessories, high-performance butterfly valves, dynamic balancing valves, and expansion joints.',
        icon: '❄️',
      },
    ],
    suppliedProducts: [
      {
        categoryName: 'Water Valves & Flow Control',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Resilient Seated Ductile Iron Gate Valves (BS 5163 / DIN 3352)',
          'Double Eccentric Flanged Butterfly Valves (DN200 - DN1800)',
          'Automatic Air Release & Vacuum Relief Valves for Water Mains',
          'Swing Check & Non-Slam Recoil Check Valves',
        ],
      },
      {
        categoryName: 'Piping, Couplings & Flange Adaptors',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Wide-Range Universal Flange Adaptors & Stepped Couplings',
          'Dismantling Joints (PN10, PN16, PN25, PN40)',
          'Ductile Iron Pipe Fittings with WRAS-Approved Epoxy Coating',
        ],
      },
      {
        categoryName: 'Industrial Water Pumps',
        divisionSlug: 'mechanical-division',
        divisionName: 'Pipe Fittings and Flanges',
        items: [
          'Horizontal End Suction & Split Case Centrifugal Water Pumps',
          'Heavy Submersible Wastewater & Dewatering Drainage Pumps',
          'Vertical Multistage High-Pressure Booster Pumps (AISI 316)',
        ],
      },
    ],
    standardsAndCompliance: [
      'SWCC & NWC (National Water Company) Approved Standards',
      'WRAS (Water Regulations Advisory Scheme) Certified for Potable Water',
      'BS EN 545 Ductile Iron Pipes & BS EN 593 Butterfly Valves',
      'ISO 2531 Ductile Iron Pipes, Fittings & Accessories',
    ],
    whyOrient: [
      'Approved vendor documentation matching SWCC and NWC tender submittals.',
      'Potable water certified internal fusion-bonded epoxy coatings (WRAS / NSF 61).',
      'Extensive stock of universal pipe couplings and repair clamps for emergency main bursts.',
    ],
    keyClientsOrProjects: [
      'Saline Water Conversion Corporation (SWCC) Transmission Pipelines',
      'National Water Company (NWC) Regional Sewerage & Potable Projects',
      'Marafiq Water & Power Complexes in Jubail and Yanbu',
      'Major Contractors (Al-Khorayef, Rawafed, VA Tech Wabag)',
    ],
  },
];

export function getSectorById(id: string): SectorData | undefined {
  return SECTORS_DATA.find((s) => s.id === id);
}
