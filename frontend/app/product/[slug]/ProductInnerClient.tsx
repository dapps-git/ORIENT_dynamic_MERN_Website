'use client';

import { useState } from 'react';
import { ProductItem, DivisionData } from '@/lib/divisionsData';

interface Props {
  product: ProductItem;
  division: DivisionData;
  waUrl: string;
}

export default function ProductInnerClient({ product, division, waUrl }: Props) {
  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || '/categories/all-fittings.jpeg'];
  const [selectedImage, setSelectedImage] = useState(allImages[0] || product.image);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const features =
    product.features && product.features.length > 0
      ? product.features
      : [
          'Low Pressure & High Pressure Hoses',
          'Quick Release Couplers',
          'Manifolds',
          'CGA Connectors',
          'Isolation Valves',
        ];

  return (
    <>
      {/* Main Product Box Card matching Image 2 */}
      <div
        className="product-main-card"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '36px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Top Section: Large Image & Category/WhatsApp */}
        <div className="product-top-grid">
          {/* Product Image Section with Main Photo & Gallery Thumbnails */}
          <div className="product-image-wrapper">
            <div className="product-image-container">
              <img
                src={selectedImage}
                alt={product.title}
                className="product-main-image"
                onClick={() => setLightboxOpen(true)}
              />
              {/* Zoom Icon Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="zoom-btn"
                title="Click to view full image"
                aria-label="Zoom Image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Gallery (if more than 1 image) */}
            {allImages.length > 1 && (
              <div className="product-thumbnails-row">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`thumb-btn ${selectedImage === img ? 'active' : ''}`}
                    title={`View photo ${idx + 1}`}
                  >
                    <img src={img} alt={`${product.title} photo ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Category & WhatsApp Button */}
          <div className="product-right-panel">
            <div className="product-category-label">
              <span className="cat-prefix">Category:</span>{' '}
              <span className="cat-val">{product.category || division.name}</span>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-order-now-blue-main"
              aria-label={`Order ${product.title}`}
            >
              Order Now
            </a>
          </div>
        </div>

        {/* Description Section with Tab Button & Bullets (Matching Image 2) */}
        <div className="product-description-wrap">
          <div className="tab-header">
            <span className="description-tab">Description</span>
          </div>

          <div className="description-body">
            {product.fullDescription ? (
              <p className="description-paragraph">{product.fullDescription}</p>
            ) : product.shortDescription ? (
              <p className="description-paragraph">{product.shortDescription}</p>
            ) : null}

            {product.fullDescription && product.shortDescription && product.fullDescription !== product.shortDescription && (
              <p className="description-subparagraph">{product.shortDescription}</p>
            )}

            {/* Bullet Points with Square Markers */}
            <ul className="specifications-bullet-list">
              {features.map((feat, idx) => (
                <li key={idx} className="spec-bullet-item">
                  <span className="bullet-marker">&#9642;</span>
                  <span className="bullet-text">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
            <img src={selectedImage} alt={product.title} className="lightbox-img" />
            <div className="lightbox-caption">{product.title}</div>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-main-card {
          transition: all 0.25s ease;
        }

        .product-top-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 32px;
          align-items: center;
          margin-bottom: 36px;
        }

        .product-image-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .product-image-container {
          position: relative;
          background-color: #ffffff;
          border: 1px solid #eef2f6;
          border-radius: 12px;
          padding: 24px;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .product-thumbnails-row {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 4px 2px;
        }

        .thumb-btn {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
          background: #ffffff;
          padding: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .thumb-btn:hover {
          border-color: #94a3b8;
          transform: translateY(-2px);
        }

        .thumb-btn.active {
          border-color: #2e3191;
          box-shadow: 0 0 0 2px rgba(46, 49, 145, 0.2);
        }

        .thumb-btn img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .product-main-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .product-image-container:hover .product-main-image {
          transform: scale(1.03);
        }

        .zoom-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #cbd5e1;
          color: #0f172a;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .zoom-btn:hover {
          background: #2e3191;
          color: #ffffff;
          border-color: #2e3191;
        }

        .product-right-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .product-category-label {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.5;
        }

        .cat-prefix {
          font-weight: 700;
          color: #1e293b;
        }

        .cat-val {
          font-weight: 500;
          color: #334155;
        }

        .btn-order-now-blue-main {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          color: #0f172a !important;
          padding: 8px 22px;
          border-radius: 5px;
          font-family: 'Montserrat', sans-serif !important;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06), inset 0 1px 0 #ffffff;
          transition: all 0.25s ease;
          border: 1px solid #dcdfe4;
          width: fit-content;
        }

        .btn-order-now-blue-main:hover {
          background: linear-gradient(180deg, #ffffff 0%, #edf2f7 100%);
          border-color: #cbd5e1;
          color: #2e3191 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 #ffffff;
        }

        /* Description Box */
        .product-description-wrap {
          border-top: 1px solid #e2e8f0;
          padding-top: 26px;
        }

        .tab-header {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .description-tab {
          display: inline-block;
          background-color: #1e293b;
          color: #ffffff;
          padding: 8px 24px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .description-body {
          max-width: 640px;
          margin: 0 auto;
        }

        .description-paragraph {
          font-size: 0.90rem;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 16px;
          text-align: center;
        }

        .description-subparagraph {
          font-size: 0.86rem;
          line-height: 1.7;
          color: #64748b;
          margin-bottom: 20px;
          text-align: center;
          font-style: italic;
        }

        .specifications-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: fit-content;
          min-width: 280px;
        }

        .spec-bullet-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 14px;
          color: #334155;
          font-size: 0.94rem;
          font-weight: 500;
        }

        .bullet-marker {
          color: #1e293b;
          font-size: 1.1rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .bullet-text {
          color: #334155;
        }

        /* Lightbox */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 24px;
          backdrop-filter: blur(4px);
        }

        .lightbox-content {
          position: relative;
          max-width: 800px;
          max-height: 85vh;
          background: #ffffff;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-close {
          position: absolute;
          top: 12px;
          right: 14px;
          background: #f1f5f9;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.4rem;
          color: #475569;
          cursor: pointer;
          line-height: 1;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
        }

        .lightbox-caption {
          margin-top: 14px;
          font-size: 0.90rem;
          font-weight: 600;
          color: #1e293b;
        }

        @media (max-width: 768px) {
          .product-top-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .product-image-container {
            height: 260px;
          }
          .product-right-panel {
            align-items: center;
            text-align: center;
          }
          .product-main-card {
            padding: 24px 18px !important;
          }
        }
      `}</style>
    </>
  );
}
