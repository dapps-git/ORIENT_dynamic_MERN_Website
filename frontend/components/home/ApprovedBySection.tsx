'use client';
import Image from 'next/image';

const APPROVED_LOGOS = [
  { src: '/logos/saudi-aramco.webp', alt: 'Saudi Aramco' },
  { src: '/logos/iktva.webp', alt: 'iktva' },
  { src: '/logos/lcgpa.webp', alt: 'LCGPA' },
  { src: '/logos/lcgpa-emblem.webp', alt: 'LCGPA Emblem' },
  { src: '/logos/iso-9001.webp', alt: 'ISO 9001' },
  { src: '/logos/iso-14001.webp', alt: 'ISO 14001' },
  { src: '/logos/ohsas-18001.webp', alt: 'OHSAS 18001' },
  { src: '/logos/iadc.webp', alt: 'IADC' },
  { src: '/logos/achilles.webp', alt: 'Achilles' },
];

export default function ApprovedBySection() {
  return (
    <section
      className="approved-by-section"
      style={{
        backgroundColor: '#ffffff',
        padding: '36px 0 40px',
        borderBottom: '1px solid #ECE7DE',
        position: 'relative',
      }}
      aria-label="Approved By and Certifications"
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section Heading Tag */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#0b7a3d',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '2px',
                backgroundColor: '#0b7a3d',
              }}
            />
            APPROVED BY
            <span
              style={{
                display: 'inline-block',
                width: '20px',
                height: '2px',
                backgroundColor: '#0b7a3d',
              }}
            />
          </div>
        </div>

        {/* Logos Grid: 9 in a row on desktop, strictly 3 in one row on mobile — NO square box, enlarged logos */}
        <div className="approved-logos-grid">
          {APPROVED_LOGOS.map((item, idx) => (
            <div key={idx} className="approved-logo-item" title={item.alt}>
              <Image
                src={item.src}
                alt={item.alt}
                width={180}
                height={90}
                quality={100}
                className="approved-logo-img"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .approved-logos-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 24px;
          align-items: center;
          justify-items: center;
          width: 100%;
        }

        .approved-logo-item {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px 6px;
          background: transparent;
          border: none;
          box-shadow: none;
          transition: transform 0.25s ease, filter 0.25s ease;
          cursor: pointer;
        }

        .approved-logo-item:hover {
          transform: translateY(-3px) scale(1.08);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
        }

        .approved-logo-img {
          max-height: 68px;
          max-width: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          filter: contrast(105%);
          transition: transform 0.25s ease;
        }

        @media (max-width: 1100px) and (min-width: 769px) {
          .approved-logos-grid {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 20px !important;
          }
          .approved-logo-item {
            height: 74px !important;
          }
          .approved-logo-img {
            max-height: 60px !important;
          }
        }

        /* Mobile View: Strictly 3 in One Row (3x3 grid) without any square box, enlarged */
        @media (max-width: 768px) {
          .approved-by-section {
            padding: 24px 0 28px !important;
          }

          .approved-logos-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px 12px !important;
          }

          .approved-logo-item {
            height: 62px !important;
            padding: 4px !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }

          .approved-logo-img {
            max-height: 52px !important;
            max-width: 95% !important;
          }
        }
      `}</style>
    </section>
  );
}
