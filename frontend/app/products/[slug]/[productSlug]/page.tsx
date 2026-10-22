import ProductDetailPage, { generateMetadata as generateProductMetadata } from '@/app/product/[slug]/page';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  return generateProductMetadata({ params: Promise.resolve({ slug: productSlug }) });
}

export default async function ProductNestedDivisionPage({
  params,
}: {
  params: Promise<{ slug: string; productSlug: string }>;
}) {
  const { productSlug } = await params;
  return ProductDetailPage({ params: Promise.resolve({ slug: productSlug }) });
}
