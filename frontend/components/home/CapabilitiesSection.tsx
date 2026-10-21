'use client';

const CAPABILITIES = [
  {
    icon: (
      // Drafting compass & ruler / technical engineering icon
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e3191" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="m4.93 10.93 2.83-2.83" />
        <path d="m19.07 10.93-2.83-2.83" />
        <circle cx="12" cy="7" r="2" />
        <path d="m10.5 8.5-7 13.5" />
        <path d="m13.5 8.5 7 13.5" />
        <path d="M6 18h12" />
      </svg>
    ),
    title: 'Engineering & Technical Support',
    desc: 'Engineering-driven product selection and technical consultation to ensure maximum performance, safety, and efficiency.',
  },
  {
    icon: (
      // Globe with search/procurement network
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e3191" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 3a8 8 0 0 0 0 16" />
        <path d="M3 11h16" />
      </svg>
    ),
    title: 'Global Procurement Network',
    desc: 'Strong international sourcing capabilities with access to trusted manufacturers and globally recognized brands',
  },
  {
    icon: (
      // Computer monitor with gear & wrench / shutdown support
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e3191" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <circle cx="12" cy="10" r="2" />
        <path d="M12 6.5v1.5" />
        <path d="M12 12v1.5" />
        <path d="m9.5 7.5 1 1" />
        <path d="m13.5 11.5 1 1" />
      </svg>
    ),
    title: 'Project & Shutdown Support',
    desc: 'Reliable support for shutdowns, turnarounds, maintenance operations, and large-scale EPC projects across multiple sectors.',
  },
  {
    icon: (
      // Laser / CNC cutting / metal fabrication icon
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e3191" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6" />
        <path d="M9 8h6" />
        <path d="m10 8-3 6h10l-3-6" />
        <path d="M12 14v4" />
        <line x1="4" y1="20" x2="20" y2="20" strokeWidth="2.2" />
        <circle cx="12" cy="19" r="1" fill="#2e3191" />
      </svg>
    ),
    title: 'Custom Fabrication & Metal Works',
    desc: 'Skids, structures, platforms, tanks, and engineered metal solutions.',
  },
];

export default function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      style={{
        padding: '85px 0 90px',
        backgroundColor: '#ffffff',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46, 49, 145, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(32, 181, 18, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#2e3191',
              marginBottom: '10px',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            OUR CAPABILITIES
          </div>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Amiri, serif',
              fontSize: 'clamp(2.1rem, 3.2vw, 2.85rem)',
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Engineering Excellence,{' '}
            <span style={{ color: '#20b512' }}>Every Time.</span>
          </h2>
        </div>

        {/* 4 Cards Grid - Glassy Glassmorphism Style */}
        <div
          className="capabilities-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              className="capability-card"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.82) 0%, rgba(243, 247, 255, 0.58) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                padding: '38px 24px 34px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow:
                  '0 12px 32px -4px rgba(46, 49, 145, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow =
                  '0 22px 45px -4px rgba(46, 49, 145, 0.16), 0 0 0 1.5px rgba(32, 181, 18, 0.35), inset 0 1px 2px rgba(255, 255, 255, 1)';
                e.currentTarget.style.borderColor = 'rgba(32, 181, 18, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 12px 32px -4px rgba(46, 49, 145, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), 0 1px 3px 0 rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.85)';
              }}
            >
              {/* Subtle Glass Sheen Top Reflection */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Circular Floating Glass Badge */}
              <div
                className="cap-icon-wrap"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffffff 0%, #edf2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '26px',
                  boxShadow: '0 8px 20px rgba(46, 49, 145, 0.12), inset 0 1px 2px #ffffff',
                  border: '1.5px solid rgba(255, 255, 255, 0.9)',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {cap.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: '1.28rem',
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: 1.3,
                  marginBottom: '14px',
                  letterSpacing: '0.01em',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {cap.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 400,
                  color: '#475569',
                  lineHeight: 1.7,
                  margin: 0,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '36px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2e3191',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#cbd5e1',
              display: 'inline-block',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .capabilities-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
        }
        @media (max-width: 640px) {
          #capabilities {
            padding: 42px 0 46px !important;
          }
          .capabilities-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .capability-card {
            padding: 20px 14px 18px !important;
            border-radius: 12px !important;
          }
          .capability-card .cap-icon-wrap {
            width: 44px !important;
            height: 44px !important;
            margin-bottom: 14px !important;
          }
          .capability-card .cap-icon-wrap svg {
            width: 20px !important;
            height: 20px !important;
          }
          .capability-card h3 {
            font-size: 1.05rem !important;
            line-height: 1.25 !important;
            margin-bottom: 8px !important;
          }
          .capability-card p {
            font-size: 0.72rem !important;
            line-height: 1.5 !important;
          }
        }
        @media (max-width: 380px) {
          .capabilities-cards-grid {
            gap: 8px !important;
          }
          .capability-card {
            padding: 16px 10px 14px !important;
          }
          .capability-card h3 {
            font-size: 0.95rem !important;
          }
          .capability-card p {
            font-size: 0.68rem !important;
          }
        }
      `}</style>
    </section>
  );
}
