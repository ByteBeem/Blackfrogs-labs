import { MetadataRoute } from "next";
import { PRODUCTS } from "../lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://blackfroglabs.co.za";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/book-repair`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/track-repair`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policies/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policies/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policies/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policies/shipping-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/policies/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
