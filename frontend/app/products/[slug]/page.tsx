import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import { DIVISIONS_DATA, DivisionData, getProductSlug } from '@/lib/divisionsData';

const WHATSAPP_PHONE = '966552400778';

// Aliases mapping for common category URLs
const SLUG_ALIASES: Record<string, string> = {
  'pipe-fittings-and-flanges': 'mechanical-division',
  'pipe-fittings-flanges': 'mechanical-division',
  'pipe-fittings': 'mechanical-division',
  'pumps-motors': 'mechanical-division',
  'mechanical-supply-division': 'mechanical-division',
  'welding-safety': 'welding-division',
  'electrical-ups-systems': 'electrical-division',
  'fasteners': 'fasteners-division',
  'industrial-consumables': 'marine-division',
  'ppe-safety-equpments': 'ppe-safety-equipment',
  'ppe-safety-equipment': 'ppe-safety-equipment',
  'all-fittings': 'mechanical-division',
  'tools-maintenance': 'mechanical-division',
  'industrial-hoses-hose-couplings': 'mechanical-division',
  'lubricants-chemicals': 'coatings-surface-protection',
  'bearings-and-filters': 'bearings',
  'bearings-filters': 'bearings',
  'bairing-and-filters': 'bearings',
  'bearing': 'bearings',
  'filter': 'filters',
};

const BEARINGS_BRANDS_LOGOS = [
  { name: 'SKF', logo: '/brands/skf-logo.svg' },
  { name: 'FAG (Schaeffler)', logo: '/brands/fag-logo.svg' },
  { name: 'NSK', logo: '/brands/nsk-logo.svg' },
  { name: 'TIMKEN', logo: '/brands/timken-logo.svg' },
  { name: 'NTN Bearings', logo: '/brands/ntn-logo.svg' },
  { name: 'KOYO (JTEKT)', logo: '/brands/koyo-logo.svg' },
  { name: 'NACHI', logo: '/brands/nachi-logo.svg' },
  { name: 'INA', logo: '/brands/ina-logo.svg' },
];

const FILTERS_BRANDS_LOGOS = [
  { name: 'Donaldson Filtration Solutions', logo: '/brands/donaldson-logo.svg' },
  { name: 'Parker Filtration', logo: '/brands/parker-filtration-logo.svg' },
  { name: 'Fleetguard', logo: '/brands/fleetguard-logo.svg' },
  { name: 'MANN-FILTER', logo: '/brands/mann-filter-logo.svg' },
  { name: 'Baldwin Filters', logo: '/brands/baldwin-logo.svg' },
  { name: 'Pall Corporation', logo: '/brands/pall-logo.svg' },
  { name: 'HYDAC', logo: '/brands/hydac-logo.svg' },
  { name: 'MAHLE Industry', logo: '/brands/mahle-logo.svg' },
];

