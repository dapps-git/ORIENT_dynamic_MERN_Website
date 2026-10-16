'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Initial site load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Route change loader
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      id="orient-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#FAF7F2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        transition: 'opacity 0.35s ease, visibility 0.35s ease',
        pointerEvents: 'all',
      }}
      aria-label="Loading Orient Energy"
    >
      {/* Outer Circling Ring + Spinning Emblem */}
      <div
        style={{
          position: 'relative',
          width: '90px',
          height: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Subtle Outer Spinner Ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2.5px solid rgba(14, 122, 61, 0.12)',
            borderTopColor: '#0b7a3d',
            borderRightColor: '#0056b3',
            animation: 'circlingRing 1.2s linear infinite',
          }}
        />

        {/* Circling / Spinning Logo Emblem without background */}
        <div
          style={{
            width: '54px',
            height: '54px',
            position: 'relative',
            animation: 'circlingLogo 2.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
          }}
        >
          <Image
            src="/logo-emblem-transparent.png"
            alt="Orient Energy Loading"
            fill
            sizes="54px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* Brand Label with Subtle Pulse */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: '"Cormorant Garamond", Amiri, serif',
            fontSize: '1.05rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#111827',
            textTransform: 'uppercase',
          }}
        >
          Orient Energy
        </div>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: '#0b7a3d',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          Loading...
        </div>
      </div>

      <style>{`
        @keyframes circlingLogo {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg) scale(1.06);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes circlingRing {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
