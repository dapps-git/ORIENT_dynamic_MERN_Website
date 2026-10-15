// Shared API utility for Orient Energy frontend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    next: { revalidate: 60 }, // ISR — revalidate every 60s
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error ${res.status}`);
  }

  return res.json();
}

// Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  featured: boolean;
  order: number;
  productCount?: number;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  sku: string;
  category: Category | string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  specifications: { label: string; value: string }[];
  features: string[];
  images: string[];
  isFeatured: boolean;
  inStock: boolean;
  catalogueUrl: string;
  relatedProducts?: Product[];
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  order: number;
  isActive: boolean;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  aboutShort: string;
  aboutFull: string;
  phone: string;
  email: string;
  address: string;
  locations: string[];
  workingHours: string;
  socials: { linkedin?: string; instagram?: string; twitter?: string; facebook?: string };
  stats: { experienceYears: number; productsDelivered: number; activeClients: number; satisfactionRate: number };
}

// API helpers
export const api = {
  categories:   () => fetchAPI<{ data: Category[] }>('/categories'),
  category:     (slug: string) => fetchAPI<{ data: Category & { products: Product[] } }>(`/categories/${slug}`),
  products:     (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ data: Product[]; pagination: { total: number; page: number; pages: number } }>(`/products${qs}`);
  },
  product:      (slug: string) => fetchAPI<{ data: Product }>(`/products/${slug}`),
  services:     () => fetchAPI<{ data: Service[] }>('/services'),
  service:      (slug: string) => fetchAPI<{ data: Service }>(`/services/${slug}`),
  settings:     () => fetchAPI<{ data: CompanySettings }>('/admin/settings'),
  submitInquiry:(body: object) => fetchAPI<{ success: boolean; message: string }>('/inquiries', {
    method: 'POST',
    body: JSON.stringify(body),
    next: undefined,
  }),
  createInquiry:(body: object) => api.submitInquiry(body),
};

export type IService = Service;
export type IProduct = Product;
export type ICategory = Category;
