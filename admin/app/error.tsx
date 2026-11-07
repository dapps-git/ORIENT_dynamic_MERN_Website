'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Admin Portal Error]', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '36px 32px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid #334155',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 10px', color: '#ffffff' }}>
          Admin Portal Temporary Interruption
        </h2>
        <p style={{ fontSize: '0.90rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 20px' }}>
          {error?.message || 'An unexpected rendering issue occurred. Click below to restore your session.'}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '10px 22px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            🔄 Try Again
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 22px',
              backgroundColor: '#334155',
              color: '#f8fafc',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Reload Admin
          </button>
        </div>
      </div>
    </div>
  );
}

