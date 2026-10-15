import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

interface ArticleData {
  title: string;
  subtitle: string;
  image: string;
  date: string;
  comments: string;
  introduction: string;
  fleetTitle?: string;
  fleetPoints?: { label: string; text: string }[];
  whyChoosePoints: string[];
  conclusion: string;
}

const ARTICLES: Record<string, ArticleData> = {
  'reliable-heavy-equipment-rental-across-saudi-arabia': {
    title: 'Reliable Heavy Equipment Rental Across Saudi Arabia',
    subtitle: 'Why Orient Energy Co. is the Go-To Heavy Equipment Rental Provider in Saudi Arabia',
    image: '/blog/blog-1.jpg',
    date: 'May 23, 2026',
    comments: '0 Comment',
    introduction:
      'In Saudi Arabia’s fast-paced industrial landscape, having reliable heavy equipment is crucial. Orient Energy Trading Company (OETC) – Rental Equipments Division offers top-tier machinery and equipment rental solutions for construction, oil & gas, and industrial projects.',
    fleetTitle: 'Fleet and Services:',
    fleetPoints: [
      {
        label: 'Extensive Fleet',
        text: 'Thousands of specialized equipment units, from mobile cranes and bulldozers to earth-moving machines and rollers.',
      },
      {
        label: 'Rental Flexibility',
        text: 'Options for short-term projects, long-term contracts, and emergency requirements.',
      },
      {
        label: 'Support Services',
        text: 'Equipment maintenance, heavy lifting solutions, industrial cleaning, dewatering services, and temporary site facilities.',
      },
    ],
    whyChoosePoints: [
      'ISO-certified operations and SAP-driven management.',
      'Aramco-certified operators ensuring safety and expertise.',
      'Coverage across urban and rural project sites throughout Saudi Arabia.',
    ],
    conclusion:
      'For industries seeking dependable, efficient, and well-maintained heavy machinery, Orient Energy Co. provides a one-stop rental solution tailored to meet the rigorous demands of Saudi Arabia’s industrial sector.',
  },
  'comprehensive-industrial-supply-solutions': {
    title: 'Comprehensive Industrial Supply Solutions',
    subtitle: 'How Orient Energy Supports Industrial Growth Across Saudi Arabia',
    image: '/blog/blog-2.jpg',
    date: 'May 20, 2026',
    comments: '0 Comment',
    introduction:
      'Orient Energy Co. is a leading industrial products supplier in Saudi Arabia, catering to demanding sectors including oil & gas, petrochemical, manufacturing, and energy infrastructure. With rapid project expansions under Vision 2030, timely access to certified materials and mechanical parts is the difference between seamless operations and costly delays.',
    fleetTitle: 'Material Portfolio & Supply Capabilities:',
    fleetPoints: [
      {
        label: 'Mechanical & Piping',
        text: 'Certified valves, flanges, seamless pipes, and specialized alloy fittings compliant with ASTM, API, and DIN standards.',
      },
      {
        label: 'Electrical & Instrumentation',
        text: 'Explosion-proof enclosures, switchgear, cabling, sensors, and telemetry modules for high-hazard processing plants.',
      },
      {
        label: 'Safety & Welding',
        text: 'Complete PPE assortments, multi-operator welding machines, consumables, and site containment equipment.',
      },
    ],
    whyChoosePoints: [
      'Global OEM vendor relationships with traceable mill test certificates.',
      'Robust warehousing and rapid fulfillment hubs in Eastern Province.',
      'Dedicated technical engineers assisting with product cross-referencing and specifications.',
    ],
    conclusion:
      'By streamlining the procurement lifecycle and maintaining relentless quality control, Orient Energy empowers Saudi industrial operators to execute their most demanding facilities with complete assurance.',
  },
  'integrated-engineering-procurement-solutions': {
    title: 'Integrated Engineering & Procurement Solutions',
    subtitle: 'Your Partner for Industrial Efficiency and Operational Excellence',
    image: '/blog/blog-3.jpg',
    date: 'May 16, 2026',
    comments: '0 Comment',
    introduction:
      'Modern industrial infrastructure requires more than standalone parts—it demands turnkey engineering expertise, synchronized global supply chains, and seasoned on-site coordination. Orient Energy Trading Company bridges the gap between engineering design and project execution.',
    fleetTitle: 'Integrated Solutions Scope:',
    fleetPoints: [
      {
        label: 'Procurement Engineering',
        text: 'Translating complex client drawings and data sheets into audited vendor packages with strict quality assurance.',
      },
      {
        label: 'Shutdown & Turnaround Support',
        text: 'Pre-shutdown inventory staging, rapid tool delivery, emergency plant outage supplies, and critical equipment backups.',
      },
      {
        label: 'Logistics & Compliance',
        text: 'End-to-end customs clearance, SASO Saber registration compliance, and bonded site delivery throughout the Kingdom.',
      },
    ],
    whyChoosePoints: [
      'Over two decades of proven delivery across SABIC, Saudi Aramco, and SEC contractor supply chains.',
      'Strict adherence to international safety, environmental, and quality certifications.',
      'Single-point accountability from initial RFQ to final site handover.',
    ],
    conclusion:
      'As Saudi Arabia accelerates mega-industrial developments, Orient Energy remains committed to delivering integrated engineering and supply solutions that maximize uptime, safety, and long-term asset reliability.',
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: 'Article Not Found — Orient Energy' };

  return {
    title: `${article.title} — Orient Energy Blogs`,
    description: article.introduction.slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug] || ARTICLES['reliable-heavy-equipment-rental-across-saudi-arabia'];

  if (!article) notFound();

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>


        {/* Article Container matching Image 3 */}
        <article
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            padding: '120px 24px 100px',
          }}
        >
          {/* Featured Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '460px',
              borderRadius: '0px',
              overflow: 'hidden',
              backgroundColor: '#0f172a',
              boxShadow: '0 8px 28px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 880px"
              style={{ objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Meta Line */}
          <div
            style={{
              fontSize: '0.82rem',
              color: '#64748b',
              marginTop: '26px',
              marginBottom: '14px',
              fontWeight: 400,
            }}
          >
            {article.date} &nbsp;•&nbsp; {article.comments}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Amiri, serif',
              fontSize: 'clamp(2.3rem, 3.8vw, 3.2rem)',
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1.18,
              marginBottom: '16px',
              letterSpacing: '0.01em',
            }}
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Amiri, serif',
              fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
              fontWeight: 600,
              color: '#334155',
              lineHeight: 1.3,
              marginBottom: '28px',
              letterSpacing: '0.01em',
            }}
          >
            {article.subtitle}
          </h2>

          {/* Introduction */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.94rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '8px',
              }}
            >
              Introduction:
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.75,
                color: '#4b5563',
                margin: 0,
                fontWeight: 400,
              }}
            >
              {article.introduction}
            </p>
          </div>

          {/* Fleet and Services */}
          {article.fleetPoints && (
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '12px',
                }}
              >
                {article.fleetTitle || 'Fleet and Services:'}
              </h3>
              <ul
                style={{
                  listStyle: 'disc',
                  paddingLeft: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {article.fleetPoints.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.75,
                      color: '#4b5563',
                    }}
                  >
                    <strong style={{ color: '#111827', fontWeight: 600 }}>{item.label}:</strong>{' '}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why Choose Orient Energy */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.94rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '12px',
              }}
            >
              Why Choose Orient Energy:
            </h3>
            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {article.whyChoosePoints.map((point, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.75,
                    color: '#4b5563',
                  }}
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <div style={{ marginBottom: '36px' }}>
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.94rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '8px',
              }}
            >
              Conclusion:
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.75,
                color: '#4b5563',
                margin: 0,
                fontWeight: 400,
              }}
            >
              {article.conclusion}
            </p>
          </div>

          {/* Back to Blogs Button */}
          <div style={{ paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#2e3191',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              &larr; Back to all blogs
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
