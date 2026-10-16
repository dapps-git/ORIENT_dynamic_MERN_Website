const sharp = require('sharp');
const fs = require('fs');

async function findBorders(filePath) {
  const image = sharp(filePath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const c = info.channels;

  // Let's find vertical lines (left and right edges of cards)
  // Cards typically have light gray borders (r,g,b around 200-240) against white (255,255,255)
  // Let's count border-like pixels per column
  const colBorderCounts = new Array(w).fill(0);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const idx = (y * w + x) * c;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r >= 210 && r <= 245 && g >= 210 && g <= 245 && b >= 210 && b <= 245) {
        colBorderCounts[x]++;
      }
    }
  }

  // Row border counts
  const rowBorderCounts = new Array(h).fill(0);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * c;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r >= 210 && r <= 245 && g >= 210 && g <= 245 && b >= 210 && b <= 245) {
        rowBorderCounts[y]++;
      }
    }
  }

  return { w, h, colBorderCounts, rowBorderCounts };
}

async function run() {
  const userDir = 'C:/Users/aifas/.gemini/antigravity-ide/brain/658cf662-8a90-4e86-9c9c-d50bafbc9821/.user_uploaded/';
  const res = await findBorders(userDir + 'media_1792143786341.png');
  console.log('Top columns with borders:', res.colBorderCounts.map((cnt, x) => ({ x, cnt })).filter(item => item.cnt > 100));
}
run();
