"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Smartphone,
  BatteryCharging,
  PlugZap,
  Droplet,
} from "lucide-react";
import ProductSlideshow from "../components/ProductSlideshow"; // path depends on your structure

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuLinks = [
    { label: "Services", href: "#" },
    { label: "Book Repair", href: "#" },
    { label: "Track Repair", href: "#" },
    { label: "Shop", href: "#" },
  ];

  const services = [
    { title: "Screen Repair", icon: Smartphone },
    { title: "Battery Replacement", icon: BatteryCharging },
    { title: "Charging Port Repair", icon: PlugZap },
    { title: "Water Damage Treatment", icon: Droplet },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Repeated Logo Watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 grid grid-cols-5 grid-rows-5 gap-8 p-8">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="relative w-20 h-20">
            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
          </div>
        ))}
      </div>

      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-extrabold tracking-wide"
          >
            <div className="relative w-8 h-8">
              <Image src="/logo.jpg" alt="BlackFrogs Labs" fill className="object-contain" />
            </div>
            BlackFrogs Labs
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-foreground/10 bg-background">
            <div className="flex flex-col gap-4 px-6 py-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO / SLIDESHOW */}
      <section className="relative z-10 mt-16 px-6">
        <ProductSlideshow />
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10 relative">
        {services.map(({ title, icon: Icon }) => (
          <div
            key={title}
            className="rounded-3xl border border-foreground/10 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg bg-background/90"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-foreground/10">
              <Icon size={32} className="text-foreground" />
            </div>
            <h3 className="mb-2 font-bold text-lg text-center">{title}</h3>
            <p className="text-sm text-foreground/70 text-center">
              Expert diagnostics with fast turnaround times.
            </p>
          </div>
        ))}
      </section>

      {/* LOCATION */}
      <section className="mx-auto max-w-3xl px-6 pb-20 z-10 relative">
        <div className="rounded-3xl border border-foreground/10 p-10 text-center shadow-sm bg-background/90">
          <h3 className="text-2xl font-bold">Visit Our Repair Lab</h3>
          <p className="mt-2 text-foreground/70">Conveniently located in South Africa</p>
          <a
            href="#"
            className="mt-6 inline-block rounded-full border border-foreground px-8 py-3 font-semibold transition hover:bg-foreground hover:text-background"
          >
            Open in Maps
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 flex flex-col items-center gap-4 z-10 relative">
        <a
          href="https://wa.me/27663743513"
          className="rounded-full bg-foreground px-10 py-4 font-bold text-background transition hover:scale-105 hover:opacity-90"
        >
          WhatsApp Us
        </a>

        <a
          href="tel:+27663743513"
          className="rounded-full border border-foreground px-10 py-4 font-bold transition hover:bg-foreground hover:text-background hover:scale-105"
        >
          Call Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-foreground/10 py-10 text-center text-sm text-foreground/60 flex flex-col items-center gap-2 relative z-10">
        <div className="relative w-10 h-10">
          <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
        </div>
        <p>© 2025 BlackFrogs Labs</p>
        <p>Professional Mobile Repairs • South Africa</p>
      </footer>
    </main>
  );
}
