'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const DESKTOP_SLIDES = [
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
          style={{
            fontFamily: '"Cormorant Garamond", Amiri, serif',
            fontSize: 'clamp(1.9rem, 3.1vw, 42px)',
            fontWeight: 600,
            lineHeight: 1.18,
            marginBottom: '16px',
            color: '#ffffff',
            maxWidth: '900px',
            letterSpacing: '0.01em',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
          }}
        >
          Powering Saudi Arabia&apos;s Industrial Future With Reliable Supply &amp; Engineering Solutions
        </h1>

        {/* Subtitle description */}
        <p
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#0056b3',
              color: '#ffffff',
              border: '1.5px solid #0056b3',
              padding: '10px 24px',
              borderRadius: '0px',
              fontWeight: 600,
              fontSize: '12.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 14px rgba(0, 86, 179, 0.35)',
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
            <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>&rarr;</span>
          </Link>

          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: '1.5px solid rgba(255, 255, 255, 0.75)',
              color: '#ffffff',
              padding: '10px 24px',
              borderRadius: '0px',
              fontWeight: 600,
              fontSize: '12.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(8px)',
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

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-desktop-slides,
          .hero-indicators {
            display: none !important;
          }
          .hero-mobile-bg {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
