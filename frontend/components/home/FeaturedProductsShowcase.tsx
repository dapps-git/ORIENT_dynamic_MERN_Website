'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ShowcaseProduct {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  href: string;
}

const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'prod-camlock',
    title: 'Aluminum Camlock Couplings',
    slug: 'aluminum-camlock-couplings',
    category: 'Pipe Fittings and Flanges',
    image: '/uploads/aluminumcamlock.webp',
    href: '/product/aluminum-camlock-couplings',
  },
  {
    id: 'prod-butterfly',
    title: 'Industrial Butterfly Valve',
    slug: 'butterfly-valve',
    category: 'Pipe Fittings and Flanges',
    image: '/uploads/butterflyvalve.jpg',
    href: '/product/butterfly-valve',
  },
  {
    id: 'prod-carbonsteel',
    title: 'Carbon Steel Seamless & ERW Pipes',
    slug: 'carbon-steel-seamless-erw-pipes',
    category: 'Pipe Fittings and Flanges',
    image: '/uploads/carbonsteel.webp',
    href: '/product/carbon-steel-seamless-erw-pipes',
  },
  {
    id: 'prod-victor',
    title: 'Victor Oxygen Regulator',
    slug: 'victor-oxygen-regulator',
    category: 'Welding Division',
    image: '/uploads/victoroxygenregulator.jpg',
    href: '/product/victor-oxygen-regulator',
  },
];

const MOBILE_SLIDES = [
  [SHOWCASE_PRODUCTS[0], SHOWCASE_PRODUCTS[1]],
  [SHOWCASE_PRODUCTS[2], SHOWCASE_PRODUCTS[3]],
];

