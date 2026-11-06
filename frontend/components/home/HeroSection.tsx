'use client';
import Image from 'next/image';

const CLIENT_LOGOS = [
  { name: 'Saudi Aramco', logo: '/clientslogo/Saudi Aramco Logo Mark.png' },
  { name: 'Sipchem', logo: '/clientslogo/Sipchem Sun and Waves Logo.png' },
  { name: 'SINOPEC', logo: '/clientslogo/SINOPEC Logo with Chinese Calligraphy.png' },
  { name: 'Saipem', logo: '/clientslogo/Saipem Teal and Orange Logo.png' },
  { name: 'TAQA', logo: '/clientslogo/TAQA Geometric Navy and Cyan Logo.png' },
  { name: 'Zamil Offshore', logo: '/clientslogo/Zamil Offshore Corporate Logo.png' },
  { name: 'Larsen & Toubro', logo: '/clientslogo/Larsen & Toubro Blue Logo.png' },
  { name: 'Arabian Drilling', logo: '/clientslogo/Arabian Drilling Corporate Logo.png' },
  { name: 'Cameron', logo: '/clientslogo/Cameron Corporate Logo with Red Emblem.png' },
  { name: 'CNPC', logo: '/clientslogo/CNPC Petal Emblem Logo.png' },
  { name: 'COSL', logo: '/clientslogo/COSL Blue and Red Wordmark Logo.png' },
  { name: 'Jana Marine', logo: '/clientslogo/Jana Marine Services Logo.png' },
  { name: 'KBR', logo: '/clientslogo/KBR Globe Swoosh Logo.png' },
  { name: 'KCA Kuwait Chemical', logo: '/clientslogo/KCA Kuwait Chemical Company Logo.png' },
  { name: 'McDermott', logo: '/clientslogo/McDermott Blue and Lime Logo.png' },
  { name: 'Subsea 7', logo: '/clientslogo/Subsea 7 Logo on Transparent Background.png' },
];

