"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

const products = [
  { name: "Charger", image: "/charger.jpg", shopLink: "/shop/charger", description: "Fast Charging Solutions" },
  { name: "EarBuds", image: "/buds.jpg", shopLink: "/shop/earbuds", description: "Premium Audio Experience" },
  { name: "Power Bank", image: "/s.jpg", shopLink: "/shop/powerbank", description: "Portable Power On-The-Go" },
];

export default function ProductSlideshow() {
  const [index, setIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const goToSlide = (i: number) => {
    setIndex(i);
  };

  // Touch/Drag handlers
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
      className="relative w-full h-[22rem] sm:h-[28rem] md:h-[36rem] lg:h-[42rem] xl:h-[48rem] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl group"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
        }}
      >
        {products.map((product, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            {/* Image with overlay gradient */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority={i === 0}
            />
            
            {/* Dark gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-10 lg:p-12">
              <div className="max-w-2xl space-y-3 md:space-y-4 transform transition-all duration-500">
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                  {product.name}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-slate-300">
                  {product.description}
                </p>
                
                {/* Shop button */}
                <Link
                  href={product.shopLink}
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 group/btn"
                >
                  <ShoppingBag size={20} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm md:text-base">Shop Now</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - show on hover for desktop */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-slate-950/50 backdrop-blur-sm text-white p-2 md:p-3 lg:p-4 rounded-full hover:bg-emerald-500/90 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-slate-950/50 backdrop-blur-sm text-white p-2 md:p-3 lg:p-4 rounded-full hover:bg-emerald-500/90 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/10"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 md:w-12 bg-gradient-to-r from-emerald-400 to-cyan-400"
                : "w-1.5 md:w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar (optional) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/30 z-10">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
          style={{
            width: `${((index + 1) / products.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}