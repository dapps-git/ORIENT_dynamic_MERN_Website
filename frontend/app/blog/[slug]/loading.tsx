export default function SingleBlogLoading() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '90px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div className="orient-skeleton" style={{ width: '140px', height: '14px', marginBottom: '16px' }} />
        <div className="orient-skeleton" style={{ width: '85%', height: '38px', marginBottom: '16px' }} />
        <div className="orient-skeleton" style={{ width: '60%', height: '20px', marginBottom: '26px' }} />
        
        {/* Featured blog image skeleton */}
        <div
          className="orient-skeleton"
          style={{ width: '100%', height: '420px', borderRadius: '12px', marginBottom: '32px' }}
        />

        {/* Content lines skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="orient-skeleton" style={{ width: '100%', height: '16px' }} />
          <div className="orient-skeleton" style={{ width: '96%', height: '16px' }} />
          <div className="orient-skeleton" style={{ width: '92%', height: '16px' }} />
          <div className="orient-skeleton" style={{ width: '98%', height: '16px' }} />
          <div className="orient-skeleton" style={{ width: '70%', height: '16px', marginBottom: '24px' }} />

          <div className="orient-skeleton" style={{ width: '40%', height: '24px', marginBottom: '12px' }} />
          <div className="orient-skeleton" style={{ width: '95%', height: '16px' }} />
          <div className="orient-skeleton" style={{ width: '90%', height: '16px' }} />
        </div>
      </div>
    </div>
  );
}

