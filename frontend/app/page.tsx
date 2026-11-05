import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import SectorsTwoBoxShowcase from '@/components/home/SectorsTwoBoxShowcase';
import FeaturedProductsShowcase from '@/components/home/FeaturedProductsShowcase';
import AboutSection from '@/components/home/AboutSection';
import ApprovedBySection from '@/components/home/ApprovedBySection';
import IndustriesSection from '@/components/home/IndustriesSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import GoogleReviewsSection from '@/components/home/GoogleReviewsSection';
import ScrollAnimation from '@/components/ScrollAnimation';

export default function HomePage() {

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main style={{ overflowX: 'hidden', width: '100%', position: 'relative' }}>
        {/* Hero Section (Landscape video & Clients marquee) */}
        <HeroSection />

        {/* 2-Box Animated Sectors Showcase (Placed after clients logo, above About section) */}
        <SectorsTwoBoxShowcase />

        {/* 4 Uploaded Industrial Products Showcase */}
        <FeaturedProductsShowcase />

        {/* About Orient Energy (Established 2001) */}
        <AboutSection />

        {/* Approved By (Accreditations & Major Approvals) */}
        <ApprovedBySection />

        {/* Industries We Serve (Powering Industry, Driving Progress.) */}
        <IndustriesSection />

        {/* Why Choose Orient Energy? (Because Your Operations Deserve the Best.) */}
        <WhyChooseSection />

        {/* Real Google Customer Reviews & Ratings */}
        <GoogleReviewsSection />
      </main>

      <Footer />
    </>
  );
}
