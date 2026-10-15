import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Our Valuable Brands — Orient Energy Trading Company',
  description:
    'Explore leading international industrial brands partnered with Orient Energy across Saudi Arabia, including Dropsafe, Schneider Electric, DEWALT, Parker, Lincoln Electric, and more.',
};

const FEATURED_BRANDS = [
  { name: 'Dropsafe', logo: '/brands/image copy.png', category: 'Drop Prevention' },
  { name: 'Schneider Electric', logo: '/brands/image copy 2.png', category: 'Electrical & Automation' },
  { name: 'Fleetguard', logo: '/brands/image copy 3.png', category: 'Filtration Systems' },
  { name: 'DEWALT', logo: '/brands/image copy 4.png', category: 'Power Tools' },
  { name: 'Klauke', logo: '/brands/image copy 5.png', category: 'Electrical Connection' },
  { name: 'Lincoln Electric', logo: '/brands/image copy 6.png', category: 'Welding & Cutting' },
  { name: 'Dapro', logo: '/brands/image copy 7.png', category: 'PPE & Workwear' },
  { name: 'Parker', logo: '/brands/image copy 8.png', category: 'Motion & Control' },
  { name: 'Curtiss-Wright', logo: '/brands/image copy 9.png', category: 'Engineered Products' },
  { name: 'TOTAL Tools', logo: '/brands/image copy 10.png', category: 'Industrial Tools' },
  { name: 'Bryant', logo: '/brands/image.png', category: 'Heating & Cooling' },
  { name: '3M Industrial', logo: null, category: 'Abrasives & Safety' },
  { name: 'WÜRTH', logo: null, category: 'Fasteners & Assembly' },
  { name: 'Whitmore', logo: null, category: 'Specialty Lubricants' },
  { name: 'Balluff', logo: null, category: 'Sensors & Automation' },
  { name: 'Balon Valves', logo: null, category: 'Valves & Flow' },
  { name: 'Böhler Welding', logo: null, category: 'Welding Consumables' },
  { name: 'Bray Controls', logo: null, category: 'Flow Control' },
  { name: 'Honeywell', logo: null, category: 'Safety & Automation' },
  { name: 'ABB', logo: null, category: 'Power & Electrification' },
  { name: 'Eaton', logo: null, category: 'Power Management' },
  { name: 'SKF', logo: null, category: 'Bearings & Seals' },
  { name: 'Festo', logo: null, category: 'Pneumatics' },
  { name: 'Beko Technologies', logo: null, category: 'Compressed Air' },
];

export default function BrandsPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '110px' }}>
        <section style={{ padding: '40px 0 90px' }}>
          <div
            className="container"
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Header Section */}
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#20b512',
                  marginBottom: '10px',
                }}
              >
                BRANDS
              </div>

              <h1
                style={{
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '16px',
                  lineHeight: 1.18,
                  letterSpacing: '0.01em',
                }}
              >
                Our Valuable Brands
              </h1>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#6b7280',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Orient Energy supplies certified industrial equipment, mechanical systems, electrical supplies,
                and specialized consumables from the world’s most trusted global manufacturers.
              </p>
            </div>

            {/* Brands Multi-Column Grid */}
            <div
              className="brands-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              {FEATURED_BRANDS.map((brand, i) => (
                <div key={i} className="brand-card">
                  {brand.logo ? (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '75px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={160}
                        height={65}
                        style={{
                          maxWidth: '150px',
                          maxHeight: '65px',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: '75px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#071138',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {brand.name}
                      </span>
                    </div>
                  )}

                  <span
                    style={{
                      fontSize: '0.74rem',
                      color: '#9ca3af',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {brand.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom CTA Box */}
            <div
              style={{
                marginTop: '70px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '44px 32px',
                textAlign: 'center',
                borderRadius: '0px',
              }}
            >
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: '1.65rem',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '10px',
                  letterSpacing: '0.01em',
                }}
              >
                Looking for a specific manufacturer or OEM part?
              </h3>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: '#6b7280',
                  maxWidth: '640px',
                  margin: '0 auto 24px',
                  lineHeight: 1.6,
                }}
              >
                Our international procurement network connects with hundreds of certified industrial manufacturers.
                Submit your inquiry and our sourcing team will quote promptly.
              </p>
              <Link href="/contact" className="brand-cta-btn">
                Request Brand Quote &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .brand-card {
          background-color: #ffffff;
          border: 1px solid #f0f1f4;
          border-radius: 0px;
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 160px;
          text-align: center;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        .brand-card:hover {
          border-color: #20b512;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(32, 181, 18, 0.12);
        }
        .brand-cta-btn {
          display: inline-block;
          background-color: #20b512;
          color: #ffffff;
          padding: 13px 32px;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 0px;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }
        .brand-cta-btn:hover {
          background-color: #15800d;
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}
