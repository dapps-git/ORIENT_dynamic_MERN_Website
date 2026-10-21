'use client';
import { useRef } from 'react';
import Link from 'next/link';

interface CategoryItem {
  name: string;
  slug: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'Tools & Maintenance',
    slug: 'tools-maintenance',
    image: '/categories/tools-maintenance.jpg',
    href: '/products?category=tools-maintenance',
  },
  {
    name: 'Auxiliary Systems',
    slug: 'auxiliary-systems',
    image: '/categories/auxiliary-systems.jpg',
    href: '/products?category=auxiliary-systems',
  },
  {
    name: 'Coatings & Surface Protection Division',
    slug: 'coatings-surface-protection',
    image: '/categories/coatings-surface-protection.png',
    href: '/products?category=coatings-surface-protection',
  },
  {
    name: 'Electrical Division',
    slug: 'electrical-ups-systems',
    image: '/categories/electrical-ups-systems.jpg',
    href: '/products?category=electrical-ups-systems',
  },
  {
    name: 'Fasteners Division',
    slug: 'fasteners',
    image: '/categories/fasteners.jpg',
    href: '/products?category=fasteners',
  },
  {
    name: 'Fittings',
    slug: 'all-fittings',
    image: '/categories/all-fittings.jpeg',
    href: '/products?category=all-fittings',
  },
  {
    name: 'Industrial Consumables & PPE Division',
    slug: 'industrial-consumables',
    image: '/categories/industrial-consumables.jpg',
    href: '/products?category=industrial-consumables',
  },
  {
    name: 'Industrial Hoses & Hose Couplings',
    slug: 'industrial-hoses-hose-couplings',
    image: '/categories/industrial-hoses-hose-couplings.jpg',
    href: '/products?category=industrial-hoses-hose-couplings',
  },
  {
    name: 'Lifting & Material Handling',
    slug: 'lifting-material-handling',
    image: '/categories/lifting-material-handling.jpg',
    href: '/products?category=lifting-material-handling',
  },
  {
    name: 'Marine Division',
    slug: 'marine-division',
    image: '/categories/marine-division.jpg',
    href: '/products?category=marine-division',
  },
  {
    name: 'Mechanical Supply Division',
    slug: 'mechanical-supply-division',
    image: '/categories/mechanical-supply-division.png',
    href: '/products?category=mechanical-supply-division',
  },
  {
    name: 'Power System',
    slug: 'power-system',
    image: '/categories/power-system.jpg',
    href: '/products?category=power-system',
  },
  {
    name: 'PPE & Safety Equpments',
    slug: 'ppe-safety-equpments',
    image: '/categories/ppe-safety-equpments.jpg',
    href: '/products?category=ppe-safety-equpments',
  },
  {
    name: 'Pumps & Motors',
    slug: 'pumps-motors',
    image: '/categories/pumps-motors.jpg',
    href: '/products?category=pumps-motors',
  },
  {
    name: 'Steel & Structural Materials Division',
    slug: 'steel-structural-materials-division',
    image: '/categories/steel-structural-materials-division.jpg',
    href: '/products?category=steel-structural-materials-division',
  },
  {
    name: 'Substructure',
    slug: 'substructure',
    image: '/categories/substructure.png',
    href: '/products?category=substructure',
  },
  {
    name: 'Welding Division',
    slug: 'welding-safety',
    image: '/categories/welding-safety.jpg',
    href: '/products?category=welding-safety',
  },
];

export default function CategoriesSection({ categories }: { categories?: any[] } = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="categories"
      className="categories-section"
      style={{
        padding: '75px 0 28px',
        backgroundColor: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top Header Row with Title and Navigation Controls */}
        <div
          className="cat-header-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '44px',
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
                color: '#2e3191',
                marginBottom: '10px',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              OUR PRODUCT EXPERTISE
            </div>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.3rem, 3.4vw, 3rem)',
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Thousands of Industrial Products.{' '}
              <br />
              <span style={{ color: '#20b512' }}>One Reliable Supplier.</span>
            </h2>
          </div>

          {/* Slider Prev / Next Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous categories"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2e3191';
                e.currentTarget.style.borderColor = '#2e3191';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#111827';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next categories"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2e3191';
                e.currentTarget.style.borderColor = '#2e3191';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#111827';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Horizontal Carousel Container */}
        <div
          ref={scrollRef}
          className="cat-slider-track"
          style={{
            display: 'flex',
            gap: '22px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '16px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              className="cat-slider-card"
              style={{
                flex: '0 0 calc(25% - 17px)',
                minWidth: '270px',
                maxWidth: '300px',
                height: '380px',
                borderRadius: '0px',
                position: 'relative',
                overflow: 'hidden',
                scrollSnapAlign: 'start',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                backgroundColor: '#f1f5f9',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.2)';
                const img = e.currentTarget.querySelector('.cat-bg-layer') as HTMLElement;
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                const img = e.currentTarget.querySelector('.cat-bg-layer') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Image Background */}
              <div
                className="cat-bg-layer"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url('${cat.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transition: 'transform 0.5s ease',
                  zIndex: 1,
                }}
              />

              {/* Dark Readability Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.52) 50%, rgba(0, 0, 0, 0.28) 100%)',
                  zIndex: 2,
                }}
              />

              {/* Card Bottom Content */}
              <div
                className="cat-card-content"
                style={{
                  position: 'relative',
                  zIndex: 3,
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <h3
                  className="cat-card-title"
                  style={{
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: '1.32rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    marginBottom: '14px',
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {cat.name}
                </h3>

                <Link
                  href={cat.href}
                  className="cat-card-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#20b512',
                    color: '#ffffff',
                    padding: '5px 13px',
                    borderRadius: '0px',
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: "'Poppins', sans-serif",
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(32, 181, 18, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#19990e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#20b512';
                  }}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cat-slider-track::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1024px) {
          .cat-slider-card {
            flex: 0 0 calc(33.333% - 15px) !important;
            min-width: 220px !important;
          }
        }
        @media (max-width: 768px) {
          .categories-section {
            padding: 34px 0 12px !important;
          }
          .cat-header-row {
            margin-bottom: 20px !important;
          }
          .cat-slider-track {
            gap: 12px !important;
            padding-bottom: 6px !important;
          }
          .cat-slider-card {
            flex: 0 0 calc(50% - 6px) !important;
            min-width: 0 !important;
            max-width: none !important;
            height: 250px !important;
          }
          .cat-card-title {
            font-size: 1rem !important;
            margin-bottom: 10px !important;
          }
        }
        @media (max-width: 520px) {
          .categories-section {
            padding: 28px 0 10px !important;
          }
          .cat-header-row {
            margin-bottom: 16px !important;
          }
          .cat-slider-track {
            gap: 10px !important;
            padding-bottom: 4px !important;
          }
          .cat-slider-card {
            flex: 0 0 calc(50% - 5px) !important;
            min-width: 0 !important;
            max-width: none !important;
            height: 220px !important;
          }
          .cat-card-content {
            padding: 14px 12px !important;
          }
          .cat-card-title {
            font-size: 0.88rem !important;
            line-height: 1.25 !important;
            margin-bottom: 8px !important;
          }
          .cat-card-btn {
            padding: 4px 10px !important;
            font-size: 0.60rem !important;
          }
        }
        @media (max-width: 380px) {
          .cat-slider-card {
            height: 200px !important;
          }
          .cat-card-title {
            font-size: 0.80rem !important;
          }
        }
      `}</style>
    </section>
  );
}
