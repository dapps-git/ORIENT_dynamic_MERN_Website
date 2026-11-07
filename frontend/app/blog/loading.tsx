export default function BlogLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: '60px 0 80px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '46px' }}>
            <div className="orient-skeleton" style={{ width: '130px', height: '14px', margin: '0 auto 12px' }} />
            <div className="orient-skeleton" style={{ width: '380px', height: '36px', margin: '0 auto' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px',
            }}
          >
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="orient-skeleton-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '380px',
                  backgroundColor: '#ffffff',
                }}
              >
                <div className="orient-skeleton" style={{ width: '100%', height: '235px', borderRadius: 0 }} />
                <div style={{ padding: '22px 22px 18px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div className="orient-skeleton" style={{ width: '88%', height: '18px', borderRadius: '4px' }} />
                  <div className="orient-skeleton" style={{ width: '58%', height: '14px', borderRadius: '4px' }} />
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="orient-skeleton" style={{ width: '90px', height: '12px', borderRadius: '4px' }} />
                    <div className="orient-skeleton" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

