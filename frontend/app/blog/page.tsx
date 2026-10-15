import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import BlogSection from '@/components/home/BlogSection';

export const metadata: Metadata = {
  title: 'Blogs & Insights — Orient Energy Trading Company',
  description:
    'Industrial insights, supply chain news, and heavy equipment rental updates from Orient Energy in Saudi Arabia.',
};

export default function BlogListPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '100px' }}>
        {/* Blog Posts Grid */}
        <BlogSection />
      </main>

      <Footer />
    </>
  );
}
