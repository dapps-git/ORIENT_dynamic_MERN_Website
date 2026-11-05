'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
    id: 'camlock-type-e',
    title: 'Aluminium Camlock Type E',
    slug: 'aluminium-camlock-type-e',
    category: 'Pipe Fittings and Flanges',
    image: '/uploads/camlock-type-e.png',
    href: '/products/pipe-fittings-flanges',
  },
  {
    id: 'camlock-type-d',
    title: 'Aluminium Camlock Type D',
    slug: 'aluminium-camlock-type-d',
    category: 'Pipe Fittings and Flanges',
    image: '/uploads/camlock-type-d.png',
    href: '/products/pipe-fittings-flanges',
  },
  {
    id: 'camlock-type-b',
    title: 'Aluminium Camlock Type B',
    slug: 'aluminium-camlock-type-b',
    category: 'Pipe Fittings and Flanges',
    image: '/uploads/camlock-type-b.png',
    href: '/products/pipe-fittings-flanges',
  },
  {
    id: 'camlock-type-a',
    title: 'Aluminium Camlock Type A',
    slug: 'aluminium-camlock-type-a',
    category: 'Pipe Fittings and Flanges',
    image: '/uploads/camlock-type-a.png',
    href: '/products/pipe-fittings-flanges',
  },
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

// Grouping into chunks
const DESKTOP_SLIDES = [
  SHOWCASE_PRODUCTS.slice(0, 4),
  SHOWCASE_PRODUCTS.slice(4, 8),
];

const MOBILE_SLIDES = [
  SHOWCASE_PRODUCTS.slice(0, 2),
  SHOWCASE_PRODUCTS.slice(2, 4),
  SHOWCASE_PRODUCTS.slice(4, 6),
  SHOWCASE_PRODUCTS.slice(6, 8),
];