async function getDivisionAsync(slug: string): Promise<DivisionData | undefined> {
  const resolvedId = SLUG_ALIASES[slug] || slug;
  const staticDiv = DIVISIONS_DATA.find((d) => d.id === resolvedId);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://orient-dynamic-mern-website.onrender.com/api"}/categories/${resolvedId}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        const cat = data.data;

        // Merge backend products with static products
        const existingTitles = new Set(
          (cat.products || []).map((p: any) => p.title.toLowerCase().trim())
        );
        const staticRemainder = (staticDiv?.products || []).filter(
          (sp) => !existingTitles.has(sp.title.toLowerCase().trim())
        );
        const mappedCatProducts = (cat.products || []).map((p: any) => ({
          id: p._id ? String(p._id) : p.slug,
          title: p.title,
          slug: p.slug || getProductSlug(p.title),
          image: p.image || (p.images && p.images[0]) || '/categories/all-fittings.jpeg',
          images: p.images || [p.image || '/categories/all-fittings.jpeg'],
          category: p.categoryName || cat.name,
          features: p.features || [],
          shortDescription: p.shortDescription || '',
          fullDescription: p.fullDescription || '',
          whatsappMessage: p.whatsappMessage,
        }));
        const productsList = [...mappedCatProducts, ...staticRemainder];

        return {
          id: cat.slug || resolvedId,
          name: cat.name || staticDiv?.name || '',
          headline: cat.headline || staticDiv?.headline || cat.name,
          description:
            cat.detailedDescriptions && cat.detailedDescriptions.length > 0
              ? cat.detailedDescriptions
              : cat.description
              ? [cat.description]
              : staticDiv?.description || [],
          subcategoriesTitle: cat.subcategoriesTitle || staticDiv?.subcategoriesTitle,
          subcategories:
            cat.slug === 'mechanical-division' || resolvedId === 'mechanical-division'
              ? undefined
              : cat.subcategories && cat.subcategories.length > 0
              ? cat.subcategories.filter((s: any) => s.image && s.image.trim() !== '')
              : staticDiv?.subcategories,
          productRangeTitle: cat.productRangeTitle || staticDiv?.productRangeTitle,
          productRange:
            cat.productRange && cat.productRange.length > 0
              ? cat.productRange
              : staticDiv?.productRange,
          applicationsTitle: cat.applicationsTitle || staticDiv?.applicationsTitle,
          applications:
            cat.applications && cat.applications.length > 0
              ? cat.applications
              : staticDiv?.applications,
          pills: cat.pills && cat.pills.length > 0 ? cat.pills : staticDiv?.pills,
          products: productsList,
        };
      }
    }
  } catch {
    // Backend offline: fallback to staticDiv
  }

  return staticDiv;
}

