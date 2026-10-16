const sharp = require('sharp');
const fs = require('fs');
const userDir = 'C:/Users/aifas/.gemini/antigravity-ide/brain/658cf662-8a90-4e86-9c9c-d50bafbc9821/.user_uploaded/';
const baseDir = 'c:/projects/ORIENT/frontend/public/products';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function cropGrid({ file, outDir, cols, rows, products }) {
  ensureDir(outDir);
  let pIdx = 0;
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < cols.length; c++) {
      if (pIdx >= products.length) break;
      const left = cols[c].left;
      const width = cols[c].width;
      const top = rows[r].top;
      const height = rows[r].height;

      try {
        await sharp(file)
          .extract({ left: Math.round(left), top: Math.round(top), width: Math.round(width), height: Math.round(height) })
          .trim() // removes any excess white edges
          .toFile(outDir + '/' + products[pIdx] + '.png');
      } catch (err) {
        console.error('Error cropping', products[pIdx], err.message);
      }
      pIdx++;
    }
  }
  console.log(`Cropped ${pIdx} products for ${outDir}`);
}

async function runAll() {
  // 1. Mechanical
  await cropGrid({
    file: userDir + 'media_1792143786341.png',
    outDir: baseDir + '/mechanical',
    cols: [
      { left: 45, width: 106 },
      { left: 185, width: 106 },
      { left: 325, width: 106 },
      { left: 464, width: 106 }
    ],
    rows: [
      { top: 290, height: 74 },
      { top: 442, height: 74 },
      { top: 580, height: 74 },
      { top: 720, height: 74 }
    ],
    products: [
      'black-coated-steel-pipe-flanges-threaded',
      'breathing-hoses',
      'butterfly-valve',
      'butterfly-valve-lever-handle-ss-disc-3',
      'butterfly-valve-lever-handle-ss-disc-4',
      'butterfly-valve-lever-handle-ss-disc-6',
      'butterfly-valve-lever-handle-ss-disc-8',
      'hydraulic-hoses-fittings-adaptors',
      'industrial-large-bore-hoses',
      'industrial-gasket-and-seals',
      'isolation-valve-ball-valve-steam-high-temperature-ball-valve',
      'micro-linear-actuators',
      'carbon-steel-seamless-erw-pipes'
    ]
  });

  // 2. Welding (600 x 817)
  // 4 columns, 4 rows = 16 products
  await cropGrid({
    file: userDir + 'media_1792143877939.png',
    outDir: baseDir + '/welding',
    cols: [
      { left: 35, width: 108 },
      { left: 165, width: 108 },
      { left: 298, width: 108 },
      { left: 430, width: 108 }
    ],
    rows: [
      { top: 290, height: 78 },
      { top: 440, height: 78 },
      { top: 590, height: 78 },
      { top: 735, height: 70 }
    ],
    products: [
      '280pl-series-welding-helmet',
      'airmax-elite-papr-system-lp80',
      'arc-flash-face-shield',
      'ca-370-wh-370fc',
      'contender-edge-2-0',
      'cutter-edge-2-0-st2600fc',
      'edge-series-2-0-regulators',
      'edge-series-2-0-elc42-regulators',
      'edge-series-2-0-ess72-regulators',
      'ehp-series-high-pressure-regulator',
      'g150-portable-tote',
      'g250-regulators',
      'g350-plus-regulators',
      'hsl-100-welding-helmet',
      'jackson-sg-glasses',
      'journeyman-ii-edge-2-0'
    ]
  });

  // 3. Electrical (575 x 826)
  // 4 columns, 3 rows = 12 products
  await cropGrid({
    file: userDir + 'media_1792143930589.png',
    outDir: baseDir + '/electrical',
    cols: [
      { left: 35, width: 105 },
      { left: 165, width: 105 },
      { left: 295, width: 105 },
      { left: 425, width: 105 }
    ],
    rows: [
      { top: 495, height: 80 },
      { top: 645, height: 80 },
      { top: 785, height: 40 }
    ],
    products: [
      'acti9-arc-fault-detection-rcbo',
      'acti9-mcb-c60h-dc-10a',
      'acti9-mcb-c60h-dc-1a',
      'acti9-mcb-c60h-dc-25a',
      'air-circuit-breaker-hdw3',
      'automatic-transfer-switch-125-3200a',
      'easypact-exe-indoor-mv-breaker',
      'tesys-giga-contactor-115a',
      'tesys-giga-contactor-150a',
      'tesys-giga-contactor-185a',
      'load-break-switch-disconnector',
      'earth-cable-and-wires'
    ]
  });

  // 4. Lifting (620 x 668)
  // 4 columns, 2 rows = 8 products
  await cropGrid({
    file: userDir + 'media_1792143986307.png',
    outDir: baseDir + '/lifting',
    cols: [
      { left: 70, width: 105 },
      { left: 200, width: 105 },
      { left: 330, width: 105 },
      { left: 460, width: 105 }
    ],
    rows: [
      { top: 540, height: 80 },
      { top: 690, height: 80 }
    ],
    products: [
      'chain-blocks',
      'chain-hoists',
      'chains-and-wire-ropes',
      'hooks-and-shackles',
      'lifting-clamps',
      'lifting-trolleys',
      'snatch-blocks',
      'steel-wire-rope-sling-assemblies'
    ]
  });

  // 5. Power (637 x 607)
  // 4 columns, 1 row = 4 products
  await cropGrid({
    file: userDir + 'media_1792144014233.png',
    outDir: baseDir + '/power',
    cols: [
      { left: 50, width: 110 },
      { left: 180, width: 110 },
      { left: 310, width: 110 },
      { left: 440, width: 110 }
    ],
    rows: [
      { top: 660, height: 90 }
    ],
    products: [
      'diesel-engines',
      'electrical-transmission-systems',
      'gas-engines',
      'generators'
    ]
  });

  // 6. Marine (482 x 612)
  // 4 columns, 1 row = 4 products
  await cropGrid({
    file: userDir + 'media_1792144082095.png',
    outDir: baseDir + '/marine',
    cols: [
      { left: 55, width: 80 },
      { left: 155, width: 80 },
      { left: 255, width: 80 },
      { left: 355, width: 80 }
    ],
    rows: [
      { top: 760, height: 60 }
    ],
    products: [
      'ear-plug-blue-cord',
      'ear-plug-orange',
      'ear-plug-orange-cord',
      'lifejackets-foam-inflatable'
    ]
  });

  // 7. Structural Steel (472 x 595)
  // 4 cols row 1, 3 cols row 2
  await cropGrid({
    file: userDir + 'media_1792144125822.png',
    outDir: baseDir + '/steel',
    cols: [
      { left: 50, width: 80 },
      { left: 150, width: 80 },
      { left: 245, width: 80 },
      { left: 345, width: 80 }
    ],
    rows: [
      { top: 590, height: 65 },
      { top: 740, height: 65 }
    ],
    products: [
      '304-stainless-steel-pipe',
      'bars',
      'carbon-steel-45-elbow',
      'carbon-steel-90-elbow',
      'pipes',
      'tubes',
      'venus-stainless-steel-tubes'
    ]
  });

  // 8. Coatings (487 x 848)
  // 4 cols, 2 rows
  await cropGrid({
    file: userDir + 'media_1792144163106.png',
    outDir: baseDir + '/coatings',
    cols: [
      { left: 40, width: 85 },
      { left: 145, width: 85 },
      { left: 250, width: 85 },
      { left: 355, width: 85 }
    ],
    rows: [
      { top: 690, height: 65 },
      { top: 835, height: 65 }
    ],
    products: [
      'anti-fouling-paints',
      'fire-rated-intumescent-coatings',
      'gorilla-waterproof-patch',
      'jotun-fenomastic-interior-paint',
      'jotun-hardtop-xp-1005',
      'national-guard-epoxy-filler-sf',
      'national-paints-plastic-emulsion',
      'penguard-topcoat-ab'
    ]
  });

  // 9. Fasteners (452 x 457)
  // 4 cols, 4 rows = 16 products
  await cropGrid({
    file: userDir + 'media_1792144253857.png',
    outDir: baseDir + '/fasteners',
    cols: [
      { left: 28, width: 85 },
      { left: 128, width: 85 },
      { left: 228, width: 85 },
      { left: 328, width: 85 }
    ],
    rows: [
      { top: 80, height: 62 },
      { top: 185, height: 62 },
      { top: 290, height: 62 },
      { top: 395, height: 62 }
    ],
    products: [
      'anti-theft-screw',
      'bs-stud-bolt',
      'carriage-bolt',
      'color-painted-farmer-screw',
      'drop-in-anchor',
      'drywall-screw',
      'eye-bolt-torn-shield-anchor',
      'eye-hex-bolt',
      'fanged-elevator-bolt',
      'gravity-toggle-anchor',
      'hex-bolt',
      'hex-flange-bolt',
      'hex-socket-cap-screw',
      'self-drilling-screw',
      'square-t-head-bolt',
      'stainless-steel-hex-head-bolts'
    ]
  });
}

runAll().catch(console.error);