export default function FeaturedProductsShowcase() {
  const [desktopSlide, setDesktopSlide] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Touch gesture state
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const nextDesktop = useCallback(() => {
    setDesktopSlide((prev) => (prev + 1) % DESKTOP_SLIDES.length);
  }, []);

  const prevDesktop = useCallback(() => {
    setDesktopSlide((prev) => (prev - 1 + DESKTOP_SLIDES.length) % DESKTOP_SLIDES.length);
  }, []);

  const nextMobile = useCallback(() => {
    setMobileSlide((prev) => (prev + 1) % MOBILE_SLIDES.length);
  }, []);

  const prevMobile = useCallback(() => {
    setMobileSlide((prev) => (prev - 1 + MOBILE_SLIDES.length) % MOBILE_SLIDES.length);
  }, []);

  // Universal next / prev triggers
  const handleNext = () => {
    nextDesktop();
    nextMobile();
  };

  const handlePrev = () => {
    prevDesktop();
    prevMobile();
  };

  // Auto slide when not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDesktopSlide((prev) => (prev + 1) % DESKTOP_SLIDES.length);
      setMobileSlide((prev) => (prev + 1) % MOBILE_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Touch & Hand Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchStartX.current = clientX;
    touchEndX.current = clientX;
    touchStartY.current = clientY;
    touchEndY.current = clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchEndX.current = clientX;
    touchEndY.current = clientY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    // Trigger slide switch when horizontal swipe > 35px
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swiped left -> next slide
        nextMobile();
        nextDesktop();
      } else {
        // Swiped right -> prev slide
        prevMobile();
        prevDesktop();
      }
    }
  };

  return (
    <section
      id="featured-products"
      className="featured-products-showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        padding: '28px 0 38px',
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
        {/* Top Header Row with < > Slide Arrows on the right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '4px',
                height: '22px',
                backgroundColor: '#20b512',
                borderRadius: '2px',
                display: 'inline-block',
              }}
            />
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#071138',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Featured Industrial Products
            </h3>
          </div>

          {/* Slider Arrow Controls < > */}
          <div
            className="showcase-arrow-controls"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous products"
              className="slider-nav-btn"
              style={{
                width: '34px',
                height: '34px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1e293b',
                transition: 'all 0.2s ease',
                padding: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next products"
              className="slider-nav-btn"
              style={{
                width: '34px',
                height: '34px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1e293b',
                transition: 'all 0.2s ease',
                padding: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* =========================================================
            1. DESKTOP / LAPTOP VIEW (4 in ONE ROW with Slide Animation)
            ========================================================= */}
        <div className="featured-showcase-desktop">
          <div className="desktop-carousel-viewport" style={{ overflow: 'hidden', width: '100%' }}>
            <div
              className="desktop-carousel-track"
              style={{
                display: 'flex',
                width: '100%',
                transform: `translateX(-${desktopSlide * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {DESKTOP_SLIDES.map((slideProducts, slideIdx) => (
                <div
                  key={slideIdx}
                  style={{
                    flex: '0 0 100%',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <div className="featured-desktop-grid">
                    {slideProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={product.href}
                        className="product-box-card"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1.5px solid #dbe2ea',
                          borderRadius: '0px',
                          padding: '20px 18px 22px',
                          display: 'flex',
                          flexDirection: 'column',
                          textDecoration: 'none',
                          color: 'inherit',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
                          position: 'relative',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                          height: '100%',
                        }}
                      >
                        {/* Centered Product Image Showcase */}
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

                        {/* Product Title Centered/Aligned cleanly */}
                        <h4 className="product-box-title" title={product.title}>
                          {product.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            2. MOBILE VIEW (2 per Row with Hand Swipe + <> Navigation)
            ========================================================= */}
        <div
          className="featured-showcase-mobile"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          style={{
            touchAction: 'pan-y',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {/* Viewport for smooth 2-card carousel */}
          <div className="mobile-carousel-viewport">
            <div
              className="mobile-carousel-track"
              style={{
                transform: `translateX(-${mobileSlide * 100}%)`,
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
                          borderRadius: '0px',
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
                        {/* Centered Image */}
                        <div className="product-box-img-wrap-mobile">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={160}
                            height={120}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              display: 'block',
                            }}
                            className="product-box-thumb"
                          />
                        </div>

                        {/* Title on Mobile */}
                        <h4
                          className="product-box-title-mobile"
                          title={product.title}
                        >
                          {product.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator for Mobile */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
            }}
          >
            {MOBILE_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMobileSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: mobileSlide === idx ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: mobileSlide === idx ? '#20b512' : '#cbd5e1',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
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
          gap: 18px;
          width: 100%;
        }

        .product-box-card {
          border-radius: 0px !important;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease !important;
        }

        .product-box-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 28px rgba(7, 17, 56, 0.1) !important;
          border-color: #2e3191 !important;
        }

        .product-box-title {
          font-family: 'Poppins', sans-serif !important;
          font-size: 0.92rem !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.02em !important;
          color: #1e293b !important;
          line-height: 1.35 !important;
          min-height: 40px !important;
          margin: 10px 0 0 0 !important;
          text-align: center !important;
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
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px 0 6px;
          background-color: #ffffff;
          overflow: hidden;
        }

        .product-box-thumb {
          transition: transform 0.35s ease !important;
        }

        .product-box-card:hover .product-box-thumb {
          transform: scale(1.06) !important;
        }

        .slider-nav-btn:hover {
          background-color: #f1f5f9 !important;
          border-color: #071138 !important;
          color: #071138 !important;
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
          border-radius: 0px !important;
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
          gap: 10px;
          width: 100%;
        }

        .product-box-title-mobile {
          font-family: 'Poppins', sans-serif !important;
          font-size: 0.75rem !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.01em !important;
          color: #1e293b !important;
          line-height: 1.25 !important;
          min-height: 32px !important;
          margin: 6px 0 0 0 !important;
          text-align: center !important;
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
          margin: 2px 0 4px;
          background-color: #ffffff;
          overflow: hidden;
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
