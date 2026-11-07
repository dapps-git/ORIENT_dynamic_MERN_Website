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

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://orient-dynamic-mern-website.onrender.com/api"}/blogs`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data.map((b: any) => ({ slug: b.slug }));
      }
    }
  } catch {}
  return [];
}

async function getArticle(slug: string): Promise<ArticleData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://orient-dynamic-mern-website.onrender.com/api"}/blogs/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    if (data.success && data.data) {
      const b = data.data;
      return {
        title: b.title,
        subtitle: b.subtitle || '',
        image: b.image || '/blog/blog-1.jpg',
        date: b.date || 'Orient Energy Insight',
        comments: '0 Comment',
        introduction: b.introduction || '',
        fleetTitle: b.fleetTitle || 'Key Capabilities & Offerings:',
        fleetPoints: Array.isArray(b.fleetPoints) ? b.fleetPoints : [],
        whyChoosePoints: Array.isArray(b.whyChoosePoints) ? b.whyChoosePoints : [],
        conclusion: b.conclusion || '',
      };
    }
  } catch {
    return null;
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
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
  const article = await getArticle(slug);

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
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(1.85rem, 3.0vw, 2.6rem)',
              fontWeight: 500,
              color: '#111827',
              lineHeight: 1.2,
              marginBottom: '16px',
              letterSpacing: '-0.01em',
            }}
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
              fontWeight: 500,
              color: '#334155',
              lineHeight: 1.35,
              marginBottom: '28px',
              letterSpacing: '0.01em',
            }}
          >
            {article.subtitle}
          </h2>

          {/* Introduction & Content (Supports Rich Formatting: Bold, Italic, Images, Links, Headings) */}
          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.94rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '10px',
              }}
            >
              Overview:
            </h3>
            <div
              className="blog-rendered-content"
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.8,
                color: '#4b5563',
                margin: 0,
                fontWeight: 400,
              }}
              dangerouslySetInnerHTML={{ __html: article.introduction }}
            />
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

      <style>{`
        .blog-rendered-content strong,
        .blog-rendered-content b {
          color: #0f172a !important;
          font-weight: 600 !important;
        }
        .blog-rendered-content em,
        .blog-rendered-content i {
          font-style: italic !important;
        }
        .blog-rendered-content u {
          text-decoration: underline !important;
        }
        .blog-rendered-content a {
          color: #2e3191 !important;
          text-decoration: underline !important;
          font-weight: 500 !important;
          transition: color 0.2s ease;
        }
        .blog-rendered-content a:hover {
          color: #20b512 !important;
        }
        .blog-rendered-content img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
          margin: 18px 0 !important;
          display: block !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
        }
        .blog-rendered-content h2 {
          font-family: 'Montserrat', sans-serif !important;
          color: #0f172a !important;
          font-size: 1.35rem !important;
          font-weight: 600 !important;
          margin: 24px 0 10px !important;
          letter-spacing: -0.01em;
        }
        .blog-rendered-content h3 {
          font-family: 'Montserrat', sans-serif !important;
          color: #1e293b !important;
          font-size: 1.15rem !important;
          font-weight: 600 !important;
          margin: 20px 0 8px !important;
        }
        .blog-rendered-content p {
          margin-bottom: 14px !important;
          line-height: 1.8 !important;
        }
        .blog-rendered-content ul {
          padding-left: 24px !important;
          margin: 12px 0 16px !important;
          list-style-type: disc !important;
        }
        .blog-rendered-content ol {
          padding-left: 24px !important;
          margin: 12px 0 16px !important;
          list-style-type: decimal !important;
        }
        .blog-rendered-content li {
          margin-bottom: 6px !important;
          line-height: 1.7 !important;
        }
        .blog-rendered-content blockquote {
          border-left: 4px solid #20b512 !important;
          padding: 12px 18px !important;
          margin: 18px 0 !important;
          background-color: #f8fafc !important;
          color: #334155 !important;
          font-style: italic !important;
          border-radius: 0 6px 6px 0 !important;
        }
      `}</style>
    </>
  );
}
