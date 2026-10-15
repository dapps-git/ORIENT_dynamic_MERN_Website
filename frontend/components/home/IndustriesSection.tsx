'use client';
import Link from 'next/link';

const SECTORS = [
  {
    num: '01',
    title: 'Oil & Gas',
    desc: 'High-pressure valves, drilling equipment, fittings, chemicals, rig supplies & engineered solutions.',
    href: '/sectors#oil-gas',
    image: '/sectors/oil-gas.png',
  },
  {
    num: '02',
    title: 'Power & Energy',
    desc: 'Supplying electrical systems, industrial components, backup power solutions, and maintenance materials for power generation and transmission.',
    href: '/sectors#power-energy',
    image: '/sectors/power-energy.png',
  },
  {
    num: '03',
    title: 'Marine & Offshore',
    desc: 'Providing marine-grade equipment, offshore safety systems, corrosion-resistant products, and deck solutions designed for harsh environments.',
    href: '/sectors#marine-offshore',
    image: '/sectors/marine-offshore.png',
  },
  {
    num: '04',
    title: 'Construction & Infrastructure',
    desc: 'Delivering structural materials, industrial equipment, and project supply solutions for major infrastructure developments.',
    href: '/sectors#construction',
    image: '/sectors/construction.png',
  },
  {
    num: '05',
    title: 'Metals & Fabrication',
    desc: 'Supplying specialty metals, welding solutions, fabrication materials, and workshop equipment for industrial manufacturing operations.',
    href: '/sectors#metals-fabrication',
    image: '/sectors/metals-fabrication.png',
  },
  {
    num: '06',
    title: 'Industrial Maintenance',
    desc: 'Providing maintenance tools, lubricants, consumables, PPE, and spare parts to ensure uninterrupted operational efficiency.',
    href: '/sectors#maintenance',
    image: '/sectors/maintenance.jpeg',
  },
];

export default function IndustriesSection() {
  return (
    <section
      id="sectors"
      style={{
        padding: '90px 0 100px',
        backgroundColor: '#F0FFED',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top Header Row with Title and Action Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#20b512',
                marginBottom: '10px',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              INDUSTRIES WE SERVE
            </div>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.3rem, 3.4vw, 3rem)',
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.15,
                marginBottom: '14px',
              }}
            >
              Powering Industry,
              <br />
              Driving Progress.
            </h2>
            <p
              style={{
                fontSize: '0.92rem',
                color: '#4b5563',
                maxWidth: '560px',
                margin: 0,
                lineHeight: 1.6,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Orient Energy proudly supports a wide range of industries that operate in demanding and
              high-performance environments.
            </p>
          </div>

          <div>
            <Link
              href="/sectors"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: '#111827',
                border: '1.5px solid #111827',
                padding: '9px 24px',
                borderRadius: '0px',
                fontWeight: 500,
                fontSize: '0.80rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: "'Poppins', sans-serif",
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#111827';
              }}
            >
              View All Sectors
            </Link>
          </div>
        </div>

        {/* 6 Sector Cards Grid (3 columns, 2 rows, NO border radius) */}
        <div
          className="sectors-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {SECTORS.map((s) => (
            <Link
              key={s.num}
              href={s.href}
              className="sector-card-box"
              style={{
                position: 'relative',
                height: '360px',
                borderRadius: '0px', // Removed border radius per request
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '30px 28px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.22)';
                const img = e.currentTarget.querySelector('.sector-card-bg') as HTMLElement;
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                const img = e.currentTarget.querySelector('.sector-card-bg') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Background Image Layer */}
              <div
                className="sector-card-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url('${s.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 1,
                }}
              />

              {/* Dark Gradient Overlay for optimal legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.68) 45%, rgba(0, 0, 0, 0.28) 80%, rgba(0, 0, 0, 0.12) 100%)',
                  zIndex: 2,
                }}
              />

              {/* Text Content */}
              <div style={{ position: 'relative', zIndex: 3 }}>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: '1.45rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '10px',
                    lineHeight: 1.25,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.84rem',
                    color: 'rgba(255, 255, 255, 0.92)',
                    lineHeight: 1.55,
                    marginBottom: '14px',
                    margin: '0 0 14px 0',
                    fontWeight: 400,
                  }}
                >
                  {s.desc}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Read More
                  <span style={{ color: '#20b512', fontSize: '1rem', lineHeight: 1 }}>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .sectors-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .sectors-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
