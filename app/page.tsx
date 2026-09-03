"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Star,
  Zap,
  Cable,
  BatteryCharging,
  Wrench,
  Speaker,
  Smartphone,
  BadgeCheck,
  Quote,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, formatPrice } from "../lib/products";
import { ProductCard } from "../components/ProductCard";
import { ProductVisual } from "../components/ProductVisual";
import { StarRating } from "../components/StarRating";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Chargers: Zap,
  Cables: Cable,
  "Power Banks": BatteryCharging,
  "Cases & Protection": ShieldCheck,
  Audio: Speaker,
  "Repair Kits": Wrench,
};

const TESTIMONIALS = [
  {
    name: "Naledi M.",
    role: "Verified Buyer",
    quote:
      "Ordered a charger and case together — both arrived well packaged within two days and the case fits perfectly. Will be back for more accessories.",
    rating: 5,
  },
  {
    name: "Johan V.",
    role: "Verified Buyer",
    quote:
      "The team also fixed my cracked screen the same week I bought a power bank from the shop. One stop for everything phone related.",
    rating: 5,
  },
  {
    name: "Precious K.",
    role: "Verified Buyer",
    quote:
      "Cable quality is genuinely better than what I get elsewhere — no more replacing chargers every two months. Worth the price.",
    rating: 4,
  },
];

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <div className="bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-28 md:pt-36 pb-16 md:pb-24 px-4">
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(circle_at_20%_20%,black,transparent_35%),radial-gradient(circle_at_80%_60%,black,transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slideUp">
           
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance mb-6">
              Premium mobile gear,
              <br />
              built to actually last.
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
              Chargers, cables, power banks, cases and audio — tested by the
              same technicians who repair thousands of devices a year. Then
              when something breaks, we fix that too.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-black text-white font-bold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:scale-[1.03]"
              >
                Shop the Store <ArrowRight size={17} />
              </Link>
              <Link
                href="/book-repair"
                className="inline-flex items-center gap-2 border-2 border-black font-bold px-7 py-3.5 rounded-full hover:bg-black hover:text-white transition-all"
              >
                Book a Repair
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-9">
              <div>
                <div className="flex items-center gap-1">
                  <StarRating rating={4.8} size={15} />
                </div>
                <p className="text-xs text-gray-500 mt-1">4.8/5 from 1,200+ reviews</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <p className="font-black text-lg leading-none">90-day</p>
                <p className="text-xs text-gray-500 mt-1">Warranty, every order</p>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Delivery", desc: "Orders over R1,000" },
            { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked" },
            { icon: ShieldCheck, title: "90-Day Warranty", desc: "On every product" },
            { icon: Headphones, title: "Real Support", desc: "Talk to a human" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">{title}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Categories</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Shop by Category</h2>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all">
            View All <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.filter((c) => c !== "All").map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || Smartphone;
            return (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-2xl p-6 hover:border-black hover:bg-black transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-white flex items-center justify-center transition-colors">
                  <Icon size={20} className="text-black" />
                </div>
                <span className="text-sm font-bold text-center text-gray-800 group-hover:text-white transition-colors">
                  {cat}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED / BESTSELLERS */}
      <section className="bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Fan Favorites</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Our Bestsellers</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all">
              Shop All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="relative overflow-hidden bg-black text-white rounded-3xl px-6 md:px-14 py-14 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full border border-white/10" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white text-black px-3.5 py-1.5 rounded-full mb-6">
              <Wrench size={13} /> Repairs
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Screen cracked? Battery dying?
              <br className="hidden md:block" /> We fix that too.
            </h2>
            <p className="text-gray-300 max-w-md mb-7">
              Same technicians, same quality standards. Book a screen repair,
              battery replacement, charging port fix or water damage
              treatment — most jobs done same day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book-repair"
                className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                Book a Repair <ArrowRight size={16} />
              </Link>
              <Link
                href="/track-repair"
                className="inline-flex items-center gap-2 border border-white/30 font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Track My Repair
              </Link>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            {[Smartphone, BatteryCharging, Zap, ShieldCheck].map((Icon, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Icon size={32} className="text-white/80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Just In</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">New Arrivals</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Loved by Customers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7 hover:bg-white/[0.08] transition-colors"
              >
                <Quote size={26} className="text-white/30 mb-4" />
                <p className="text-gray-200 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} className="fill-white text-white" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Get 10% off your first order
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Join our list for new arrivals, restock alerts, and subscriber-only pricing.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-black text-white font-bold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:scale-[1.03]"
        >
          Create a Free Account <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}
