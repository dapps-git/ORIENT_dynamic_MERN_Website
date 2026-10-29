import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import SectorsTwoBoxShowcase from '@/components/home/SectorsTwoBoxShowcase';
import AboutSection from '@/components/home/AboutSection';
import CapabilitiesSection from '@/components/home/CapabilitiesSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import TrustBannerSection from '@/components/home/TrustBannerSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogSection from '@/components/home/BlogSection';
import ScrollAnimation from '@/components/ScrollAnimation';

export default function HomePage() {

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main>
        {/* Hero Section (Landscape video & Clients marquee) */}
        <HeroSection />

        {/* 2-Box Animated Sectors Showcase (Placed after clients logo, above About section) */}
        <SectorsTwoBoxShowcase />

        {/* About Orient Energy (Established 2001) */}
        <AboutSection />

        {/* Our Capabilities (Engineering Excellence, Every Time.) */}
        <CapabilitiesSection />

        {/* Industries We Serve (Powering Industry, Driving Progress.) */}
        <IndustriesSection />

        {/* Operational Excellence Built on Trust */}
        <TrustBannerSection />

        {/* Why Choose Orient Energy? (Because Your Operations Deserve the Best.) */}
        <WhyChooseSection />

        {/* What people say about Orient Energy */}
        <TestimonialsSection />

        {/* Articles & blog posts with useful information */}
        <BlogSection />
      </main>

      <Footer />
    </>
  );
}
