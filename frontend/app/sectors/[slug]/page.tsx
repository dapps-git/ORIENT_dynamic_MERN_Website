import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import { SECTORS_DATA, getSectorById } from '@/lib/sectorsData';

const WHATSAPP_PHONE = '966552400778';

interface SectorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SECTORS_DATA.map((sector) => ({
    slug: sector.id,
  }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorById(slug);

  if (!sector) {
    return {
      title: 'Sector Not Found — Orient Energy Co.',
    };
  }

  return {
    title: `${sector.title} — Industrial Supply & Solutions | Orient Energy`,
    description: sector.metaDescription,
    keywords: [
      `${sector.shortTitle} supplier Saudi Arabia`,
      `${sector.shortTitle} industrial materials Riyadh Dammam Jubail`,
      'Saudi Aramco approved vendor materials',
      'Industrial equipment supplier KSA',
      sector.title,
    ],
  };
}

export default async function SectorDetailPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorById(slug);

  if (!sector) {
    notFound();
  }

  const waMessage = encodeURIComponent(
    `Hello Orient Energy Trading Co., I would like to consult or request a quotation for our project in the ${sector.title}.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${waMessage}`;

  const otherSectors = SECTORS_DATA.filter((s) => s.id !== sector.id);

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main className="site-main-content">
        {/* Breadcrumbs Navigation */}
        <div className="breadcrumb-nav-bar" style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748b', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>
                Home
              </Link>
              <span>/</span>
              <Link href="/sectors" style={{ color: '#64748b', textDecoration: 'none' }}>
                Sectors
              </Link>
              <span>/</span>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>{sector.shortTitle}</span>
            </nav>
          </div>
        </div>

        {/* Clean Light Hero Header (No dark blue banner, no chat/request buttons) */}
        <section
          style={{
            position: 'relative',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            padding: '36px 0 45px',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div className="sector-inner-hero-grid">
              {/* Left Column: Heading and Tagline */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(11, 122, 61, 0.08)',
                      color: '#0b7a3d',
                      border: '1px solid rgba(11, 122, 61, 0.22)',
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    Saudi Arabia Industrial Supply
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                    fontWeight: 700,
                    lineHeight: 1.22,
                    marginBottom: '16px',
                    color: '#0f172a',
                  }}
                >
                  {sector.title}
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                    lineHeight: 1.7,
                    color: '#475569',
                    margin: 0,
                    maxWidth: '680px',
                  }}
                >
                  {sector.tagline}
                </p>
              </div>

              {/* Right Column: Hero High-Res Image Showcase */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                }}
              >
                <Image
                  src={sector.heroImage}
                  alt={sector.title}
                  fill
                  priority
                  sizes="(max-width: 991px) 100vw, 540px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Sector Overview */}
        <section style={{ padding: '60px 0 40px' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: '980px' }}>
              <div style={{ fontSize: '0.80rem', fontWeight: 700, letterSpacing: '0.1em', color: '#2e3191', textTransform: 'uppercase', marginBottom: '8px' }}>
                INDUSTRY OVERVIEW
              </div>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '22px',
                  lineHeight: 1.3,
                }}
              >
                Critical Supply Chain Support for {sector.shortTitle} Operations
              </h2>

              {sector.overview.map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: '0.98rem',
                    lineHeight: 1.8,
                    color: '#475569',
                    marginBottom: '18px',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Key Operations & Applications */}
        <section style={{ padding: '40px 0 60px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '0.80rem', fontWeight: 700, letterSpacing: '0.1em', color: '#2e3191', textTransform: 'uppercase', marginBottom: '8px' }}>
                FIELD APPLICATIONS
              </div>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                  fontWeight: 600,
                  color: '#0f172a',
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                Key Applications &amp; Operational Environments in Saudi Arabia
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {sector.keyApplications.map((app, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '10px',
                    }}
                  >
                    {app.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Supplied Equipment & Materials (Connecting with Products Catalog) */}
        <section style={{ padding: '60px 0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
              <div>
                <div style={{ fontSize: '0.80rem', fontWeight: 700, letterSpacing: '0.1em', color: '#2e3191', textTransform: 'uppercase', marginBottom: '8px' }}>
                  EQUIPMENT &amp; PRODUCT PACKAGES
                </div>
                <h2
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                    fontWeight: 600,
                    color: '#0f172a',
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  Core Industrial Products &amp; Materials Supplied
                </h2>
              </div>

              <Link
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#2e3191',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                }}
              >
                <span>Browse Full 12-Division Catalog</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '26px',
              }}
            >
              {sector.suppliedProducts.map((cat, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '24px 22px',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <h3
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '1.02rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        margin: 0,
                      }}
                    >
                      {cat.categoryName}
                    </h3>
                  </div>

                  <Link
                    href={`/products/${cat.divisionSlug}`}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#20b512',
                      textDecoration: 'none',
                      marginBottom: '16px',
                      display: 'inline-block',
                    }}
                  >
                    View in {cat.divisionName} &rarr;
                  </Link>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px 0', flex: 1 }}>
                    {cat.items.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.88rem',
                          color: '#475569',
                          padding: '7px 0',
                          borderBottom: iIdx === cat.items.length - 1 ? 'none' : '1px dashed #f1f5f9',
                        }}
                      >
                        <span style={{ color: '#20b512', fontWeight: 700 }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/products/${cat.divisionSlug}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '9px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#0f172a',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      marginTop: 'auto',
                    }}
                  >
                    Explore Division Products &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Standards, Certifications & Why Orient */}
        <section style={{ padding: '60px 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
              }}
            >
              {/* Left Column: Standards & Compliance */}
              <div>
                <div style={{ fontSize: '0.80rem', fontWeight: 700, letterSpacing: '0.1em', color: '#2e3191', textTransform: 'uppercase', marginBottom: '8px' }}>
                  QUALITY ASSURANCE
                </div>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: '20px',
                  }}
                >
                  Technical Standards &amp; Approvals
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {sector.standardsAndCompliance.map((std, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        color: '#1e293b',
                      }}
                    >
                      <span style={{ color: '#0b7a3d', fontWeight: 700, fontSize: '0.95rem' }}>✓</span>
                      <span>{std}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Why Orient Energy */}
              <div>
                <div style={{ fontSize: '0.80rem', fontWeight: 700, letterSpacing: '0.1em', color: '#20b512', textTransform: 'uppercase', marginBottom: '8px' }}>
                  ORIENT ENERGY ADVANTAGE
                </div>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: '20px',
                  }}
                >
                  Why Partner With Orient Energy?
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sector.whyOrient.map((reason, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '0.90rem',
                        color: '#475569',
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: '#20b512', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1 }}>✓</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Explore Other Sectors Grid */}
        <section style={{ padding: '0 0 90px' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                Explore Other Industrial Sectors
              </h3>
              <Link
                href="/sectors"
                style={{
                  color: '#2e3191',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                View All Sectors &rarr;
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '18px',
              }}
            >
              {otherSectors.slice(0, 4).map((other) => (
                <Link
                  key={other.id}
                  href={`/sectors/${other.id}`}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  className="other-sector-card"
                >
                  <div style={{ position: 'relative', width: '100%', height: '135px', backgroundColor: '#f1f5f9' }}>
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="260px"
                      style={{ objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'rgba(7, 17, 56, 0.85)',
                        color: '#ffffff',
                        fontSize: '0.70rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      #{other.num}
                    </span>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h4
                      style={{
                        fontSize: '0.90rem',
                        fontWeight: 600,
                        color: '#0f172a',
                        lineHeight: 1.4,
                        margin: '0 0 6px 0',
                      }}
                    >
                      {other.shortTitle}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: '#2e3191', fontWeight: 600 }}>
                      View Sector Guide &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .site-main-content {
          background-color: #ffffff;
          min-height: 100vh;
          padding-top: 106px;
        }

        .sector-inner-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }

        .other-sector-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
          border-color: #2e3191;
        }

        @media (max-width: 1024px) {
          .site-main-content {
            padding-top: 94px !important;
          }
          .breadcrumb-nav-bar {
            padding: 10px 0 !important;
          }
        }

        @media (max-width: 991px) {
          .sector-inner-hero-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 768px) {
          .site-main-content {
            padding-top: 90px !important;
          }
          .breadcrumb-nav-bar {
            padding: 8px 0 !important;
          }
          .breadcrumb-nav-bar .container {
            padding: 0 16px !important;
          }
        }

        @media (max-width: 480px) {
          .site-main-content {
            padding-top: 86px !important;
          }
        }
      `}</style>
    </>
  );
}
