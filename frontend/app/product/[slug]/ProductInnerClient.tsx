'use client';

import { useState, useEffect } from 'react';
import { ProductItem, DivisionData, ProductInnerSection } from '@/lib/divisionsData';

interface Props {
  product: ProductItem;
  division: DivisionData;
  waUrl: string;
}

function formatRichHtml(content: string): string {
  if (!content) return '';
  let formatted = content;

  // Auto-link plain URLs like gravoz.com or https://... if not already inside an <a> tag
  formatted = formatted.replace(
    /(?<!href=["'])(https?:\/\/[^\s<>"']+)/gi,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; font-weight: 500;">$1</a>'
  );
  formatted = formatted.replace(
    /(?<!href=["']|https?:\/\/)\b((?:[a-zA-Z0-9-]+\.)+(?:com|org|net|io|co|sa|gov|edu|info|ae|me))\b(\/[^\s<>"']*)?/gi,
    '<a href="https://$1$2" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; font-weight: 500;">$1$2</a>'
  );
  formatted = formatted.replace(
    /<a\s+(?!style=)([^>]+)>/gi,
    '<a style="color: #2563eb; text-decoration: underline; font-weight: 500;" target="_blank" rel="noopener noreferrer" $1>'
  );

  // If plain text (no HTML tags), format newlines as <br/>
  if (!/<[a-z][\s\S]*>/i.test(content)) {
    formatted = formatted.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
  }

  return formatted;
}

const isStaticPlaceholder = (u?: string): boolean => {
  if (!u) return true;
  const s = u.trim();
  if (
    s.startsWith('http://') ||
    s.startsWith('https://') ||
    s.startsWith('data:image/') ||
    s.startsWith('blob:')
  ) {
    if (
      s.includes('/products/') ||
      s.includes('/categories/') ||
      s.includes('all-fittings.jpeg') ||
      s.includes('bearings.jpg') ||
      s.includes('filters.jpg') ||
      s.includes('pumps-motors.jpg')
    ) {
      return true;
    }
    return false;
  }
  return true;
};

export default function ProductInnerClient({ product: initialProduct, division, waUrl }: Props) {
  // Purge any static placeholders from initialProduct if dynamic photos exist
  const initRaw = initialProduct.images && initialProduct.images.length > 0
    ? initialProduct.images
    : (initialProduct.image ? [initialProduct.image] : []);
  const initDynamic = initRaw.filter((u) => !isStaticPlaceholder(u));
  const initFinalImages = initDynamic.length > 0 ? initDynamic : initRaw;
  const initFinalCover = initDynamic.length > 0
    ? (!isStaticPlaceholder(initialProduct.image) ? initialProduct.image : initDynamic[0])
    : (initialProduct.image || initFinalImages[0] || '/categories/all-fittings.jpeg');

  const [product, setProduct] = useState<ProductItem>({
    ...initialProduct,
    image: initFinalCover,
    images: initFinalImages.length > 0 ? initFinalImages : [initFinalCover],
  });

  // Sync with live backend updates so admin edits/deletes reflect immediately on user side
  useEffect(() => {
    const cleanSlug = initialProduct.slug;
    if (!cleanSlug) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://orient-dynamic-mern-website.onrender.com/api";
    fetch(`${apiUrl}/products/${cleanSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const p = data.data;
          const pRaw = Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image] : []);
          const pDynamic = pRaw.filter((u: string) => !isStaticPlaceholder(u));
          const pFinalImages = pDynamic.length > 0 ? pDynamic : pRaw;
          const pFinalCover = pDynamic.length > 0
            ? (!isStaticPlaceholder(p.image) ? p.image : pDynamic[0])
            : (p.image || pFinalImages[0] || '/categories/all-fittings.jpeg');

          setProduct((prev) => ({
            ...prev,
            title: p.title || prev.title,
            fullDescription: p.fullDescription || prev.fullDescription,
            shortDescription: p.shortDescription || prev.shortDescription,
            features: p.features && p.features.length > 0 ? p.features : prev.features,
            innerSections: p.innerSections && p.innerSections.length > 0 ? p.innerSections : prev.innerSections,
            image: pFinalCover,
            images: pFinalImages.length > 0 ? pFinalImages : prev.images,
            sku: p.sku || prev.sku,
            brand: p.brand || prev.brand,
            category: p.categoryName || prev.category,
            inStock: p.inStock !== undefined ? p.inStock : prev.inStock,
          }));
        }
      })
      .catch(() => {});
  }, [initialProduct.slug]);

  // Sync with live admin updates from localStorage fallback
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProducts = localStorage.getItem('orient_admin_products');
      if (savedProducts) {
        try {
          const parsed: ProductItem[] = JSON.parse(savedProducts);
          const found = parsed.find(
            (p) =>
              p.slug === initialProduct.slug ||
              (p.title && p.title.toLowerCase().trim() === initialProduct.title.toLowerCase().trim())
          );
          if (found) {
            const fRaw = Array.isArray(found.images) && found.images.length > 0 ? found.images : (found.image ? [found.image] : []);
            const fDynamic = fRaw.filter((u: string) => !isStaticPlaceholder(u));
            const fFinalImages = fDynamic.length > 0 ? fDynamic : fRaw;
            const fFinalCover = fDynamic.length > 0
              ? (!isStaticPlaceholder(found.image) ? found.image : fDynamic[0])
              : (found.image || fFinalImages[0]);

            setProduct((prev) => ({
              ...prev,
              ...found,
              image: fFinalCover || prev.image,
              images: fFinalImages.length > 0 ? fFinalImages : prev.images,
              innerSections: found.innerSections || prev.innerSections,
            }));
          }
        } catch {}
      }
    }
  }, [initialProduct]);

  const rawImages = product.images && product.images.length > 0
    ? product.images
    : [product.image || '/categories/all-fittings.jpeg'];
  const dynamicImages = rawImages.filter((img) => !isStaticPlaceholder(img));
  const allImages = dynamicImages.length > 0 ? dynamicImages : rawImages;
  const initialMain = dynamicImages.length > 0
    ? (!isStaticPlaceholder(product.image) ? product.image : dynamicImages[0])
    : (product.image || allImages[0]);

  const [selectedImage, setSelectedImage] = useState(initialMain);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (allImages.length > 0) {
      if (!allImages.includes(selectedImage) || (dynamicImages.length > 0 && isStaticPlaceholder(selectedImage))) {
        setSelectedImage(allImages[0]);
      }
    }
  }, [product, allImages, selectedImage, dynamicImages.length]);

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
            <div className="product-image-container" style={{ position: 'relative', overflow: 'hidden' }}>
              {/* Shimmer skeleton behind photo for instant 0ms feedback */}
              <div
                className="orient-skeleton"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                  borderRadius: '8px',
                }}
              />
              <img
                src={selectedImage}
                alt={product.imageAlt || product.title}
                title={product.imageTitle || product.title}
                className="product-main-image"
                style={{ position: 'relative', zIndex: 1 }}
                onClick={() => setLightboxOpen(true)}
              />
              {/* Zoom Icon Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="zoom-btn"
                title="Click to view full image"
                aria-label="Zoom Image"
                style={{ zIndex: 2 }}
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
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    <div
                      className="orient-skeleton"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
                    />
                    <img
                      src={img}
                      alt={`${product.imageAlt || product.title} photo ${idx + 1}`}
                      title={`${product.imageTitle || product.title} photo ${idx + 1}`}
                      style={{ position: 'relative', zIndex: 1 }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Category, SKU, Brand & WhatsApp Button */}
          <div className="product-right-panel">
            <div className="product-category-label">
              <span className="cat-prefix">Category:</span>{' '}
              <a
                href={`/products/${division.id || product.divisionSlug || 'pipe-fittings-and-flanges'}`}
                className="cat-val-link"
                style={{
                  color: '#2563eb',
                  textDecoration: 'underline',
                  fontWeight: 600,
                  transition: 'color 0.2s',
                }}
              >
                {product.category || division.name}
              </a>
            </div>
            {product.sku && (
              <div className="product-category-label" style={{ marginTop: '6px' }}>
                <span className="cat-prefix">SKU:</span>{' '}
                <span className="cat-val" style={{ fontFamily: 'monospace', fontWeight: 600 }}>{product.sku}</span>
              </div>
            )}
            {product.brand && (
              <div className="product-category-label" style={{ marginTop: '6px' }}>
                <span className="cat-prefix">Brand:</span>{' '}
                <span className="cat-val">{product.brand}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Inner Page Description Section */}
        {(product.fullDescription || product.shortDescription) && (
          <div
            className="product-description-section"
            style={{
              marginTop: '32px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '28px 32px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ width: '4px', height: '20px', backgroundColor: '#20b512', borderRadius: '2px', display: 'inline-block' }} />
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Product Description
              </h2>
            </div>
            <div
              className="product-rich-description"
              style={{
                fontSize: '0.96rem',
                lineHeight: 1.8,
                color: '#334155',
                fontFamily: "'Montserrat', sans-serif",
              }}
              dangerouslySetInnerHTML={{
                __html: formatRichHtml(product.fullDescription || product.shortDescription || ''),
              }}
            />
          </div>
        )}

        {/* Key Specifications & Features */}
        {features && features.length > 0 && (
          <div
            className="product-specifications-section"
            style={{
              marginTop: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '28px 32px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <span style={{ width: '4px', height: '20px', backgroundColor: '#20b512', borderRadius: '2px', display: 'inline-block' }} />
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: 0,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Key Specifications &amp; Features
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '14px 24px',
              }}
            >
              {features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '8px 12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #edf2f7',
                  }}
                >
                  <span
                    style={{
                      color: '#20b512',
                      fontSize: '1.05rem',
                      lineHeight: 1.2,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: '0.90rem',
                      lineHeight: 1.6,
                      color: '#334155',
                      fontWeight: 500,
                    }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Inner Sections Configured From Admin Panel */}
        {product.innerSections && product.innerSections.length > 0 && (
          <div className="product-custom-inner-sections" style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {product.innerSections.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="inner-section-card"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ width: '4px', height: '18px', backgroundColor: '#20b512', borderRadius: '2px', display: 'inline-block' }} />
                  <h3
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      margin: 0,
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {sec.title}
                  </h3>
                </div>

                <div
                  className="inner-section-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: sec.image ? '1fr 260px' : '1fr',
                    gap: '24px',
                    alignItems: 'start',
                  }}
                >
                  <div
                    className="inner-section-rich-text"
                    style={{
                      fontSize: '0.94rem',
                      lineHeight: 1.7,
                      color: '#334155',
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formatRichHtml(sec.content),
                    }}
                  />

                  {sec.image && (
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        padding: '12px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                      onClick={() => {
                        setSelectedImage(sec.image!);
                        setLightboxOpen(true);
                      }}
                      title="Click to zoom section image"
                    >
                      <img
                        src={sec.image}
                        alt={sec.title}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '220px',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                      <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
                        🔍 View Photo
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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

        .product-rich-description a,
        .inner-section-rich-text a {
          color: #2563eb !important;
          text-decoration: underline !important;
          font-weight: 500 !important;
          transition: color 0.15s ease;
        }

        .product-rich-description a:hover,
        .inner-section-rich-text a:hover {
          color: #1d4ed8 !important;
        }

        .product-rich-description img,
        .inner-section-rich-text img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 12px 0;
          box-shadow: 0 4px 14px rgba(0,0,0,0.06);
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
            gap: 16px;
          }
          .product-image-container {
            height: 250px;
            padding: 12px;
          }
          .product-right-panel {
            align-items: flex-start !important;
            text-align: left !important;
            padding: 14px 16px !important;
            background: #f8fafc !important;
            border-radius: 10px !important;
            border: 1px solid #edf2f7 !important;
            width: 100% !important;
            box-sizing: border-box !important;
            gap: 8px !important;
          }
          .product-main-card {
            padding: 18px 16px !important;
            border-radius: 12px !important;
          }
          .product-description-section,
          .product-specifications-section,
          .inner-section-card {
            padding: 18px 16px !important;
            margin-top: 18px !important;
            border-radius: 10px !important;
          }
          .product-description-section h2,
          .product-specifications-section h2 {
            font-size: 1.05rem !important;
          }
          .product-rich-description {
            font-size: 0.90rem !important;
            line-height: 1.7 !important;
          }
          .inner-section-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </>
  );
}
