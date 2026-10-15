'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function RentalDivisionSection() {
  return (
    <section
      id="rental-division"
      style={{
        padding: '105px 0 115px',
        backgroundColor: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
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
        <div className="rental-grid">
          {/* Left Column: Heavy Machinery Excavator Photo */}
          <div className="rental-image-wrap">
            <Image
              src="/rental/excavator.jpg"
              alt="OETC Rental Equipments Division heavy excavators"
              width={720}
              height={480}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '460px',
                objectFit: 'cover',
                borderRadius: '0px',
                display: 'block',
              }}
              priority
            />
          </div>

          {/* Right Column: Title, Descriptive Copy, and CTA Button */}
          <div className="rental-content">
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.3rem, 3.4vw, 3rem)',
                fontWeight: 600,
                color: '#1a1f2c',
                lineHeight: 1.18,
                marginBottom: '22px',
              }}
            >
              OETC Rental Equipments
              <br />
              Division
            </h2>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.92rem',
                color: '#4b5563',
                lineHeight: 1.75,
                marginBottom: '18px',
                fontWeight: 400,
              }}
            >
              Orient Energy Trading Company (OETC) – Rental Equipments Division is one of
              Saudi Arabia’s leading providers of heavy equipment rental and industrial
              support services. With years of industry expertise and a strong operational
              presence across the Kingdom, OETC supports large-scale industrial,
              construction, oil &amp; gas, infrastructure, and energy projects with reliable
              equipment and integrated solutions.
            </p>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.92rem',
                color: '#4b5563',
                lineHeight: 1.75,
                marginBottom: '32px',
                fontWeight: 400,
              }}
            >
              Our division is built on operational excellence, safety, reliability, and customer
              satisfaction. We maintain a large and diverse fleet of heavy equipment,
              industrial machinery, transportation vehicles, dewatering systems, and
              temporary site facilities to meet the demanding requirements of various
              industries.
            </p>

            <div>
              <Link
                href="/oetc-rental-equipments"
                className="rental-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#06123b',
                  color: '#ffffff',
                  padding: '11px 28px',
                  borderRadius: '0px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 14px rgba(6, 18, 59, 0.2)',
                }}
              >
                <span>Discover More</span>
                <span style={{ fontSize: '1.1rem', transition: 'transform 0.2s ease' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rental-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .rental-image-wrap {
          width: 100%;
          overflow: hidden;
        }

        .rental-content {
          padding-left: 8px;
        }

        .rental-btn:hover {
          background-color: #2e3191 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(46, 49, 145, 0.3) !important;
        }

        .rental-btn:hover span:last-child {
          transform: translateX(4px);
        }

        @media (max-width: 960px) {
          .rental-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .rental-content {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
