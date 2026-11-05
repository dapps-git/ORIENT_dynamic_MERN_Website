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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://orient-dynamic-mern-website.onrender.com/api"}/products/${cleanSlug}`, {
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
          sku: p.sku || `OETC-${(p.slug || cleanSlug).toUpperCase().slice(0, 10)}`,
          brand: p.brand || 'Orient Energy',
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
          innerSections: p.innerSections || [],
          whatsappMessage: p.whatsappMessage,
          seoTitle: p.seoTitle || '',
          metaDescription: p.metaDescription || '',
          focusKeyword: p.focusKeyword || '',
          secondaryKeywords: Array.isArray(p.secondaryKeywords)
            ? p.secondaryKeywords
            : typeof p.secondaryKeywords === 'string'
            ? p.secondaryKeywords.split(',').map((s: string) => s.trim()).filter(Boolean)
            : [],
          imageAlt: p.imageAlt || p.title,
          imageTitle: p.imageTitle || p.title,
          canonicalUrl: p.canonicalUrl || '',
          inStock: p.inStock !== undefined ? p.inStock : true,
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
    const p = staticMatch.product;
    const enrichedProduct: ProductItem = {
      ...p,
      sku: p.sku || `OETC-${cleanSlug.toUpperCase().slice(0, 10)}`,
      brand: p.brand || 'Orient Energy',
      seoTitle: p.seoTitle || `${p.title} | Orient Energy Trading Company`,
      metaDescription:
        p.metaDescription ||
        p.shortDescription ||
        `Order ${p.title} from Orient Energy Trading Company in Saudi Arabia. Certified industrial materials, valves, hoses, and engineering equipment.`,
      imageAlt: p.imageAlt || p.title,
      imageTitle: p.imageTitle || p.title,
      canonicalUrl: p.canonicalUrl || `https://orientenergyco.com/product/${cleanSlug}`,
      inStock: p.inStock !== undefined ? p.inStock : true,
    };
    return {
      ...staticMatch,
      product: enrichedProduct,
    };
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

  const { product, division } = data;
  const siteUrl = 'https://orientenergyco.com';
  const cleanSlug = product.slug || slug;
  const pageUrl = `${siteUrl}/product/${cleanSlug}`;
  const canonicalUrl = product.canonicalUrl && product.canonicalUrl.trim() ? product.canonicalUrl.trim() : pageUrl;

  const pageTitle =
    product.seoTitle && product.seoTitle.trim()
      ? product.seoTitle.trim()
      : `${product.title} | ${product.brand || 'Orient Energy'} Saudi Arabia`;

  const metaDesc =
    product.metaDescription && product.metaDescription.trim()
      ? product.metaDescription.trim()
      : product.shortDescription && product.shortDescription.trim()
      ? product.shortDescription.trim()
      : `Procure genuine ${product.title} from Orient Energy Trading Company. High-grade industrial certification, Aramco-standard compliance, and fast logistics across Saudi Arabia.`;

  const keywordsList = [
    product.focusKeyword,
    ...(product.secondaryKeywords || []),
    product.title,
    product.category || division.name,
    product.brand || 'Orient Energy',
    'Saudi Arabia industrial supplies',
    'Al Khobar engineering procurement',
  ].filter(Boolean) as string[];

  const mainImageUrl = product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`;

  return {
    title: pageTitle,
    description: metaDesc,
    keywords: keywordsList,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: 'Orient Energy Trading Company',
      images: [
        {
          url: mainImageUrl,
          width: 800,
          height: 600,
          alt: product.imageAlt || product.title,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDesc,
      images: [mainImageUrl],
    },
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

  const siteUrl = 'https://orientenergyco.com';
  const pageUrl = product.canonicalUrl || `${siteUrl}/product/${product.slug || slug}`;
  const galleryImages = (product.images && product.images.length > 0 ? product.images : [product.image]).map((img) =>
    img.startsWith('http') ? img : `${siteUrl}${img}`
  );

  // 1. Google Rich Results Product Schema (JSON-LD)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: galleryImages,
    description: product.metaDescription || product.shortDescription || product.fullDescription || product.title,
    sku: product.sku || `OETC-${(product.slug || slug).toUpperCase()}`,
    mpn: product.sku || `OETC-${(product.slug || slug).toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Orient Energy',
    },
    category: product.category || division.name,
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'SAR',
      price: '0.00',
      priceValidUntil: '2028-12-31',
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Orient Energy Trading Company',
        url: siteUrl,
      },
    },
  };

  // 2. Google Breadcrumb Schema (JSON-LD)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: division.name,
        item: `${siteUrl}/products/${division.id}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {/* Inject Google Rich Results Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ScrollAnimation />
      <Navbar />

      <main
        className="site-main-content"
        style={{
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Product Inner Content */}
        <section style={{ padding: '40px 0 80px' }}>
          <div
            className="container"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '0 20px',
            }}
          >
            {/* Visual Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.80rem',
                color: '#64748b',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}>
                Home
              </Link>
              <span style={{ color: '#cbd5e1' }}>/</span>
              <Link
                href={`/products/${division.id}`}
                style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                {division.name}
              </Link>
              <span style={{ color: '#cbd5e1' }}>/</span>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>{product.title}</span>
            </nav>
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
                    return (
                      <Link
                        key={relItem.id}
                        href={`/product/${relSlug}`}
                        className="related-product-card"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '16px 16px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          textDecoration: 'none',
                          color: 'inherit',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                          transition: 'all 0.25s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '0.80rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: '#0f172a',
                            lineHeight: 1.35,
                            minHeight: '36px',
                            marginBottom: '10px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textAlign: 'left',
                          }}
                          title={relItem.title}
                        >
                          {relItem.title}
                        </h4>

                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '145px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '4px 0 12px',
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

                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#071138',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.25s ease',
                              boxShadow: '0 2px 8px rgba(7, 17, 56, 0.2)',
                            }}
                            className="rel-circle-btn"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </div>
                        </div>
                      </Link>
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
