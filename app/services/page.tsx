"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Smartphone, BatteryCharging, PlugZap, Droplet } from "lucide-react";

export default function Services() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuLinks = [
    { label: "Services", href: "#" },
    { label: "Book Repair", href: "#" },
    { label: "Track Repair", href: "#" },
    { label: "Shop", href: "#" },
  ];

  const services = [
    { title: "Screen Repair", icon: Smartphone, description: "High-quality parts, expert technicians, fast turnaround." },
    { title: "Battery Replacement", icon: BatteryCharging, description: "Keep your device running longer with a new battery." },
    { title: "Charging Port Repair", icon: PlugZap, description: "Fix faulty ports and enjoy fast, reliable charging." },
    { title: "Water Damage Treatment", icon: Droplet, description: "Professional diagnostics and repair after water exposure." },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
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
              <Link key={link.label} href={link.href} className="hover:text-foreground transition">
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

      {/* HERO */}
      <section className="relative z-10 mt-16 bg-gradient-to-r from-foreground/5 to-background/5 py-20 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Professional Mobile Repair Services</h1>
        <p className="text-foreground/70 max-w-xl mx-auto">
          We provide expert repairs for your devices with certified technicians and high-quality parts.
          Fast turnaround times and reliable service guaranteed.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map(({ title, icon: Icon, description }) => (
          <div
            key={title}
            className="rounded-3xl border border-foreground/10 p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl bg-background/90 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-foreground/10">
              <Icon size={32} className="text-foreground" />
            </div>
            <h3 className="mb-2 font-bold text-lg">{title}</h3>
            <p className="text-sm text-foreground/70">{description}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="pb-24 flex flex-col items-center gap-4 text-center z-10 relative">
        <h3 className="text-2xl font-bold">Need Help with Your Device?</h3>
        <p className="text-foreground/70 max-w-md">
          Book a repair or track your device in real-time. Our team is ready to assist you!
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/book-repair"
            className="rounded-full bg-foreground px-10 py-4 font-bold text-background transition hover:opacity-90"
          >
            Book Repair
          </Link>
          <Link
            href="/track-repair"
            className="rounded-full border border-foreground px-10 py-4 font-bold transition hover:bg-foreground hover:text-background"
          >
            Track Repair
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-foreground/10 py-10 text-center text-sm text-foreground/60 flex flex-col items-center gap-2 relative z-10">
        <div className="relative w-10 h-10">
          <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
        </div>
        <p>© 2025 BlackFrogs Labs</p>
        <p>Professional Mobile Repairs • Lydenburg</p>
      </footer>
    </main>
  );
}