export default function HeroSection() {
  // Duplicate for seamless infinite marquee train track
  const trainLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <>
      {/* Landscape Video Hero Section (Zero Blue Effect, No Hero Buttons) */}
      <section
        className="hero-video-section"
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          color: '#ffffff',
          overflow: 'hidden',
          backgroundColor: '#000000',
        }}
      >
        {/* Hero Offshore Oil Rig Platform Sunset Image Background */}
        <Image
          src="/hero-bg-rig.jpg"
          alt="Offshore Oil Rig Platform at Sunset"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Clean Neutral Dark Contrast Overlay (No Blue Tint) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.45) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Hero Central Container: Headline Above in 2 lines, Glassy Stats Below */}
        <div
          className="hero-video-content"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '110px 24px 34px',
            flex: '1 0 auto',
          }}
        >
          {/* Main Headline placed ABOVE the glassy box: 2 lines in 2 colors (White & Green), increased font size and extra bold weight */}
          <h1
            className="hero-video-title"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2.6rem, 6.2vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.85), 0 2px 8px rgba(0, 0, 0, 0.95)',
              maxWidth: '960px',
              margin: 'auto auto 20px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#ffffff', display: 'block', fontWeight: 800 }}>Expertise in</span>
            <span style={{ color: '#20b512', display: 'block', fontWeight: 800 }}>Every Trade</span>
          </h1>

          {/* Reduced Transparent Glassmorphic Stats Strip (300+ Brands | 100+ Clients | 10+ Sectors | 28+ Years Exp) */}
          <div
            className="hero-glassy-stats-bar"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '720px',
              margin: '0 auto',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(22px) saturate(190%)',
              WebkitBackdropFilter: 'blur(22px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              borderRadius: '12px',
              boxShadow:
                '0 8px 32px 0 rgba(0, 0, 0, 0.32), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              alignItems: 'center',
              padding: '8px 14px',
            }}
          >
            {/* Stat 1: 300+ Brands */}
            <div
              className="hero-stat-col"
              style={{
                textAlign: 'center',
                padding: '2px 8px',
                borderRight: '1px solid rgba(255, 255, 255, 0.18)',
              }}
            >
              <div
                className="hero-stat-number"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.55)',
                }}
              >
                300+
              </div>
              <div
                className="hero-stat-label"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.88)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                Brands
              </div>
            </div>

            {/* Stat 2: 100+ Clients */}
            <div
              className="hero-stat-col"
              style={{
                textAlign: 'center',
                padding: '2px 8px',
                borderRight: '1px solid rgba(255, 255, 255, 0.18)',
              }}
            >
              <div
                className="hero-stat-number"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.55)',
                }}
              >
                100+
              </div>
              <div
                className="hero-stat-label"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.88)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                Clients
              </div>
            </div>

            {/* Stat 3: 10+ Sectors */}
            <div
              className="hero-stat-col"
              style={{
                textAlign: 'center',
                padding: '2px 8px',
                borderRight: '1px solid rgba(255, 255, 255, 0.18)',
              }}
            >
              <div
                className="hero-stat-number"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.55)',
                }}
              >
                10+
              </div>
              <div
                className="hero-stat-label"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.88)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                Sectors
              </div>
            </div>

            {/* Stat 4: 28+ Years Exp */}
            <div
              className="hero-stat-col"
              style={{
                textAlign: 'center',
                padding: '2px 8px',
              }}
            >
              <div
                className="hero-stat-number"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.55)',
                }}
              >
                28+
              </div>
              <div
                className="hero-stat-label"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.88)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                Years Exp.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients We Deal With Section (Corporate Cream / Off-White Background with Infinite Train Animation) */}
      <section
        className="clients-deal-section"
        style={{
          backgroundColor: '#FAF7F2',
          padding: '8px 0',
          color: '#1a1f2c',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #ECE7DE',
          borderBottom: '1px solid #ECE7DE',
        }}
        aria-label="Clients We Deal With"
      >

        {/* Marquee Train Track Container with Gradient Edge Fades */}
        <div
          className="clients-marquee-container"
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Left & Right Edge Fades to Cream/Off-White */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '70px',
              height: '100%',
              background: 'linear-gradient(90deg, #FAF7F2 0%, rgba(250, 247, 242, 0) 100%)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '70px',
              height: '100%',
              background: 'linear-gradient(270deg, #FAF7F2 0%, rgba(250, 247, 242, 0) 100%)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* Scrolling Train Track */}
          <div className="clients-train-track">
            {trainLogos.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="client-train-item"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px 22px',
                  flexShrink: 0,
                  background: 'transparent',
                  transition: 'transform 0.25s ease',
                }}
                title={client.name}
              >
                <div
                  style={{
                    height: '36px',
                    width: '135px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                  }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={140}
                    height={40}
                    style={{
                      maxHeight: '32px',
                      maxWidth: '125px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      background: 'transparent',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}
                    className="client-logo-img"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hero-video-section {
          min-height: 80vh;
          max-height: 740px;
        }

        /* Continuous Infinite Train Animation */
        @keyframes clientsTrainScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .clients-train-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: clientsTrainScroll 32s linear infinite;
          will-change: transform;
        }

        .clients-train-track:hover {
          animation-play-state: paused;
        }

        .client-train-item:hover .client-logo-img {
          transform: scale(1.08);
          opacity: 1 !important;
        }

        /* Mobile Landscape Aspect Ratio Model */
        @media (max-width: 768px) {
          .hero-video-section {
            min-height: 400px !important;
            max-height: 520px !important;
            height: auto !important;
            justify-content: flex-end !important;
          }

          .hero-video-content {
            padding: 45px 14px 14px !important;
            justify-content: flex-end !important;
          }

          .hero-video-title {
            font-size: clamp(1.3rem, 5.6vw, 1.7rem) !important;
            line-height: 1.25 !important;
            max-width: 340px !important;
            margin: auto auto 12px !important;
          }

          .hero-glassy-stats-bar {
            width: calc(100% - 20px) !important;
            max-width: 460px !important;
            margin: 0 auto !important;
            padding: 8px 4px !important;
            grid-template-columns: repeat(4, 1fr) !important;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.05) 100%) !important;
            backdrop-filter: blur(16px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
            border: 1px solid rgba(255, 255, 255, 0.24) !important;
            border-radius: 10px !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3) !important;
          }

          .hero-stat-col {
            padding: 2px 3px !important;
          }

          .hero-stat-number {
            font-size: 1.05rem !important;
          }

          .hero-stat-label {
            font-size: 0.52rem !important;
            letter-spacing: 0.05em !important;
            margin-top: 1px !important;
          }

          .clients-deal-section {
            padding: 5px 0 6px !important;
          }

          .client-train-item {
            padding: 3px 14px !important;
          }

          .client-train-item div {
            height: 28px !important;
            width: 105px !important;
          }

          .client-logo-img {
            max-height: 24px !important;
            max-width: 95px !important;
          }
        }
      `}</style>
    </>
  );
}
