import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Industries We Serve — Industrial Sectors Supply in Saudi Arabia | Orient Energy',
  description:
    'Orient Energy Co. supports Oil & Gas, Marine, Construction, Manufacturing, Power, Heavy Engineering, Maintenance, Logistics, and Water Utility sectors across Saudi Arabia.',
};

const SECTORS_LIST = [
  {
    num: '01',
    id: 'oil-gas',
    title: 'Oil & Gas Industry Supplier in Saudi Arabia',
    image: '/sectors/oil-gas.png',
  },
  {
    num: '02',
    id: 'marine-offshore',
    title: 'Marine & Offshore Industry Supplier in Saudi Arabia',
    image: '/sectors/marine-offshore.png',
  },
  {
    num: '03',
    id: 'construction',
    title: 'Construction & Infrastructure Supplier in Saudi Arabia',
    image: '/sectors/construction.png',
  },
  {
    num: '04',
    id: 'manufacturing',
    title: 'Manufacturing Industry Supplier in Saudi Arabia',
    image: '/sectors/manufacturing.jpg',
  },
  {
    num: '05',
    id: 'power-energy',
    title: 'Energy & Power Sector Supplier in Saudi Arabia',
    image: '/sectors/power-energy.png',
  },
  {
    num: '06',
    id: 'heavy-engineering',
    title: 'Heavy Engineering Industry Supplier in Saudi Arabia',
    image: '/sectors/heavy-engineering.jpg',
  },
  {
    num: '07',
    id: 'maintenance',
    title: 'Industrial Maintenance Supplier in Saudi Arabia',
    image: '/sectors/maintenance.jpeg',
  },
  {
    num: '08',
    id: 'metals-fabrication',
    title: 'Fabrication & Welding Supplier in Saudi Arabia',
    image: '/sectors/metals-fabrication.png',
  },
  {
    num: '09',
    id: 'water-utility',
    title: 'Water & Utility Projects Supplier in Saudi Arabia',
    image: '/sectors/water-utility.jpg',
  },
];

