import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Industrial Products & Engineering Supply Solutions in Saudi Arabia — Orient Energy',
  description:
    'Orient Energy Co. is a trusted industrial products supplier in Saudi Arabia delivering high-quality engineering materials, industrial equipment, maintenance products, safety solutions, and marine supplies.',
};

const PRODUCT_CATEGORIES = [
  {
    id: 'mechanical-division',
    title: 'Mechanical Division',
    image: '/categories/all-fittings.jpeg',
    desc: 'High-pressure valves, flanges, strainers, actuators, and industrial pipe fittings.',
  },
  {
    id: 'electrical-division',
    title: 'Electrical Division',
    image: '/categories/electrical-ups-systems.jpg',
    desc: 'Switchgears, motor control centers, VFDs, transformers, and industrial UPS systems.',
  },
  {
    id: 'welding-division',
    title: 'Welding Division',
    image: '/categories/welding-safety.jpg',
    desc: 'Welding machines, cutting torches, electrodes, auto-darkening helmets, and regulators.',
  },
  {
    id: 'marine-division',
    title: 'Marine Division',
    image: '/categories/marine-division.jpg',
    desc: 'Marine-grade lifebuoys, immersion suits, horns, navigation aids, and deck equipment.',
  },
  {
    id: 'industrial-hoses-hose-couplings',
    title: 'Industrial Hoses & Hose Couplings',
    image: '/categories/industrial-hoses-hose-couplings.jpg',
    desc: 'Composite hoses, hydraulic hoses, quick disconnects, camlock couplings, and clamps.',
  },
  {
    id: 'lubricants-chemicals-division',
    title: 'Lubricants & Chemicals Division',
    image: '/categories/lubricants-chemicals.jpg',
    desc: 'Industrial engine oils, gear lubricants, greases, degreasers, and corrosion inhibitors.',
  },
  {
    id: 'tools-maintenance-division',
    title: 'Tools & Maintenance Division',
    image: '/categories/tools-maintenance.jpg',
    desc: 'Heavy-duty power tools, pneumatic tools, hand tool sets, torque wrenches, and toolboxes.',
  },
  {
    id: 'lifting-material-handling',
    title: 'Lifting & Material Handling',
    image: '/categories/lifting-material-handling.jpg',
    desc: 'Chain hoists, lever pullers, wire rope slings, web slings, shackles, and rigging hardware.',
  },
  {
    id: 'ppe-safety-equipment',
    title: 'Ppe & Safety Equipment',
    image: '/categories/ppe-safety-equpments.jpg',
    desc: 'Hard hats, safety spectacles, respirators, flame-retardant coveralls, and safety boots.',
  },
  {
    id: 'steel-structural-materials-division',
    title: 'Steel & Structural Materials Division',
    image: '/categories/steel-structural-materials-division.jpg',
    desc: 'Carbon steel pipes, stainless tubes, structural beams, steel grating, and flange plates.',
  },
  {
    id: 'power-system',
    title: 'Power System',
    image: '/categories/power-system.jpg',
    desc: 'Diesel power generators, mobile lighting towers, load banks, and distribution panels.',
  },
  {
    id: 'auxiliary-systems',
    title: 'Auxiliary Systems',
    image: '/categories/auxiliary-systems.jpg',
    desc: 'Rotary screw air compressors, air receivers, chemical injection skids, and storage tanks.',
  },
  {
    id: 'fasteners-division',
    title: 'Fasteners Division',
    image: '/categories/fasteners.jpg',
    desc: 'High-tensile hex bolts, heavy nuts, stud bolts, washers, and specialized alloy fasteners.',
  },
  {
    id: 'coatings-surface-protection',
    title: 'Coatings & Surface Protection',
    image: '/categories/coatings-surface-protection.png',
    desc: 'Marine epoxy paints, polyurethane topcoats, anti-fouling coatings, and surface primers.',
  },
  {
    id: 'substructure',
    title: 'Substructure',
    image: '/categories/substructure.png',
    desc: 'Heavy-duty cable ramps, rig floor safety mats, ditch covers, and ground protection systems.',
  },
  {
    id: 'pumps-motors',
    title: 'Pumps & Motors Division',
    image: '/categories/pumps-motors.jpg',
    desc: 'Centrifugal process pumps, submersible drainage pumps, industrial electric motors, and drives.',
  },
];

