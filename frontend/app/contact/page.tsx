import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Us — Orient Energy Trading Company',
  description:
    'Get in touch with Orient Energy for industrial supplies, heavy equipment rentals, and engineering solutions across Saudi Arabia.',
};

export default function ContactPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '100px' }}>
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
