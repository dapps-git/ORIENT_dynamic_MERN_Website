'use client';
import Link from 'next/link';
import { IService } from '@/lib/api';

const DEFAULT_SERVICES = [
  {
    _id: '1',
    title: 'Industrial Equipment Procurement',
    slug: 'industrial-equipment-procurement',
    shortDescription: 'Global sourcing and supply chain management for certified industrial machinery, valves, pumps, and specialized engineering components.',
    icon: '⚙️',
    features: ['API & ISO Certified Sourcing', 'Global OEM Partnerships', 'Rapid Expediting & Customs Clearance']
  },
  {
    _id: '2',
    title: 'Instrumentation & Calibration Services',
    slug: 'instrumentation-calibration-services',
    shortDescription: 'Precision calibration, testing, and field maintenance for process instruments, transmitters, pressure gauges, and control valves.',
    icon: '🎛️',
    features: ['NIST Traceable Standards', 'On-Site Field Calibration', 'Emergency Response Support']
  },
  {
    _id: '3',
    title: 'Pipeline & Valve Overhaul',
    slug: 'pipeline-valve-overhaul',
    shortDescription: 'Specialized testing, lapping, machining, and hydrostatic pressure testing for critical control and isolation valves.',
    icon: '🔧',
    features: ['Hydro & Pneumatic Testing', 'Valve Seat Refurbishment', 'Offshore Rig Valve Support']
  },
  {
    _id: '4',
    title: 'Electrical & Automation Systems',
    slug: 'electrical-automation-systems',
    shortDescription: 'Design, assembly, and commissioning of low-to-medium voltage switchgear, motor control centers (MCC), and PLC automation panels.',
    icon: '⚡',
    features: ['PLC & SCADA Integration', 'UPS & Power Backup Systems', 'Hazardous Area ATEX Certified']
  },
  {
    _id: '5',
    title: 'Rotating Equipment Maintenance',
    slug: 'rotating-equipment-maintenance',
    shortDescription: 'Vibration analysis, dynamic balancing, alignment, and bearing overhaul for high-capacity pumps, compressors, and turbines.',
    icon: '🔄',
    features: ['Laser Alignment Technology', 'Dynamic Balancing in Field', 'Thermographic Inspection']
  },
  {
    _id: '6',
    title: 'Engineering Technical Consultancy',
    slug: 'engineering-consultancy',
    shortDescription: 'Technical feasibility studies, material specification engineering, and reverse engineering for obsolete industrial plant parts.',
    icon: '📐',
    features: ['FEED Studies & Metallurgy Analysis', 'Vendor Qualification Support', 'Saudi Vision 2030 Local Content']
  }
];

export default function ServicesSection({ services }: { services?: IService[] }) {
  const displayServices = services && services.length > 0 ? services : DEFAULT_SERVICES;

  return (
    <section className="section section--gray" id="services">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            ENGINEERING CAPABILITIES
          </div>
          <h2 className="section-title">
            Specialized Industrial <span>Engineering Services</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Supporting Saudi Arabia’s core industrial sectors with comprehensive field services,
            expert engineering support, and certified procurement workflows.
          </p>
        </div>

        <div className="grid-3" style={{ gap: '28px' }}>
          {displayServices.map((svc) => (
            <div
              key={svc.slug || svc.title}
              className="card"
              style={{
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                background: 'linear-gradient(180deg, rgba(14,22,40,0.95) 0%, rgba(10,16,30,0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '14px',
                    background: 'rgba(0, 161, 75, 0.12)',
                    border: '1px solid rgba(0, 161, 75, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    marginBottom: '24px',
                  }}
                >
                  {svc.icon || '⚙️'}
                </div>

                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: '#ffffff',
                  }}
                >
                  {svc.title}
                </h3>

                <p
                  style={{
                    color: 'var(--clr-muted)',
                    fontSize: '0.92rem',
                    lineHeight: '1.65',
                    marginBottom: '20px',
                  }}
                >
                  {svc.shortDescription || (svc as any).description}
                </p>

                {svc.features && svc.features.length > 0 && (
                  <ul
                    style={{
                      marginBottom: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {svc.features.slice(0, 3).map((f: string, idx: number) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '0.84rem',
                          color: '#c8d6e8',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ color: '#00a14b', fontWeight: 800 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                href={`/services/${svc.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#00a14b',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  marginTop: '10px',
                }}
              >
                Learn More
                <span>&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
