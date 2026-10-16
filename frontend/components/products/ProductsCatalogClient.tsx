'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DIVISIONS_DATA, DivisionData } from '@/lib/divisionsData';

const WHATSAPP_PHONE = '966552400778';

export default function ProductsCatalogClient() {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  // Handle URL hash on mount and hash changes (e.g. /products#welding-division)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && DIVISIONS_DATA.some((d) => d.id === hash)) {
        setSelectedDivision(hash);
        // Scroll smoothly into view
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const displayedDivisions =
    selectedDivision === 'all'
      ? DIVISIONS_DATA
      : DIVISIONS_DATA.filter((d) => d.id === selectedDivision);

  const getSortedProducts = (products: DivisionData['products']) => {
    if (sortBy === 'az') {
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'za') {
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    }
    return products;
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '105px' }}>
      {/* Header Section */}
      <section style={{ padding: '40px 0 30px', textAlign: 'center' }}>
        <div
          className="container"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#2e3191',
              marginBottom: '12px',
            }}
          >
            PRODUCTS &amp; DIVISIONS
          </div>

          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Amiri, serif',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.35rem)',
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1.18,
              maxWidth: '980px',
              margin: '0 auto 20px',
              letterSpacing: '0.01em',
            }}
          >
            Industrial Products &amp; Engineering Supply Solutions
            <br />
            in Saudi Arabia
          </h1>

          <div
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              color: '#64748b',
              fontSize: '0.90rem',
              lineHeight: 1.75,
              fontWeight: 400,
            }}
          >
            <p style={{ marginBottom: '12px' }}>
              Orient Energy Co. is a trusted industrial products supplier in Saudi Arabia delivering high-quality
              engineering materials, industrial equipment, maintenance products, safety solutions, marine supplies,
              and operational support systems for oil &amp; gas, marine, construction, manufacturing, infrastructure,
              energy, and heavy industrial sectors.
            </p>
            <p style={{ margin: 0 }}>
              We support industrial projects across Riyadh, Jeddah, Dammam, Jubail, Yanbu, and all major industrial
              regions across the Kingdom with dependable delivery and quality-assured products.
            </p>
          </div>

          {/* Division Selector Filter Bar */}
          <div
            style={{
              marginTop: '36px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedDivision('all');
                window.history.pushState(null, '', '/products');
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedDivision === 'all' ? '#2e3191' : '#e2e8f0',
                backgroundColor: selectedDivision === 'all' ? '#2e3191' : '#f8fafc',
                color: selectedDivision === 'all' ? '#ffffff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              All Divisions ({DIVISIONS_DATA.length})
            </button>

            {DIVISIONS_DATA.map((division) => (
              <button
                key={division.id}
                type="button"
                onClick={() => {
                  setSelectedDivision(division.id);
                  window.history.pushState(null, '', `/products#${division.id}`);
                  const el = document.getElementById(division.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.80rem',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedDivision === division.id ? '#2e3191' : '#e2e8f0',
                  backgroundColor: selectedDivision === division.id ? '#2e3191' : '#f8fafc',
                  color: selectedDivision === division.id ? '#ffffff' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {division.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Divisions Content */}
      <section style={{ paddingBottom: '90px' }}>
        <div
          className="container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {displayedDivisions.map((division, divIdx) => {
            const sortedProducts = getSortedProducts(division.products);

            return (
              <div
                key={division.id}
                id={division.id}
                style={{
                  paddingTop: divIdx > 0 ? '60px' : '20px',
                  paddingBottom: '60px',
                  borderBottom: divIdx < displayedDivisions.length - 1 ? '1px solid #f1f5f9' : 'none',
                  scrollMarginTop: '110px',
                }}
              >
                {/* Division Title and Descriptions (matching screenshots) */}
                <div style={{ marginBottom: '28px' }}>
                  <h2
                    style={{
                      fontFamily: '"Cormorant Garamond", Amiri, serif',
                      fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)',
                      fontWeight: 600,
                      color: '#111827',
                      lineHeight: 1.25,
                      marginBottom: '16px',
                    }}
                  >
                    {division.headline}
                  </h2>

                  {division.description.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontSize: '0.92rem',
                        lineHeight: 1.75,
                        color: '#475569',
                        maxWidth: '1100px',
                        marginBottom: '12px',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Sub-Category Pills (for Welding etc.) */}
                {division.pills && division.pills.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '36px',
                    }}
                  >
                    {division.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          color: '#334155',
                        }}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Subcategory Cards with Images (for Mechanical, Electrical, Fasteners, Coatings) */}
                {division.subcategories && division.subcategories.length > 0 && (
                  <div style={{ marginBottom: '40px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '16px',
                      }}
                    >
                      {division.subcategories.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          }}
                        >
                          {sub.image && (
                            <div
                              style={{
                                position: 'relative',
                                width: '100%',
                                height: '120px',
                                backgroundColor: '#f1f5f9',
                              }}
                            >
                              <Image
                                src={sub.image}
                                alt={sub.name}
                                fill
                                sizes="220px"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                          )}
                          <div
                            style={{
                              padding: '12px',
                              textAlign: 'center',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: '#1e293b',
                              marginTop: 'auto',
                            }}
                          >
                            {sub.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Range & Applications Lists */}
                {(division.productRange || division.applications) && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        division.productRange && division.applications
                          ? 'repeat(auto-fit, minmax(320px, 1fr))'
                          : '1fr',
                      gap: '30px',
                      marginBottom: '40px',
                      padding: '24px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {division.productRange && (
                      <div>
                        <h4
                          style={{
                            fontSize: '0.98rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            marginBottom: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {division.productRangeTitle || 'Product Range'}
                        </h4>
                        <ul
                          style={{
                            listStyleType: 'disc',
                            paddingLeft: '20px',
                            margin: 0,
                            color: '#475569',
                            fontSize: '0.88rem',
                            lineHeight: 1.8,
                          }}
                        >
                          {division.productRange.map((item, iIdx) => (
                            <li key={iIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {division.applications && (
                      <div>
                        <h4
                          style={{
                            fontSize: '0.98rem',
                            fontWeight: 700,
                            color: '#0f172a',
                            marginBottom: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {division.applicationsTitle || 'Applications'}
                        </h4>
                        <ul
                          style={{
                            listStyleType: 'disc',
                            paddingLeft: '20px',
                            margin: 0,
                            color: '#475569',
                            fontSize: '0.88rem',
                            lineHeight: 1.8,
                          }}
                        >
                          {division.applications.map((app, aIdx) => (
                            <li key={aIdx}>{app}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Products Section Header + Sorting Controls */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.65rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        fontFamily: "'Poppins', sans-serif",
                        margin: 0,
                      }}
                    >
                      Products
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Showing all {division.products.length} results
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label
                      htmlFor={`sort-${division.id}`}
                      style={{ fontSize: '0.82rem', color: '#64748b' }}
                    >
                      Sort:
                    </label>
                    <select
                      id={`sort-${division.id}`}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.82rem',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="default">Default sorting</option>
                      <option value="az">Name: A to Z</option>
                      <option value="za">Name: Z to A</option>
                    </select>
                  </div>
                </div>

                {/* 4-Column Product Grid (Matching exact screenshots) */}
                <div className="product-grid-4col">
                  {sortedProducts.map((product) => {
                    const waMessage = encodeURIComponent(
                      `Hello Orient Energy Trading Co., I am interested in ordering/inquiring about: ${product.title} from ${division.name}.`
                    );
                    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${waMessage}`;

                    return (
                      <div
                        key={product.id}
                        className="product-catalog-card"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {/* Square Image Box */}
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '160px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '14px',
                            backgroundColor: '#ffffff',
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={160}
                            height={150}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              transition: 'transform 0.25s ease',
                            }}
                            className="product-catalog-thumb"
                          />
                        </div>

                        {/* Title */}
                        <h4
                          style={{
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            lineHeight: 1.45,
                            minHeight: '44px',
                            marginBottom: '16px',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                          title={product.title}
                        >
                          {product.title}
                        </h4>

                        {/* Order on WhatsApp Button (Matching screenshot pill style) */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-order-pill"
                          aria-label={`Order ${product.title} on WhatsApp`}
                        >
                          {/* WhatsApp Green Icon */}
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              backgroundColor: '#25D366',
                              color: '#ffffff',
                              fontSize: '14px',
                              flexShrink: 0,
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.776.852 2.796.852 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm0 10.428c-.878 0-1.579-.241-2.428-.737l-.173-.102-1.802.472.481-1.758-.112-.178c-.546-.867-.834-1.604-.834-2.359 0-2.628 2.139-4.767 4.768-4.767 2.629 0 4.768 2.139 4.768 4.767 0 2.628-2.139 4.767-4.768 4.767zm7.969-4.662c-.044-.074-.162-.119-.34-.208-.178-.089-1.054-.52-1.217-.58-.163-.059-.281-.089-.4.089-.119.178-.46 5.79-.564.708-.104.119-.208.134-.386.044-.178-.089-.751-.277-1.431-.883-.529-.471-.887-1.054-.991-1.232-.104-.178-.011-.274.078-.363.08-.08.178-.208.267-.312.089-.104.119-.178.178-.297.059-.119.03-.223-.015-.312-.044-.089-.4-1.025-.548-1.405-.144-.37-.291-.32-.4-.326l-.341-.006c-.119 0-.312.044-.475.223s-.623.609-.623 1.485.638 1.722.727 1.841c.089.119 1.256 1.918 3.043 2.689 1.787.771 1.787.514 2.107.484.32-.03 1.054-.43 1.202-.846.148-.416.148-.772.104-.846z" />
                            </svg>
                          </span>

                          <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: 600, color: '#25D366', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order On</span>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>WhatsApp</span>
                          </span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Sourcing Banner at Bottom */}
          <div className="product-cta-box" style={{ marginTop: '70px' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Amiri, serif',
                  fontSize: '2.1rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '14px',
                  lineHeight: 1.25,
                }}
              >
                Need Custom Specifications or Bulk BOM Sourcing?
              </h3>
              <p
                style={{
                  fontSize: '0.90rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.7,
                  marginBottom: '26px',
                }}
              >
                From Aramco-compliant valves, structural steel, and high-tensile fasteners to certified marine survival gear
                and power equipment, our engineering procurement team is ready to quote on your exact Bill of Materials.
              </p>
              <Link href="/contact" className="product-cta-btn">
                Request Product Quote &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .product-grid-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .product-catalog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          border-color: #2e3191;
        }

        .product-catalog-card:hover .product-catalog-thumb {
          transform: scale(1.05);
        }

        .whatsapp-order-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #000000;
          color: #ffffff;
          padding: 6px 14px 6px 6px;
          border-radius: 9999px;
          text-decoration: none;
          margin-top: auto;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .whatsapp-order-pill:hover {
          background-color: #111827;
          transform: translateY(-1px);
        }

        .product-cta-box {
          background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
          border-radius: 12px;
          padding: 50px 36px;
          box-shadow: 0 14px 40px rgba(7, 17, 56, 0.18);
        }

        .product-cta-btn {
          display: inline-block;
          background-color: #20b512;
          color: #ffffff;
          padding: 14px 36px;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.86rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 0px;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .product-cta-btn:hover {
          background-color: #179b0e;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(32, 181, 18, 0.35);
        }

        @media (max-width: 1024px) {
          .product-grid-4col {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 768px) {
          .product-grid-4col {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .product-grid-4col {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
