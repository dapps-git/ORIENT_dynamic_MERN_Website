'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface DivisionCard {
  id: string;
  slug: string;
  name: string;
  image: string;
  productCount?: number;
}

const DEFAULT_DIVISIONS: DivisionCard[] = [
  { id: 'mechanical-division', slug: 'mechanical-division', name: 'Mechanical Division', image: '/categories/mechanical-supply-division.png' },
  { id: 'electrical-division', slug: 'electrical-division', name: 'Electrical Division', image: '/categories/electrical-ups-systems.jpg' },
  { id: 'welding-division', slug: 'welding-division', name: 'Welding Division', image: '/categories/welding-safety.jpg' },
  { id: 'marine-division', slug: 'marine-division', name: 'Marine Division', image: '/categories/marine-division.jpg' },
  { id: 'industrial-hoses-hose-couplings', slug: 'industrial-hoses-hose-couplings', name: 'Industrial Hoses & Hose Couplings', image: '/categories/industrial-hoses-hose-couplings.jpg' },
  { id: 'lubricants-chemicals', slug: 'lubricants-chemicals', name: 'Lubricants & Chemicals Division', image: '/categories/lubricants-chemicals.jpg' },
  { id: 'tools-maintenance', slug: 'tools-maintenance', name: 'Tools & Maintanance Division', image: '/categories/tools-maintenance.jpg' },
  { id: 'lifting-material-handling', slug: 'lifting-material-handling', name: 'Lifting & Material Handling', image: '/categories/lifting-material-handling.jpg' },
  { id: 'ppe-safety-equipment', slug: 'ppe-safety-equipment', name: 'Ppe & Safety Equipment', image: '/categories/ppe-safety-equpments.jpg' },
  { id: 'steel-structural-materials-division', slug: 'steel-structural-materials-division', name: 'Steel & Structural Materials Division', image: '/categories/steel-structural-materials-division.jpg' },
  { id: 'power-system', slug: 'power-system', name: 'Power System', image: '/categories/power-system.jpg' },
  { id: 'auxiliary-systems', slug: 'auxiliary-systems', name: 'Auxiliary Systems', image: '/categories/auxiliary-systems.jpg' },
  { id: 'fasteners-division', slug: 'fasteners-division', name: 'Fasteners Division', image: '/categories/fasteners.jpg' },
  { id: 'coatings-surface-protection', slug: 'coatings-surface-protection', name: 'Coatings & Surface Protection', image: '/categories/coatings-surface-protection.png' },
  { id: 'substructure', slug: 'substructure', name: 'Substructure', image: '/categories/substructure.png' },
];

