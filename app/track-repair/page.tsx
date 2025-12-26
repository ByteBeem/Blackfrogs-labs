"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function TrackRepair() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found">("idle");

  const menuLinks = [
    { label: "Services", href: "/services" },
    { label: "Book Repair", href: "/book-repair" },
    { label: "Track Repair", href: "/track-repair" },
    { label: "Shop", href: "/shop" },
  ];

  const handleTrack = () => {
    if (!query.trim()) return;
    setStatus("loading");

    // Simulated API call
    setTimeout(() => {
      setStatus("found");
    }, 1000);
  };

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
            Black Frog Labs
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

      {/* PAGE CONTENT */}
      <section className="relative z-10 mt-16 px-6 py-20 flex flex-col items-center gap-8">
        <div className="w-full max-w-3xl space-y-8">
          {/* Title */}
          <header className="text-center space-y-2">
            <h2 className="text-3xl font-black">Track Your Repair</h2>
            <p className="text-foreground/70 text-sm">
              Enter your repair reference or phone number
            </p>
          </header>

          {/* Input */}
          <div className="space-y-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Repair ID or Phone Number"
              className="w-full rounded-xl border border-foreground/20
              bg-background px-4 py-3 outline-none
              focus:ring-2 focus:ring-foreground/30"
            />

            <button
              onClick={handleTrack}
              className="w-full rounded-xl bg-foreground
              py-3 font-bold text-background
              transition hover:opacity-90 disabled:opacity-50"
              disabled={!query}
            >
              {status === "loading" ? "Checking…" : "Track Repair"}
            </button>
          </div>

          {/* Status Card */}
          {status === "found" && (
            <div className="rounded-2xl border border-foreground/10 p-5">
              <p className="text-sm text-foreground/60">Current Status</p>
              <p className="mt-1 font-semibold text-lg">In Repair</p>
              <div className="mt-3 text-sm text-foreground/70">
                Estimated completion: 1–2 business days
              </div>
            </div>
          )}

          {/* Helpful Tips / Info to fill empty space */}
          <div className="rounded-2xl border border-foreground/10 p-5 bg-background/90 text-center">
            <h3 className="font-bold mb-2">Need Assistance?</h3>
            <p className="text-foreground/70 text-sm mb-4">
              You can also book a repair or contact us directly if you have any questions.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://wa.me/27663743513"
                className="rounded-full bg-foreground px-6 py-2 font-bold text-background transition hover:opacity-90"
              >
                WhatsApp
              </a>
              <a
                href="tel:+27663743513"
                className="rounded-full border border-foreground px-6 py-2 font-bold transition hover:bg-foreground hover:text-background"
              >
                Call
              </a>
            </div>
          </div>
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
