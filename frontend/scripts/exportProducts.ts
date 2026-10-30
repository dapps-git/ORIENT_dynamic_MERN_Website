import fs from 'fs';
import path from 'path';
import { DIVISIONS_DATA, getProductSlug } from '../lib/divisionsData';

const allProducts: any[] = [];

DIVISIONS_DATA.forEach((div) => {
  div.products.forEach((p) => {
    const slug = p.slug || getProductSlug(p.title);
    allProducts.push({
      title: p.title,
      slug: slug,
      divisionSlug: div.id,
      divisionName: div.name,
      categoryName: p.category || div.name,
      image: p.image,
      images: p.images || [p.image],
      shortDescription: p.shortDescription || `${div.headline} - ${p.title}`,
      fullDescription: p.fullDescription || (div.description ? div.description.join(' ') : p.title),
      features: p.features || [
        'High quality certified industrial grade specification',
        'Compliant with international and Saudi industrial standards',
        'Traceable mill test reports and manufacturer certification',
        'Engineered for maximum reliability and operational safety',
      ],
      innerSections: p.innerSections || [],
      whatsappMessage: p.whatsappMessage || `Hello Orient Energy, I am interested in inquiring about ${p.title}.`,
      inStock: true,
      isFeatured: false,
    });
  });
});

const outPath = path.resolve(__dirname, '../../backend/src/seed/allProducts.json');
fs.writeFileSync(outPath, JSON.stringify(allProducts, null, 2), 'utf8');
console.log(`Successfully exported ${allProducts.length} products to ${outPath}`);
