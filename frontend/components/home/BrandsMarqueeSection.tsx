'use client';
import Image from 'next/image';
import Link from 'next/link';

const BRAND_LOGOS = [
  { name: 'Dropsafe', logo: '/brands/image copy.png' },
  { name: 'Schneider Electric', logo: '/brands/image copy 2.png' },
  { name: 'Fleetguard', logo: '/brands/image copy 3.png' },
  { name: 'DEWALT', logo: '/brands/image copy 4.png' },
  { name: 'Klauke', logo: '/brands/image copy 5.png' },
  { name: 'Lincoln Electric', logo: '/brands/image copy 6.png' },
  { name: 'Dapro', logo: '/brands/image copy 7.png' },
  { name: 'Parker', logo: '/brands/image copy 8.png' },
  { name: 'Curtiss-Wright', logo: '/brands/image copy 9.png' },
  { name: 'TOTAL Tools', logo: '/brands/image copy 10.png' },
  { name: 'Bryant', logo: '/brands/image.png' },
  { name: 'Zamil Offshore', logo: '/about/client-v2-zamil.jpg' },
  { name: 'CNPC', logo: '/about/client-v2-cnpc.jpg' },
  { name: 'COSL', logo: '/about/client-v2-cosl.jpg' },
  { name: 'Sinopec', logo: '/about/client-v2-sinopec.jpg' },
  { name: 'Sipchem', logo: '/about/client-v2-sipchem.jpg' },
  { name: 'Saipem', logo: '/about/client-v2-saipem.jpg' },
];

export default function BrandsMarqueeSection() {
  // Duplicate for seamless infinite train scroll
  const marqueeItems = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section
      style={{
        padding: '32px 0 36px',
        backgroundColor: '#FAF7F2',
        borderTop: '1px solid #ECE7DE',
        borderBottom: '1px solid #ECE7DE',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
      }}
      aria-label="Partner Brand Logos"
    >
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#64748b',
          }}
        >
          TRUSTED GLOBAL BRANDS &amp; MANUFACTURERS
        </span>
      </div>

      {/* Marquee Train Track */}
      <div className="marquee-wrapper" style={{ overflow: 'hidden', position: 'relative', width: '100%' }}>
        {/* Left & Right Fade Gradients */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '80px',
            height: '100%',
            background: 'linear-gradient(90deg, #FAF7F2 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80px',
            height: '100%',
            background: 'linear-gradient(270deg, #FAF7F2 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        <div className="marquee-train">
          {marqueeItems.map((brand, idx) => (
            <Link
              key={`${brand.name}-${idx}`}
              href="/brands"
              title={brand.name}
              className="marquee-item"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                flexShrink: 0,
                textDecoration: 'none',
                filter: 'grayscale(100%) opacity(0.72)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%) opacity(1)';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%) opacity(0.72)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  height: '32px',
                  width: '100px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={100}
                  height={32}
                  style={{
                    maxHeight: '30px',
                    maxWidth: '95px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-wrapper {
          display: flex;
          align-items: center;
          user-select: none;
        }

        .marquee-train {
          display: flex;
          align-items: center;
          width: max-content;
          animation: trainScroll 30s linear infinite;
        }

        .marquee-train:hover {
          animation-play-state: paused;
        }

        @keyframes trainScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
