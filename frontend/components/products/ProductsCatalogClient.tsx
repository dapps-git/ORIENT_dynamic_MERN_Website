'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DIVISIONS_DATA, DivisionData, getProductSlug } from '@/lib/divisionsData';

const WHATSAPP_PHONE = '966552400778';

export default function ProductsCatalogClient() {
  const [divisions, setDivisions] = useState<DivisionData[]>(DIVISIONS_DATA);
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const trainItems = useMemo(
    () => [
      { id: 'all', name: `All Divisions (${divisions.length})` },
      ...divisions.map((d) => ({ id: d.id, name: d.name })),
    ],
    [divisions]
  );

  const handleDivisionClick = (id: string) => {
    setSelectedDivision(id);
    if (id === 'all') {
      window.history.pushState(null, '', '/products');
      const catalogEl = document.getElementById('catalog-products-container');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.history.pushState(null, '', `/products#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  // Load newly added products from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/products?limit=200')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const backendProducts = data.data;
          setDivisions((prevDivisions) => {
            return prevDivisions.map((div) => {
              const matching = backendProducts.filter((bp: any) => {
                const bSlug = bp.divisionSlug || (bp.category && bp.category.slug);
                return bSlug === div.id;
              });

              if (matching.length === 0) return div;

              const existingTitles = new Set(div.products.map((p) => p.title.toLowerCase().trim()));
              const newItems = matching
                .filter((bp: any) => !existingTitles.has(bp.title.toLowerCase().trim()))
                .map((bp: any) => ({
                  id: String(bp._id || bp.slug),
                  title: bp.title,
                  image: bp.image || (bp.images && bp.images[0]) || '/categories/all-fittings.jpeg',
                }));

              if (newItems.length === 0) return div;
              return {
                ...div,
                products: [...newItems, ...div.products],
              };
            });
          });
        }
      })
      .catch(() => {});
  }, []);

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
      ? divisions
      : divisions.filter((d) => d.id === selectedDivision);

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
            className="catalog-hero-title"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(0.96rem, 2.3vw, 1.65rem)',
              fontWeight: 500,
              color: '#111827',
              lineHeight: 1.3,
              maxWidth: '960px',
              margin: '0 auto 16px',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
          >
            <span className="catalog-hero-line-1">
              Industrial Products &amp; Engineering Supply
            </span>
            <span className="catalog-hero-line-2">
              Solutions in Saudi Arabia
            </span>
          </h1>

          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p className="catalog-hero-desc">
              Orient Energy delivers certified industrial supplies, engineering materials,
              <br className="desktop-desc-break" />
              and maintenance equipment with dependable procurement across Saudi Arabia,
              <br className="desktop-desc-break" />
              supporting critical oil &amp; gas, infrastructure, and heavy industrial operations.
            </p>
          </div>

          {/* Division Train Effect - Clean Text Marquee (No Boxes, Pure Text Stream) */}
          <div className="division-train-outer">
            <div className="division-train-track">
              {trainItems.map((item, idx) => {
                const isActive = selectedDivision === item.id;
                return (
                  <div key={`train-1-${item.id}-${idx}`} className="division-train-item-wrap">
                    <button
                      type="button"
                      onClick={() => handleDivisionClick(item.id)}
                      className={`division-train-text-btn ${isActive ? 'is-active' : ''}`}
                    >
                      {item.name}
                    </button>
                    <span className="division-train-bullet">&bull;</span>
                  </div>
                );
              })}
              {trainItems.map((item, idx) => {
                const isActive = selectedDivision === item.id;
                return (
                  <div key={`train-2-${item.id}-${idx}`} className="division-train-item-wrap" aria-hidden="true">
                    <button
                      type="button"
                      onClick={() => handleDivisionClick(item.id)}
                      className={`division-train-text-btn ${isActive ? 'is-active' : ''}`}
                      tabIndex={-1}
                    >
                      {item.name}
                    </button>
                    <span className="division-train-bullet">&bull;</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clean text filter indicator when single division is selected */}
          {selectedDivision !== 'all' && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Filtered to:{' '}
                <strong style={{ color: '#111827', fontWeight: 600 }}>
                  {divisions.find((d) => d.id === selectedDivision)?.name || selectedDivision}
                </strong>
                {' '}&bull;{' '}
              </span>
              <button
                type="button"
                onClick={() => handleDivisionClick('all')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2e3191',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                View All Divisions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Divisions Content */}
      <section id="catalog-products-container" style={{ paddingBottom: '90px' }}>
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
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                    <h2
                      className="division-headline-title"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.65rem)',
                        fontWeight: 500,
                        color: '#111827',
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      <Link
                        href={`/products/${division.id}`}
                        style={{ color: '#111827', textDecoration: 'none' }}
                      >
                        {division.headline}
                      </Link>
                    </h2>

                    <Link
                      href={`/products/${division.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 18px',
                        backgroundColor: '#FAF7F2',
                        border: '1px solid #ECE7DE',
                        borderRadius: '9999px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#2e3191',
                        textDecoration: 'none',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>Open Division Page</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>

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

                    const prodSlug = product.slug || getProductSlug(product.title);

                    return (
                      <div
                        key={product.id}
                        className="product-catalog-card"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '18px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                          transition: 'all 0.28s ease',
                        }}
                      >
                        {/* Clickable link to Product Detail Page */}
                        <Link
                          href={`/product/${prodSlug}`}
                          style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                          className="product-card-link"
                        >
                          {/* Square Image Box */}
                          <div
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: '165px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '14px',
                              backgroundColor: '#ffffff',
                              overflow: 'hidden',
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
                                transition: 'transform 0.28s ease',
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
                              transition: 'color 0.2s ease',
                            }}
                            title={product.title}
                            className="product-card-title"
                          >
                            {product.title}
                          </h4>
                        </Link>

                        {/* White Glossy Effect Order Now Button */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-order-now-glossy"
                          aria-label={`Order ${product.title}`}
                        >
                          Order Now
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
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
                  fontWeight: 500,
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
        .catalog-hero-line-1 {
          display: block;
          white-space: nowrap;
        }

        .catalog-hero-line-2 {
          display: block;
          margin-top: 4px;
          white-space: nowrap;
        }

        .catalog-hero-desc {
          color: #64748b;
          font-size: 0.84rem;
          line-height: 1.68;
          font-weight: 400;
          margin: 0;
          text-align: center;
        }

        /* Division Train Effect - Pure Text Stream (No Boxes) */
        .division-train-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-top: 36px;
          padding: 8px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          user-select: none;
        }

        .division-train-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: divisionTrainScroll 45s linear infinite;
        }

        .division-train-track:hover {
          animation-play-state: paused;
        }

        .division-train-item-wrap {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }

        .division-train-text-btn {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          padding: 6px 12px !important;
          margin: 0 !important;
          font-family: 'Montserrat', sans-serif !important;
          font-size: 0.85rem !important;
          font-weight: 500 !important;
          color: #475569 !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          transition: color 0.2s ease, transform 0.15s ease !important;
          line-height: 1.4 !important;
          border-radius: 0 !important;
        }

        .division-train-text-btn:hover {
          color: #2e3191 !important;
          transform: translateY(-1px);
        }

        .division-train-text-btn.is-active {
          color: #2e3191 !important;
          font-weight: 700 !important;
          text-decoration: underline !important;
          text-underline-offset: 6px !important;
          text-decoration-thickness: 2px !important;
        }

        .division-train-bullet {
          color: #cbd5e1;
          font-size: 0.75rem;
          margin: 0 4px;
          user-select: none;
          display: inline-block;
        }

        @keyframes divisionTrainScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

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

        /* White Glossy Effect Order Now Button - Reduced font & button size */
        .btn-order-now-glossy,
        .btn-order-now-blue {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          color: #0f172a !important;
          padding: 6px 12px;
          border-radius: 5px;
          font-family: 'Montserrat', sans-serif !important;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          margin-top: auto;
          width: 100%;
          text-align: center;
          border: 1px solid #dcdfe4;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;
          transition: all 0.2s ease;
        }

        .btn-order-now-glossy:hover,
        .btn-order-now-blue:hover {
          background: linear-gradient(180deg, #ffffff 0%, #edf2f7 100%);
          border-color: #cbd5e1;
          color: #2e3191 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffffff;
        }

        .product-cta-box {
          background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
          border-radius: 12px;
          padding: 42px 28px;
          box-shadow: 0 14px 40px rgba(7, 17, 56, 0.18);
        }

        .product-cta-btn {
          display: inline-block;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          color: #071138 !important;
          padding: 8px 24px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2), inset 0 1px 0 #ffffff;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .product-cta-btn:hover {
          background: linear-gradient(180deg, #ffffff 0%, #edf2f7 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.35), inset 0 1px 0 #ffffff;
        }

        @media (max-width: 1024px) {
          .product-grid-4col {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 768px) {
          .catalog-hero-title {
            font-size: clamp(0.90rem, 4.2vw, 1.22rem) !important;
            line-height: 1.34 !important;
          }
          .catalog-hero-desc {
            font-size: 0.78rem !important;
            line-height: 1.58 !important;
            max-width: 340px !important;
            margin: 0 auto !important;
          }
          .desktop-desc-break {
            display: none !important;
          }
          .division-headline-title {
            font-size: clamp(1.0rem, 4.4vw, 1.25rem) !important;
            line-height: 1.32 !important;
          }
          .product-grid-4col {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
          .product-cta-box {
            padding: 32px 18px !important;
          }
        }

        @media (max-width: 540px) {
          .division-train-outer {
            margin-top: 24px;
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
