'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ProductSearchModal from '@/components/ProductSearchModal';

const SECTORS_DROPDOWN = [
  { label: 'Oil & Gas', href: '/sectors/oil-gas' },
  { label: 'Marine & Offshore', href: '/sectors/marine-offshore' },
  { label: 'Construction & Infrastructure', href: '/sectors/construction' },
  { label: 'Manufacturing Industry', href: '/sectors/manufacturing' },
  { label: 'Energy & Power Sector', href: '/sectors/power-energy' },
  { label: 'Heavy Engineering', href: '/sectors/heavy-engineering' },
  { label: 'Industrial Maintenance', href: '/sectors/maintenance' },
  { label: 'Fabrication & Welding', href: '/sectors/metals-fabrication' },
  { label: 'Water & Utility Projects', href: '/sectors/water-utility' },
];

const PRODUCTS_DROPDOWN = [
  { label: 'Pipe Fittings and Flanges', href: '/products/pipe-fittings-and-flanges' },
  { label: 'Welding Division', href: '/products/welding-division' },
  { label: 'Electrical Division', href: '/products/electrical-division' },
  { label: 'Lifting & Material Handling', href: '/products/lifting-material-handling' },
  { label: 'Marine Division', href: '/products/marine-division' },
  { label: 'Steel & Structural Materials Division', href: '/products/steel-structural-materials-division' },
  { label: 'Coatings & Surface Protection Division', href: '/products/coatings-surface-protection' },
  { label: 'Fasteners Division', href: '/products/fasteners-division' },
  { label: 'PPE & Safety Equipment', href: '/products/ppe-safety-equipment' },
  { label: 'Bearings', href: '/products/bearings' },
  { label: 'Filters', href: '/products/filters' },
];

