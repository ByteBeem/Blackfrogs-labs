"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Product data
const products = [
  {
    name: "Charger",
    tagline: "Premium Accessories & Repairs",
    image: "/charger.jpg",
  },
  {
    name: "EarBuds",
    tagline: "Fast Repairs & Original Parts",
    image: "/buds.jpg",
  },
  {
    name: "Power Bank",
    tagline: "Laptop Repairs Made Easy",
    image: "/s.jpg",
  },
];

// Dynamically import Swiper and SwiperSlide to avoid SSR issues
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => <p>Loading slideshow...</p>, // Optional fallback while loading
});

const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

export default function ProductSlideshow() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop
      className="w-full h-96 md:h-[500px]"
    >
      {products.map((product, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold text-foreground">
              {product.name}
            </h2>
            <p className="mt-2 text-foreground/70">{product.tagline}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}