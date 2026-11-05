'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AboutIntroContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="scroll-reveal"
      style={{
        maxWidth: '920px',
        margin: '0 auto',
      }}
    >
      {/* Title & Tag */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#2e3191',
            marginBottom: '8px',
          }}
        >
          ABOUT
        </div>

        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)',
            fontWeight: 600,
            color: '#1a1f2c',
            lineHeight: 1.18,
            marginBottom: '14px',
            letterSpacing: '0.01em',
          }}
        >
          ORIENT ENERGY TRADING
        </h1>

        <div
          style={{
            width: '50px',
            height: '3px',
            backgroundColor: '#20b512',
            margin: '0 auto',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* First Paragraph */}
      <p className="about-intro-p" style={{ marginBottom: '12px' }}>
        Orient Energy is a Saudi Arabia-based industrial supply and engineering solutions
        company serving the Oil &amp; Gas, Power, Marine, Construction, Infrastructure, and
        industrial sectors across the Kingdom and the Middle East.
      </p>

      {/* Read More / Read Less Toggle Button with -> sign */}
      <div style={{ marginBottom: '18px' }}>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="about-read-more-btn"
          aria-expanded={expanded}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#2e3191',
            fontWeight: 600,
            fontSize: '0.90rem',
            cursor: 'pointer',
            padding: '4px 0',
            fontFamily: "'Montserrat', sans-serif",
            transition: 'color 0.2s ease',
          }}
        >
          <span>{expanded ? 'Read Less' : 'Read More'}</span>
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.25s ease',
              transform: expanded ? 'rotate(90deg)' : 'none',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#20b512',
            }}
          >
            →
          </span>
        </button>
      </div>

      {/* Collapsible Remaining Paragraphs */}
      {expanded && (
        <div
          style={{
            animation: 'fadeInAboutText 0.35s ease-out',
            marginBottom: '20px',
          }}
        >
          <p className="about-intro-p">
            We specialize in industrial supply, global procurement, and engineering support, delivering
            reliable products and integrated solutions tailored for demanding industrial operations.
          </p>

          <p className="about-intro-p" style={{ margin: 0 }}>
            With a strong international sourcing network and industry expertise, we provide
            certified industrial materials, mechanical and electrical solutions, safety
            equipment, steel products, welding systems, marine supplies, and maintenance
            solutions backed by quality, reliability, and technical excellence. At Orient Energy,
            we are committed to supporting industries with dependable service, operational
            efficiency, and long-term partnership solutions designed to meet modern industrial
            demands.
          </p>
        </div>
      )}

      {/* 2 Facility Photos as a Grid */}
      <div
        className="about-photos-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginTop: '28px',
          width: '100%',
        }}
      >
        <div
          className="about-photo-card"
          style={{
            position: 'relative',
            width: '100%',
            height: '280px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(7, 17, 56, 0.08)',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
          }}
        >
          <Image
            src="/about/orient-warehouse-pipes.jpg"
            alt="Orient Energy Pipe Fittings & Industrial Storage Facility"
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div
          className="about-photo-card"
          style={{
            position: 'relative',
            width: '100%',
            height: '280px',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(7, 17, 56, 0.08)',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
          }}
        >
          <Image
            src="/about/orient-showroom-counter.jpg"
            alt="Orient Energy Showroom & Client Service Center"
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <style jsx>{`
        .about-read-more-btn:hover {
          color: #20b512 !important;
        }

        .about-photo-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }

        .about-photo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(7, 17, 56, 0.14) !important;
        }

        @keyframes fadeInAboutText {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .about-photos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-top: 20px !important;
          }
          .about-photo-card {
            height: 160px !important;
            border-radius: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}

