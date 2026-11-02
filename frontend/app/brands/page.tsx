import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Our Valuable Brands — Orient Energy Trading Company',
  description:
    'Explore leading international industrial brands partnered with Orient Energy across Saudi Arabia, including Bearings and Filtration systems.',
};

// All 95 brand logos from /brandslogo/ public folder
const BRAND_LOGOS: string[] = [
  '/brandslogo/3M-01-1-768x777.png',
  '/brandslogo/3M-03-01-768x770.jpg',
  '/brandslogo/3M-03-02-768x769.jpg',
  '/brandslogo/3M-03-03-768x769.jpg',
  '/brandslogo/3M-03-04-768x769.jpg',
  '/brandslogo/3M-03-05-768x770.jpg',
  '/brandslogo/3M-03-06-768x769.jpg',
  '/brandslogo/3M-03-07-768x769.jpg',
  '/brandslogo/3M-03-09-768x770.jpg',
  '/brandslogo/3M-03-10-768x769.jpg',
  '/brandslogo/3M-03-12-768x769.jpg',
  '/brandslogo/3M-03-14-768x769.jpg',
  '/brandslogo/3M-03-15-768x769.jpg',
  '/brandslogo/3M-03-16-768x770.jpg',
  '/brandslogo/3M-03-17-768x769.jpg',
  '/brandslogo/3M-03-18-768x769.jpg',
  '/brandslogo/3M-03-19-768x769.jpg',
  '/brandslogo/3M-03-21-768x769.jpg',
  '/brandslogo/3M-03-22-768x770.jpg',
  '/brandslogo/3M-03-23-768x769.jpg',
  '/brandslogo/3M-03-24-768x769.jpg',
  '/brandslogo/3M-03-768x777.png',
  '/brandslogo/3M-04-768x777.png',
  '/brandslogo/3M-05-768x777.png',
  '/brandslogo/3M-06-1-768x777.png',
  '/brandslogo/3M-07-768x777.png',
  '/brandslogo/3M-08-768x777.png',
  '/brandslogo/3M-09-768x777.png',
  '/brandslogo/3M-10-768x777.png',
  '/brandslogo/3M-11-768x777.png',
  '/brandslogo/3M-12-768x777.png',
  '/brandslogo/3M-13-768x777.png',
  '/brandslogo/3M-14-768x777.png',
  '/brandslogo/3M-15-768x777.png',
  '/brandslogo/3M-16-1-768x777.png',
  '/brandslogo/3M-17-768x777.png',
  '/brandslogo/3M-18-1-768x777.png',
  '/brandslogo/3M-19-768x777.png',
  '/brandslogo/3M-20-768x777.png',
  '/brandslogo/3M-22-768x777.png',
  '/brandslogo/3M-23-768x777.png',
  '/brandslogo/3M-25-768x777.png',
  '/brandslogo/3M-27-768x777.png',
  '/brandslogo/3M-28-1-768x777.png',
  '/brandslogo/3M-32-768x777.png',
  '/brandslogo/3M-33-768x777.png',
  '/brandslogo/3M-34-768x777.png',
  '/brandslogo/3M-35-768x777.png',
  '/brandslogo/3M-37-768x777.png',
  '/brandslogo/3M-39-01-1-768x777.jpg',
  '/brandslogo/3M-39-02-1-768x777.jpg',
  '/brandslogo/3M-39-04-768x777.jpg',
  '/brandslogo/3M-39-06-768x777.jpg',
  '/brandslogo/3M-39-07-768x777.jpg',
  '/brandslogo/3M-39-08-768x777.jpg',
  '/brandslogo/3M-39-09-768x777.jpg',
  '/brandslogo/3M-39-10-768x777.jpg',
  '/brandslogo/3M-39-11-768x777.jpg',
  '/brandslogo/3M-39-14-768x777.jpg',
  '/brandslogo/3M-39-16-768x777.jpg',
  '/brandslogo/3M-39-17-768x777.jpg',
  '/brandslogo/3M-39-19-768x777.jpg',
  '/brandslogo/3M-39-20-768x777.jpg',
  '/brandslogo/3M-39-23-768x777.jpg',
  '/brandslogo/3M-39-24-768x777.jpg',
  '/brandslogo/3M-39-25-768x777.jpg',
  '/brandslogo/3M-39-26-768x777.jpg',
  '/brandslogo/3M-39-27-768x777.jpg',
  '/brandslogo/3M-39-28-768x777.jpg',
  '/brandslogo/3M-39-29-768x777.jpg',
  '/brandslogo/3M-39-30-768x777.jpg',
  '/brandslogo/3M-39-31-768x777.jpg',
  '/brandslogo/3M-39-32-768x777.jpg',
  '/brandslogo/3M-39-33-768x777.jpg',
  '/brandslogo/3M-39-34-768x777.jpg',
  '/brandslogo/3M-39-35-768x777.jpg',
  '/brandslogo/3M-39-36-768x777.jpg',
  '/brandslogo/3M-39-37-768x777.jpg',
  '/brandslogo/3M-39-38-768x777.jpg',
  '/brandslogo/3M-39-40-768x777.jpg',
  '/brandslogo/3M-39-41-768x777.jpg',
  '/brandslogo/3M-39-42-768x777.jpg',
  '/brandslogo/3M-39-43-768x777.jpg',
  '/brandslogo/3M-39-44-768x777.jpg',
  '/brandslogo/3M-39-46-768x777.jpg',
  '/brandslogo/3M-39-48-768x777.jpg',
  '/brandslogo/3M-39-49-768x777.jpg',
  '/brandslogo/3M-41-768x777.png',
  '/brandslogo/3M-43-768x777%20(1).png',
  '/brandslogo/3M-45-768x777.png',
  '/brandslogo/3M-48-768x777.png',
  '/brandslogo/3M-49-768x777.png',
  '/brandslogo/3M-50-1-768x777.png',
  '/brandslogo/logo-hh-01-768x769.jpg',
  '/brandslogo/logo-hh-02-768x769.jpg',
];