export default function ProductsPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '105px' }}>
        {/* Header Section */}
        <section style={{ padding: '40px 0 50px', textAlign: 'center' }}>
          <div
            className="container"
            style={{
              maxWidth: '1240px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#2e3191',
                marginBottom: '12px',
              }}
            >
              PRODUCTS
            </div>

            <h1
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.35rem)',
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.18,
                maxWidth: '980px',
                margin: '0 auto 20px',
                letterSpacing: '0.01em',
              }}
            >
              Industrial Products &amp; Engineering Supply Solutions
              <br />
              in Saudi Arabia
            </h1>

            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                color: '#64748b',
                fontSize: '0.88rem',
                lineHeight: 1.75,
                fontWeight: 400,
              }}
            >
              <p style={{ marginBottom: '12px' }}>
                Orient Energy Co. is a trusted industrial products supplier in Saudi Arabia delivering high-quality
                engineering materials, industrial equipment, maintenance products, safety solutions, marine supplies,
                and operational support systems for oil &amp; gas, marine, construction, manufacturing, infrastructure,
                energy, and heavy industrial sectors.
              </p>
              <p style={{ margin: 0 }}>
                We support industrial projects across Riyadh, Jeddah, Dammam, Jubail, Yanbu, and other major industrial
                regions across the Kingdom with reliable industrial supply solutions and quality-assured products.
              </p>
            </div>
          </div>
        </section>

        {/* 3-Column Products Grid */}
        <section style={{ paddingBottom: '90px' }}>
          <div
            className="container"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div className="product-cards-grid">
              {PRODUCT_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  id={cat.id}
                  className="product-card"
                  style={{ scrollMarginTop: '110px' }}
                >
                  {/* Card Image Area */}
                  <div className="product-card-img-wrap">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      width={420}
                      height={280}
                      className="product-card-img"
                      priority={false}
                    />
                  </div>

                  {/* Card Bottom Bar matching Screenshot: Green Title Bar + Navy Arrow Tab */}
                  <Link
                    href={`/contact?inquiry=${encodeURIComponent(cat.title)}`}
                    className="product-card-footer"
                    aria-label={`Inquire about ${cat.title}`}
                  >
                    <div className="product-card-footer-title">
                      <span>{cat.title}</span>
                    </div>
                    <div className="product-card-footer-action">
                      <span className="product-card-arrow-circle" aria-hidden="true">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Bottom Sourcing Quote Banner */}
            <div className="product-cta-box">
              <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: '1.9rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '12px',
                    lineHeight: 1.25,
                  }}
                >
                  Need Custom Specifications or Bulk Sourcing?
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.7,
                    marginBottom: '26px',
                  }}
                >
                  From Aramco-compliant valves and structural steels to certified offshore marine equipment and power systems,
                  our engineering procurement team is ready to quote on your exact Bill of Materials (BOM).
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
        .product-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .product-card {
          background-color: #ffffff;
          border: 1px solid #eef2f6;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
          border-color: #20b512;
        }

        .product-card-img-wrap {
          position: relative;
          width: 100%;
          height: 250px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.35s ease;
        }

        .product-card:hover .product-card-img {
          transform: scale(1.04);
        }

        .product-card-footer {
          display: flex;
          align-items: stretch;
          height: 48px;
          text-decoration: none;
          margin-top: auto;
          overflow: hidden;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .product-card-footer-title {
          flex: 1;
          background-color: #0ba044;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          text-align: center;
          color: #ffffff;
          font-family: 'Poppins', -apple-system, sans-serif;
          font-size: clamp(0.76rem, 1.05vw, 0.90rem);
          font-weight: 700;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: background-color 0.25s ease;
        }

        .product-card-footer-action {
          width: 52px;
          background-color: #172554;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 0.25s ease;
        }

        .product-card-arrow-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: #ffffff;
          color: #172554;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.90rem;
          font-weight: 800;
          line-height: 1;
          transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }

        .product-card:hover .product-card-footer-title {
          background-color: #088837;
        }

        .product-card:hover .product-card-footer-action {
          background-color: #0c173b;
        }

        .product-card:hover .product-card-arrow-circle {
          transform: translateX(2px);
          background-color: #ffffff;
          color: #0ba044;
        }

        .product-cta-box {
          margin-top: 70px;
          background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
          border-radius: 12px;
          padding: 50px 36px;
          text-align: center;
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
          .product-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 22px !important;
          }
        }

        @media (max-width: 640px) {
          .product-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .product-card-img-wrap {
            height: 220px !important;
          }
        }
      `}</style>
    </>
  );
}
