export default function ProductInnerLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 24px 60px' }}>
        {/* Breadcrumb shimmer */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '24px' }}>
          <div className="orient-skeleton" style={{ width: '60px', height: '14px' }} />
          <span style={{ color: '#cbd5e1' }}>/</span>
          <div className="orient-skeleton" style={{ width: '120px', height: '14px' }} />
          <span style={{ color: '#cbd5e1' }}>/</span>
          <div className="orient-skeleton" style={{ width: '160px', height: '14px' }} />
        </div>

        {/* Product Main Card Skeleton */}
        <div
          className="orient-skeleton-card"
          style={{
            padding: '36px',
            borderRadius: '14px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
          }}
        >
          {/* Left: Image Gallery Skeleton */}
          <div>
            <div
              className="orient-skeleton"
              style={{ width: '100%', height: '360px', borderRadius: '10px', marginBottom: '16px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              {[0, 1, 2, 3].map((t) => (
                <div key={t} className="orient-skeleton" style={{ width: '70px', height: '70px', borderRadius: '8px' }} />
              ))}
            </div>
          </div>

          {/* Right: Info Skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="orient-skeleton" style={{ width: '110px', height: '14px' }} />
            <div className="orient-skeleton" style={{ width: '85%', height: '32px' }} />
            <div className="orient-skeleton" style={{ width: '50%', height: '16px' }} />
            <div className="orient-skeleton" style={{ width: '100%', height: '90px', marginTop: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {[0, 1, 2, 3, 4].map((f) => (
                <div key={f} className="orient-skeleton" style={{ width: '75%', height: '16px' }} />
              ))}
            </div>
            <div className="orient-skeleton" style={{ width: '220px', height: '48px', borderRadius: '8px', marginTop: '20px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