interface BrandItem {
  _id?: string;
  name: string;
  category: 'general' | 'bearings' | 'filterings';
  logo: string;
  websiteUrl?: string;
  description?: string;
  order?: number;
}

const FALLBACK_BEARINGS: BrandItem[] = [
  { name: 'SKF', category: 'bearings', logo: '/brands/skf-logo.svg', websiteUrl: 'https://www.skf.com', description: 'World leader in rolling bearings, seals, mechatronics, and lubrication systems.' },
  { name: 'FAG (Schaeffler)', category: 'bearings', logo: '/brands/fag-logo.svg', websiteUrl: 'https://www.schaeffler.com', description: 'Precision ball and roller bearings for heavy industry, automotive, and aerospace.' },
  { name: 'NSK', category: 'bearings', logo: '/brands/nsk-logo.svg', websiteUrl: 'https://www.nsk.com', description: 'High-precision motion & control industrial ball bearings and linear guides.' },
  { name: 'TIMKEN', category: 'bearings', logo: '/brands/timken-logo.svg', websiteUrl: 'https://www.timken.com', description: 'Engineered tapered roller bearings, alloy steels, and power transmission components.' },
  { name: 'NTN Bearings', category: 'bearings', logo: '/brands/ntn-logo.svg', websiteUrl: 'https://www.ntnglobal.com', description: 'Global manufacturing of precision bearings, constant velocity joints, and precision equipment.' },
  { name: 'KOYO (JTEKT)', category: 'bearings', logo: '/brands/koyo-logo.svg', websiteUrl: 'https://koyo.jtekt.co.jp/en/', description: 'Heavy machinery, automotive, and high-performance industrial bearings.' },
  { name: 'NACHI', category: 'bearings', logo: '/brands/nachi-logo.svg', websiteUrl: 'https://www.nachi-fujikoshi.co.jp/eng/', description: 'High-speed deep groove ball bearings and spherical roller bearings.' },
  { name: 'INA', category: 'bearings', logo: '/brands/ina-logo.svg', websiteUrl: 'https://www.schaeffler.com', description: 'Needle roller bearings, linear guidance systems, and engine components.' },
];

