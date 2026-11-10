'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Brand logos from public/brandslogo/ folder
const MARQUEE_LOGOS: string[] = [
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
  '/brandslogo/logo-hh-01-768x769.jpg',
  '/brandslogo/logo-hh-02-768x769.jpg',
];

export default function BrandsMarqueeSection() {
  const [logos, setLogos] = useState<string[]>(MARQUEE_LOGOS);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://orient-dynamic-mern-website.onrender.com/api"}/brands?active=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const dynamicLogos = data.data.map((b: any) => b.logo).filter(Boolean);
          const all = Array.from(new Set([...dynamicLogos, ...MARQUEE_LOGOS]));
          setLogos(all);
        }
      })
      .catch(() => {});
  }, []);

  // Duplicate for seamless infinite train scroll
  const marqueeItems = [...logos, ...logos];

  return (
    <section
      className="brands-marquee-section"
      style={{
        padding: '16px 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden',
        position: 'relative',
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
            width: '80px',
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
            width: '80px',
            height: '100%',
            background: 'linear-gradient(270deg, #ffffff 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        <div className="marquee-train">
          {marqueeItems.map((logoPath, idx) => (
            <Link
              key={`${logoPath}-${idx}`}
              href="/brands"
              className="marquee-item"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 28px',
                flexShrink: 0,
                textDecoration: 'none',
                opacity: 0.9,
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  height: '56px',
                  width: '135px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={logoPath}
                  alt="Partner Brand Logo"
                  width={135}
                  height={56}
                  style={{
                    maxHeight: '52px',
                    maxWidth: '125px',
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
          animation: trainScroll 35s linear infinite;
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

        @media (max-width: 768px) {
          .brands-marquee-section {
            padding: 10px 0 !important;
          }
          .marquee-item {
            padding: 4px 16px !important;
          }
          .marquee-item > div {
            height: 42px !important;
            width: 100px !important;
          }
          .marquee-item img {
            max-height: 38px !important;
            max-width: 90px !important;
          }
        }
      `}</style>
    </section>
  );
}
