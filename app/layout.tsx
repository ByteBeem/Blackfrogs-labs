import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Black Frog Labs | Premium Mobile Accessories & Expert Repairs",
    template: "%s | Black Frog Labs",
  },
  description:
    "Shop premium chargers, cables, power banks, cases and audio at Black Frog Labs. Plus expert mobile device repairs in Lydenburg, Mpumalanga — fast turnaround, 90-day warranty.",
  keywords: [
    "online store",
    "mobile accessories",
    "phone repair",
    "Lydenburg",
    "chargers",
    "cables",
    "power banks",
    "phone cases",
    "Black Frog Labs",
    "Mpumalanga",
    "South Africa online shop",
  ],
  authors: [{ name: "Black Frog Labs" }],
  creator: "Black Frog Labs",
  publisher: "Black Frog Labs",
  formatDetection: { email: true, address: true, telephone: true },
  metadataBase: new URL("https://blackfroglabs.co.za"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://blackfroglabs.co.za",
    siteName: "Black Frog Labs",
    title: "Black Frog Labs | Premium Mobile Accessories & Expert Repairs",
    description:
      "Shop premium mobile accessories and book expert device repairs — fast turnaround, 90-day warranty, delivered across South Africa.",
    images: [{ url: "/logo.jpg", width: 512, height: 512, alt: "Black Frog Labs Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Frog Labs | Premium Mobile Accessories & Expert Repairs",
    description: "Premium mobile accessories and expert device repairs, shipped across South Africa.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/logo.jpg", sizes: "any" }],
    shortcut: "/logo.jpg",
    apple: [{ url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
  },
  manifest: "/manifest.json",
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Black Frog Labs",
              image: "https://blackfroglabs.co.za/logo.jpg",
              url: "https://blackfroglabs.co.za",
              telephone: "+27663743513",
              email: "info@blackfroglabs.co.za",
              description:
                "Premium mobile accessories and expert mobile device repairs in Lydenburg, Mpumalanga.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lydenburg",
                addressRegion: "Mpumalanga",
                addressCountry: "ZA",
              },
              geo: { "@type": "GeoCoordinates", latitude: -25.087717, longitude: 30.41601 },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "17:00",
              },
              priceRange: "R100 - R2000",
              sameAs: [
                "https://www.facebook.com/blackfroglabs",
                "https://www.instagram.com/blackfroglabs",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