const FALLBACK_FILTERINGS: BrandItem[] = [
  { name: 'Donaldson Filtration Solutions', category: 'filterings', logo: '/brands/donaldson-logo.svg', websiteUrl: 'https://www.donaldson.com', description: 'Global leader in engine and industrial filtration systems for heavy equipment and oil & gas.' },
  { name: 'Parker Filtration', category: 'filterings', logo: '/brands/parker-filtration-logo.svg', websiteUrl: 'https://www.parker.com', description: 'Advanced hydraulic, fuel, lubrication, and process filtration solutions.' },
  { name: 'Fleetguard', category: 'filterings', logo: '/brands/fleetguard-logo.svg', websiteUrl: 'https://www.cumminsfiltration.com', description: 'Heavy-duty Cummins filtration for lube, fuel, air, and coolant systems.' },
  { name: 'MANN-FILTER', category: 'filterings', logo: '/brands/mann-filter-logo.svg', websiteUrl: 'https://www.mann-filter.com', description: 'Premium OEM and aftermarket oil, air, and hydraulic filters from Mann+Hummel.' },
  { name: 'Baldwin Filters', category: 'filterings', logo: '/brands/baldwin-logo.svg', websiteUrl: 'https://www.baldwinfilter.com', description: 'Heavy-duty protection filters for construction, mining, agriculture, and power generation.' },
  { name: 'Pall Corporation', category: 'filterings', logo: '/brands/pall-logo.svg', websiteUrl: 'https://www.pall.com', description: 'High-technology filtration, separation, and purification solutions.' },
  { name: 'HYDAC', category: 'filterings', logo: '/brands/hydac-logo.svg', websiteUrl: 'https://www.hydac.com', description: 'Hydraulic filtration systems, fluid conditioning, and contamination monitoring.' },
  { name: 'MAHLE Industry', category: 'filterings', logo: '/brands/mahle-logo.svg', websiteUrl: 'https://www.mahle.com', description: 'Industrial filtration for process fluids, hydraulic power, and dust collection.' },
];

