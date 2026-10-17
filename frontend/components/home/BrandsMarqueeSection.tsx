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
        padding: '18px 0 20px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
      }}
      aria-label="Partner Brand Logos"
    >
      {/* Marquee Train Track */}
      <div className="marquee-wrapper" style={{ overflow: 'hidden', position: 'relative', width: '100%' }}>
        {/* Left & Right Fade Gradients */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '90px',
            height: '100%',
            background: 'linear-gradient(90deg, #ffffff 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '90px',
            height: '100%',
            background: 'linear-gradient(270deg, #ffffff 0%, transparent 100%)',
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
                padding: '8px 36px',
                flexShrink: 0,
                textDecoration: 'none',
                opacity: 0.92,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.92';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  height: '62px',
                  width: '165px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={165}
                  height={62}
                  style={{
                    maxHeight: '56px',
                    maxWidth: '155px',
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

        .marquee-item::after {
          content: none !important;
          display: none !important;
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
