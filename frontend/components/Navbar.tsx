'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  const menuRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === '/';
  const isLight = !isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar--curved${scrolled ? ' scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          height: '66px',
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
              style={{
                height: '40px',
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
              {/* Green indicator bar matching Image 2 */}
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
          </ul>

          {/* CTA Button + Mobile Burger */}
          {/* Mobile Hamburger (Only visible on tablet/mobile screens) */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
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
                gap: '5px',
                padding: '6px',
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 2,
                  background: '#1e293b',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s',
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 2,
                  background: '#1e293b',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s',
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 2,
                  background: '#1e293b',
                  borderRadius: 2,
                  display: 'block',
                  transition: 'all 0.3s',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: '74px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(7, 17, 56, 0.98)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            backdropFilter: 'blur(20px)',
          }}
        >
          <Link href="/" onClick={() => setOpen(false)} style={{ fontSize: '1.15rem', fontWeight: 600, color: '#20b512', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} style={{ fontSize: '1.15rem', fontWeight: 500, color: '#ffffff', textDecoration: 'none' }}>
            About Us
          </Link>
          <Link href="/sectors" onClick={() => setOpen(false)} style={{ fontSize: '1.15rem', fontWeight: 500, color: '#ffffff', textDecoration: 'none' }}>
            Sectors
          </Link>
          <Link href="/products" onClick={() => setOpen(false)} style={{ fontSize: '1.15rem', fontWeight: 500, color: '#ffffff', textDecoration: 'none' }}>
            Products
          </Link>
          <Link href="/brands" onClick={() => setOpen(false)} style={{ fontSize: '1.15rem', fontWeight: 500, color: '#ffffff', textDecoration: 'none' }}>
            Brands
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)} style={{ fontSize: '1.15rem', fontWeight: 500, color: '#ffffff', textDecoration: 'none' }}>
            Blog
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} style={{ fontSize: '1.15rem', fontWeight: 500, color: '#ffffff', textDecoration: 'none' }}>
            Contact us
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: '#20b512',
              color: '#ffffff',
              padding: '10px 30px',
              borderRadius: '0px',
              fontWeight: 600,
              fontSize: '0.92rem',
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            Get A Quote &rarr;
          </Link>
        </div>
      )}

      <style>{`
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
        @media (max-width: 1024px) {
          .navbar__nav { display: none !important; }
          .navbar__burger { display: flex !important; }
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

