import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import CapabilitiesSection from '@/components/home/CapabilitiesSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import TrustBannerSection from '@/components/home/TrustBannerSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import RentalDivisionSection from '@/components/home/RentalDivisionSection';
import BlogSection from '@/components/home/BlogSection';
import ScrollAnimation from '@/components/ScrollAnimation';

export default function HomePage() {

  return (
    <>
      <ScrollAnimation />
      <Navbar />

      <main>
        {/* Hero Section (RevSlider exact layout) */}
        <HeroSection />

        {/* About Orient Energy (Established 2001) */}
        <AboutSection />

        {/* Our Capabilities (Engineering Excellence, Every Time.) */}
        <CapabilitiesSection />

        {/* Industries We Serve (Powering Industry, Driving Progress.) */}
        <IndustriesSection />

        {/* Product Categories (Thousands of Industrial Products. One Reliable Supplier.) */}
        <CategoriesSection />

        {/* Operational Excellence Built on Trust */}
        <TrustBannerSection />

        {/* Why Choose Orient Energy? (Because Your Operations Deserve the Best.) */}
        <WhyChooseSection />

        {/* What people say about Orient Energy */}
        <TestimonialsSection />

        {/* OETC Rental Equipments Division */}
        <RentalDivisionSection />

        {/* Articles & blog posts with useful information */}
        <BlogSection />
      </main>

      <Footer />
    </>
  );
}
