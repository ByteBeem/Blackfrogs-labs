"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  { name: "Charger", image: "/charger.jpg", shopLink: "/shop/charger" },
  { name: "EarBuds", image: "/buds.jpg", shopLink: "/shop/earbuds" },
  { name: "Power Bank", image: "/s.jpg", shopLink: "/shop/powerbank" },
];

export default function ProductSlideshow() {
  const [index, setIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setIndex((prev) => (prev - 1 + products.length) % products.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % products.length);

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    setDragStart(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.clientX - dragStart);
    }
  };

  const onPointerUp = () => {
    if (dragOffset > 50) prevSlide();
    else if (dragOffset < -50) nextSlide();
    setDragStart(null);
    setDragOffset(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[24rem] md:h-[36rem] lg:h-[60vh] overflow-hidden touch-pan-y"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp} // handle drag leaving container
    >
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-300"
        style={{
          transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
        }}
      >
        {products.map((product, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover w-full h-full"
            />
            {/* Shop button bottom-right with subtle shadow */}
            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8">
              <Link
                href={product.shopLink}
                className="px-4 md:px-6 py-2 md:py-3 bg-foreground text-background font-bold rounded-full shadow-lg opacity-90 hover:opacity-100 transition text-sm md:text-base"
              >
                Shop
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Manual navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-foreground/50 text-background p-2 md:p-3 rounded-full hover:bg-foreground/80 transition z-10"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-foreground/50 text-background p-2 md:p-3 rounded-full hover:bg-foreground/80 transition z-10"
      >
        ▶
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-2 md:bottom-4 w-full flex justify-center gap-2 z-10">
        {products.map((_, i) => (
          <span
            key={i}
            className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-colors duration-300 ${
              i === index ? "bg-foreground" : "bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
