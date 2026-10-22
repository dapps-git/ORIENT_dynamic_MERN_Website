'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const DESKTOP_SLIDES = [
  '/hero-bg-refinery-tanks.jpg',
  '/hero-bg.jpg',
  '/hero-bg-refinery-sunset.jpg',
  '/ima.webp',
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow every 3 seconds on laptop/desktop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DESKTOP_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="hero-main"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Laptop / Desktop Slideshow Background Layers */}
      <div className="hero-desktop-slides">
        {DESKTOP_SLIDES.map((slide, idx) => (
          <div
            key={slide}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${slide}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              imageRendering: '-webkit-optimize-contrast',
              opacity: currentSlide === idx ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 0,
            }}
          />
        ))}
      </div>

      {/* Mobile Background Layer (Uses portrait sunset image) */}
      <div
        className="hero-mobile-bg"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/hero-bg-mobile-sunset.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          imageRendering: '-webkit-optimize-contrast',
          zIndex: 0,
          display: 'none',
        }}
      />

      {/* Cinematic Contrast Overlay to eliminate glare and ensure crystal-clear image depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8, 20, 36, 0.44) 0%, rgba(8, 20, 36, 0.62) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: '1080px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Main Heading - Refined elegant size */}
        <h1
          className="hero-main-title"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(1.85rem, 3.0vw, 40px)',
            fontWeight: 500,
            lineHeight: 1.22,
            marginBottom: '16px',
            color: '#ffffff',
            maxWidth: '920px',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
          }}
        >
          <span className="hero-title-line hero-line-1">
            Powering Saudi Arabia&apos;s Industrial
          </span>{' '}
          <span className="hero-title-line hero-line-2">
            Future With Reliable Supply &amp;
          </span>{' '}
          <span className="hero-title-line hero-line-3">
            Engineering Solutions
          </span>
        </h1>

        {/* Subtitle description */}
        <p
          className="hero-subtitle-desc"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.86rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '620px',
            margin: '0 auto 26px',
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
            fontWeight: 400,
          }}
        >
          Orient Energy is a trusted industrial supply and engineering solutions company in Saudi Arabia,
          delivering certified materials, technical expertise, and global procurement support for
          Oil &amp; Gas, Power, Marine, Infrastructure, Manufacturing, and Heavy Industrial sectors.
        </p>

        {/* Action Buttons */}
        <div
          className="hero-btn-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          {/* CTA Buttons */}
          <Link
            href="/contact"
            className="hero-btn hero-btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: '#0056b3',
              color: '#ffffff',
              border: '1.5px solid #0056b3',
              padding: '10px 20px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 14px rgba(0, 86, 179, 0.35)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#004085';
              e.currentTarget.style.borderColor = '#004085';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.borderColor = '#0056b3';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Request a Quote
            <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>&rarr;</span>
          </Link>

          <Link
            href="/contact"
            className="hero-btn hero-btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: '1.5px solid rgba(255, 255, 255, 0.75)',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Slideshow Dots Indicator */}
      <div
        className="hero-indicators"
        style={{
          position: 'absolute',
          bottom: '26px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 3,
        }}
      >
        {DESKTOP_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: currentSlide === i ? '28px' : '8px',
              height: '7px',
              borderRadius: '4px',
              backgroundColor: currentSlide === i ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
              outline: 'none',
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-main-title {
            font-size: clamp(1.02rem, 4.3vw, 1.28rem) !important;
            line-height: 1.34 !important;
            max-width: 380px !important;
            margin: 0 auto 16px !important;
            padding: 0 10px !important;
          }
          .hero-title-line {
            display: block !important;
            white-space: nowrap !important;
          }
          .hero-desktop-slides,
          .hero-indicators {
            display: none !important;
          }
          .hero-mobile-bg {
            display: block !important;
          }
          .hero-subtitle-desc {
            display: none !important;
          }
          .hero-btn-row {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
          }
          .hero-btn {
            flex: 1 1 0 !important;
            height: 40px !important;
            padding: 0 8px !important;
            font-size: 10px !important;
            letter-spacing: 0.02em !important;
            white-space: nowrap !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            border-radius: 4px !important;
            box-sizing: border-box !important;
          }
          .hero-btn span {
            font-size: 0.8rem !important;
            margin-left: 2px !important;
          }
        }
      `}</style>
    </section>
  );
}
