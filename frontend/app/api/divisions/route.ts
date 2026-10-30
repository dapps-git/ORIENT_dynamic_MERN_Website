import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'divisions.json');

const DEFAULT_DIVISIONS = [
  { id: 'mechanical-division', slug: 'mechanical-division', name: 'Pipe Fittings and Flanges', image: '/categories/mechanical-supply-division.png', productCount: 17 },
  { id: 'electrical-division', slug: 'electrical-division', name: 'Electrical Division', image: '/categories/electrical-ups-systems.jpg', productCount: 12 },
  { id: 'welding-division', slug: 'welding-division', name: 'Welding Division', image: '/categories/welding-safety.jpg', productCount: 16 },
  { id: 'marine-division', slug: 'marine-division', name: 'Marine Division', image: '/categories/marine-division.jpg', productCount: 4 },
  { id: 'industrial-hoses-hose-couplings', slug: 'industrial-hoses-hose-couplings', name: 'Industrial Hoses & Hose Couplings', image: '/categories/industrial-hoses-hose-couplings.jpg', productCount: 8 },
  { id: 'lubricants-chemicals', slug: 'lubricants-chemicals', name: 'Lubricants & Chemicals Division', image: '/categories/lubricants-chemicals.jpg', productCount: 6 },
  { id: 'tools-maintenance', slug: 'tools-maintenance', name: 'Tools & Maintanance Division', image: '/categories/tools-maintenance.jpg', productCount: 10 },
  { id: 'lifting-material-handling', slug: 'lifting-material-handling', name: 'Lifting & Material Handling', image: '/categories/lifting-material-handling.jpg', productCount: 8 },
  { id: 'ppe-safety-equipment', slug: 'ppe-safety-equipment', name: 'PPE & Safety Equipment', image: '/categories/ppe-safety-equpments.jpg', productCount: 24 },
  { id: 'steel-structural-materials-division', slug: 'steel-structural-materials-division', name: 'Steel & Structural Materials Division', image: '/categories/steel-structural-materials-division.jpg', productCount: 5 },
  { id: 'fasteners-division', slug: 'fasteners-division', name: 'Fasteners Division', image: '/categories/fasteners.jpg', productCount: 16 },
  { id: 'coatings-surface-protection', slug: 'coatings-surface-protection', name: 'Coatings & Surface Protection', image: '/categories/coatings-surface-protection.png', productCount: 8 },
];

function getStoredDivisions() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const content = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // fallback
  }
  return DEFAULT_DIVISIONS;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  const divisions = getStoredDivisions();
  return NextResponse.json({ success: true, data: divisions }, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, slug, image, name } = body;
    const targetId = id || slug;

    if (!targetId) {
      return NextResponse.json({ success: false, error: 'Division ID or slug required' }, { status: 400, headers: corsHeaders });
    }

    const divisions = getStoredDivisions();
    const idx = divisions.findIndex((d: any) => d.id === targetId || d.slug === targetId);

    if (idx !== -1) {
      if (image !== undefined) divisions[idx].image = image;
      if (name !== undefined) divisions[idx].name = name;
    } else {
      divisions.push({
        id: targetId,
        slug: targetId,
        name: name || targetId,
        image: image || '/categories/all-fittings.jpeg',
        productCount: 0,
      });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(divisions, null, 2), 'utf-8');
    return NextResponse.json({ success: true, data: divisions }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: corsHeaders });
  }
}
