'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SectorItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
}

const SECTORS: SectorItem[] = [
  {
    id: 'oil-gas',
    title: 'Oil & Gas',
    tagline: 'High-Integrity Piping, Valves & Flanges for Upstream, Midstream & Downstream Operations',
    image: '/sectors/oil-gas.png',
  },
  {
    id: 'marine-offshore',
    title: 'Marine & Offshore',
    tagline: 'Marine-Grade Valves, Deck Machinery, Rigging Hardware & Harsh-Environment Supplies',
    image: '/sectors/marine-offshore.png',
  },
  {
    id: 'construction',
    title: 'Construction & Infrastructure',
    tagline: 'Heavy Structural Steel Bolting, Crane Rigging & Job-Site Distribution Solutions',
    image: '/sectors/construction.png',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Industry',
    tagline: 'Precision Motors, Pneumatic Actuators, Industrial Bearings & Plant Consumables',
    image: '/sectors/manufacturing.jpg',
  },
  {
    id: 'power-energy',
    title: 'Energy & Power Sector',
    tagline: 'High-Voltage Switchgear, Busbars, Substations & Transmission Hardware',
    image: '/sectors/power-energy.png',
  },
  {
    id: 'heavy-engineering',
    title: 'Heavy Engineering',
    tagline: 'Certified Spreader Beams, Hydraulic Jacking Systems & Industrial Machine Tooling',
    image: '/sectors/heavy-engineering.jpg',
  },
  {
    id: 'maintenance',
    title: 'Industrial Maintenance',
    tagline: 'Rapid MRO Procurement, Flange Facers, Hydraulic Torque Wrenches & Workshop Tooling',
    image: '/sectors/maintenance.jpeg',
  },
  {
    id: 'metals-fabrication',
    title: 'Fabrication & Welding',
    tagline: 'Heavy Inverter Welders, Victor Gas Regulators, Electrodes & Plasma Cutting Systems',
    image: '/sectors/metals-fabrication.png',
  },
  {
    id: 'water-utility',
    title: 'Water & Utility Projects',
    tagline: 'Ductile Iron Gate Valves, High-Volume Submersible Pumps & Reverse Osmosis Fittings',
    image: '/sectors/water-utility.jpg',
  },
];

const PAIRS: [number, number][] = [
  [0, 1], // Oil & Gas + Marine & Offshore
  [2, 3], // Construction & Infrastructure + Manufacturing
  [4, 5], // Energy & Power + Heavy Engineering
  [6, 7], // Industrial Maintenance + Fabrication & Welding
  [8, 0], // Water & Utility + Oil & Gas
];

export default function SectorsTwoBoxShowcase() {
  const [pairStep, setPairStep] = useState(0);

  // Slow-motion cross-dissolve: transitions smoothly every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPairStep((prev) => (prev + 1) % PAIRS.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const [leftIndex, rightIndex] = PAIRS[pairStep];
  const leftSector = SECTORS[leftIndex];
  const rightSector = SECTORS[rightIndex];

  return (
    <section
      className="sectors-two-box-showcase"
      style={{
        backgroundColor: '#ffffff',
        padding: '20px 0 24px',
        borderBottom: '1px solid #ECE7DE',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Core Industry Sectors"
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          overflow: 'hidden',
        }}
      >
        {/* Strictly 2 Static Boxes: Zero Border Radius, No Cut-Off Edges, Smooth Slow-Motion Dissolve */}
        <div
          className="sectors-two-box-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Box 1 (Left Sector) */}
          <Link
            href={`/sectors/${leftSector.id}`}
            className="sector-box-card"
            style={{
              position: 'relative',
              height: '340px',
              borderRadius: '0px',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '28px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#071138',
            }}
          >
            {SECTORS.map((sec, idx) => {
              const isActive = idx === leftIndex;
              return (
                <div
                  key={`left-${sec.id}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: isActive ? 2 : 1,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <Image
                    src={sec.image}
                    alt={sec.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 600px"
                    className="sector-box-img"
                    style={{
                      objectFit: 'cover',
                      borderRadius: '0px',
                    }}
                  />
                  {/* Deep Dark Contrast Overlay (Eliminates white flash completely) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(6, 14, 46, 0.12) 0%, rgba(6, 14, 46, 0.54) 50%, rgba(6, 14, 46, 0.94) 100%)',
                      zIndex: 1,
                    }}
                  />
                  {/* Sector Title & Tagline */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '28px',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                    className="sector-content-inner"
                  >
                    <h3
                      className="sector-box-title"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.85rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.25,
                        marginBottom: '8px',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      {sec.title}
                    </h3>
                    <p
                      className="sector-box-tagline"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.84rem',
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255, 0.88)',
                        margin: 0,
                        maxWidth: '480px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {sec.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </Link>

          {/* Box 2 (Right Sector) */}
          <Link
            href={`/sectors/${rightSector.id}`}
            className="sector-box-card"
            style={{
              position: 'relative',
              height: '340px',
              borderRadius: '0px',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '28px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#071138',
            }}
          >
            {SECTORS.map((sec, idx) => {
              const isActive = idx === rightIndex;
              return (
                <div
                  key={`right-${sec.id}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: isActive ? 2 : 1,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <Image
                    src={sec.image}
                    alt={sec.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 600px"
                    className="sector-box-img"
                    style={{
                      objectFit: 'cover',
                      borderRadius: '0px',
                    }}
                  />
                  {/* Deep Dark Contrast Overlay (Eliminates white flash completely) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(6, 14, 46, 0.12) 0%, rgba(6, 14, 46, 0.54) 50%, rgba(6, 14, 46, 0.94) 100%)',
                      zIndex: 1,
                    }}
                  />
                  {/* Sector Title & Tagline */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '28px',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                    className="sector-content-inner"
                  >
                    <h3
                      className="sector-box-title"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.85rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.25,
                        marginBottom: '8px',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      {sec.title}
                    </h3>
                    <p
                      className="sector-box-tagline"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.84rem',
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255, 0.88)',
                        margin: 0,
                        maxWidth: '480px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {sec.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </Link>
        </div>
      </div>

      <style>{`
        .sector-box-card {
          border-radius: 0px !important;
        }
        .sector-box-card .sector-box-img {
          border-radius: 0px !important;
        }
        .sector-box-card:hover .sector-box-img {
          transform: scale(1.04);
          transition: transform 0.6s ease;
        }
        @media (max-width: 768px) {
          .sectors-two-box-showcase {
            padding: 12px 0 16px !important;
          }
          .sectors-two-box-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .sector-box-card {
            height: 180px !important;
            padding: 0 !important;
            border-radius: 0px !important;
          }
          .sector-content-inner {
            padding: 12px 10px !important;
          }
          .sector-box-title {
            font-size: 0.85rem !important;
            margin-bottom: 2px !important;
            line-height: 1.2 !important;
          }
          .sector-box-tagline {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
