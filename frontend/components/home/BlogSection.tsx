'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  title: string;
  image: string;
  readTime: string;
  slug: string;
}

const POSTS: BlogPost[] = [
  {
    title: 'RELIABLE HEAVY EQUIPMENT RENTAL ACROSS SAUDI ARABIA',
    image: '/blog/blog-1.jpg',
    readTime: '11 Minute Read',
    slug: 'reliable-heavy-equipment-rental-across-saudi-arabia',
  },
  {
    title: 'COMPREHENSIVE INDUSTRIAL SUPPLY SOLUTIONS',
    image: '/blog/blog-2.jpg',
    readTime: '10 Minute Read',
    slug: 'comprehensive-industrial-supply-solutions',
  },
  {
    title: 'INTEGRATED ENGINEERING & PROCUREMENT SOLUTIONS',
    image: '/blog/blog-3.jpg',
    readTime: '9 Minute Read',
    slug: 'integrated-engineering-procurement-solutions',
  },
];

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>(POSTS);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setBlogs(
            data.data.map((b: any) => ({
              title: b.title.toUpperCase(),
              image: b.image || '/blog/blog-1.jpg',
              readTime: b.readTime || '8 Minute Read',
              slug: b.slug,
            }))
          );
        }
      })
      .catch(() => {
        // Fallback to static posts
      });
  }, []);

  return (
    <section
      id="blog"
      style={{
        backgroundColor: '#ffffff',
        padding: '85px 0 95px',
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '46px' }}>
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
            NEWS &amp; BLOGS
          </div>

          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)',
              fontWeight: 500,
              color: '#111827',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Your Source for Industrial Expertise
          </h2>
        </div>

        {/* 3 Blog Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '26px',
          }}
          className="blog-cards-grid"
        >
          {POSTS.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              className="scroll-reveal"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9',
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                transition: 'transform 0.28s ease, box-shadow 0.28s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.10)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Featured Image */}
              <div style={{ position: 'relative', width: '100%', height: '235px', backgroundColor: '#0f172a' }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '22px 22px 18px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.94rem',
                    fontWeight: 500,
                    color: '#111827',
                    lineHeight: 1.4,
                    marginBottom: '16px',
                    letterSpacing: '0.01em',
                  }}
                >
                  {post.title}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    paddingTop: '12px',
                    borderTop: '1px solid #e2e8f0',
                    fontWeight: 500,
                  }}
                >
                  <span>{post.readTime}</span>
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#e2e8f0',
                      color: '#1e293b',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      borderRadius: '0px',
                    }}
                  >
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .blog-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </section>
  );
}
