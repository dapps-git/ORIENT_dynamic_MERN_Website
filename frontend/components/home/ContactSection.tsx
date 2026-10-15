'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await api.createInquiry({
        name: formData.name,
        email: formData.email,
        phone: '',
        company: '',
        message: `${formData.subject ? `[Subject: ${formData.subject}] ` : ''}${formData.message}`,
        type: 'general',
      });

      if (res.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your inquiry has been sent successfully. We will get back to you shortly.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: res.message || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not send message. Please reach out via phone or email.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#ffffff',
        padding: '70px 0 95px',
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          className="contact-layout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.18fr',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Get in Touch (Old Content + Orient Brand Theme) */}
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#2e3191',
                marginBottom: '10px',
              }}
            >
              CONTACT
            </div>

            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.1rem, 3.2vw, 2.75rem)',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '16px',
                lineHeight: 1.18,
                letterSpacing: '0.01em',
              }}
            >
              Get in Touch
            </h2>

            <p
              style={{
                fontSize: '0.88rem',
                color: '#4b5563',
                lineHeight: 1.65,
                marginBottom: '36px',
                fontWeight: 400,
              }}
            >
              Have a project in mind? Reach out to our engineering and procurement team for industrial supplies, certified materials, and equipment rental solutions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* 1. KSA Office Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    color: '#20b512',
                    flexShrink: 0,
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                    }}
                  >
                    Office Address
                  </h3>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#4b5563',
                      lineHeight: 1.65,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    Prince Musaid Bin Abdulaziz Al Khubar, Ash Shamaliyah Dist.
                    <br />
                    Unit Number: 36, Al Khobar 34427 - 3524, Building number - 6625, KSA
                  </p>
                </div>
              </div>

              {/* 2. Phone & WhatsApp */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    color: '#20b512',
                    flexShrink: 0,
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}
                  >
                    Phone & WhatsApp
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <a
                      href="tel:+966138930002"
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#f0fdf4',
                        color: '#15800d',
                        border: '1px solid #bbf7d0',
                        padding: '4px 12px',
                        borderRadius: '0px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        letterSpacing: '0.01em',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      +966 13 893 0002
                    </a>
                    <a
                      href="tel:+966552400778"
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#f0fdf4',
                        color: '#15800d',
                        border: '1px solid #bbf7d0',
                        padding: '4px 12px',
                        borderRadius: '0px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        letterSpacing: '0.01em',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      +966 55 240 0778
                    </a>
                  </div>
                </div>
              </div>

              {/* 3. Email Inquiry */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    color: '#20b512',
                    flexShrink: 0,
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                    }}
                  >
                    Email Inquiry
                  </h3>
                  <a
                    href="mailto:info@orientenergyco.com"
                    style={{
                      fontSize: '0.86rem',
                      color: '#4b5563',
                      textDecoration: 'none',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#20b512')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    info@orientenergyco.com
                  </a>
                </div>
              </div>

              {/* 4. Opening Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    color: '#20b512',
                    flexShrink: 0,
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                    }}
                  >
                    Opening Hours
                  </h3>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#4b5563',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    Sat – Thu: 7 AM – 12 PM and 2 PM – 8 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Exact Box Style + Orient Theme) */}
          <div>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Amiri, serif',
                fontSize: 'clamp(2.1rem, 3.2vw, 2.75rem)',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '32px',
                lineHeight: 1.18,
                letterSpacing: '0.01em',
              }}
            >
              Inquiry Form
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Row 1: Full Name & Email Address */}
              <div
                className="form-row-2col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '18px',
                }}
              >
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    color: '#111827',
                    padding: '14px 18px',
                    borderRadius: '0px',
                    fontSize: '0.88rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#20b512';
                    e.target.style.boxShadow = '0 0 0 3px rgba(32, 181, 18, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />

                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    color: '#111827',
                    padding: '14px 18px',
                    borderRadius: '0px',
                    fontSize: '0.88rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#20b512';
                    e.target.style.boxShadow = '0 0 0 3px rgba(32, 181, 18, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Row 2: Subject / Service Required */}
              <input
                type="text"
                placeholder="Subject / Service Required"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#111827',
                  padding: '14px 18px',
                  borderRadius: '0px',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#20b512';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 181, 18, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />

              {/* Row 3: Tell us about your project requirements... */}
              <textarea
                required
                rows={6}
                placeholder="Tell us about your project requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#111827',
                  padding: '14px 18px',
                  borderRadius: '0px',
                  fontSize: '0.88rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#20b512';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 181, 18, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />

              {status.message && (
                <div
                  style={{
                    fontSize: '0.84rem',
                    padding: '12px 16px',
                    backgroundColor: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
                    color: status.type === 'success' ? '#166534' : '#991b1b',
                    border: `1px solid ${status.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  }}
                >
                  {status.message}
                </div>
              )}

              {/* Row 4: Submit Button (Orient Energy Green Theme) */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#20b512',
                  border: 'none',
                  color: '#ffffff',
                  padding: '16px 28px',
                  borderRadius: '0px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%',
                  transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
                  marginTop: '4px',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#15800d';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(32, 181, 18, 0.35)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#20b512';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 560px) {
          .form-row-2col {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
