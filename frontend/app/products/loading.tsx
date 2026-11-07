export default function ProductsLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: '36px 0 24px', textAlign: 'left' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div className="orient-skeleton" style={{ width: '220px', height: '14px', marginBottom: '14px' }} />
          <div className="orient-skeleton" style={{ width: '60%', height: '36px', marginBottom: '20px' }} />
          <div className="orient-skeleton" style={{ width: '90%', height: '16px', marginBottom: '10px' }} />
          <div className="orient-skeleton" style={{ width: '80%', height: '16px', marginBottom: '30px' }} />
        </div>
      </section>

      <section style={{ padding: '10px 0 60px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="orient-skeleton-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '280px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <div className="orient-skeleton" style={{ height: '220px', width: '100%', borderRadius: 0 }} />
                <div
                  style={{
                    backgroundColor: '#f1f5f9',
                    padding: '12px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                  }}
                >
                  <div className="orient-skeleton" style={{ width: '60%', height: '18px' }} />
                  <div className="orient-skeleton" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
