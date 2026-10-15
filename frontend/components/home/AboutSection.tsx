'use client';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: '75px 0 85px',
        background: 'linear-gradient(108deg, #077943 0%, #0d5c48 42%, #144454 100%)',
        position: 'relative',
        color: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
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
          {/* Left Column */}
          <div>
            {/* Tag */}
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '12px',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              ABOUT US
            </div>

            {/* Main Title */}
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(1.95rem, 2.7vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#ffffff',
                marginBottom: '18px',
              }}
            >
              About <span style={{ color: '#25c257' }}>Orient Energy</span>
            </h2>

            {/* Paragraph 1 */}
            <p
              style={{
                fontSize: '0.83rem',
                lineHeight: 1.65,
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '16px',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Established in 2001, Orient Energy is a leading industrial supply and
              engineering solutions provider serving critical industries across Saudi Arabia
              and the wider Middle East.
            </p>

            {/* Paragraph 2 */}
            <p
              style={{
                fontSize: '0.83rem',
                lineHeight: 1.65,
                color: 'rgba(255, 255, 255, 0.95)',
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
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              {/* Paragraph 3 */}
              <p
                style={{
                  fontSize: '0.83rem',
                  lineHeight: 1.65,
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '16px',
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
                  fontSize: '0.83rem',
                  lineHeight: 1.65,
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '26px',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Our expertise covers mechanical, electrical, welding, marine, safety,
                steel, lubrication, maintenance, and industrial consumable solutions,
                making us a comprehensive supply partner for industries across
                Saudi Arabia.
                <br />
                At every stage, our focus remains clear:
                <br />
                Delivering the right products, at the right time, with the right
                technical support.
              </p>
            </div>

            {/* Discover More Button - Square Premium Style */}
            <div>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#08144b',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  padding: '12px 28px',
                  borderRadius: '0px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif",
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#20b512';
                  e.currentTarget.style.borderColor = '#20b512';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#08144b';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Discover More
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-theme-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
