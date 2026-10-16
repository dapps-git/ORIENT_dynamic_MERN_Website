import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import ProductsCatalogClient from '@/components/products/ProductsCatalogClient';

export const metadata: Metadata = {
  title: 'Industrial Products & Engineering Supply Solutions in Saudi Arabia — Orient Energy',
  description:
    'Orient Energy Co. is a trusted industrial products supplier in Saudi Arabia delivering high-quality engineering materials, industrial equipment, maintenance products, safety solutions, and marine supplies across Riyadh, Dammam, Jubail, and Jeddah.',
  keywords: [
    'Industrial Mechanical Products Supplier Saudi Arabia',
    'Welding Equipment Supplier Saudi Arabia',
    'Industrial Electrical Products KSA',
    'Lifting Equipment Supplier Saudi Arabia',
    'Industrial Power Systems Saudi Arabia',
    'Marine and Offshore Products Supplier Saudi Arabia',
    'Structural Steel Supplier Riyadh Dammam Jubail',
    'Industrial Fasteners Supplier Saudi Arabia',
    'Coatings and Surface Protection Saudi Arabia',
  ],
};

export default function ProductsPage() {
  return (
    <>
      <ScrollAnimation />
      <Navbar />
      <main>
        <ProductsCatalogClient />
      </main>
      <Footer />
    </>
  );
}
