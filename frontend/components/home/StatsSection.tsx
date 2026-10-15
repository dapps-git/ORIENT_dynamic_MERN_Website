'use client';

export default function StatsSection() {
  const stats = [
    { number: '15+', label: 'Years in Industrial Supply', desc: 'Serving the Kingdom since 2011' },
    { number: '12,000+', label: 'Certified Products', desc: 'Mechanical, electrical & instrumentation' },
    { number: '450+', label: 'Enterprise Clients', desc: 'Oil & gas, petrochemical & utility majors' },
    { number: '99.8%', label: 'On-Time Delivery', desc: 'Optimized logistics across GCC' },
  ];

  const highlights = [
    { title: 'Saudi Aramco Standards', desc: 'Fully compliant with 9COM specifications and international standards.' },
    { title: 'ISO 9001:2015 Certified', desc: 'Rigorous quality management protocols applied to all supplies.' },
    { title: 'IADC Affiliated Support', desc: 'Specialized drilling and offshore equipment procurement.' },
    { title: 'Saudi Vision 2030', desc: 'Committed to high In-Kingdom Total Value Add (IKTVA) metrics.' },
  ];

  return (
    <section
      style={{
        padding: '90px 0',
        backgroundColor: '#070c17',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container">
        {/* Number Stats Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '30px',
            marginBottom: '70px',
          }}
        >
          {stats.map((s, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(14, 22, 40, 0.7)',
                padding: '32px 24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 3.5vw, 3.2rem)',
                  fontWeight: 800,
                  color: idx % 2 === 0 ? '#00a14b' : '#34c070',
                  lineHeight: 1.1,
                  marginBottom: '10px',
                }}
              >
                {s.number}
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '6px',
                }}
              >
                {s.label}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--clr-muted)' }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 161, 75, 0.15)',
                  color: '#00a14b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <div>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {h.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--clr-muted)', margin: 0, lineHeight: 1.5 }}>
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
