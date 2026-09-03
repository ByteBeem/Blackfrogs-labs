const API_URL = process.env.NEXT_PUBLIC_ISDEVELOPMENT === "true" ? "http://localhost:5041" : "https://api.blackfroglabs.co.za";

export interface ApiProductImage {
  id: string;
  url: string;
  sortOrder: number;
}

export interface ApiProductListItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAtPrice: number | null;
  badge: string | null;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  primaryImageUrl: string | null;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  sku: string;
  shortDescription: string;
  description: string;
  features: string[];
  price: number;
  compareAtPrice: number | null;
  badge?: string | null;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  images: ApiProductImage[];
  createdAt: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ProductQuery {
  category?: string;
  query?: string;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchProducts(query: ProductQuery): Promise<PagedResult<ApiProductListItem>> {
  const params = new URLSearchParams();
  if (query.category && query.category !== "All") params.set("category", query.category);
  if (query.query) params.set("query", query.query);
  if (query.maxPrice) params.set("maxPrice", String(query.maxPrice));
  if (query.sortBy) params.set("sortBy", query.sortBy);
  params.set("page", String(query.page || 1));
  params.set("pageSize", String(query.pageSize || 60));

  return apiGet<PagedResult<ApiProductListItem>>(`/api/products?${params.toString()}`);
}

export async function fetchCategories(): Promise<string[]> {
  return apiGet<string[]>("/api/products/categories");
}

export async function fetchProductBySlug(slug: string): Promise<ApiProduct | null> {
  const res = await fetch(`${API_URL}/api/products/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchRelatedProducts(productId: string): Promise<ApiProductListItem[]> {
  return apiGet<ApiProductListItem[]>(`/api/products/${productId}/related`);
}

// Maps the API shape onto the field names your existing ProductCard /
// ProductVisual components expect, so they work without modification.
export function toCardProduct(p: ApiProductListItem | ApiProduct) {
  const image = "images" in p ? p.images[0]?.url : p.primaryImageUrl;
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    compareAtPrice: p.compareAtPrice ?? undefined,
    badge: p.badge ?? undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    inStock: p.inStock,
    image: image ?? undefined,
    ...( "shortDescription" in p ? { shortDescription: p.shortDescription } : {} ),
    ...( "sku" in p ? { sku: p.sku } : {} ),
    ...( "description" in p ? { description: p.description } : {} ),
    ...( "features" in p ? { features: p.features } : {} ),
    ...( "stockCount" in p ? { stockCount: p.stockCount } : {} ),
  };
}