import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import CertificatesGallery from '@/components/about/CertificatesGallery';

export const metadata: Metadata = {
  title: 'About Us — Orient Energy Trading Company',
  description:
    'Orient Energy is a Saudi Arabia-based industrial supply and engineering solutions company serving Oil & Gas, Power, Marine, Construction, Infrastructure, and industrial sectors across the Kingdom and the Middle East.',
};

const CERTIFICATES = [
  {
    title: 'ISO 9001:2015 Quality Management System',
    image: '/about/cert-iso-9001.jpg',
  },
  {
    title: 'ISO 14001:2015 Environmental Management System',
    image: '/about/cert-iso-14001.jpg',
  },
  {
    title: 'ISO 45001:2018 Occupational Health and Safety',
    image: '/about/cert-iso-45001.jpg',
  },
  {
    title: 'IADC Certificate of Membership 2026',
    image: '/about/cert-iadc.jpg',
  },
];

export default function AboutPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main className="about-page" style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        {/* Section 1: About Orient Energy Trading ("EXPERTISE IN EVERY TRADE") */}
        <section className="about-intro-section" style={{ backgroundColor: '#ffffff', padding: '60px 0 50px' }}>
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div
              className="scroll-reveal"
              style={{
                maxWidth: '920px',
                margin: '0 auto',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#2e3191',
                    marginBottom: '10px',
                  }}
                >
                  ABOUT
                </div>

                <h2
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(2.0rem, 3.2vw, 2.75rem)',
                    fontWeight: 500,
                    color: '#1a1f2c',
                    lineHeight: 1.18,
                    marginBottom: '16px',
                    letterSpacing: '0.01em',
                  }}
                >
                  ORIENT ENERGY TRADING
                </h2>

                <div
                  style={{
                    width: '50px',
                    height: '3px',
                    backgroundColor: '#20b512',
                    margin: '0 auto',
                    borderRadius: '2px',
                  }}
                />
              </div>

              <p className="about-intro-p">
                Orient Energy is a Saudi Arabia-based industrial supply and engineering solutions
                company serving the Oil &amp; Gas, Power, Marine, Construction, Infrastructure, and
                industrial sectors across the Kingdom and the Middle East.
              </p>

              <p className="about-intro-p">
                We specialize in industrial supply, global procurement, and engineering support, delivering
                reliable products and integrated solutions tailored for demanding industrial operations.
              </p>

              <p className="about-intro-p" style={{ margin: 0 }}>
                With a strong international sourcing network and industry expertise, we provide
                certified industrial materials, mechanical and electrical solutions, safety
                equipment, steel products, welding systems, marine supplies, and maintenance
                solutions backed by quality, reliability, and technical excellence. At Orient Energy,
                we are committed to supporting industries with dependable service, operational
                efficiency, and long-term partnership solutions designed to meet modern industrial
                demands.
              </p>

              {/* Showroom Image: Placed directly, cleanly, no border or box, no overlay text */}
              <div style={{ marginTop: '36px', width: '100%' }}>
                <Image
                  src="/about/storefront.png"
                  alt="Orient Energy Trading Co. Showroom"
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 1200px) 100vw, 920px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Mission & Our Vision (Glassy Modern Background Cards) */}
        <section style={{ padding: '20px 0 85px', backgroundColor: '#ffffff' }}>
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
              }}
              className="about-mission-grid"
            >
              {/* Mission Card - Glassy Modern Background */}
              <div
                className="scroll-reveal about-glass-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(7, 17, 56, 0.92) 0%, rgba(13, 32, 96, 0.82) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '48px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(7, 17, 56, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                  }}
                >
                  Mission
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.75,
                    color: 'rgba(255, 255, 255, 0.90)',
                    margin: 0,
                    maxWidth: '520px',
                    fontWeight: 400,
                  }}
                >
                  To deliver reliable industrial supply, engineering solutions, and integrated
                  support services that help industries improve operational performance, reduce
                  downtime, and successfully execute critical projects with efficiency, safety, and
                  confidence.
                </p>
              </div>

              {/* Our Vision Card - Glassy Modern Background */}
              <div
                className="scroll-reveal about-glass-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(7, 17, 56, 0.92) 0%, rgba(13, 32, 96, 0.82) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '48px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(7, 17, 56, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                  }}
                >
                  Our Vision
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.75,
                    color: 'rgba(255, 255, 255, 0.90)',
                    margin: 0,
                    maxWidth: '520px',
                    fontWeight: 400,
                  }}
                >
                  To become one of Saudi Arabia&apos;s most trusted industrial solution providers,
                  recognized for quality, reliability, innovation, and excellence across energy,
                  infrastructure, industrial, and engineering sectors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our Certifications (Clickable with Full View Modal) */}
        <section
          style={{
            padding: '75px 0 85px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #f1f5f9',
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '46px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#2e3191',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontSize: '0.85rem', color: '#2e3191' }}>▶</span>
                CERTIFICATIONS
              </div>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.4rem, 2.4vw, 2.05rem)',
                  fontWeight: 500,
                  color: '#111827',
                  margin: 0,
                  lineHeight: 1.25,
                  letterSpacing: '0.01em',
                }}
              >
                Our Certifications
              </h2>
            </div>

            {/* Interactive Certificates with Full View Modal */}
            <CertificatesGallery certificates={CERTIFICATES} />
          </div>
        </section>

        {/* Section 4: What We Do (Improved Alignment & Font Size) */}
        <section style={{ padding: '75px 0 65px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
          <div
            className="container"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.4rem, 2.4vw, 1.95rem)',
                  fontWeight: 500,
                  color: '#111827',
                  margin: 0,
                  lineHeight: 1.25,
                  letterSpacing: '0.01em',
                }}
              >
                What We Do
              </h2>
            </div>

            <div className="about-what-we-do-content">
              <p className="about-what-we-do-p">
                Orient Energy provides complete industrial supply, engineering support, and global
                procurement solutions for critical industries across Saudi Arabia.
                Our services include the supply of mechanical, electrical, welding, marine, safety,
                steel, maintenance, and industrial products sourced from trusted global manufacturers
                and compliant with international quality standards.
              </p>
              <p className="about-what-we-do-p" style={{ marginBottom: 0 }}>
                We deliver project-based supply services tailored for Oil &amp; Gas, Power &amp; Energy,
                Construction, Infrastructure, Marine, and heavy industrial operations. With a strong focus
                on reliability, technical expertise, and operational efficiency, we help businesses execute
                projects smoothly and maintain uninterrupted operations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .about-page h1,
        .about-page h2,
        .about-page h3,
        .about-page h4,
        .about-page p,
        .about-page span,
        .about-page div {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        .about-glass-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .about-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 50px rgba(7, 17, 56, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.35) !important;
          border-color: rgba(255, 255, 255, 0.28) !important;
        }

        .about-what-we-do-p {
          font-size: 0.90rem;
          line-height: 1.82;
          color: #4b5563;
          margin-bottom: 16px;
          text-align: center;
          letter-spacing: 0.01em;
        }

        @media (max-width: 1024px) {
          .about-mission-grid {
            grid-template-columns: 1fr !important;
          }
          .about-certs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        .about-intro-section {
          padding: 135px 0 65px;
        }

        .about-intro-p {
          font-size: 0.94rem;
          line-height: 1.82;
          color: #4b5563;
          margin-bottom: 20px;
          text-align: left;
          letter-spacing: 0.01em;
        }

        @media (max-width: 768px) {
          .about-intro-section {
            padding: 115px 0 32px !important;
          }
          .about-intro-p {
            font-size: 0.88rem !important;
            line-height: 1.74 !important;
            text-align: left !important;
            margin-bottom: 16px !important;
          }
          .about-what-we-do-p {
            text-align: left !important;
            font-size: 0.86rem !important;
            line-height: 1.74 !important;
          }
          .about-glass-card {
            padding: 36px 24px !important;
          }
        }

        @media (max-width: 640px) {
          .about-certs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
