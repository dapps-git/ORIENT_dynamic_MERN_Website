'use client';

import Link from 'next/link';
import Image from 'next/image';

const USEFUL_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Products', href: '/products' },
  { label: 'Brands', href: '/brands' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const OUR_SERVICES = [
  { label: 'Oil & Gas Industry Supplier in Saudi Arabia', href: '/sectors' },
  { label: 'Marine & Offshore Industry Supplier in Saudi Arabia', href: '/sectors' },
  { label: 'Construction & Infrastructure Supplier in Saudi Arabia', href: '/sectors' },
  { label: 'Manufacturing Industry Supplier in Saudi Arabia', href: '/sectors' },
  { label: 'Heavy Engineering Industry Supplier in Saudi Arabia', href: '/sectors' },
  { label: 'Fabrication & Welding Supplier in Saudi Arabia', href: '/sectors' },
  { label: 'View more', href: '/sectors' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#040d33',
        color: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
        paddingTop: '55px',
        paddingBottom: '24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* 4-Column Footer Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand Logo, Description, Vision 2030 & Iktva */}
          <div className="footer-col-brand">
            {/* White Logo Card - reduced size */}
            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#ffffff',
                padding: '3px 8px',
                borderRadius: '3px',
                marginBottom: '14px',
              }}
            >
              <Image
                src="/logo.png"
                alt="Orient Energy Trading Company"
                width={130}
                height={30}
                style={{
                  height: '22px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.72)',
                fontSize: '0.76rem',
                lineHeight: 1.62,
                maxWidth: '280px',
                marginBottom: '18px',
                fontWeight: 300,
              }}
            >
              We help industries operate efficiently with high-performance products, dependable
              sourcing, and fast project support tailored for demanding operational environments.
            </p>

            {/* Saudi Vision 2030 Logo - reduced */}
            <div style={{ marginBottom: '10px' }}>
              <Image
                src="/footer/vision-2030.png"
                alt="Kingdom of Saudi Arabia Vision 2030"
                width={85}
                height={42}
                style={{
                  width: '78px',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Aramco Iktva Logo - reduced */}
            <div>
              <Image
                src="/footer/aramco-iktva.png"
                alt="Aramco Iktva Certification"
                width={85}
                height={32}
                style={{
                  width: '78px',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '0.02em',
              }}
            >
              Useful Links
            </h3>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-nav-link"
                    style={{
                      color: 'rgba(255, 255, 255, 0.72)',
                      fontSize: '0.76rem',
                      fontWeight: 300,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      display: 'inline-block',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '0.02em',
              }}
            >
              Our Services
            </h3>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {OUR_SERVICES.map((serv) => (
                <li key={serv.label}>
                  <Link
                    href={serv.href}
                    className="footer-nav-link"
                    style={{
                      color: 'rgba(255, 255, 255, 0.72)',
                      fontSize: '0.76rem',
                      fontWeight: 300,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      display: 'inline-block',
                    }}
                  >
                    {serv.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information & Socials */}
          <div>
            {/* Office Address */}
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '0.02em',
              }}
            >
              Office Address
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.72)',
                fontSize: '0.76rem',
                lineHeight: 1.55,
                marginBottom: '14px',
                fontWeight: 300,
              }}
            >
              Prince Musaid Bin Abdulaziz
              <br />
              Al Khubar, Ash Shamaliyah Dist.
              <br />
              Unit Number: 36, Al Khobar 34427 – 3524, Building number – 6625
            </p>

            {/* Email Address */}
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '6px',
                letterSpacing: '0.02em',
              }}
            >
              Email Address
            </h3>
            <p style={{ margin: '0 0 14px 0' }}>
              <a
                href="mailto:info@orientenergyco.com"
                style={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  fontSize: '0.76rem',
                  fontWeight: 300,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                className="footer-nav-link"
              >
                info@orientenergyco.com
              </a>
            </p>

            {/* Phone Number */}
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '6px',
                letterSpacing: '0.02em',
              }}
            >
              Phone Number
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.72)',
                fontSize: '0.76rem',
                fontWeight: 300,
                lineHeight: 1.55,
                marginBottom: '14px',
              }}
            >
              <a
                href="tel:+966138930002"
                style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
                className="footer-nav-link"
              >
                +966 13 893 0002
              </a>
              <a
                href="tel:+966552400778"
                style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
                className="footer-nav-link"
              >
                +966 55 240 0778
              </a>
            </p>

            {/* Follow Us */}
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '12px',
                letterSpacing: '0.02em',
              }}
            >
              Follow Us
            </h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/966552400778"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="social-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="social-btn"
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '16px',
            marginTop: '36px',
            textAlign: 'center',
            fontSize: '0.72rem',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          © 2026 Orient Energy Trading Company
        </div>
      </div>

      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1.35fr 1.3fr;
          gap: 40px;
        }

        .footer-nav-link:hover {
          color: #20b512 !important;
          transform: translateX(2px);
        }

        .social-btn:hover {
          background-color: #20b512 !important;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 640px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}
