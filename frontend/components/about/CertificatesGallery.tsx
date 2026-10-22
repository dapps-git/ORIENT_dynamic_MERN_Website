'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export interface CertificateItem {
  title: string;
  image: string;
}

interface CertificatesGalleryProps {
  certificates: CertificateItem[];
}

export default function CertificatesGallery({ certificates }: CertificatesGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % certificates.length));
  }, [certificates.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + certificates.length) % certificates.length));
  }, [certificates.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  const activeCert = selectedIndex !== null ? certificates[selectedIndex] : null;

  return (
    <>
      {/* 4 Certificates Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '22px',
          alignItems: 'start',
        }}
        className="about-certs-grid"
      >
        {certificates.map((cert, i) => (
          <div
            key={cert.title + i}
            onClick={() => setSelectedIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`View full certificate: ${cert.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedIndex(i);
              }
            }}
            className="about-cert-card scroll-reveal"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '390px' }}>
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{
                  objectFit: 'contain',
                  padding: '12px',
                  display: 'block',
                }}
              />

              {/* Hover Overlay with Zoom Icon */}
              <div className="about-cert-overlay">
                <span className="about-cert-zoom-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span>Click to view full certificate</span>
                </span>
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderTop: '1px solid #f1f5f9',
                backgroundColor: '#fafbfc',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  lineHeight: 1.35,
                }}
              >
                {cert.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full View Lightbox Modal */}
      {activeCert && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(3, 7, 24, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeInModal 0.2s ease',
          }}
        >
          {/* Top Bar with Title and Close Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '920px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              color: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  backgroundColor: 'rgba(32, 181, 18, 0.2)',
                  color: '#20b512',
                  border: '1px solid rgba(32, 181, 18, 0.4)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                {selectedIndex + 1} of {certificates.length}
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.90rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  maxWidth: '560px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {activeCert.title}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close full view"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.25rem',
                lineHeight: 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>
          </div>

          {/* Certificate Image Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              height: '80vh',
              maxHeight: '800px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={activeCert.image}
                alt={activeCert.title}
                fill
                priority
                sizes="(max-width: 1024px) 95vw, 820px"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous certificate"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(7, 17, 56, 0.85)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.4rem',
                lineHeight: 1,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#20b512';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(7, 17, 56, 0.85)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next certificate"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(7, 17, 56, 0.85)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.4rem',
                lineHeight: 1,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#20b512';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(7, 17, 56, 0.85)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ›
            </button>
          </div>

          {/* Bottom Hint */}
          <div
            style={{
              marginTop: '12px',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.65)',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Click anywhere outside or press Esc to close
          </div>
        </div>
      )}

      <style jsx>{`
        .about-cert-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12) !important;
          border-color: #2e3191 !important;
        }

        .about-cert-overlay {
          position: absolute;
          inset: 0;
          background: rgba(7, 17, 56, 0.45);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          padding: 16px;
        }

        .about-cert-card:hover .about-cert-overlay {
          opacity: 1;
        }

        .about-cert-zoom-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #20b512;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          box-shadow: 0 6px 16px rgba(32, 181, 18, 0.4);
        }

        @keyframes fadeInModal {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
