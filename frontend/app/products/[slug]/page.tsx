import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import { DIVISIONS_DATA, DivisionData } from '@/lib/divisionsData';

const WHATSAPP_PHONE = '966552400778';

// Aliases mapping for common category URLs
const SLUG_ALIASES: Record<string, string> = {
  'mechanical-supply-division': 'mechanical-division',
  'welding-safety': 'welding-division',
  'electrical-ups-systems': 'electrical-division',
  'fasteners': 'fasteners-division',
  'industrial-consumables': 'marine-division',
  'ppe-safety-equpments': 'welding-division',
  'all-fittings': 'mechanical-division',
  'tools-maintenance': 'mechanical-division',
  'industrial-hoses-hose-couplings': 'mechanical-division',
  'lubricants-chemicals': 'coatings-surface-protection',
};

function getDivision(slug: string): DivisionData | undefined {
  const resolvedId = SLUG_ALIASES[slug] || slug;
  return DIVISIONS_DATA.find((d) => d.id === resolvedId);
}

export async function generateStaticParams() {
  return DIVISIONS_DATA.map((d) => ({
    slug: d.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);

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
  const division = getDivision(slug);

  if (!division) {
    notFound();
  }

  const otherDivisions = DIVISIONS_DATA.filter((d) => d.id !== division.id).slice(0, 4);

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '105px' }}>
        {/* Breadcrumb Bar */}
        <section
          style={{
            backgroundColor: '#FAF7F2',
            borderBottom: '1px solid #ECE7DE',
            padding: '14px 0',
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
              fontSize: '0.84rem',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/products" style={{ color: '#64748b', textDecoration: 'none' }}>
              Products
            </Link>
            <span>/</span>
            <span style={{ color: '#2e3191', fontWeight: 600 }}>{division.name}</span>
          </div>
        </section>

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
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.2rem, 3.6vw, 3.2rem)',
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.2,
                maxWidth: '1100px',
                marginBottom: '20px',
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
                marginBottom: '32px',
              }}
            >
              {division.description.map((p, idx) => (
                <p key={idx} style={{ marginBottom: idx < division.description.length - 1 ? '14px' : '0' }}>
                  {p}
                </p>
              ))}
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

            {/* Subcategory Cards with Photos (e.g. Mechanical, Electrical, Fasteners, Coatings) */}
            {division.subcategories && division.subcategories.length > 0 && (
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
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '18px',
                  }}
                >
                  {division.subcategories.map((sub, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      }}
                    >
                      {sub.image && (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '130px',
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
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    fontFamily: "'Poppins', sans-serif",
                    margin: 0,
                  }}
                >
                  Products Catalog
                </h2>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>
                  Showing all {division.products.length} products
                </span>
              </div>
            </div>

            {/* 4-Column Product Grid (Matching exact screenshots) */}
            <div className="product-grid-4col">
              {division.products.map((product) => {
                const waMessage = encodeURIComponent(
                  `Hello Orient Energy Trading Co., I would like to order or request a quote for: ${product.title} (${division.name}).`
                );
                const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${waMessage}`;

                return (
                  <div
                    key={product.id}
                    className="product-catalog-card"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {/* Square Image Box */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '160px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                        backgroundColor: '#ffffff',
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
                          transition: 'transform 0.25s ease',
                        }}
                        className="product-catalog-thumb"
                      />
                    </div>

                    {/* Title */}
                    <h4
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        lineHeight: 1.45,
                        minHeight: '44px',
                        marginBottom: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                      title={product.title}
                    >
                      {product.title}
                    </h4>

                    {/* Order on WhatsApp Button */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-order-pill"
                      aria-label={`Order ${product.title} on WhatsApp`}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: '#25D366',
                          color: '#ffffff',
                          fontSize: '14px',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.776.852 2.796.852 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm0 10.428c-.878 0-1.579-.241-2.428-.737l-.173-.102-1.802.472.481-1.758-.112-.178c-.546-.867-.834-1.604-.834-2.359 0-2.628 2.139-4.767 4.768-4.767 2.629 0 4.768 2.139 4.768 4.767 0 2.628-2.139 4.767-4.768 4.767zm7.969-4.662c-.044-.074-.162-.119-.34-.208-.178-.089-1.054-.52-1.217-.58-.163-.059-.281-.089-.4.089-.119.178-.46 5.79-.564.708-.104.119-.208.134-.386.044-.178-.089-.751-.277-1.431-.883-.529-.471-.887-1.054-.991-1.232-.104-.178-.011-.274.078-.363.08-.08.178-.208.267-.312.089-.104.119-.178.178-.297.059-.119.03-.223-.015-.312-.044-.089-.4-1.025-.548-1.405-.144-.37-.291-.32-.4-.326l-.341-.006c-.119 0-.312.044-.475.223s-.623.609-.623 1.485.638 1.722.727 1.841c.089.119 1.256 1.918 3.043 2.689 1.787.771 1.787.514 2.107.484.32-.03 1.054-.43 1.202-.846.148-.416.148-.772.104-.846z" />
                        </svg>
                      </span>

                      <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
                        <span style={{ fontSize: '0.58rem', fontWeight: 600, color: '#25D366', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Order On
                        </span>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>WhatsApp</span>
                      </span>
                    </a>
                  </div>
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
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: '2.1rem',
                    fontWeight: 600,
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
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .product-catalog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          border-color: #2e3191;
        }

        .product-catalog-card:hover .product-catalog-thumb {
          transform: scale(1.05);
        }

        .whatsapp-order-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #000000;
          color: #ffffff;
          padding: 6px 14px 6px 6px;
          border-radius: 9999px;
          text-decoration: none;
          margin-top: auto;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .whatsapp-order-pill:hover {
          background-color: #111827;
          transform: translateY(-1px);
        }

        .product-cta-box {
          background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
          border-radius: 12px;
          padding: 50px 36px;
          box-shadow: 0 14px 40px rgba(7, 17, 56, 0.18);
        }

        .product-cta-btn {
          display: inline-block;
          background-color: #20b512;
          color: #ffffff;
          padding: 14px 36px;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.86rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 0px;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .product-cta-btn:hover {
          background-color: #179b0e;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(32, 181, 18, 0.35);
        }

        @media (max-width: 1024px) {
          .product-grid-4col {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 768px) {
          .product-grid-4col {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .product-grid-4col {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </>
  );
}
