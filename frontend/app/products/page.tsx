import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import ProductsCatalogClient, { DivisionCard } from '@/components/products/ProductsCatalogClient';

export const metadata: Metadata = {
  title: 'Industrial Products & Engineering Supply Solutions in Saudi Arabia — Orient Energy',
  description:
    'Orient Energy Co. is a trusted industrial products supplier in Saudi Arabia delivering high-quality engineering materials, industrial equipment, maintenance products, safety solutions, and marine supplies across Riyadh, Dammam, Jubail, and Jeddah.',
  keywords: [
    'Industrial Mechanical Products Supplier Saudi Arabia',
    'Welding Equipment Supplier Saudi Arabia',
    'Industrial Electrical Products KSA',
    'Lifting Equipment Supplier Saudi Arabia',
    'Marine and Offshore Products Supplier Saudi Arabia',
    'Structural Steel Supplier Riyadh Dammam Jubail',
    'Industrial Fasteners Supplier Saudi Arabia',
    'Coatings and Surface Protection Saudi Arabia',
  ],
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getCategories(): Promise<DivisionCard[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://orient-dynamic-mern-website.onrender.com/api";
  try {
    const res = await fetch(`${apiUrl}/categories`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        return data.data.map((cat: any) => ({
          id: cat.slug || cat._id,
          slug: cat.slug,
          name: cat.name,
          image: cat.image && cat.image.trim() ? cat.image : '',
          productCount: cat.productCount !== undefined ? cat.productCount : 0,
        }));
      }
    }
  } catch (err) {
    console.error("Error fetching categories in ProductsPage SSR:", err);
  }
  return [];
}

export default async function ProductsPage() {
  const initialDivisions = await getCategories();

  return (
    <>
      <ScrollAnimation />
      <Navbar />
      <main>
        <ProductsCatalogClient initialDivisions={initialDivisions} />
      </main>
      <Footer />
    </>
  );
}
