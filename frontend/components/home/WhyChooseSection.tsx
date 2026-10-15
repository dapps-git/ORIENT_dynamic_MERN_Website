'use client';

import Image from 'next/image';

interface FeatureCard {
  num: string;
  title: string;
  desc: string;
}

const FEATURES: FeatureCard[] = [
  {
    num: '01',
    title: 'Reliable Global Supply Chain',
    desc: 'Our international sourcing network enables fast access to high-quality industrial products from leading global manufacturers.',
  },
  {
    num: '02',
    title: 'Technical Expertise',
    desc: 'Our solutions are backed by industry professionals with strong technical understanding of industrial operations and project requirements.',
  },
  {
    num: '03',
    title: 'Certified Industrial Products',
    desc: 'We supply products that comply with international standards including API, ASTM, ISO, and other industry certifications.',
  },
  {
    num: '04',
    title: 'Fast & Efficient Delivery',
    desc: 'We understand the urgency of industrial operations and prioritize quick turnaround times for both routine and emergency requirements.',
  },
  {
    num: '05',
    title: 'Comprehensive Product Portfolio',
    desc: 'From mechanical and electrical systems to marine equipment, safety products, coatings, steel materials, and maintenance solutions, we provide complete industrial support under one roof.',
  },
  {
    num: '06',
    title: 'Customer-Focused Approach',
    desc: 'We work closely with clients to understand operational challenges and deliver practical, reliable, and cost-effective solutions.',
  },
];

export default function WhyChooseSection() {
  return (
    <section
      id="why-choose-us"
      style={{
        padding: '100px 0 110px',
        backgroundColor: '#ffffff',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div className="why-choose-grid">
          {/* Left Column: Heading + Descriptive Text + Engineer Offshore Rig Photo */}
          <div className="why-choose-left">
            {/* Top Subtitle */}
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#2e3191',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              WHY CHOOSE ORIENT ENERGY?
            </div>

            {/* Main Section Heading */}
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.4rem, 3.6vw, 3.3rem)',
                fontWeight: 600,
                color: '#1a1f2c',
                lineHeight: 1.14,
                marginBottom: '16px',
              }}
            >
              Because Your Operations
              <br />
              Deserve the Best.
            </h2>

            {/* Sub-description */}
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.98rem',
                color: '#555e6d',
                lineHeight: 1.6,
                marginBottom: '32px',
                fontWeight: 400,
              }}
            >
              We solve supply problems before they become downtime.
            </p>

            {/* Vertical Industrial Photo */}
            <div className="why-choose-photo-wrap">
              <Image
                src="/why-choose/engineer-rig.jpg"
                alt="Orient Energy Engineer overlooking industrial offshore rig"
                width={560}
                height={800}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  borderRadius: '0px',
                }}
                priority
              />
            </div>
          </div>

          {/* Right Column: 6 Pale Mint Cards with Large Subtle Number Watermarks */}
          <div className="why-choose-cards-grid">
            {FEATURES.map((item) => (
              <div
                key={item.num}
                className="why-card"
                style={{
                  backgroundColor: '#F0FFED',
                  padding: '34px 28px 36px',
                  borderRadius: '0px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  minHeight: '230px',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Card Title */}
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: '1.28rem',
                    fontWeight: 600,
                    color: '#1a1f2c',
                    lineHeight: 1.3,
                    marginBottom: '12px',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {item.title}
                </h3>

                {/* Card Description */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.88rem',
                    color: '#4b5563',
                    lineHeight: 1.65,
                    margin: 0,
                    position: 'relative',
                    zIndex: 2,
                    fontWeight: 400,
                  }}
                >
                  {item.desc}
                </p>

                {/* Big Faint Watermark Number in Bottom-Right Corner */}
                <span
                  className="card-watermark"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    bottom: '-4px',
                    fontFamily: '"Cormorant Garamond", Amiri, serif',
                    fontSize: '115px',
                    fontWeight: 700,
                    color: 'rgba(32, 181, 18, 0.14)',
                    lineHeight: 0.82,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  {item.num}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-choose-grid {
          display: grid;
          grid-template-columns: 440px 1fr;
          gap: 32px;
          align-items: stretch;
        }

        .why-choose-left {
          display: flex;
          flex-direction: column;
        }

        .why-choose-photo-wrap {
          flex: 1;
          min-height: 480px;
          position: relative;
          overflow: hidden;
          background-color: #0d1b2a;
        }

        .why-choose-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          align-content: stretch;
        }

        .why-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(32, 181, 18, 0.12);
        }

        @media (max-width: 1120px) {
          .why-choose-grid {
            grid-template-columns: 380px 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 900px) {
          .why-choose-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .why-choose-photo-wrap {
            min-height: 380px;
            max-height: 480px;
          }

          .why-choose-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .why-card {
            padding: 26px 20px 28px !important;
            min-height: 200px !important;
          }
          .card-watermark {
            font-size: 85px !important;
          }
        }
      `}</style>
    </section>
  );
}
