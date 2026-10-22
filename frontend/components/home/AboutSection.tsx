'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AboutSection() {
  const [expandedMobile, setExpandedMobile] = useState<boolean>(false);

  return (
    <section
      id="about"
      style={{
        padding: '75px 0 85px',
        background: '#FAF7F2',
        position: 'relative',
        color: '#111827',
        fontFamily: "'Poppins', sans-serif",
        borderTop: '1px solid #ECE7DE',
        borderBottom: '1px solid #ECE7DE',
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '52px',
            alignItems: 'flex-start',
          }}
          className="about-theme-grid"
        >
          {/* Left Column (Always Visible) */}
          <div>
            {/* Tag */}
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#0b7a3d',
                marginBottom: '12px',
                fontFamily: "'Poppins', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#0b7a3d',
                }}
              />
              ABOUT US
            </div>

            {/* Main Title */}
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(2.0rem, 2.9vw, 2.6rem)',
                fontWeight: 500,
                lineHeight: 1.2,
                color: '#111827',
                marginBottom: '20px',
              }}
            >
              About <span style={{ color: '#0b7a3d' }}>Orient Energy</span>
            </h2>

            {/* Paragraph 1 */}
            <p
              style={{
                fontSize: '0.86rem',
                lineHeight: 1.75,
                color: '#262626',
                marginBottom: '18px',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Established in 2001, Orient Energy is a leading industrial supply and
              engineering solutions provider serving critical industries across Saudi Arabia
              and the wider Middle East.
            </p>

            {/* Paragraph 2 (Mobile cuts off here until Read More is clicked) */}
            <p
              style={{
                fontSize: '0.86rem',
                lineHeight: 1.75,
                color: '#262626',
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              We specialize in industrial procurement, engineering support, heavy
              equipment rental, and the supply of certified industrial materials tailored to
              demanding operational environments. Backed by a global sourcing network
              and a commitment to quality, we help businesses minimize downtime,
              improve efficiency, and successfully execute projects of every scale.
            </p>

            {/* Mobile Read More / Read Less Toggle Button */}
            <div className="about-mobile-toggle-wrap">
              <button
                type="button"
                onClick={() => setExpandedMobile(!expandedMobile)}
                className="about-mobile-readmore-btn"
                aria-expanded={expandedMobile}
              >
                <span>{expandedMobile ? 'Read Less' : 'Read More'}</span>
                <span className={`readmore-icon ${expandedMobile ? 'expanded' : ''}`}>
                  &darr;
                </span>
              </button>
            </div>
          </div>

          {/* Right Column (On Mobile, toggled by Read More) */}
          <div
            className={`about-right-col ${expandedMobile ? 'mobile-expanded' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              {/* Paragraph 3 */}
              <p
                style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.75,
                  color: '#262626',
                  marginBottom: '18px',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                With a strong global sourcing network spanning the USA, Europe,
                Asia, and GCC markets, Orient Energy delivers certified materials and
                industrial equipment that meet the highest international quality and
                safety standards. From urgent maintenance requirements to
                largescale industrial projects, we provide complete support with
                technical assurance and operational confidence.
              </p>

              {/* Paragraph 4 */}
              <p
                style={{
                  fontSize: '0.86rem',
                  lineHeight: 1.75,
                  color: '#262626',
                  marginBottom: '28px',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Our expertise covers mechanical, electrical, welding, marine, safety,
                steel, lubrication, maintenance, and industrial consumable solutions,
                making us a comprehensive supply partner for industries across
                Saudi Arabia.
                <br />
                <span style={{ display: 'inline-block', marginTop: '10px', fontWeight: 600, color: '#111827' }}>
                  At every stage, our focus remains clear:
                </span>
                <br />
                Delivering the right products, at the right time, with the right
                technical support.
              </p>
            </div>

            {/* Discover More Button */}
            <div>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#08144b',
                  border: '1.5px solid #08144b',
                  color: '#ffffff',
                  padding: '13px 30px',
                  borderRadius: '0px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif",
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 16px rgba(8, 20, 75, 0.18)',
                }}
                className="about-discover-btn"
              >
                Discover More
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-mobile-toggle-wrap {
          display: none;
          margin-top: 20px;
        }

        .about-mobile-readmore-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #0b7a3d;
          color: #ffffff;
          padding: 8px 18px;
          border: none;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 122, 61, 0.25);
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .about-mobile-readmore-btn:hover {
          background-color: #086130;
          transform: translateY(-1px);
        }

        .readmore-icon {
          font-size: 0.95rem;
          line-height: 1;
          transition: transform 0.3s ease;
        }

        .readmore-icon.expanded {
          transform: rotate(180deg);
        }

        @media (max-width: 860px) {
          #about {
            padding: 42px 0 46px !important;
          }
          .about-theme-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .about-mobile-toggle-wrap {
            display: block !important;
          }

          .about-right-col {
            display: none !important;
          }

          .about-right-col.mobile-expanded {
            display: flex !important;
            animation: fadeIn 0.3s ease;
            margin-top: 10px;
          }

          .about-discover-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