export async function generateStaticParams() {
  const baseSlugs = DIVISIONS_DATA.map((d) => ({
    slug: d.id,
  }));
  return [
    ...baseSlugs,
    { slug: 'pipe-fittings-and-flanges' },
    { slug: 'pipe-fittings-flanges' },
    { slug: 'pumps-motors' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionAsync(slug);

  if (!division) {
    return {
      title: 'Products — Orient Energy',
    };
  }

  return {
    title: `${division.headline} — Orient Energy Trading Company`,
    description: division.description[0],
    keywords: [
      division.name,
      division.headline,
      'Orient Energy Trading Company',
      'Saudi Arabia industrial suppliers',
      'Aramco approved suppliers',
    ],
  };
}

export default async function ProductDivisionInnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const division = await getDivisionAsync(slug);

  if (!division) {
    notFound();
  }

  const otherDivisions = DIVISIONS_DATA.filter((d) => d.id !== division.id).slice(0, 4);

  const isBearings = division.id === 'bearings' || slug === 'bearings' || slug === 'bearings-and-filters' || slug === 'bairing-and-filters' || slug === 'bearing';
  const isFilters = division.id === 'filters' || slug === 'filters' || slug === 'filter';
  const categoryBrands = isBearings ? BEARINGS_BRANDS_LOGOS : isFilters ? FILTERS_BRANDS_LOGOS : null;

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main className="site-main-content">


        {/* Division Hero Header */}
        <section style={{ padding: '50px 0 30px' }}>
          <div
            className="container"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                fontSize: '0.80rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#2e3191',
                marginBottom: '10px',
              }}
            >
              {division.name}
            </div>

            <h1
              className="division-hero-headline"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(1.15rem, 2.3vw, 1.85rem)',
                fontWeight: 500,
                color: '#111827',
                lineHeight: 1.3,
                maxWidth: '1100px',
                marginBottom: '18px',
              }}
            >
              {division.headline}
            </h1>

            <div
              style={{
                maxWidth: '1100px',
                fontSize: '0.94rem',
                lineHeight: 1.8,
                color: '#475569',
                marginBottom: '28px',
              }}
            >
              {division.description && division.description[0] && (
                <p style={{ margin: 0 }}>
                  {division.description[0]}
                </p>
              )}
            </div>

            {/* Sub-Category Pills (e.g. for Welding) */}
            {division.pills && division.pills.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '36px',
                }}
              >
                {division.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      padding: '8px 18px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                      color: '#334155',
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            )}

            {/* Subcategory Cards with Photos (e.g. Electrical, Fasteners, Coatings) */}
            {division.id !== 'mechanical-division' && division.subcategories && division.subcategories.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '16px',
                  }}
                >
                  {division.subcategoriesTitle || 'Categories'}
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '18px',
                  }}
                >
                  {division.subcategories.map((sub, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      }}
                    >
                      {sub.image ? (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '135px',
                            backgroundColor: '#f1f5f9',
                          }}
                        >
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            fill
                            sizes="250px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '80px',
                            background: 'linear-gradient(135deg, #071138 0%, #1e293b 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#e2e8f0',
                            fontSize: '1.2rem',
                          }}
                        >
                          ⚙️
                        </div>
                      )}
                      <div
                        style={{
                          padding: '14px',
                          textAlign: 'center',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          marginTop: 'auto',
                        }}
                      >
                        {sub.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Range & Applications Box */}
            {(division.productRange || division.applications) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    division.productRange && division.applications
                      ? 'repeat(auto-fit, minmax(320px, 1fr))'
                      : '1fr',
                  gap: '30px',
                  marginBottom: '46px',
                  padding: '28px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              >
                {division.productRange && (
                  <div>
                    <h4
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {division.productRangeTitle || 'Product Range'}
                    </h4>
                    <ul
                      style={{
                        listStyleType: 'disc',
                        paddingLeft: '22px',
                        margin: 0,
                        color: '#475569',
                        fontSize: '0.90rem',
                        lineHeight: 1.85,
                      }}
                    >
                      {division.productRange.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {division.applications && (
                  <div>
                    <h4
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {division.applicationsTitle || 'Applications'}
                    </h4>
                    <ul
                      style={{
                        listStyleType: 'disc',
                        paddingLeft: '22px',
                        margin: 0,
                        color: '#475569',
                        fontSize: '0.90rem',
                        lineHeight: 1.85,
                      }}
                    >
                      {division.applications.map((app, idx) => (
                        <li key={idx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Category Brand Logos (Bearings & Filters) */}
            {categoryBrands && categoryBrands.length > 0 && (
              <div
                style={{
                  marginBottom: '42px',
                  padding: '24px 28px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '18px',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '20px',
                      backgroundColor: '#20b512',
                      borderRadius: '2px',
                      display: 'inline-block',
                    }}
                  />
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#071138',
                      margin: 0,
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Leading {isBearings ? 'Bearings' : 'Filtration'} Brands We Supply
                  </h3>
                </div>

                <div className="category-brands-grid">
                  {categoryBrands.map((brand, idx) => (
                    <div
                      key={idx}
                      className="category-brand-card"
                      title={brand.name}
                    >
                      <img
                        src={brand.logo}
                        alt={`${brand.name} Logo`}
                        style={{
                          maxHeight: '44px',
                          maxWidth: '85%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Section Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '26px',
                borderBottom: '2px solid #f1f5f9',
                paddingBottom: '14px',
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: '2.1rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    fontFamily: "'Poppins', sans-serif",
                    margin: 0,
                  }}
                >
                  Products
                </h2>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Showing all {division.products.length} products
                </span>
              </div>
            </div>

            {/* Product Catalog Grid (Clean Category / Product Cards matching reference image) */}
            <div className="product-grid-4col">
              {division.products.map((product) => {
                const prodSlug = product.slug || getProductSlug(product.title);

                return (
                  <Link
                    key={product.id}
                    href={`/product/${prodSlug}`}
                    className="product-catalog-card"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '18px 18px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      color: 'inherit',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      transition: 'all 0.25s ease',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    {/* 1. Category / Product Title at Top (Uppercase, bold, left aligned) */}
                    <h4
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: '#0f172a',
                        lineHeight: 1.35,
                        minHeight: '38px',
                        margin: '0 0 12px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textAlign: 'left',
                        transition: 'color 0.2s ease',
                      }}
                      title={product.title}
                      className="product-card-title"
                    >
                      {product.title}
                    </h4>

                    {/* 2. Centered Product Image Showcase */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '160px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '4px 0 14px',
                        backgroundColor: '#ffffff',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={160}
                        height={150}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          transition: 'transform 0.28s ease',
                        }}
                        className="product-catalog-thumb"
                      />
                    </div>

                    {/* 3. Bottom-Left Circular Dark Navy Blue Button with Right Arrow */}
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <div
                        className="product-circle-arrow-btn"
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: '#071138',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.25s ease',
                          boxShadow: '0 3px 10px rgba(7, 17, 56, 0.2)',
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Other Divisions Navigation Links */}
            <div style={{ marginTop: '70px', paddingTop: '40px', borderTop: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                Explore Other Industrial Divisions
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                }}
              >
                {otherDivisions.map((other) => (
                  <Link
                    key={other.id}
                    href={`/products/${other.id}`}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1e293b' }}>
                      {other.name}
                    </span>
                    <span style={{ color: '#2e3191', fontWeight: 700 }}>&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sourcing Banner at Bottom */}
            <div className="product-cta-box" style={{ marginTop: '50px', marginBottom: '80px' }}>
              <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
                    fontWeight: 500,
                    color: '#ffffff',
                    marginBottom: '14px',
                    lineHeight: 1.25,
                  }}
                >
                  Need Custom Specifications or Bulk BOM Sourcing?
                </h3>
                <p
                  style={{
                    fontSize: '0.90rem',
                    color: 'rgba(255, 255, 255, 0.88)',
                    lineHeight: 1.7,
                    marginBottom: '26px',
                  }}
                >
                  Our engineering procurement team delivers complete material supply packages compliant with
                  Saudi Aramco, SABIC, SEC, and international industry standards.
                </p>
                <Link href="/contact" className="product-cta-btn">
                  Request Product Quote &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .product-grid-4col {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }

        .category-brands-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .category-brand-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          height: 74px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .category-brand-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(7, 17, 56, 0.08);
          border-color: #cbd5e1;
        }

        @media (max-width: 768px) {
          .category-brands-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 10px !important;
          }
          .category-brand-card {
            height: 56px !important;
            padding: 6px 8px !important;
          }
        }

        @media (max-width: 480px) {
          .category-brands-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .category-brand-card {
            height: 52px !important;
          }
        }

        .product-catalog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1 !important;
        }

        .product-catalog-card:hover .product-card-title {
          color: #2e3191 !important;
        }

        .product-catalog-card:hover .product-catalog-thumb {
          transform: scale(1.06);
        }

        .product-catalog-card:hover .product-circle-arrow-btn {
          background-color: #20b512 !important;
          transform: scale(1.06);
          box-shadow: 0 4px 14px rgba(32, 181, 18, 0.45) !important;
        }

        .product-catalog-card .product-circle-arrow-btn svg {
          transition: transform 0.2s ease;
        }

        .product-catalog-card:hover .product-circle-arrow-btn svg {
          transform: translateX(3px);
        }

        .product-cta-box {
          background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
          border-radius: 12px;
          padding: 42px 28px;
          box-shadow: 0 14px 40px rgba(7, 17, 56, 0.18);
        }

        .product-cta-btn {
          display: inline-block;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          color: #071138 !important;
          padding: 8px 24px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2), inset 0 1px 0 #ffffff;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .product-cta-btn:hover {
          background: linear-gradient(180deg, #ffffff 0%, #edf2f7 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.35), inset 0 1px 0 #ffffff;
        }

        @media (max-width: 1400px) {
          .product-grid-4col {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 15px !important;
          }
        }

        @media (max-width: 1150px) {
          .product-grid-4col {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 15px !important;
          }
        }

        @media (max-width: 900px) {
          .product-grid-4col {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 14px !important;
          }
        }

        @media (max-width: 768px) {
          .product-grid-4col {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 540px) {
          .product-grid-4col {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .product-catalog-card {
            padding: 12px 10px 12px !important;
          }
        }
      `}</style>
    </>
  );
}
