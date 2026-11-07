export default function CategoryProductsLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: '50px 0 30px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="orient-skeleton" style={{ width: '180px', height: '14px', marginBottom: '14px' }} />
          <div className="orient-skeleton" style={{ width: '55%', height: '34px', marginBottom: '20px' }} />
          <div className="orient-skeleton" style={{ width: '92%', height: '16px', marginBottom: '10px' }} />
          <div className="orient-skeleton" style={{ width: '85%', height: '16px', marginBottom: '32px' }} />

          {/* Subcategory / pills shimmer */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[0, 1, 2, 3, 4].map((p) => (
              <div key={p} className="orient-skeleton" style={{ width: '130px', height: '36px', borderRadius: '8px' }} />
            ))}
          </div>

          {/* Products grid shimmer */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '22px',
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="orient-skeleton-card"
                style={{
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '290px',
                  borderRadius: '12px',
                }}
              >
                <div className="orient-skeleton" style={{ width: '80%', height: '18px', marginBottom: '14px' }} />
                <div className="orient-skeleton" style={{ width: '100%', height: '160px', margin: 'auto 0', borderRadius: '6px' }} />
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
                  <div className="orient-skeleton" style={{ width: '38px', height: '38px', borderRadius: '50%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
