import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'About Us — Orient Energy Trading Company',
  description:
    'Orient Energy is a Saudi Arabia-based industrial supply and engineering solutions company serving Oil & Gas, Power, Marine, Construction, Infrastructure, and industrial sectors across the Kingdom and the Middle East.',
};

const INDUSTRIES = [
  {
    title: 'Oil & Gas',
    image: '/about/rental-heavy.jpg',
    href: '/sectors#oil-gas',
  },
  {
    title: 'Petrochemical',
    image: '/about/industry-1.jpg',
    href: '/sectors#petrochemical',
  },
  {
    title: 'Infrastructure Development',
    image: '/about/infrastructure-rack.jpg',
    href: '/sectors#construction',
  },
];

const CLIENTS = [
  { name: 'Zamil Offshore', logo: '/about/client-v2-zamil.jpg' },
  { name: 'CNPC', logo: '/about/client-v2-cnpc.jpg' },
  { name: 'COSL', logo: '/about/client-v2-cosl.jpg' },
  { name: 'Sinopec', logo: '/about/client-v2-sinopec.jpg' },
  { name: 'Sipchem', logo: '/about/client-v2-sipchem.jpg' },
  { name: 'Saipem', logo: '/about/client-v2-saipem.jpg' },
];

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

const RENTAL_SOLUTIONS = [
  'Mobile Cranes & Heavy Lifting Solutions',
  'Earth Moving Equipment',
  'Industrial Equipment Rental',
  'Power & Light Equipment',
  'Heavy Transport Solutions',
  'Shutdown & Turnaround Support',
  'Waste Management Services',
];

