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
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          overflow: 'hidden',
          backgroundColor: '#000000',
        }}
      >
        {/* Landscape MP4 Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video-player"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/uploads/hero-video.mp4" type="video/mp4" />
          <source src="/uploads/Offshore_oil_rig_platform_sunset_1c1c56e7 (1).mp4" type="video/mp4" />
        </video>

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

        {/* Hero Content Over Video: Clean Centered Headline */}
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
            justifyContent: 'center',
            padding: '120px 24px 75px',
          }}
        >
          {/* Main Headline: Expertise in Every Trade */}
          <h1
            className="hero-video-title"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.9rem, 4.2vw, 46px)',
              fontWeight: 600,
              lineHeight: 1.25,
              color: '#ffffff',
              letterSpacing: '0.01em',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.65)',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            Expertise in Every Trade
          </h1>
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
            min-height: 290px !important;
            max-height: 380px !important;
            aspect-ratio: 16 / 10 !important;
            height: auto !important;
          }

          .hero-video-content {
            padding: 85px 16px 30px !important;
          }

          .hero-video-title {
            font-size: clamp(1.3rem, 5.6vw, 1.7rem) !important;
            line-height: 1.25 !important;
            max-width: 340px !important;
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
