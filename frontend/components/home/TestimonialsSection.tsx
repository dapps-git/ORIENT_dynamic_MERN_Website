'use client';

import Image from 'next/image';

interface TestimonialItem {
  avatar: string;
  name: string;
  sector: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    avatar: '/testimonials/avatar-1.jpg',
    name: 'Project Manager,',
    sector: 'Oil & Gas Sector',
    quote:
      'Orient Energy has been our trusted partner for heavy equipment rental and industrial supply. Their reliable fleet and prompt support ensured our project deadlines were always met. Exceptional service!',
  },
  {
    avatar: '/testimonials/avatar-2.png',
    name: 'Construction Manager',
    sector: 'Construction & Infrastructure',
    quote:
      'From cranes to earthmoving equipment, Orient Energy provided top-quality machinery and seamless logistics support. Their professionalism and technical expertise made a significant difference in our operations.',
  },
  {
    avatar: '/testimonials/avatar-3.jpg',
    name: 'Maintenance Supervisor',
    sector: 'Industrial Supply & Maintenance',
    quote:
      'We rely on Orient Energy for industrial supplies, including mechanical, electrical, and welding equipment. Their attention to quality, compliance, and timely delivery has made them an invaluable partner.',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        backgroundColor: '#071013',
        backgroundImage: "url('/testimonials/welder-bg.jpg')",
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '105px 0 115px',
        color: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay for contrast and text clarity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(5, 10, 15, 0.58)',
          zIndex: 1,
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Heading */}
        <div style={{ textAlign: 'left', marginBottom: '46px' }}>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              opacity: 0.9,
            }}
          >
            TESTIMONIALS
          </div>

          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Amiri, serif',
              fontSize: 'clamp(2.3rem, 3.4vw, 3rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            What people say about
            <br />
            <span style={{ color: '#20b512' }}>Orient Energy</span>
          </h2>
        </div>

        {/* 3 White Testimonial Cards */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="testi-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0px',
                padding: '34px 28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div>
                {/* Author Info Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: '#e2e8f0',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={52}
                      height={52}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  <div>
                    <h4
                      style={{
                        fontFamily: '"Cormorant Garamond", Amiri, serif',
                        fontSize: '1.18rem',
                        fontWeight: 600,
                        color: '#111827',
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {t.name}
                    </h4>
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.82rem',
                        color: '#64748b',
                        marginTop: '3px',
                        lineHeight: 1.3,
                      }}
                    >
                      {t.sector}
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: '1.12rem',
                    fontStyle: 'italic',
                    color: '#334155',
                    lineHeight: 1.55,
                    fontWeight: 500,
                    margin: '0 0 20px 0',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Card Bottom Divider + Subtle Double Quote Icon */}
              <div
                style={{
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <svg
                  width="36"
                  height="26"
                  viewBox="0 0 60 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.3 }}
                >
                  <path
                    d="M57.3913 0H33.913C32.4746 0 31.3043 1.14482 31.3043 2.55199V24.2439C31.3043 25.6511 32.4746 26.7959 33.913 26.7959H45V42.1077C45 42.7082 45.805 42.9717 46.1739 42.4907L59.8696 24.6267C59.9542 24.5163 60 24.382 60 24.2439V2.55199C60 1.14482 58.8299 0 57.3913 0ZM58.6957 24.0312L46.3043 40.1939V26.1579C46.3043 25.8055 46.0124 25.5199 45.6522 25.5199H33.913C33.1938 25.5199 32.6087 24.9475 32.6087 24.2439V2.55199C32.6087 1.84841 33.1938 1.276 33.913 1.276H57.3913C58.1105 1.276 58.6957 1.84841 58.6957 2.55199V24.0312ZM26.087 0H2.6087C1.17026 0 0 1.14482 0 2.55199V24.2439C0 25.6511 1.17026 26.7959 2.6087 26.7959H13.6957V42.1079C13.6957 42.7049 14.5004 42.9721 14.8696 42.4907L28.5652 24.6267C28.6499 24.5163 28.6957 24.382 28.6957 24.2439V2.55199C28.6957 1.14482 27.5254 0 26.087 0ZM27.3913 24.0312L15 40.1939V26.1579C15 25.8055 14.708 25.5199 14.3478 25.5199H2.6087C1.88948 25.5199 1.30435 24.9475 1.30435 24.2439V2.55199C1.30435 1.84841 1.88948 1.276 2.6087 1.276H26.087C26.8062 1.276 27.3913 1.84841 27.3913 2.55199V24.0312Z"
                    fill="#94a3b8"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .testi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2) !important;
        }

        @media (max-width: 992px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
