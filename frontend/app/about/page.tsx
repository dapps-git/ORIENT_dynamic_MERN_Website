import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import CertificatesGallery from '@/components/about/CertificatesGallery';
import AboutIntroContent from '@/components/about/AboutIntroContent';

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

      <main
        className="about-page site-main-content"
        style={{
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Section 1: About Orient Energy Trading (Compact Header Spacing, Read More Toggle, 2-Photo Grid) */}
        <section
          className="about-intro-section"
          style={{
            backgroundColor: '#ffffff',
            padding: '24px 0 40px',
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 20px',
            }}
          >
            <AboutIntroContent />
          </div>
        </section>

        {/* Section 2: Mission & Our Vision (Glassy Modern Background Cards) */}
        <section style={{ padding: '20px 0 65px', backgroundColor: '#ffffff' }}>
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 20px',
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
                  padding: '44px 36px',
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
                  padding: '44px 36px',
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

        {/* Section 3: Our Certifications (2 in a row on mobile!) */}
        <section
          style={{
            padding: '65px 0 75px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #f1f5f9',
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 20px',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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

            {/* Interactive Certificates Gallery with Modal */}
            <CertificatesGallery certificates={CERTIFICATES} />
          </div>
        </section>

        {/* Section 4: What We Do */}
        <section style={{ padding: '65px 0 60px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
          <div
            className="container"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '0 20px',
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

        .about-intro-section {
          padding: 24px 0 40px;
        }

        .about-intro-p {
          font-size: 0.94rem;
          line-height: 1.82;
          color: #4b5563;
          margin-bottom: 16px;
          text-align: left;
          letter-spacing: 0.01em;
        }

        /* Enforce 2 certificates per row on mobile & tablet */
        .about-certs-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 20px !important;
        }

        @media (max-width: 1024px) {
          .about-mission-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .about-certs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 768px) {
          .about-intro-section {
            padding: 12px 0 24px !important;
          }
          .about-intro-p {
            font-size: 0.88rem !important;
            line-height: 1.74 !important;
            text-align: left !important;
            margin-bottom: 14px !important;
          }
          .about-what-we-do-p {
            text-align: left !important;
            font-size: 0.86rem !important;
            line-height: 1.74 !important;
          }
          .about-mission-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .about-glass-card {
            padding: 20px 14px !important;
            border-radius: 12px !important;
          }
          .about-glass-card h3 {
            font-size: 1.15rem !important;
            margin-bottom: 8px !important;
          }
          .about-glass-card p {
            font-size: 0.74rem !important;
            line-height: 1.52 !important;
          }
          /* Exactly 2 certificates per row on mobile */
          .about-certs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .about-intro-section {
            padding: 8px 0 20px !important;
          }
          .about-mission-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .about-glass-card {
            padding: 16px 10px !important;
            border-radius: 10px !important;
          }
          .about-glass-card h3 {
            font-size: 1.02rem !important;
            margin-bottom: 6px !important;
          }
          .about-glass-card p {
            font-size: 0.68rem !important;
            line-height: 1.42 !important;
          }
          /* Stay 2 certificates per row on small phones */
          .about-certs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </>
  );
}