export default function FeaturedProductsShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide animation for mobile view every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        // Swiped left -> show next 2
        setActiveSlide(1);
      } else {
        // Swiped right -> show first 2
        setActiveSlide(0);
      }
    }
    // Resume auto-sliding after a short delay
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section
      id="featured-products"
      className="featured-products-showcase"
      style={{
        backgroundColor: '#ffffff',
        padding: '32px 0 44px',
        borderBottom: '1px solid #ECE7DE',
        position: 'relative',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        {/* =========================================================
            1. DESKTOP / LAPTOP VIEW (4 in ONE ROW - Distinct Card Boxes)
            ========================================================= */}
        <div className="featured-showcase-desktop">
          <div className="featured-desktop-grid">
            {SHOWCASE_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="product-box-card"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #dbe2ea',
                  borderRadius: '14px',
                  padding: '22px 20px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
                  position: 'relative',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                {/* 1. Category / Product Title at Top (Standard Title Case, clean typography) */}
                <h4 className="product-box-title" title={product.title}>
                  {product.title}
                </h4>

                {/* 2. Centered Product Image Showcase */}
                <div className="product-box-img-wrap">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={240}
                    height={190}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                    className="product-box-thumb"
                    priority
                  />
                </div>

                {/* 3. Bottom-Left Circular Dark Navy Blue Button with Right Arrow */}
                <div className="product-box-btn-row">
                  <div className="product-box-circle-btn">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =========================================================
            2. MOBILE VIEW (Show 2 Cards in One Row + Auto Swipe for Rest 2)
            ========================================================= */}
        <div
          className="featured-showcase-mobile"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Viewport for smooth 2-card carousel */}
          <div className="mobile-carousel-viewport">
            <div
              className="mobile-carousel-track"
              style={{
                transform: `translateX(-${activeSlide * 100}%)`,
              }}
            >
              {MOBILE_SLIDES.map((slideProducts, slideIdx) => (
                <div key={slideIdx} className="mobile-carousel-slide">
                  <div className="mobile-grid-2col">
                    {slideProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={product.href}
                        className="product-box-card product-box-card-mobile"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1.5px solid #dbe2ea',
                          borderRadius: '12px',
                          padding: '14px 10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          textDecoration: 'none',
                          color: 'inherit',
                          boxShadow: '0 3px 12px rgba(0, 0, 0, 0.05)',
                          position: 'relative',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                        }}
                      >
                        {/* Reduced Font Size on Mobile */}
                        <h4
                          className="product-box-title-mobile"
                          title={product.title}
                        >
                          {product.title}
                        </h4>

                        {/* Centered Image */}
                        <div className="product-box-img-wrap-mobile">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={160}
                            height={115}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              display: 'block',
                            }}
                            className="product-box-thumb"
                          />
                        </div>

                        {/* Bottom Arrow Button */}
                        <div className="product-box-btn-row">
                          <div className="product-box-circle-btn product-box-circle-btn-mobile">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators for Mobile Auto-Swipe */}
          <div className="mobile-carousel-dots">
            {MOBILE_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                className={`carousel-dot ${activeSlide === idx ? 'carousel-dot-active' : ''}`}
                onClick={() => {
                  setActiveSlide(idx);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ================= DESKTOP STYLES ================= */
        .featured-showcase-desktop {
          display: block;
          width: 100%;
        }

        .featured-desktop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }

        .product-box-card {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease !important;
        }

        .product-box-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 14px 30px rgba(7, 17, 56, 0.12) !important;
          border-color: #2e3191 !important;
        }

        .product-box-title {
          font-family: 'Poppins', sans-serif !important;
          font-size: 0.95rem !important;
          font-weight: 600 !important;
          text-transform: none !important;
          letter-spacing: 0.01em !important;
          color: #0f172a !important;
          line-height: 1.35 !important;
          min-height: 42px !important;
          margin: 0 0 10px 0 !important;
          text-align: left !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          transition: color 0.2s ease !important;
        }

        .product-box-card:hover .product-box-title {
          color: #2e3191 !important;
        }

        .product-box-img-wrap {
          position: relative;
          width: 100%;
          height: 175px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px 0 14px;
          background-color: #ffffff;
          overflow: hidden;
        }

        .product-box-thumb {
          transition: transform 0.35s ease !important;
        }

        .product-box-card:hover .product-box-thumb {
          transform: scale(1.06) !important;
        }

        .product-box-btn-row {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .product-box-circle-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #071138;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 3px 10px rgba(7, 17, 56, 0.2);
        }

        .product-box-card:hover .product-box-circle-btn {
          background-color: #20b512 !important;
          transform: scale(1.08) !important;
          box-shadow: 0 4px 14px rgba(32, 181, 18, 0.45) !important;
        }

        .product-box-circle-btn svg {
          transition: transform 0.2s ease;
        }

        .product-box-card:hover .product-box-circle-btn svg {
          transform: translateX(3px);
        }

        /* ================= MOBILE STYLES ================= */
        .featured-showcase-mobile {
          display: none;
          width: 100%;
          position: relative;
        }

        .mobile-carousel-viewport {
          width: 100%;
          overflow: hidden;
          border-radius: 14px;
        }

        .mobile-carousel-track {
          display: flex;
          width: 100%;
          transition: transform 0.55s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform;
        }

        .mobile-carousel-slide {
          flex: 0 0 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 2px;
        }

        .mobile-grid-2col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 100%;
        }

        .product-box-title-mobile {
          font-family: 'Poppins', sans-serif !important;
          font-size: 0.78rem !important;
          font-weight: 600 !important;
          text-transform: none !important;
          letter-spacing: 0.01em !important;
          color: #0f172a !important;
          line-height: 1.25 !important;
          min-height: 32px !important;
          margin: 0 0 6px 0 !important;
          text-align: left !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
        }

        .product-box-img-wrap-mobile {
          position: relative;
          width: 100%;
          height: 115px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2px 0 10px;
          background-color: #ffffff;
          overflow: hidden;
        }

        .product-box-circle-btn-mobile {
          width: 28px !important;
          height: 28px !important;
        }

        /* Dots indicator */
        .mobile-carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
        }

        .carousel-dot {
          height: 7px;
          width: 8px;
          border-radius: 999px;
          background-color: #cbd5e1;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .carousel-dot-active {
          width: 24px;
          background-color: #20b512;
        }

        /* ================= RESPONSIVE SWITCH ================= */
        @media (max-width: 768px) {
          .featured-showcase-desktop {
            display: none !important;
          }
          .featured-showcase-mobile {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .featured-showcase-desktop {
            display: block !important;
          }
          .featured-showcase-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
