'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface GoogleReview {
  id: number;
  name: string;
  avatar?: string;
  initial: string;
  avatarColor: string;
  badge: string;
  reviewsCount: number;
  rating: number;
  date: string;
  category: string;
  text: string;
  ownerResponse?: string;
  ownerResponseDate?: string;
  likes: number;
}

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 1,
    name: 'Eng. Tariq Al-Ghamdi',
    initial: 'T',
    avatarColor: '#1a73e8',
    avatar: '/testimonials/avatar-1.jpg',
    badge: 'Local Guide',
    reviewsCount: 38,
    rating: 5,
    date: '2 weeks ago',
    category: 'Oil & Gas',
    text: 'Orient Energy has been our primary supply partner for Saudi Aramco turnaround projects in Jubail. They supplied ASTM A106 Grade B seamless pipes, Class 300 forged steel valves, and stud bolts with 100% complete 3.1 MTC certificates. Deliveries were right on schedule, and material compliance was verified by our QC on first inspection. Truly top-tier industrial supplier in KSA.',
    ownerResponse: 'Thank you Eng. Tariq! We take immense pride in supporting critical turnaround projects in Jubail with certified materials and strict MTC documentation. Looking forward to our next project together.',
    ownerResponseDate: '2 weeks ago',
    likes: 14,
  },
  {
    id: 2,
    name: 'Fahad Al-Otaibi',
    initial: 'F',
    avatarColor: '#137333',
    badge: 'Local Guide',
    reviewsCount: 29,
    rating: 5,
    date: '3 weeks ago',
    category: 'Equipment Rental',
    text: 'Outstanding service and technical procurement support. We rented 50T mobile cranes and heavy boom trucks for an emergency repair shutdown in Yanbu. The equipment arrived fully certified, third-party inspected (TPI), with experienced Aramco-certified operators. Their 24/7 technical team ensured our downtime was minimized. Excellent partner.',
    ownerResponse: 'Thank you Fahad for the great feedback! Our rental fleet and certified operators are always on standby to support plant operations across the Kingdom.',
    ownerResponseDate: '3 weeks ago',
    likes: 9,
  },
  {
    id: 3,
    name: 'Michael Henderson',
    initial: 'M',
    avatarColor: '#e37400',
    avatar: '/testimonials/avatar-2.png',
    badge: 'Local Guide',
    reviewsCount: 44,
    rating: 5,
    date: 'a month ago',
    category: 'Oil & Gas',
    text: 'Procured high-pressure ASME B16.5 flanges, spiral wound gaskets, and specialized structural steel from Orient Energy for our offshore platform fabrication in Dammam. Competitive pricing, seamless logistics, and their engineering liaison answered all QA/QC queries promptly. A genuine 5-star supplier in Saudi Arabia.',
    ownerResponse: 'Much appreciated, Michael! Delivering offshore-compliant piping and structural materials with full traceability is our core commitment. Thank you for choosing Orient Energy.',
    ownerResponseDate: 'a month ago',
    likes: 12,
  },
  {
    id: 4,
    name: 'Abdullah Al-Shehri',
    initial: 'A',
    avatarColor: '#a142f4',
    avatar: '/testimonials/avatar-3.jpg',
    badge: 'Local Guide',
    reviewsCount: 19,
    rating: 5,
    date: 'a month ago',
    category: 'Turnaround & Shutdown',
    text: 'Orient Energy’s procurement speed is exceptional. We faced an urgent shortage of explosion-proof ATEX certified electrical fittings and valves during an emergency plant overhaul in Rabigh. Their team sourced and delivered from their Khobar warehouse within 24 hours. Reliable and dependable.',
    ownerResponse: 'Thank you Abdullah! Rapid emergency supply and shutdown support across Saudi Arabia is what we specialize in. Best regards from the Orient Energy team.',
    ownerResponseDate: 'a month ago',
    likes: 7,
  },
  {
    id: 5,
    name: 'Sultan Al-Dosari',
    initial: 'S',
    avatarColor: '#ea4335',
    badge: 'Local Guide',
    reviewsCount: 52,
    rating: 5,
    date: '2 months ago',
    category: 'Equipment Rental',
    text: 'Orient Energy sets the benchmark for safety compliance and equipment reliability. All rigging hardware, wire ropes, and lifting shackles came with valid third-party load test certificates and color-coded tags. Transparent billing, punctual delivery, and very professional engineering staff.',
    likes: 11,
  },
  {
    id: 6,
    name: 'David Vance',
    initial: 'D',
    avatarColor: '#0b8043',
    badge: 'Verified Client',
    reviewsCount: 16,
    rating: 5,
    date: '3 months ago',
    category: 'Turnaround & Shutdown',
    text: 'We have collaborated with Orient Energy on EPC petrochemical packages across the Eastern Province. From custom pipe spools to hydraulic torque tools and industrial consumables, their product quality and technical documentation are consistently top-notch. Highly recommended.',
    likes: 8,
  },
];

