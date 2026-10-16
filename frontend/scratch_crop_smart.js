const sharp = require('sharp');
const fs = require('fs');
const userDir = 'C:/Users/aifas/.gemini/antigravity-ide/brain/658cf662-8a90-4e86-9c9c-d50bafbc9821/.user_uploaded/';
const baseDir = 'c:/projects/ORIENT/frontend/public/products';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function getButtons(file) {
  const { data, info } = await sharp(userDir + file).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, c = info.channels;
  const greenPixels = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * c;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 75 && g > 160 && b < 105) {
        greenPixels.push({ x, y });
      }
    }
  }
  const clusters = [];
  for (const p of greenPixels) {
    let found = false;
    for (const cl of clusters) {
      if (Math.abs(cl.x - p.x) < 40 && Math.abs(cl.y - p.y) < 40) {
        cl.points.push(p);
        cl.x = cl.points.reduce((s, pt) => s + pt.x, 0) / cl.points.length;
        cl.y = cl.points.reduce((s, pt) => s + pt.y, 0) / cl.points.length;
        found = true;
        break;
      }
    }
    if (!found) clusters.push({ x: p.x, y: p.y, points: [p] });
  }
  return clusters
    .filter(cl => cl.points.length > 20)
    .sort((a,b) => {
      if (Math.abs(a.y - b.y) > 30) return a.y - b.y;
      return a.x - b.x;
    });
}

async function cropByButtons({ file, outDir, products, imgWidth = 90, imgHeight = 75, yOffset = 90 }) {
  ensureDir(outDir);
  const meta = await sharp(userDir + file).metadata();
  const buttons = await getButtons(file);
  console.log(`Extracting ${Math.min(buttons.length, products.length)} products for ${outDir}`);

  for (let i = 0; i < Math.min(buttons.length, products.length); i++) {
    const btn = buttons[i];
    let width = Math.min(imgWidth, meta.width);
    let height = Math.min(imgHeight, meta.height);
    let left = Math.round(btn.x - width / 2);
    let top = Math.round(btn.y - yOffset);

    // Bounds checking
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + width > meta.width) left = meta.width - width;
    if (top + height > meta.height) top = meta.height - height;

    try {
      await sharp(userDir + file)
        .extract({ left, top, width, height })
        .trim()
        .toFile(`${outDir}/${products[i]}.png`);
    } catch (e) {
      console.error(`Failed ${products[i]}:`, e.message);
    }
  }
}

async function run() {
  // Welding
  await cropByButtons({
    file: 'media_1792143877939.png',
    outDir: baseDir + '/welding',
    imgWidth: 105,
    imgHeight: 78,
    yOffset: 92,
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

  // Lifting
  await cropByButtons({
    file: 'media_1792143986307.png',
    outDir: baseDir + '/lifting',
    imgWidth: 105,
    imgHeight: 80,
    yOffset: 95,
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

  // Power
  await cropByButtons({
    file: 'media_1792144014233.png',
    outDir: baseDir + '/power',
    imgWidth: 110,
    imgHeight: 88,
    yOffset: 100,
    products: [
      'diesel-engines',
      'electrical-transmission-systems',
      'gas-engines',
      'generators'
    ]
  });

  // Marine
  await cropByButtons({
    file: 'media_1792144082095.png',
    outDir: baseDir + '/marine',
    imgWidth: 80,
    imgHeight: 65,
    yOffset: 75,
    products: [
      'ear-plug-blue-cord',
      'ear-plug-orange',
      'ear-plug-orange-cord',
      'lifejackets-foam-inflatable'
    ]
  });

  // Steel
  await cropByButtons({
    file: 'media_1792144125822.png',
    outDir: baseDir + '/steel',
    imgWidth: 80,
    imgHeight: 65,
    yOffset: 75,
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

  // Coatings
  await cropByButtons({
    file: 'media_1792144163106.png',
    outDir: baseDir + '/coatings',
    imgWidth: 80,
    imgHeight: 65,
    yOffset: 75,
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

  // Fasteners
  await cropByButtons({
    file: 'media_1792144253857.png',
    outDir: baseDir + '/fasteners',
    imgWidth: 78,
    imgHeight: 58,
    yOffset: 65,
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

run().catch(console.error);
