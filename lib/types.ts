export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: "New" | "Bestseller" | "Sale" | "Limited" | null;
  shortDescription: string;
  description: string;
  features: string[];
  icon: string;
  colorway: [string, string];
  inStock: boolean;
  stockCount: number;
  sku: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  line1: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  address: Address;
  paymentMethod: string;
  status: "Processing" | "Confirmed" | "Shipped" | "Delivered";
  email: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  phone?: string;
  createdAt: string;
}