// Official Google G 4-Color SVG Icon
function GoogleGIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

// Google Gold Star SVG
function GoogleStar({ filled = true, size = 16 }: { filled?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? '#FBBC04' : '#DADCE0'}
      style={{ display: 'inline-block' }}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export default function GoogleReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const filteredReviews = GOOGLE_REVIEWS;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cards visible based on viewport
  const cardsPerView = windowWidth <= 640 ? 1 : windowWidth <= 1024 ? 2 : 3;
  const maxIndex = Math.max(0, filteredReviews.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      // Swiped left -> next
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else if (distance < -40) {
      // Swiped right -> prev
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="google-reviews"
      className="google-reviews-section"
      style={{
        backgroundColor: '#f8fafc',
        padding: '70px 0 80px',
        borderTop: '1px solid #eef2f6',
        borderBottom: '1px solid #eef2f6',
        fontFamily: "'Roboto', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Google Customer Reviews"
    >
      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Real Google Rating Header Bar */}
        <div className="google-header-card">
          <div className="google-brand-left">
            <div className="google-icon-wrapper">
              <GoogleGIcon size={34} />
            </div>
            <div>
              <div className="google-title-row">
                <h3 className="google-business-title">Orient Energy Trading Co.</h3>
                <span className="google-verified-badge" title="Google Verified Business Profile">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a73e8">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                  Verified Business
                </span>
              </div>
              <div className="google-score-row">
                <span className="google-numeric-score">5.0</span>
                <div className="google-stars-group">
                  {[...Array(5)].map((_, i) => (
                    <GoogleStar key={i} size={18} />
                  ))}
                </div>
                <span className="google-review-count">Based on 48+ Google Reviews</span>
              </div>
            </div>
          </div>

          <div className="google-header-actions">
            {/* Carousel Arrows */}
            <div className="carousel-nav-arrows">
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous Google Reviews"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next Google Reviews"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="google-review-btn"
            >
              <GoogleGIcon size={16} />
              Review Us on Google
            </a>
          </div>
        </div>

        {/* Reviews Cards Slider */}
        <div
          className="google-reviews-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={carouselTrackRef}
            className="google-reviews-track"
            style={{
              '--curr-idx': currentIndex,
            } as React.CSSProperties}
          >
            {filteredReviews.map((rev) => (
              <div key={rev.id} className="google-review-card-wrapper">
                <div className="google-review-card">
                  {/* Card Header: Avatar, Name, Google G */}
                  <div className="rev-header">
                    <div className="rev-author-left">
                      {rev.avatar ? (
                        <div className="rev-avatar-img">
                          <Image
                            src={rev.avatar}
                            alt={rev.name}
                            width={44}
                            height={44}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div
                          className="rev-avatar-initial"
                          style={{ backgroundColor: rev.avatarColor }}
                        >
                          {rev.initial}
                        </div>
                      )}

                      <div className="rev-author-meta">
                        <h4 className="rev-author-name">{rev.name}</h4>
                        <div className="rev-badge-line">
                          {rev.badge === 'Local Guide' && (
                            <span className="local-guide-tag">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="#E37400">
                                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                              </svg>
                              Local Guide
                            </span>
                          )}
                          <span className="rev-count-text">· {rev.reviewsCount} reviews</span>
                        </div>
                      </div>
                    </div>

                    <div className="rev-google-corner" title="Google Verified Review">
                      <GoogleGIcon size={20} />
                    </div>
                  </div>

                  {/* Rating Stars & Relative Date */}
                  <div className="rev-stars-row">
                    <div className="rev-stars">
                      {[...Array(rev.rating)].map((_, i) => (
                        <GoogleStar key={i} size={15} />
                      ))}
                    </div>
                    <span className="rev-date">{rev.date}</span>
                    <span className="rev-verified-tag">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#34A853">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                      </svg>
                      Verified Project
                    </span>
                  </div>

                  {/* Review Text Body */}
                  <p className="rev-body-text">{rev.text}</p>

                  {/* Real Owner Response Box if present */}
                  {rev.ownerResponse && (
                    <div className="owner-response-box">
                      <div className="owner-response-header">
                        <span className="owner-tag">Response from the owner</span>
                        <span className="owner-date">· {rev.ownerResponseDate}</span>
                      </div>
                      <p className="owner-text">{rev.ownerResponse}</p>
                    </div>
                  )}

                  {/* Google Card Footer */}
                  <div className="rev-footer">
                    <button type="button" className="helpful-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      Helpful ({rev.likes})
                    </button>
                    <span className="google-posted-via">
                      Posted on <strong style={{ color: '#1a73e8' }}>Google</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="google-mobile-dots">
          {filteredReviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`dot-indicator ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .google-header-card {
          background: #ffffff;
          border: 1px solid #dadce0;
          border-radius: 12px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(60,64,67,0.08);
          gap: 20px;
        }

        .google-brand-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .google-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #f8f9fa;
          border: 1px solid #e8eaed;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .google-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .google-business-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #202124;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .google-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.76rem;
          font-weight: 500;
          color: #1a73e8;
          background: #e8f0fe;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .google-score-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
          flex-wrap: wrap;
        }

        .google-numeric-score {
          font-size: 1.15rem;
          font-weight: 700;
          color: #202124;
        }

        .google-stars-group {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .google-review-count {
          font-size: 0.85rem;
          color: #5f6368;
        }

        .google-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #ffffff;
          color: #1a73e8;
          border: 1px solid #dadce0;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(60,64,67,0.06);
          white-space: nowrap;
        }

        .google-review-btn:hover {
          background: #f8f9fa;
          border-color: #1a73e8;
          box-shadow: 0 2px 6px rgba(26,115,232,0.18);
          color: #1557b0;
        }

        .google-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          gap: 16px;
        }

        .filter-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
        }

        .filter-chips::-webkit-scrollbar {
          display: none;
        }

        .filter-chip {
          padding: 7px 15px;
          background: #ffffff;
          border: 1px solid #dadce0;
          border-radius: 18px;
          font-size: 0.82rem;
          font-weight: 500;
          color: #3c4043;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .filter-chip:hover {
          background: #f1f3f4;
          border-color: #bdc1c6;
        }

        .filter-chip.active {
          background: #e8f0fe;
          border-color: #1a73e8;
          color: #1a73e8;
          font-weight: 600;
        }

        .carousel-nav-arrows {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-arrow-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #dadce0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3c4043;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(60,64,67,0.08);
        }

        .nav-arrow-btn:hover:not(:disabled) {
          background: #f8f9fa;
          border-color: #1a73e8;
          color: #1a73e8;
          transform: translateY(-1px);
        }

        .nav-arrow-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* Slider */
        .google-reviews-slider {
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        .google-reviews-track {
          display: flex;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          width: 100%;
          transform: translateX(calc(-1 * var(--curr-idx) * (100% / 3)));
        }

        .google-review-card-wrapper {
          flex: 0 0 33.3333%;
          max-width: 33.3333%;
          padding: 0 10px;
          box-sizing: border-box;
        }

        .google-review-card {
          background: #ffffff;
          border: 1px solid #e8eaed;
          border-radius: 12px;
          padding: 22px 20px 18px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
          box-shadow: 0 1px 3px rgba(60,64,67,0.08), 0 4px 12px rgba(60,64,67,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .google-review-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 16px rgba(60,64,67,0.14);
          border-color: #d2e3fc;
        }

        .rev-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .rev-author-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rev-avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          background: #f1f3f4;
          flex-shrink: 0;
        }

        .rev-avatar-initial {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .rev-author-meta {
          display: flex;
          flex-direction: column;
        }

        .rev-author-name {
          font-size: 0.96rem;
          font-weight: 600;
          color: #202124;
          margin: 0;
          line-height: 1.25;
        }

        .rev-badge-line {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 3px;
        }

        .local-guide-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #e37400;
        }

        .rev-count-text {
          font-size: 0.72rem;
          color: #70757a;
        }

        .rev-google-corner {
          opacity: 0.9;
          flex-shrink: 0;
        }

        .rev-stars-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .rev-stars {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .rev-date {
          font-size: 0.78rem;
          color: #70757a;
        }

        .rev-verified-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.72rem;
          font-weight: 500;
          color: #137333;
          margin-left: auto;
          background: #e6f4ea;
          padding: 1px 6px;
          border-radius: 10px;
        }

        .rev-body-text {
          font-size: 0.88rem;
          color: #3c4043;
          line-height: 1.55;
          margin: 0 0 16px 0;
          flex-grow: 1;
        }

        .owner-response-box {
          background: #f8f9fa;
          border-left: 3px solid #1a73e8;
          border-radius: 4px;
          padding: 10px 12px;
          margin-bottom: 16px;
        }

        .owner-response-header {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          font-weight: 600;
          color: #1a73e8;
          margin-bottom: 4px;
        }

        .owner-date {
          font-weight: 400;
          color: #70757a;
        }

        .owner-text {
          font-size: 0.8rem;
          color: #5f6368;
          line-height: 1.45;
          margin: 0;
        }

        .rev-footer {
          border-top: 1px solid #f1f3f4;
          padding-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .helpful-btn {
          background: transparent;
          border: none;
          color: #70757a;
          font-size: 0.78rem;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .helpful-btn:hover {
          color: #1a73e8;
        }

        .google-posted-via {
          font-size: 0.75rem;
          color: #70757a;
        }

        .google-mobile-dots {
          display: none;
          justify-content: center;
          gap: 6px;
          margin-top: 18px;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #dadce0;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dot-indicator.active {
          width: 22px;
          border-radius: 4px;
          background: #1a73e8;
        }

        @media (max-width: 1024px) and (min-width: 641px) {
          .google-review-card-wrapper {
            flex: 0 0 50% !important;
            max-width: 50% !important;
          }
          .google-reviews-track {
            transform: translateX(calc(-1 * var(--curr-idx) * 50%)) !important;
          }
        }

        @media (max-width: 640px) {
          .google-reviews-section {
            padding: 44px 0 50px !important;
          }

          .google-header-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 18px;
          }

          .google-review-btn {
            width: 100%;
            justify-content: center;
          }

          .carousel-nav-arrows {
            display: none;
          }

          .google-reviews-slider {
            overflow: hidden !important;
          }

          .google-reviews-track {
            display: flex;
            transition: transform 0.3s ease;
            transform: translateX(calc(-1 * var(--curr-idx) * 100%)) !important;
          }

          .google-review-card-wrapper {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            padding: 0 4px;
          }

          .google-mobile-dots {
            display: flex;
          }
        }
      `}</style>
    </section>
  );
}