function NavbarInner() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === '/';
  const isLight = !isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global Ctrl+K / Cmd+K shortcut for search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Fixed Header Wrapper */}
      <header
        className="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        {/* Main Clean White Navbar */}
        <nav
          className={`navbar${scrolled ? ' scrolled' : ''}`}
          style={{
            position: 'relative',
            width: '100%',
            height: scrolled ? '64px' : '72px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: scrolled
              ? '0 8px 30px rgba(0, 0, 0, 0.08)'
              : '0 2px 10px rgba(0, 0, 0, 0.04)',
            transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
            padding: '0 24px',
          }}
          role="navigation"
          aria-label="Main navigation"
        >
        <div
          className="navbar__inner"
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            width: '100%',
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo with Zero Background & Authentic Brand Colors */}
          <Link
            href="/"
            aria-label="Orient Energy Trading Company"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              background: 'transparent',
            }}
          >
            <Image
              src="/logo.png"
              alt="Orient Energy Trading Company"
              width={220}
              height={50}
              className="navbar__logo-img"
              style={{
                height: scrolled ? '42px' : '46px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                background: 'transparent',
                filter: 'none',
                transition: 'all 0.3s ease',
              }}
              priority
            />
          </Link>

          {/* Desktop Nav Items */}
          <ul
            className="navbar__nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            role="menubar"
          >
            {/* Home */}
            <li role="none">
              <Link href="/" className={`nav-link${pathname === '/' ? ' active' : ''}`}>
                Home
              </Link>
            </li>

            {/* About Us */}
            <li role="none">
              <Link href="/about" className={`nav-link${pathname === '/about' ? ' active' : ''}`}>
                About Us
              </Link>
            </li>

            {/* Sectors Dropdown */}
            <li
              role="none"
              style={{ position: 'relative' }}
              onMouseEnter={() => setSectorsOpen(true)}
              onMouseLeave={() => setSectorsOpen(false)}
            >
              <Link
                href="/sectors"
                className={`nav-link${pathname.startsWith('/sectors') ? ' active' : ''}`}
              >
                Sectors
                <span style={{ fontSize: '0.68rem', opacity: 0.85, marginLeft: '3px' }}>∨</span>
              </Link>

              {sectorsOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    padding: 0,
                    minWidth: '240px',
                    boxShadow: '0 14px 40px rgba(0, 0, 0, 0.12)',
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  {SECTORS_DROPDOWN.map((item, idx) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{
                        display: 'block',
                        padding: '10px 18px',
                        color: '#1e293b',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderBottom: idx === SECTORS_DROPDOWN.length - 1 ? 'none' : '1px solid #f1f5f9',
                        transition: 'all 0.18s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.color = '#20b512';
                        e.currentTarget.style.paddingLeft = '22px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = '#1e293b';
                        e.currentTarget.style.paddingLeft = '18px';
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Products Dropdown */}
            <li
              role="none"
              style={{ position: 'relative' }}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              {(productsOpen || pathname.startsWith('/products')) && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '12px',
                    width: '34px',
                    height: '3px',
                    backgroundColor: '#20b512',
                    borderRadius: '2px',
                  }}
                />
              )}

              <Link
                href="/products"
                className={`nav-link${pathname.startsWith('/products') ? ' active' : ''}`}
                style={{
                  color: productsOpen || pathname.startsWith('/products') ? '#20b512' : undefined,
                }}
              >
                Category
                <span style={{ fontSize: '0.68rem', opacity: 0.9, marginLeft: '4px', fontWeight: 700 }}>
                  {productsOpen ? '∧' : '∨'}
                </span>
              </Link>

              {productsOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    padding: 0,
                    minWidth: '280px',
                    boxShadow: '0 16px 42px rgba(0, 0, 0, 0.14)',
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  {PRODUCTS_DROPDOWN.map((item, idx) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{
                        display: 'block',
                        padding: '10px 18px',
                        color: '#1e293b',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderBottom: idx === PRODUCTS_DROPDOWN.length - 1 ? 'none' : '1px solid #f1f5f9',
                        transition: 'all 0.18s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.color = '#20b512';
                        e.currentTarget.style.paddingLeft = '22px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = '#1e293b';
                        e.currentTarget.style.paddingLeft = '18px';
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Brands */}
            <li role="none">
              <Link
                href="/brands"
                className={`nav-link${pathname.startsWith('/brands') ? ' active' : ''}`}
              >
                Brands
              </Link>
            </li>

            {/* Blog */}
            <li role="none">
              <Link
                href="/blog"
                className={`nav-link${pathname.startsWith('/blog') ? ' active' : ''}`}
              >
                Blog
              </Link>
            </li>

            {/* Contact us */}
            <li role="none">
              <Link
                href="/contact"
                className={`nav-link${pathname === '/contact' ? ' active' : ''}`}
              >
                Contact us
              </Link>
            </li>

            {/* Desktop Search Icon Button */}
            <li role="none" style={{ marginLeft: '4px' }}>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                title="Search"
                className="navbar-search-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease',
                  padding: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#071138"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="navbar-search-icon"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </li>
          </ul>

          {/* Mobile Right Controls: Minimalist Clean Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Mobile Hamburger Button */}
            <button
              id="navbar-burger"
              className="navbar__burger"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                flexDirection: 'column',
                gap: '5.5px',
                padding: '6px',
                zIndex: 10006,
              }}
            >
              <span
                style={{
                  width: 25,
                  height: 2.4,
                  background: open ? '#20b512' : '#071138',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s ease',
                  transform: open ? 'translateY(7.9px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  width: 25,
                  height: 2.4,
                  background: open ? '#20b512' : '#071138',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s ease',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: 25,
                  height: 2.4,
                  background: open ? '#20b512' : '#071138',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s ease',
                  transform: open ? 'translateY(-7.9px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>
    </header>

      {/* Modern Slide Drawer with Backdrop Overlay (Not Full View) */}
      {open && (
        <>
          {/* Backdrop Blur Overlay - click outside to close */}
          <div
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 17, 56, 0.55)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 10004,
              animation: 'drawerFadeIn 0.22s ease',
            }}
          />

          {/* Right-Side Slide Drawer (320px, max 85vw) */}
          <div
            ref={menuRef}
            className="mobile-slide-drawer"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '320px',
              maxWidth: '85vw',
              height: '100dvh',
              backgroundColor: '#ffffff',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.28)',
              zIndex: 10005,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              animation: 'drawerSlideRight 0.26s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Top Header with Arabic & English Corporate Title and Clean Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px 16px',
                borderBottom: '1px solid #f1f5f9',
                backgroundColor: '#ffffff',
                flexShrink: 0,
              }}
            >
              <div>
                <div
                  style={{
                    color: '#0b7a3d',
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    lineHeight: 1.35,
                    direction: 'rtl',
                    textAlign: 'left',
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  شركة اورين للطاقة التجارية
                </div>
                <div
                  style={{
                    color: '#071138',
                    fontWeight: 700,
                    fontSize: '0.90rem',
                    lineHeight: 1.35,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Orient Energy Trading Company
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1e293b',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation Links List (Active Green Pill, Inactive Clean Line Dividers & Chevrons) */}
            <div
              style={{
                padding: '16px 16px 8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                flex: 1,
              }}
            >
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Sectors', href: '/sectors' },
                { label: 'Category', href: '/products' },
                { label: 'Brands', href: '/brands' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact Us', href: '/contact' },
              ].map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href || pathname.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={
                      isActive
                        ? {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px 16px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '10px',
                            color: '#15803d',
                            fontWeight: 700,
                            fontSize: '1.02rem',
                            textDecoration: 'none',
                            margin: '3px 0',
                            fontFamily: "'Montserrat', sans-serif",
                            transition: 'background-color 0.2s ease',
                          }
                        : {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '15px 16px',
                            backgroundColor: 'transparent',
                            color: '#0f172a',
                            fontWeight: 600,
                            fontSize: '1.02rem',
                            textDecoration: 'none',
                            borderBottom: '1px solid #f1f5f9',
                            fontFamily: "'Montserrat', sans-serif",
                            transition: 'background-color 0.2s ease, color 0.2s ease',
                          }
                    }
                  >
                    <span>{item.label}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isActive ? '#15803d' : '#94a3b8'}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Branding (Matching Exact User Mockup Footer) */}
            <div
              style={{
                marginTop: 'auto',
                padding: '24px 16px 28px',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #f8fafc',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  color: '#64748b',
                  fontSize: '0.80rem',
                  fontWeight: 500,
                  fontFamily: "'Montserrat', sans-serif",
                  marginBottom: '3px',
                }}
              >
                Orient Energy Trading Company
              </div>
              <div
                style={{
                  color: '#94a3b8',
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Powering Industry. Delivering Excellence.
              </div>
            </div>
          </div>
        </>
      )}

      {/* Clean Interactive Product Search Modal */}
      <ProductSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <style>{`
        .navbar-search-btn:hover {
          border-color: #20b512 !important;
          background-color: rgba(32, 181, 18, 0.12) !important;
          box-shadow: 0 3px 12px rgba(32, 181, 18, 0.22) !important;
        }
        .navbar-search-btn:hover .navbar-search-icon {
          stroke: #20b512 !important;
        }
        .navbar .nav-link {
          color: #071138 !important;
          font-weight: 450 !important;
          font-size: 0.95rem !important;
          letter-spacing: 0.01em !important;
          transition: all 0.2s ease;
        }
        .navbar .nav-link:hover {
          color: #20b512 !important;
        }
        .navbar .nav-link.active {
          color: #20b512 !important;
          font-weight: 550 !important;
        }
        @keyframes drawerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes drawerSlideRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 500;
          color: #1e293b;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.15s ease;
        }
        .mobile-nav-item:hover {
          background-color: #f8fafc;
          color: #2e3191;
          padding-left: 16px;
        }
        .mobile-nav-item.active {
          color: #2e3191;
          font-weight: 700;
          background-color: rgba(46, 49, 145, 0.08);
        }
        @media (max-width: 1024px) {
          .site-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            z-index: 1000 !important;
            transform: none !important;
          }
          .navbar__nav {
            display: none !important;
          }
          .navbar-search-btn {
            display: none !important;
          }
          .navbar-wa-mobile,
          .navbar-search-mobile {
            display: none !important;
          }
          .navbar,
          nav.navbar,
          .navbar.scrolled,
          nav.navbar.scrolled {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            transform: none !important;
            height: 62px !important;
            min-height: 62px !important;
            max-height: 62px !important;
            padding: 0 20px !important;
            border-radius: 0 !important;
            border: none !important;
            border-bottom: 1px solid #e2e8f0 !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
            background: #ffffff !important;
          }
          .navbar.scrolled,
          nav.navbar.scrolled {
            background: #ffffff !important;
            border-bottom: 1px solid #e2e8f0 !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
          }
          .navbar__inner {
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
          }
          .navbar__logo-img,
          .navbar .navbar__logo-img,
          .navbar.scrolled .navbar__logo-img {
            height: 42px !important;
            max-height: 42px !important;
            width: auto !important;
            background: transparent !important;
          }
          .navbar__burger {
            display: flex !important;
          }
          .navbar__burger span {
            background: #071138 !important;
          }
          .navbar__burger[aria-expanded="true"] span {
            background: #20b512 !important;
          }
        }
        @media (max-width: 768px) {
          .site-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            z-index: 1000 !important;
            transform: none !important;
          }
          .navbar,
          nav.navbar {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 60px !important;
            min-height: 60px !important;
            max-height: 60px !important;
            padding: 0 16px !important;
            background: #ffffff !important;
            border: none !important;
            border-bottom: 1px solid #e2e8f0 !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
            border-radius: 0 !important;
          }
          .navbar.scrolled,
          nav.navbar.scrolled {
            background: #ffffff !important;
            border-bottom: 1px solid #e2e8f0 !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
          }
          .navbar__inner {
            padding: 0 !important;
            height: 60px !important;
          }
          .navbar__logo-img,
          .navbar .navbar__logo-img,
          .navbar.scrolled .navbar__logo-img {
            height: 40px !important;
            max-height: 40px !important;
            width: auto !important;
            background: transparent !important;
          }
          .navbar__burger {
            display: flex !important;
            padding: 6px !important;
            gap: 5px !important;
          }
          .navbar__burger span {
            width: 24px !important;
            height: 2.4px !important;
            background: #071138 !important;
          }
          .navbar__burger[aria-expanded="true"] span {
            background: #20b512 !important;
          }
        }
        @media (max-width: 480px) {
          .navbar,
          nav.navbar {
            height: 58px !important;
            min-height: 58px !important;
            max-height: 58px !important;
            padding: 0 12px !important;
          }
          .navbar.scrolled,
          nav.navbar.scrolled {
            height: 58px !important;
            min-height: 58px !important;
            max-height: 58px !important;
          }
          .navbar__inner {
            height: 58px !important;
          }
          .navbar__logo-img,
          .navbar .navbar__logo-img,
          .navbar.scrolled .navbar__logo-img {
            height: 38px !important;
            max-height: 38px !important;
            width: auto !important;
          }
        }
      `}</style>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
