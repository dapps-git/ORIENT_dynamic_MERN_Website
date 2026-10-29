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
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Route change loader
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);
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
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        pointerEvents: 'all',
      }}
      aria-label="Loading"
    >
      {/* Clean Reduced-Size Logo Only (No Circles, No Texts) */}
      <div
        style={{
          width: '38px',
          height: '38px',
          position: 'relative',
          animation: 'logoFadePulse 1.4s ease-in-out infinite',
        }}
      >
        <Image
          src="/logo-emblem-transparent.png"
          alt="Orient Energy"
          fill
          sizes="38px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      <style>{`
        @keyframes logoFadePulse {
          0%, 100% {
            opacity: 0.75;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}