const FAQ_ITEMS = [
  {
    q: 'Who is the best industrial products supplier in Saudi Arabia?',
    a: 'Orient Energy Trading Company is widely recognized as one of the best and most dependable industrial products suppliers in Saudi Arabia, delivering certified mechanical supplies, electrical switchgear, welding apparatus, safety gear, and structural materials to Saudi Aramco, SABIC, SEC, and major EPC contractors.',
  },
  {
    q: 'Where can I find reliable industrial equipment suppliers in Riyadh, Jeddah, Dammam, and Jubail?',
    a: 'Orient Energy provides fast and reliable distribution across all major industrial hubs in the Kingdom, including Dammam, Jubail, Al Khobar, Riyadh, Jeddah, Yanbu, and Ras Al Khair, backed by localized warehousing and rapid project site delivery.',
  },
  {
    q: 'Which company supplies industrial mechanical products in Saudi Arabia?',
    a: 'Orient Energy supplies an extensive range of industrial mechanical products, including API 600/609 gate, globe, ball, and butterfly valves, ASME B16.5 flanges, forged fittings, seamless steel pipes, high-pressure hammer unions, and hydraulic adapters.',
  },
  {
    q: 'Who supplies industrial electrical products in Saudi Arabia?',
    a: 'Orient Energy Co. provides industrial electrical equipment including power cables, switchgear systems, circuit breakers, electric motors, automation panels, transformers, UPS systems, and industrial lighting solutions across Saudi Arabia.',
  },
  {
    q: 'Where can I buy welding equipment and welding consumables in Saudi Arabia?',
    a: 'You can source certified welding equipment, Victor gas cutting torches, regulators, welding cables, auto-darkening helmets, and Lincoln Electric / ESAB consumables directly from Orient Energy Trading Company.',
  },
  {
    q: 'Who is a reliable marine and offshore products supplier in Saudi Arabia?',
    a: 'Orient Energy supplies SOLAS-approved marine equipment, lifejackets, inflatable life rafts, immersion suits, mooring ropes, marine hardware, and offshore deck supplies for marine logistics and offshore drilling rigs.',
  },
  {
    q: 'Which company supplies industrial hoses and hose fittings in Saudi Arabia?',
    a: 'Orient Energy supplies heavy-duty industrial hoses, hydraulic hoses, chemical transfer hoses, breathing air hoses, Camlock quick couplings, and Bauer fittings engineered for demanding refinery and rig operations.',
  },
  {
    q: 'Where can I find industrial lubricants and specialty chemicals suppliers in Saudi Arabia?',
    a: 'Orient Energy distributes premium industrial lubricants, Chevron Delo engine oils, hydraulic oils, synthetic gear lubricants, degreasers, and corrosion inhibitors tailored for heavy machinery and industrial plants.',
  },
  {
    q: 'Who supplies industrial tools and maintenance equipment in Saudi Arabia?',
    a: 'Orient Energy is a premier distributor of heavy-duty power tools, pneumatic tools, hand toolboxes, torque wrenches, and plant maintenance equipment from top global brands like DEWALT, Milwaukee, and TOTAL Tools.',
  },
  {
    q: 'Which company supplies lifting equipment and material handling products in Saudi Arabia?',
    a: 'Orient Energy provides certified lifting chain slings, wire rope slings, lever hoists, manual chain blocks, Crosby shackles, beam clamps, and material handling solutions fully compliant with Saudi Aramco lifting safety standards.',
  },
  {
    q: 'Where can I buy PPE and industrial safety equipment in Saudi Arabia?',
    a: 'Orient Energy delivers full-body harnesses, 3M respiratory masks, safety helmets, flame-resistant coveralls (FRC), anti-impact gloves, and safety footwear certified to ANSI and EN safety norms.',
  },
  {
    q: 'Who supplies structural steel and steel materials in Saudi Arabia?',
    a: 'Orient Energy stocks and supplies structural steel beams (HEA/HEB, IPE, UB/UC), steel plates, equal/unequal angles, channels, square hollow sections, and carbon steel seamless pipes with full mill test certificates (MTC).',
  },
  {
    q: 'Which company provides industrial power systems in Saudi Arabia?',
    a: 'Orient Energy supplies robust industrial diesel generators, portable power packs, load banks, and custom power distribution panels for prime and standby power needs across industrial construction and remote rig camps.',
  },
  {
    q: 'Who supplies industrial products for oil & gas companies in Saudi Arabia?',
    a: 'Orient Energy specializes in certified oil & gas procurement, supporting drilling contractors, offshore operators, refineries, and petrochemical complexes with rapid lead times and full quality compliance.',
  },
  {
    q: 'Which industrial supplier supports large infrastructure and industrial projects in Saudi Arabia?',
    a: 'Orient Energy is a trusted supply partner for mega-infrastructure developments, Vision 2030 initiatives, and industrial zone expansions across the Kingdom, providing turnkey materials procurement and vendor consolidation.',
  },
  {
    q: 'Why choose Orient Energy Co. as your industrial supplier in Saudi Arabia?',
    a: 'Clients choose Orient Energy for our 20+ years of proven operational track record, strict adherence to international quality standards, extensive ready-stock inventory in Eastern Province, and customer-first technical support.',
  },
];