export default function AboutPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main className="about-page" style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        {/* Section 1: About Orient Energy Trading ("EXPERTISE IN EVERY TRADE") */}
        <section className="about-intro-section" style={{ backgroundColor: '#ffffff' }}>
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
                maxWidth: '860px',
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
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: 'clamp(2.1rem, 3.2vw, 2.85rem)',
                    fontWeight: 600,
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
                We specialize in industrial supply, global procurement, engineering support, and
                heavy equipment rental, delivering reliable products and integrated solutions
                tailored for demanding industrial operations.
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
            </div>
          </div>
        </section>

        {/* Section 1.5: Our Showroom, Facilities & Inventory Gallery */}
        <section style={{ padding: '10px 0 75px', backgroundColor: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '34px' }}>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#2e3191',
                  marginBottom: '8px',
                }}
              >
                OUR FACILITIES &amp; SHOWROOM
              </div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: 'clamp(1.9rem, 2.8vw, 2.45rem)',
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                }}
              >
                Experience Our Showroom &amp; Warehousing Stockyard
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.35fr 1fr 1fr',
                gap: '22px',
              }}
              className="about-facility-gallery"
            >
              {/* Photo 1: Storefront */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  aspectRatio: '16/9',
                }}
              >
                <Image
                  src="/about/storefront.png"
                  alt="Orient Energy Showroom Facility — Al Khobar"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(10, 15, 29, 0.85) 100%)',
                    padding: '24px 18px 14px',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Main Showroom &amp; Retail Facility — Al Khobar
                  </div>
                </div>
              </div>

              {/* Photo 2: Showroom Counter */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  aspectRatio: '16/10',
                }}
              >
                <Image
                  src="/about/showroom-counter.png"
                  alt="Orient Energy Customer Reception & Procurement Center"
                  fill
                  sizes="(max-width: 768px) 100vw, 28vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(10, 15, 29, 0.85) 100%)',
                    padding: '24px 18px 14px',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Procurement &amp; Technical Support Center
                  </div>
                </div>
              </div>

              {/* Photo 3: Warehouse inventory fittings */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  aspectRatio: '16/10',
                }}
              >
                <Image
                  src="/about/warehouse-fittings.png"
                  alt="Industrial Valves, Piping & Fitting Warehouse"
                  fill
                  sizes="(max-width: 768px) 100vw, 28vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(10, 15, 29, 0.85) 100%)',
                    padding: '24px 18px 14px',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Extensive Piping &amp; Flanges Inventory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Mission & Our Vision (2 Solid Navy Blue Cards) */}
        <section style={{ padding: '15px 0 85px', backgroundColor: '#ffffff' }}>
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
              {/* Mission Card */}
              <div
                className="scroll-reveal"
                style={{
                  backgroundColor: '#071138',
                  padding: '48px 40px',
                  borderRadius: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(7, 17, 56, 0.16)',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                  }}
                >
                  Mission
                </h3>
                <p
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.88)',
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

              {/* Our Vision Card */}
              <div
                className="scroll-reveal"
                style={{
                  backgroundColor: '#071138',
                  padding: '48px 40px',
                  borderRadius: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(7, 17, 56, 0.16)',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                  }}
                >
                  Our Vision
                </h3>
                <p
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.88)',
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

        {/* Section 3: "We proudly support industries including:" */}
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
                INDUSTRIES
              </div>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: 'clamp(2.3rem, 3.4vw, 3.1rem)',
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                  lineHeight: 1.18,
                  letterSpacing: '0.01em',
                }}
              >
                We proudly support industries including:
              </h2>
            </div>

            {/* 3 Industry Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
              className="about-industries-grid"
            >
              {INDUSTRIES.map((ind, i) => (
                <div
                  key={i}
                  className="scroll-reveal"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #f1f5f9',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                    <Image
                      src={ind.image}
                      alt={ind.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div
                    style={{
                      padding: '20px 22px 18px',
                      backgroundColor: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#111827',
                        marginBottom: '14px',
                        lineHeight: 1.3,
                      }}
                    >
                      {ind.title}
                    </h3>

                    <Link
                      href={ind.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem',
                        color: '#64748b',
                        textDecoration: 'none',
                        fontWeight: 500,
                        paddingTop: '10px',
                        borderTop: '1px solid #e2e8f0',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      <span>View Details</span>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#e2e8f0',
                          color: '#1e293b',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          borderRadius: '0px',
                        }}
                      >
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Clients we Deal with */}
        <section style={{ padding: '80px 0 75px', backgroundColor: '#ffffff' }}>
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '42px' }}>
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
                CLIENTS
              </div>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: 'clamp(2.4rem, 3.6vw, 3.2rem)',
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                  lineHeight: 1.15,
                  letterSpacing: '0.01em',
                }}
              >
                Clients we
                <br />
                Deal with
              </h2>
            </div>

            {/* Client Logos Grid (Exact 6 matching design screenshot) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '16px',
                alignItems: 'center',
              }}
              className="about-clients-grid"
            >
              {CLIENTS.map((client, i) => (
                <div
                  key={i}
                  className="scroll-reveal"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #f1f5f9',
                    padding: '22px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '110px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={180}
                    height={80}
                    style={{
                      maxHeight: '44px',
                      maxWidth: '125px',
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
        </section>

        {/* Section 5: Our Certifications */}
        <section
          style={{
            padding: '80px 0 85px',
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
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: 'clamp(2.4rem, 3.6vw, 3.2rem)',
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                  lineHeight: 1.18,
                  letterSpacing: '0.01em',
                }}
              >
                Our Certifications
              </h2>
            </div>

            {/* 4 Certificates Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '22px',
                alignItems: 'start',
              }}
              className="about-certs-grid"
            >
              {CERTIFICATES.map((cert, i) => (
                <div
                  key={i}
                  className="scroll-reveal"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden',
                    borderRadius: '0px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '390px' }}>
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{
                        objectFit: 'contain',
                        padding: '10px',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: What We Do */}
        <section style={{ padding: '85px 0 65px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
          <div
            className="container"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '0 24px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.4rem, 3.6vw, 3.2rem)',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '20px',
                lineHeight: 1.18,
                letterSpacing: '0.01em',
              }}
            >
              What We Do
            </h2>

            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.8,
                color: '#4b5563',
                margin: 0,
                fontWeight: 400,
              }}
            >
              Orient Energy provides complete industrial supply, engineering support, global
              procurement, and equipment rental solutions for critical industries across Saudi Arabia.
              Our services include the supply of mechanical, electrical, welding, marine, safety,
              steel, maintenance, and industrial products sourced from trusted global manufacturers
              and compliant with international quality standards. We also provide heavy equipment
              rental, lifting solutions, transportation support, industrial shutdown assistance, and
              project-based supply services tailored for Oil &amp; Gas, Power &amp; Energy,
              Construction, Infrastructure, Marine, and industrial sectors. With a strong focus on
              reliability, technical expertise, and operational efficiency, we help businesses execute
              projects smoothly and maintain uninterrupted operations.
            </p>
          </div>
        </section>

        {/* Section 7: Rental Equipment Division */}
        <section
          style={{
            padding: '40px 0 100px',
            backgroundColor: '#ffffff',
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.05fr',
                gap: '54px',
                alignItems: 'center',
              }}
              className="about-rental-grid"
            >
              {/* Left Column: Riyadh Construction Machinery visual matching screenshot 2 */}
              <div
                className="scroll-reveal"
                style={{
                  position: 'relative',
                  height: '540px',
                  backgroundColor: '#0c1424',
                  borderRadius: '0px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.14)',
                }}
              >
                <Image
                  src="/about/riyadh-rental-equipment.jpg"
                  alt="Rental Equipment Fleet in Riyadh"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  priority
                />

                {/* ISO Badge Watermark Top-Right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: '#ffffff',
                    padding: '8px 14px',
                    borderRadius: '0px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.16)',
                    zIndex: 2,
                    textAlign: 'center',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#005ea6', lineHeight: 1 }}>
                    ISO
                  </div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#334155', marginTop: '2px', letterSpacing: '0.04em' }}>
                    CERTIFIED
                  </div>
                </div>

                {/* Bottom Dark Gradient Card Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '36px 30px',
                    background:
                      'linear-gradient(to top, rgba(7, 17, 56, 0.96) 0%, rgba(7, 17, 56, 0.82) 65%, transparent 100%)',
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#20b512',
                      marginBottom: '8px',
                    }}
                  >
                    Rental Products
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'clamp(1.5rem, 2.4vw, 1.95rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.22,
                      marginBottom: '18px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Powering Projects with
                    <br />
                    Reliable Equipment
                  </h3>

                  <Link
                    href="/oetc-rental-equipments"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#071138',
                      border: '1.5px solid rgba(255, 255, 255, 0.35)',
                      color: '#ffffff',
                      padding: '9px 22px',
                      borderRadius: '0px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    View Products &rarr;
                  </Link>
                </div>
              </div>

              {/* Right Column: Division copy and Checklist */}
              <div className="scroll-reveal">
                <h2
                  style={{
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: 'clamp(2.3rem, 3.4vw, 3.1rem)',
                    fontWeight: 600,
                    color: '#1a1f2c',
                    lineHeight: 1.15,
                    marginBottom: '18px',
                    letterSpacing: '0.01em',
                  }}
                >
                  Rental Equipment Division
                </h2>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.72,
                    color: '#4b5563',
                    marginBottom: '22px',
                    fontWeight: 400,
                  }}
                >
                  Orient Energy also operates a specialized Rental Equipment Division, providing
                  advanced heavy equipment rental and industrial support services across Saudi Arabia.
                  Our fleet supports construction, oil &amp; gas, infrastructure, shutdown operations,
                  and industrial maintenance projects with reliable equipment and operational solutions.
                </p>

                <h4
                  style={{
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '14px',
                    letterSpacing: '0.01em',
                  }}
                >
                  Our Rental Solutions Include
                </h4>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {RENTAL_SOLUTIONS.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.86rem',
                        color: '#334155',
                        fontWeight: 400,
                      }}
                    >
                      <span
                        style={{
                          color: '#0ea5e9',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          lineHeight: 1,
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.72,
                    color: '#4b5563',
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  With a strong operational network and modern equipment fleet, we continue to
                  support major industrial projects with safe, efficient, and dependable rental
                  solutions tailored to the evolving demands of the Saudi market.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .about-page h1,
        .about-page h2,
        .about-page h3,
        .about-page h4 {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        @media (max-width: 1024px) {
          .about-split-grid,
          .about-rental-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-mission-grid {
            grid-template-columns: 1fr !important;
          }
          .about-industries-grid {
            grid-template-columns: 1fr !important;
          }
          .about-clients-grid {
            grid-template-columns: repeat(3, 1fr) !important;
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
        }

        @media (max-width: 640px) {
          .about-clients-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-certs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