async function fetchDynamicBrands(): Promise<BrandItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/brands?active=true`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch {
    // Backend offline fallback
  }
  return [];
}

export default async function BrandsPage() {
  const dynamicBrands = await fetchDynamicBrands();

  // Dynamic + Fallback Bearings
  const dynamicBearings = dynamicBrands.filter((b) => b.category === 'bearings');
  const bearingsList = dynamicBearings.length > 0 ? dynamicBearings : FALLBACK_BEARINGS;

  // Dynamic + Fallback Filterings
  const dynamicFilterings = dynamicBrands.filter((b) => b.category === 'filterings');
  const filteringsList = dynamicFilterings.length > 0 ? dynamicFilterings : FALLBACK_FILTERINGS;

  // Dynamic General Brands added via admin
  const dynamicGeneral = dynamicBrands.filter((b) => b.category === 'general');

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
            {/* =========================================================
                SECTION 1: ALL VALUABLE BRANDS (Original 95 Static + New)
                ========================================================= */}
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
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
                OUR PARTNERS
              </div>

              <h1
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.85rem, 3.0vw, 2.6rem)',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
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

            {/* Brands Logo Grid - Only Clean Brand Logos */}
            <div className="brands-logo-grid">
              {BRAND_LOGOS.map((logoPath, i) => (
                <div key={`static-${i}`} className="brand-logo-card">
                  <div className="brand-logo-wrapper">
                    <Image
                      src={logoPath}
                      alt="Brand Partner Logo"
                      width={180}
                      height={90}
                      className="brand-logo-img"
                      loading={i < 24 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              ))}

              {/* Dynamic General Brands added via Admin Panel */}
              {dynamicGeneral.map((brand, idx) => (
                <div key={brand._id || `gen-${idx}`} className="brand-logo-card">
                  <div className="brand-logo-wrapper">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={180}
                      height={90}
                      className="brand-logo-img"
                      unoptimized={brand.logo.endsWith('.svg')}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* =========================================================
                SECTION 2: BEARINGS BRANDS
                ========================================================= */}
            <div className="brand-category-divider">
              <div className="divider-line" />
            </div>

            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '60px auto 40px' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#005a9c',
                  marginBottom: '10px',
                }}
              >
                PRECISION MOTION &amp; ROTATING EQUIPMENT
              </div>

              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.75rem, 2.6vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}
              >
                Bearings
              </h2>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#64748b',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                High-precision deep groove ball bearings, spherical roller bearings, tapered roller bearings,
                pillow blocks, and linear motion guides sourced directly from the world’s elite manufacturers.
              </p>
            </div>

            <div className="brands-category-grid">
              {bearingsList.map((brand, i) => (
                <div key={brand._id || `bearing-${i}`} className="category-brand-card">
                  <div className="category-logo-box">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Bearings Logo`}
                      className="category-brand-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="category-brand-info">
                    <div className="category-brand-title">{brand.name}</div>
                    {brand.description && (
                      <p className="category-brand-desc">{brand.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* =========================================================
                SECTION 3: FILTERINGS BRANDS
                ========================================================= */}
            <div className="brand-category-divider">
              <div className="divider-line" />
            </div>

            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '60px auto 40px' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#0b7a3d',
                  marginBottom: '10px',
                }}
              >
                HEAVY INDUSTRIAL &amp; HYDRAULIC FILTRATION
              </div>

              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.75rem, 2.6vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '14px',
                  letterSpacing: '-0.01em',
                }}
              >
                Filterings
              </h2>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#64748b',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Heavy-duty hydraulic oil filters, fuel water separators, industrial air intake cartridges,
                lube filters, and process fluid filtration solutions built for extreme industrial uptime.
              </p>
            </div>

            <div className="brands-category-grid">
              {filteringsList.map((brand, i) => (
                <div key={brand._id || `filtering-${i}`} className="category-brand-card">
                  <div className="category-logo-box">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Filtration Logo`}
                      className="category-brand-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="category-brand-info">
                    <div className="category-brand-title">{brand.name}</div>
                    {brand.description && (
                      <p className="category-brand-desc">{brand.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Sourcing Inquiry Box */}
            <div
              style={{
                marginTop: '80px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '48px 32px',
                textAlign: 'center',
                borderRadius: '0px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '10px',
                  letterSpacing: '0.01em',
                }}
              >
                Looking for a specific manufacturer, bearing size, or OEM filter part?
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
                Submit your inquiry and our engineering sourcing team will quote promptly.
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
        .brands-logo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 16px;
        }

        .brand-logo-card {
          background-color: #ffffff;
          border: 1px solid #eaedf1;
          border-radius: 0px;
          height: 110px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.22s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .brand-logo-card:hover {
          border-color: #20b512;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(32, 181, 18, 0.12);
        }

        .brand-logo-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-logo-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          transition: transform 0.22s ease;
        }

        .brand-logo-card:hover .brand-logo-img {
          transform: scale(1.04);
        }

        /* Divider */
        .brand-category-divider {
          margin-top: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .divider-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #cbd5e1 50%, transparent 100%);
        }

        /* Dedicated Category Grids */
        .brands-category-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .category-brand-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.25s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .category-brand-card:hover {
          border-color: #0b7a3d;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .category-logo-box {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 12px;
        }

        .category-brand-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: transform 0.2s ease;
        }

        .category-brand-card:hover .category-brand-img {
          transform: scale(1.05);
        }

        .category-brand-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .category-brand-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
        }

        .category-brand-desc {
          font-size: 0.76rem;
          color: #64748b;
          line-height: 1.45;
          margin: 0;
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

        @media (max-width: 1024px) {
          .brands-category-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .brands-logo-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .brand-logo-card {
            height: 95px;
            padding: 10px 12px;
          }
          .brands-category-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 480px) {
          .brands-logo-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .brand-logo-card {
            height: 90px;
            padding: 8px 10px;
          }
          .brands-category-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
}
