import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import {
  DIVISIONS_DATA,
  DivisionData,
  ProductItem,
  findStaticProductBySlug,
  getProductSlug,
} from '@/lib/divisionsData';
import ProductInnerClient from './ProductInnerClient';

const WHATSAPP_PHONE = '966552400778';

interface ProductDetailPageData {
  product: ProductItem;
  division: DivisionData;
  related: ProductItem[];
}

async function getProductData(slug: string): Promise<ProductDetailPageData | null> {
  const cleanSlug = slug.toLowerCase();

  // 1. Try fetching from backend API first
  try {
    const res = await fetch(`http://localhost:5000/api/products/${cleanSlug}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        const p = data.data;
        const matchedDivision =
          DIVISIONS_DATA.find(
            (d) =>
              d.id === p.divisionSlug ||
              (p.category && (d.id === p.category.slug || d.name === p.category.name)) ||
              d.name.toLowerCase() === (p.categoryName || '').toLowerCase()
          ) || DIVISIONS_DATA[0];

        const product: ProductItem = {
          id: p._id || p.id,
          title: p.title,
          slug: p.slug || cleanSlug,
          image: p.image || (p.images && p.images[0]) || '/categories/all-fittings.jpeg',
          images: p.images && p.images.length > 0 ? p.images : [p.image || '/categories/all-fittings.jpeg'],
          category: p.categoryName || (p.category && p.category.name) || matchedDivision.name,
          divisionSlug: matchedDivision.id,
          divisionName: matchedDivision.name,
          date: p.createdAt
            ? new Date(p.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : 'December 15, 2025',
          comments: '0 Comment',
          features:
            p.features && p.features.length > 0
              ? p.features
              : p.specifications && p.specifications.length > 0
              ? p.specifications.map((s: any) => `${s.label}: ${s.value}`)
              : [
                  'High Pressure & Industrial Grade Specification',
                  'Aramco & SABIC Approved Quality Standards',
                  'Anti-Corrosive Protective Surface Finish',
                  'Rigorous Hydrostatic and NDT Inspection Certified',
                  'Traceable Mill Test Reports (MTR) Available',
                ],
          shortDescription: p.shortDescription || '',
          fullDescription: p.fullDescription || p.shortDescription || '',
          whatsappMessage: p.whatsappMessage,
        };

        const related: ProductItem[] =
          p.relatedProducts && p.relatedProducts.length > 0
            ? p.relatedProducts.map((rel: any) => ({
                id: rel._id || rel.slug,
                title: rel.title,
                slug: rel.slug || getProductSlug(rel.title),
                image: rel.image || (rel.images && rel.images[0]) || '/categories/all-fittings.jpeg',
                category: rel.categoryName || matchedDivision.name,
                divisionSlug: matchedDivision.id,
                divisionName: matchedDivision.name,
              }))
            : (() => {
                const sameCat = matchedDivision.products.filter(
                  (item) =>
                    (item.slug || getProductSlug(item.title)) !== cleanSlug &&
                    item.category &&
                    product.category &&
                    item.category === product.category
                );
                const otherCat = matchedDivision.products.filter(
                  (item) =>
                    (item.slug || getProductSlug(item.title)) !== cleanSlug &&
                    (!product.category || item.category !== product.category)
                );
                return [...sameCat, ...otherCat].slice(0, 4);
              })()

        return { product, division: matchedDivision, related };
      }
    }
  } catch {
    // Backend offline: fallback to static lookup
  }

  // 2. Fallback to static products lookup
  const staticMatch = findStaticProductBySlug(cleanSlug);
  if (staticMatch) {
    return staticMatch;
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductData(slug);
  if (!data) {
    return { title: 'Product Not Found — Orient Energy Trading Company' };
  }

  return {
    title: `${data.product.title} — Orient Energy Trading Company`,
    description: `Order ${data.product.title} from Orient Energy Trading Company Saudi Arabia. High quality industrial supplies, valves, hoses, and engineering equipment.`,
    keywords: [
      data.product.title,
      data.product.category || '',
      data.division.name,
      'Orient Energy Trading Company',
      'Saudi Arabia industrial supplies',
    ],
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProductData(slug);

  if (!data) {
    notFound();
  }

  const { product, division, related } = data;

  const waMessage = encodeURIComponent(
    product.whatsappMessage ||
      `Hello Orient Energy Trading Co., I would like to order or request a quote for: ${product.title} (${product.category || division.name}).`
  );
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${waMessage}`;

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main
        style={{
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          paddingTop: '105px',
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >


        {/* Product Inner Content (Matching exact design of Image 2) */}
        <section style={{ padding: '40px 0 80px' }}>
          <div
            className="container"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '0 20px',
            }}
          >
            {/* Meta Line: Date & Comment */}
            <div
              style={{
                fontSize: '0.82rem',
                color: '#64748b',
                marginBottom: '10px',
                fontWeight: 500,
              }}
            >
              {product.date || 'December 15, 2025'} &nbsp;&bull;&nbsp; {product.comments || '0 Comment'}
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)',
                fontWeight: 500,
                color: '#111827',
                lineHeight: 1.2,
                marginBottom: '26px',
                letterSpacing: '-0.01em',
              }}
            >
              {product.title}
            </h1>

            {/* Main Interactive Product Card with Lightbox & WhatsApp */}
            <ProductInnerClient product={product} division={division} waUrl={waUrl} />

            {/* Related Products Section */}
            {related && related.length > 0 && (
              <div style={{ marginTop: '56px' }}>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(1.5rem, 2.4vw, 1.95rem)',
                    fontWeight: 500,
                    color: '#111827',
                    textAlign: 'center',
                    marginBottom: '28px',
                  }}
                >
                  Related products
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                    maxWidth: '820px',
                    margin: '0 auto',
                  }}
                >
                  {related.map((relItem) => {
                    const relSlug = relItem.slug || getProductSlug(relItem.title);
                    const relWaMessage = encodeURIComponent(
                      `Hello Orient Energy Trading Co., I would like to order or request a quote for: ${relItem.title}.`
                    );
                    const relWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${relWaMessage}`;

                    return (
                      <div
                        key={relItem.id}
                        className="related-product-card"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '18px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <Link
                          href={`/product/${relSlug}`}
                          style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: '150px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '14px',
                            }}
                          >
                            <img
                              src={relItem.image}
                              alt={relItem.title}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                transition: 'transform 0.25s ease',
                              }}
                              className="related-thumb-img"
                            />
                          </div>

                          <h4
                            style={{
                              fontSize: '0.86rem',
                              fontWeight: 600,
                              color: '#1e293b',
                              lineHeight: 1.45,
                              minHeight: '44px',
                              marginBottom: '14px',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                            title={relItem.title}
                          >
                            {relItem.title}
                          </h4>
                        </Link>

                        <a
                          href={relWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-order-now-glossy"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                            color: '#0f172a',
                            padding: '6px 12px',
                            borderRadius: '5px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            marginTop: 'auto',
                            width: '100%',
                            border: '1px solid #dcdfe4',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Order Now
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
