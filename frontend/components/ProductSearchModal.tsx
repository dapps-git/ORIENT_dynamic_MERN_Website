'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DIVISIONS_DATA, getProductSlug, ProductItem } from '@/lib/divisionsData';

interface SearchableProduct extends ProductItem {
  divisionId: string;
  divisionName: string;
  productSlug: string;
}

interface ProductSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductSearchModal({ isOpen, onClose }: ProductSearchModalProps) {
  const [query, setQuery] = useState('');
  const [extraProducts, setExtraProducts] = useState<SearchableProduct[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch newly added backend products to include in search
  useEffect(() => {
    fetch('http://localhost:5000/api/products?limit=200')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped: SearchableProduct[] = data.data.map((bp: any) => ({
            id: String(bp._id || bp.slug),
            title: bp.title,
            slug: bp.slug || getProductSlug(bp.title),
            image: bp.image || (bp.images && bp.images[0]) || '/categories/all-fittings.jpeg',
            divisionId: bp.divisionSlug || (bp.category && bp.category.slug) || 'mechanical-division',
            divisionName: bp.divisionName || 'Industrial Products',
            productSlug: bp.slug || getProductSlug(bp.title),
          }));
          setExtraProducts(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Compile all searchable products
  const allProducts: SearchableProduct[] = useMemo(() => {
    const staticList: SearchableProduct[] = DIVISIONS_DATA.flatMap((div) =>
      div.products.map((p) => ({
        ...p,
        divisionId: div.id,
        divisionName: div.name,
        productSlug: p.slug || getProductSlug(p.title),
      }))
    );

    const existingTitles = new Set(staticList.map((p) => p.title.toLowerCase().trim()));
    const newItems = extraProducts.filter((p) => !existingTitles.has(p.title.toLowerCase().trim()));

    return [...staticList, ...newItems];
  }, [extraProducts]);

  // Filter products ONLY when query is typed
  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return allProducts.filter((p) => {
      const titleMatch = p.title.toLowerCase().includes(q);
      const divMatch = p.divisionName.toLowerCase().includes(q);
      const descMatch = p.shortDescription ? p.shortDescription.toLowerCase().includes(q) : false;
      const featMatch = p.features ? p.features.some((f) => f.toLowerCase().includes(q)) : false;
      return titleMatch || divMatch || descMatch || featMatch;
    });
  }, [query, allProducts]);

  // Auto-focus input when modal opens & reset query
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }

    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 17, 56, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '70px 16px 20px',
        animation: 'searchFadeIn 0.18s ease',
        overflowY: 'auto',
      }}
    >
      {/* Floating Search Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'searchScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Empty Clean Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#ffffff',
            borderRadius: '9999px',
            padding: '10px 18px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.08)',
            border: '1px solid #ECE7DE',
          }}
        >
          {/* Search Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#20b512"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          {/* Search Input - No placeholder, clean empty input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            aria-label="Search"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: '#0f172a',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              backgroundColor: 'transparent',
              padding: '2px 0',
            }}
          />

          {/* Clear button if typed */}
          {hasQuery && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '0.75rem',
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          )}

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              lineHeight: 1,
              flexShrink: 0,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#0f172a')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            ✕
          </button>
        </div>

        {/* Search Results Dropdown: ONLY shown when user types */}
        {hasQuery && (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '8px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.22)',
              border: '1px solid #ECE7DE',
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            {filteredProducts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {filteredProducts.slice(0, 15).map((product) => (
                  <Link
                    key={product.divisionId + product.id + product.title}
                    href={`/product/${product.productSlug}`}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '38px',
                        height: '38px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        backgroundColor: '#f1f5f9',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="38px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          color: '#0f172a',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {product.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: '0.72rem',
                          color: '#20b512',
                          fontWeight: 500,
                        }}
                      >
                        {product.divisionName}
                      </div>
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>&rarr;</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ padding: '24px 16px', textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
                  No products found
                </div>
                <div style={{ fontSize: '0.76rem' }}>
                  Try another search keyword
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes searchFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes searchScaleIn {
          from {
            opacity: 0;
            transform: scale(0.97) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
