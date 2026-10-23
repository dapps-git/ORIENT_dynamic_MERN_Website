'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ProductSearchModal from '@/components/ProductSearchModal';

const SECTORS_DROPDOWN = [
  { label: 'Oil & Gas', href: '/sectors#oil-gas' },
  { label: 'Marine & Offshore', href: '/sectors#marine-offshore' },
  { label: 'Construction & Infrastructure', href: '/sectors#construction' },
  { label: 'Manufacturing Industry', href: '/sectors#manufacturing' },
  { label: 'Energy & Power Sector', href: '/sectors#power-energy' },
  { label: 'Heavy Engineering', href: '/sectors#heavy-engineering' },
  { label: 'Industrial Maintenance', href: '/sectors#maintenance' },
  { label: 'Fabrication & Welding', href: '/sectors#metals-fabrication' },
  { label: 'Water & Utility Projects', href: '/sectors#water-utility' },
];

const PRODUCTS_DROPDOWN = [
  { label: 'Mechanical Supply Division', href: '/products/mechanical-division' },
  { label: 'Welding Division', href: '/products/welding-division' },
  { label: 'Electrical Division', href: '/products/electrical-division' },
  { label: 'Lifting & Material Handling', href: '/products/lifting-material-handling' },
  { label: 'Power System', href: '/products/power-system' },
  { label: 'Auxiliary Systems', href: '/products/auxiliary-systems' },
  { label: 'Marine Division', href: '/products/marine-division' },
  { label: 'Steel & Structural Materials Division', href: '/products/steel-structural-materials-division' },
  { label: 'Coatings & Surface Protection Division', href: '/products/coatings-surface-protection' },
  { label: 'Pumps & Motors', href: '/products/pumps-motors' },
  { label: 'Fasteners Division', href: '/products/fasteners-division' },
  { label: 'Substructure', href: '/products/substructure' },
];

