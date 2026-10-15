'use client';

export default function FloatingContact() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '22px',
        right: '22px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
      aria-label="Floating Contact Buttons"
    >
      {/* Call Button */}
      <a
        href="tel:+966138930002"
        title="Call Us"
        aria-label="Call Us"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#20b512',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.28)',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#189a0e';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#20b512';
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/966552400778"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.28)',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#1ebc59';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#25D366';
        }}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.5 0-2.97-.4-4.26-1.16l-.31-.18-3.16.83.84-3.08-.2-.32a8.167 8.167 0 01-1.25-4.33c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.2-8.2 8.2zm4.49-6.14c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
        </svg>
      </a>
    </div>
  );
}