export default function SectorsPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '110px' }}>
        {/* Top Hero Section */}
        <section style={{ padding: '40px 0 60px' }}>
          <div
            className="container"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div className="sector-hero-grid">
              {/* Left Column: Heading and Text */}
              <div className="sector-hero-left">
                <div className="sector-hero-tag">INDUSTRIES WE SERVE</div>

                <h1 className="sector-hero-title">
                  Powering Progress
                  <br />
                  Across Every Industry
                </h1>

                <p className="sector-hero-desc">
                  Orient Energy Co. supports a wide range of industries across Saudi Arabia with reliable
                  industrial supply solutions, engineering materials, maintenance products, lifting systems,
                  safety equipment, and operational support services designed for demanding industrial
                  environments.
                </p>
              </div>

              {/* Right Column: Hero Collage */}
              <div className="sector-hero-collage">
                {/* Top Wide Image */}
                <div className="sector-collage-top">
                  <Image
                    src="/sectors/oil-gas.png"
                    alt="Industrial Refinery at Dusk"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 580px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Bottom Diagonal Slices Row */}
                <div className="sector-collage-bottom">
                  <div className="sector-slice-item">
                    <Image
                      src="/sectors/marine-offshore.png"
                      alt="Marine Offshore Rig"
                      fill
                      sizes="(max-width: 768px) 25vw, 145px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="sector-slice-item">
                    <Image
                      src="/sectors/construction.png"
                      alt="Construction Crane"
                      fill
                      sizes="(max-width: 768px) 25vw, 145px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="sector-slice-item">
                    <Image
                      src="/sectors/metals-fabrication.png"
                      alt="Industrial Welder Sparks"
                      fill
                      sizes="(max-width: 768px) 25vw, 145px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="sector-slice-item">
                    <Image
                      src="/sectors/power-energy.png"
                      alt="Energy & Power Infrastructure"
                      fill
                      sizes="(max-width: 768px) 25vw, 145px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Column Pretty Box Style Cards Grid */}
        <section style={{ paddingBottom: '90px' }}>
          <div
            className="container"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div className="sectors-cards-grid">
              {SECTORS_LIST.map((sector) => (
                <Link
                  key={sector.num}
                  id={sector.id}
                  href={`/contact?inquiry=${encodeURIComponent(sector.title)}`}
                  className="sector-box-card"
                  aria-label={`Inquire for ${sector.title}`}
                >
                  {/* Full Background Image */}
                  <div className="sector-card-bg-wrap">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="sector-card-img"
                    />
                  </div>

                  {/* Heading placed directly on image top - no blue box, small clean font */}
                  <div className="sector-card-top-content">
                    <span className="sector-card-num">{sector.num}</span>
                    <h2 className="sector-card-title">{sector.title}</h2>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Project Sourcing CTA Banner */}
            <div className="sector-bottom-cta">
              <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <h3
                  className="sector-cta-title"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)',
                    fontWeight: 500,
                    color: '#ffffff',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  <span className="sector-cta-line">Partner With a Certified Industrial</span>
                  <span className="sector-cta-line">Supply Leader</span>
                </h3>
                <p className="sector-cta-desc">
                  Whether you operate an offshore platform, construction site,
                  <br className="desktop-desc-break" />
                  or manufacturing facility in Saudi Arabia, Orient Energy delivers
                  <br className="desktop-desc-break" />
                  compliant procurement and mission-critical engineering support.
                </p>
                <Link href="/contact" className="sector-cta-btn">
                  Request Sector Consultation &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .sector-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .sector-hero-left {
          padding-right: 20px;
        }

        .sector-hero-tag {
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #172554;
          margin-bottom: 14px;
        }

        .sector-hero-title {
          font-family: 'Montserrat', sans-serif !important;
          font-size: clamp(1.85rem, 3.0vw, 2.6rem);
          font-weight: 500;
          color: #111827;
          line-height: 1.2;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .sector-hero-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 0.90rem;
          color: #64748b;
          line-height: 1.75;
          max-width: 540px;
          margin: 0;
        }

        .sector-hero-collage {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .sector-collage-top {
          position: relative;
          width: 100%;
          height: 195px;
          background-color: #0c1424;
        }

        .sector-collage-bottom {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5px;
          height: 105px;
        }

        .sector-slice-item {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #0c1424;
          overflow: hidden;
        }

        /* Sector Cards Grid */
        .sectors-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .sector-box-card {
          position: relative;
          height: 250px;
          overflow: hidden;
          border-radius: 4px;
          display: block;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
          scroll-margin-top: 110px;
        }

        .sector-box-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 40px rgba(7, 17, 56, 0.2);
        }

        .sector-card-bg-wrap {
          position: absolute;
          inset: 0;
          background-color: #0c1424;
          overflow: hidden;
        }

        .sector-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sector-box-card:hover .sector-card-img {
          transform: scale(1.06);
        }

        /* Heading on image top - no blue box, small clean font */
        .sector-card-top-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 16px 18px 24px;
          z-index: 2;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.3) 65%, transparent 100%);
          transition: background 0.3s ease;
        }

        .sector-box-card:hover .sector-card-top-content {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.45) 75%, transparent 100%);
        }

        .sector-card-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #20b512;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
          display: block;
        }

        .sector-card-title {
          font-family: 'Montserrat', -apple-system, sans-serif !important;
          font-size: 0.86rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.35;
          margin: 0;
          letter-spacing: 0.01em;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
        }

        .sector-cta-line {
          display: block;
          white-space: nowrap;
        }

        .sector-cta-desc {
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.68;
          margin: 0 auto 22px;
          max-width: 580px;
        }

        .sector-bottom-cta {
          margin-top: 75px;
          background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
          border-radius: 8px;
          padding: 42px 28px;
          text-align: center;
          box-shadow: 0 14px 40px rgba(7, 17, 56, 0.18);
        }

        .sector-cta-btn {
          display: inline-block;
          background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
          color: #071138 !important;
          padding: 8px 22px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.76rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 #ffffff;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }

        .sector-cta-btn:hover {
          background: linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.35), inset 0 1px 0 #ffffff;
        }

        @media (max-width: 768px) {
          .sector-cta-desc {
            font-size: 0.78rem !important;
            line-height: 1.6 !important;
            max-width: 320px !important;
          }
          .desktop-desc-break {
            display: none !important;
          }
          .sector-cta-title {
            font-size: clamp(0.96rem, 4.4vw, 1.25rem) !important;
          }
        }

        @media (max-width: 1024px) {
          .sector-hero-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .sector-hero-left {
            padding-right: 0;
          }
          .sectors-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 22px !important;
          }
        }

        @media (max-width: 640px) {
          .sectors-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .sector-box-card {
            height: 230px !important;
          }
          .sector-card-inset-box {
            width: 90% !important;
          }
        }
      `}</style>
    </>
  );
}
