'use client';

import Link from 'next/link';
import Image from 'next/image';

const USEFUL_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Oetc Rental Equipments', href: '/oetc-rental-equipments' },
  { label: 'Blogs', href: '/#blog' },
  { label: 'Brands', href: '/products' },
  { label: 'Products', href: '/products' },
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
                marginBottom: '10px',
                letterSpacing: '0.02em',
              }}
            >
              Follow Us
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-btn"
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
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
                  width: '30px',
                  height: '30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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