export default function ProductsCatalogClient() {
  const [divisions, setDivisions] = useState<DivisionCard[]>(DEFAULT_DIVISIONS);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(3); // 4th item open by default like screenshot 3

  // Load custom/admin updated division images if available
  useEffect(() => {
    fetch('/api/divisions')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setDivisions(data.data);
        }
      })
      .catch(() => {
        // Fallback to localStorage if offline
        const local = localStorage.getItem('orient_custom_divisions');
        if (local) {
          try {
            setDivisions(JSON.parse(local));
          } catch {
            // keep defaults
          }
        }
      });
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
      {/* Header Section (Left Aligned as requested) */}
      <section style={{ padding: '36px 0 24px', textAlign: 'left' }}>
        <div
          className="container"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {/* Tag */}
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
            PRODUCTS
          </div>

          {/* Main Title */}
          <h1
            className="products-hero-title"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(1.35rem, 3.2vw, 2.35rem)',
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.28,
              maxWidth: '980px',
              margin: '0 0 16px 0',
              letterSpacing: '-0.01em',
              textAlign: 'left',
            }}
          >
            Industrial Products &amp; Engineering Supply Solutions in Saudi Arabia
          </h1>

          {/* Description */}
          <div style={{ maxWidth: '980px', margin: '0' }}>
            <p
              className="products-hero-desc"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.84rem',
                lineHeight: 1.68,
                color: '#475569',
                margin: '0 0 14px 0',
                textAlign: 'left',
              }}
            >
              Orient Energy Co. is a trusted Industrial products supplier in Saudi Arabia delivering high-quality engineering materials, industrial equipment, maintenance products, safety solutions, marine supplies, and operational support systems for oil &amp; gas, marine, construction, manufacturing, infrastructure, energy, and heavy industrial sectors.
            </p>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.84rem',
                lineHeight: 1.68,
                color: '#475569',
                margin: '0',
                textAlign: 'left',
              }}
            >
              We support industrial projects across Riyadh, Jeddah, Dammam, Jubail, Yanbu, and other major industrial regions across the Kingdom with reliable industrial supply solutions and quality-assured products.
            </p>
          </div>
        </div>
      </section>

      {/* 15 Division Category Cards Grid (Matching Image 2 Reference) */}
      <section style={{ padding: '10px 0 60px' }}>
        <div
          className="container"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <div
            className="divisions-card-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {divisions.map((div) => (
              <Link
                key={div.id || div.slug}
                href={`/products/${div.slug}`}
                className="division-showcase-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
                  position: 'relative',
                }}
              >
                {/* Division Product Collage Image Container */}
                <div
                  style={{
                    height: '220px',
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 20px',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Image
                    src={div.image || '/categories/all-fittings.jpeg'}
                    alt={div.name}
                    width={320}
                    height={200}
                    style={{
                      maxHeight: '190px',
                      maxWidth: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      transition: 'transform 0.35s ease',
                    }}
                    className="division-card-img"
                  />
                </div>

                {/* Bottom Solid Green Bar with Division Title + Circular Arrow Button */}
                <div
                  className="division-card-bottom-bar"
                  style={{
                    backgroundColor: '#0b7a3d',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '48px',
                    transition: 'background-color 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      color: '#ffffff',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {div.name}
                  </span>

                  {/* Circular White Arrow Badge */}
                  <span
                    className="division-card-arrow-circle"
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      color: '#0b7a3d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
                      transition: 'transform 0.22s ease',
                      flexShrink: 0,
                      marginLeft: '8px',
                    }}
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Matching Image 3 Reference) */}
      <section
        style={{
          padding: '60px 0 80px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #f1f5f9',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {/* Centered Heading */}
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
              fontWeight: 700,
              color: '#111827',
              textAlign: 'center',
              marginBottom: '32px',
              letterSpacing: '-0.01em',
            }}
          >
            FAQ
          </h2>

          {/* 16 FAQ Accordion Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px',
                    border: '1px solid #eef2f6',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    boxShadow: isOpen ? '0 4px 14px rgba(0, 0, 0, 0.05)' : 'none',
                  }}
                >
                  {/* Question Header */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: isOpen ? '#0b7a3d' : '#1e293b',
                      lineHeight: 1.45,
                    }}
                  >
                    <span>{item.q}</span>
                    <span
                      style={{
                        marginLeft: '14px',
                        fontSize: '0.8rem',
                        color: isOpen ? '#0b7a3d' : '#64748b',
                        fontWeight: 700,
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                      }}
                    >
                      &#9660;
                    </span>
                  </button>

                  {/* Expandable Answer */}
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 20px 18px',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.82rem',
                        lineHeight: 1.7,
                        color: '#475569',
                        borderTop: '1px solid #f1f5f9',
                        paddingTop: '12px',
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .division-showcase-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(11, 122, 61, 0.18) !important;
          border-color: #0b7a3d !important;
        }

        .division-showcase-card:hover .division-card-img {
          transform: scale(1.05);
        }

        .division-showcase-card:hover .division-card-arrow-circle {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .divisions-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
        }

        @media (max-width: 640px) {
          .divisions-card-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          .division-showcase-card div:first-child {
            height: 180px !important;
          }
        }
      `}</style>
    </div>
  );
}