function NavbarInner() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
      {/* Top Navbar Sectors Marquee (Clean Train Track: No pinned SECTORS text, no green star) */}
      <div
        className="sectors-topbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '32px',
          backgroundColor: '#071138',
          backgroundImage: 'linear-gradient(90deg, #060e2e 0%, #0a1945 50%, #060e2e 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 1002,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Marquee Train Track Container with Gradient Edge Fades */}
        <div
          className="sectors-train-container"
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            maskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
          }}
        >
          <div className="sectors-train-track">
            {[...SECTORS_DROPDOWN, ...SECTORS_DROPDOWN].map((sector, index) => (
              <Link
                key={`${sector.label}-${index}`}
                href={sector.href}
                className="sectors-train-item"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  fontFamily: "'Montserrat', sans-serif",
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{sector.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Curved Floating Navbar */}
      <nav
        className={`navbar navbar--curved${scrolled ? ' scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          height: '64px',
          width: 'calc(100% - 36px)',
          maxWidth: '1340px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FAF7F2',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '9999px',
          border: '1px solid #ECE7DE',
          boxShadow: scrolled
            ? '0 12px 35px -5px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.05)'
            : '0 8px 30px -4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '0 8px',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="navbar__inner"
          style={{
            maxWidth: '100%',
            margin: '0 auto',
            width: '100%',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Orient Energy Trading Company"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo.png"
              alt="Orient Energy Trading Company"
              width={180}
              height={42}
              className="navbar__logo-img"
              style={{
                height: '38px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
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
                Products
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

            {/* Desktop Search Icon Button - Just Search Icon, that's all */}
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
                  backgroundColor: '#ffffff',
                  border: '1px solid #ECE7DE',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.2s ease',
                  padding: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#20b512"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </li>
          </ul>

          {/* Mobile Right Controls: Mobile Search Button + Mobile Burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Mobile Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="navbar-search-mobile"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                backgroundColor: '#ffffff',
                border: '1px solid #ECE7DE',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease',
                padding: 0,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#20b512"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

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
                gap: '4px',
                padding: '4px',
                zIndex: 10002,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 2,
                  background: open ? '#20b512' : '#1e293b',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s ease',
                  transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  width: 20,
                  height: 2,
                  background: open ? '#20b512' : '#1e293b',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s ease',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: 20,
                  height: 2,
                  background: open ? '#20b512' : '#1e293b',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s ease',
                  transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Compact Dropdown Menu (No full-view overlay, sleek card under navbar) */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            aria-label="Close menu backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 17, 56, 0.32)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 998,
              animation: 'menuFadeIn 0.18s ease',
            }}
          />
          <div
            ref={menuRef}
            className="mobile-dropdown-card"
            style={{
              position: 'fixed',
              top: '78px',
              left: '12px',
              right: '12px',
              maxWidth: '380px',
              margin: '0 auto',
              backgroundColor: '#FAF7F2',
              borderRadius: '16px',
              border: '1px solid #ECE7DE',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.16)',
              zIndex: 999,
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              animation: 'menuSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About Us' },
              { href: '/sectors', label: 'Sectors' },
              { href: '/products', label: 'Products' },
              { href: '/brands', label: 'Brands' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact us' },
            ].map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#20b512' : '#1e293b',
                    backgroundColor: isActive ? 'rgba(32, 181, 18, 0.08)' : 'transparent',
                    textDecoration: 'none',
                    fontFamily: "'Montserrat', sans-serif",
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: isActive ? '#20b512' : '#94a3b8', fontSize: '0.80rem' }}>&rarr;</span>
                </Link>
              );
            })}

            <div style={{ marginTop: '6px', paddingTop: '8px', borderTop: '1px solid #ECE7DE' }}>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  backgroundColor: '#20b512',
                  color: '#ffffff',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.80rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: '0 3px 12px rgba(32, 181, 18, 0.3)',
                }}
              >
                Get A Quote &rarr;
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Clean Interactive Product Search Modal */}
      <ProductSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <style>{`
        @keyframes sectorsTrainTrack {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .sectors-train-track {
          display: flex;
          align-items: center;
          gap: 40px;
          width: max-content;
          animation: sectorsTrainTrack 38s linear infinite;
          will-change: transform;
        }
        .sectors-train-track:hover {
          animation-play-state: paused;
        }
        .sectors-train-item:hover {
          color: #20b512 !important;
          text-shadow: 0 0 10px rgba(32, 181, 18, 0.4);
        }
        .navbar-search-btn:hover {
          border-color: #20b512 !important;
          background-color: #f8fafc !important;
          box-shadow: 0 3px 10px rgba(32, 181, 18, 0.15) !important;
        }
        .navbar-search-mobile:hover {
          border-color: #20b512 !important;
          background-color: #f8fafc !important;
        }
        .navbar .nav-link {
          color: #555e6d !important;
          font-weight: 500 !important;
          font-size: 0.85rem !important;
        }
        .navbar .nav-link:hover {
          color: #111827 !important;
        }
        .navbar .nav-link.active {
          color: #111827 !important;
          font-weight: 700 !important;
        }
        @keyframes menuFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes menuSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (max-width: 1024px) {
          .navbar__nav {
            display: none !important;
          }
          .navbar__burger {
            display: flex !important;
          }
          .navbar-search-mobile {
            display: inline-flex !important;
          }
          .navbar.navbar--curved,
          .navbar.navbar--curved.scrolled {
            top: 36px !important;
          }
          .sectors-topbar {
            height: 28px !important;
          }
        }
        @media (max-width: 768px) {
          .navbar.navbar--curved,
          .navbar.navbar--curved.scrolled,
          nav.navbar.navbar--curved,
          nav.navbar.navbar--curved.scrolled {
            top: 30px !important;
            width: calc(100% - 20px) !important;
            height: 44px !important;
            min-height: 44px !important;
            max-height: 44px !important;
            padding: 0 4px !important;
          }
          .navbar__inner {
            padding: 0 10px !important;
            height: 44px !important;
            max-height: 44px !important;
          }
          .navbar__logo-img,
          .navbar .navbar__logo-img,
          .navbar.scrolled .navbar__logo-img {
            height: 24px !important;
            max-height: 24px !important;
            width: auto !important;
          }
          .navbar-search-mobile,
          .navbar.scrolled .navbar-search-mobile {
            width: 30px !important;
            height: 30px !important;
          }
          .navbar-search-mobile svg {
            width: 14px !important;
            height: 14px !important;
          }
          .navbar__burger,
          .navbar.scrolled .navbar__burger {
            padding: 3px !important;
            gap: 3.5px !important;
          }
          .navbar__burger span {
            width: 18px !important;
            height: 2px !important;
          }
          .sectors-topbar {
            height: 26px !important;
          }
          .sectors-train-item {
            font-size: 0.65rem !important;
          }
          .mobile-dropdown-card {
            top: 76px !important;
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
