'use client';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="hero-main"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '120px 24px 80px',
        color: '#ffffff',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1080px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Main Heading - Reduced refined size */}
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", Amiri, serif',
            fontSize: 'clamp(1.9rem, 3.1vw, 42px)',
            fontWeight: 600,
            lineHeight: 1.18,
            marginBottom: '16px',
            color: '#ffffff',
            maxWidth: '900px',
            letterSpacing: '0.01em',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
          }}
        >
          Powering Saudi Arabia&apos;s Industrial Future With Reliable Supply &amp; Engineering Solutions
        </h1>

        {/* Subtitle description - Reduced refined size */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.86rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '620px',
            margin: '0 auto 26px',
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
            fontWeight: 400,
          }}
        >
          Orient Energy is a trusted industrial supply and engineering solutions company in Saudi Arabia,
          delivering certified materials, technical expertise, and global procurement support for
          Oil &amp; Gas, Power, Marine, Infrastructure, Manufacturing, and Heavy Industrial sectors.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          {/* CTA Buttons - Reduced, Sleek Square & Outline Style */}
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#20b512',
              color: '#ffffff',
              border: '1.5px solid #20b512',
              padding: '10px 24px',
              borderRadius: '0px',
              fontWeight: 600,
              fontSize: '12.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 14px rgba(32, 181, 18, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#19990e';
              e.currentTarget.style.borderColor = '#19990e';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#20b512';
              e.currentTarget.style.borderColor = '#20b512';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Request a Quote
            <span style={{ fontSize: '0.95rem', lineHeight: 1 }}>&rarr;</span>
          </Link>

          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: '1.5px solid rgba(255, 255, 255, 0.75)',
              color: '#ffffff',
              padding: '10px 24px',
              borderRadius: '0px',
              fontWeight: 600,
              fontSize: '12.5px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>



    </section>
  );
}
