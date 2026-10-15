'use client';

export default function TrustBannerSection() {
  return (
    <section
      id="operational-excellence"
      style={{
        position: 'relative',
        backgroundColor: '#001414',
        backgroundImage: "url('/trust/slider-h2-b2.png')",
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center top',
        padding: '115px 0 120px',
        color: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
        overflow: 'hidden',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Elementor dark overlay (0.5 opacity #030303) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#030303',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Dotted World Map overlay layer (contact-main.png) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/trust/contact-main.png')",
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1050px auto',
          opacity: 0.25,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Boxed Container */}
      <div
        className="container"
        style={{
          maxWidth: '1370px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 3,
          width: '100%',
        }}
      >
        <div
          className="trust-content-box"
          style={{
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'left',
          }}
        >
          {/* Main Heading */}
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Amiri, serif',
              fontSize: 'clamp(2.3rem, 3.4vw, 3rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.18,
              marginBottom: '22px',
            }}
          >
            Operational Excellence
            <br />
            Built on Trust
          </h2>

          {/* Paragraph 1 */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.94rem',
              color: '#CBCCCD',
              lineHeight: 1.75,
              marginBottom: '20px',
              fontWeight: 400,
            }}
          >
            Orient Energy continues to support industries across Saudi Arabia with a commitment to
            quality, reliability, safety, and long-term partnership. Our mission is to help businesses
            improve operational performance through dependable supply solutions and engineering
            expertise that create real industrial value.
          </p>

          {/* Paragraph 2 */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.94rem',
              color: '#CBCCCD',
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Whether you require urgent procurement support, ongoing industrial supply, or complete project
            material solutions, Orient Energy is ready to deliver with confidence and precision.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .trust-content-box {
            max-width: 100% !important;
            padding: 0 10px;
          }
        }
      `}</style>
    </section>
  );
}
