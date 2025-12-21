"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function BookRepair() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const menuLinks = [
    { label: "Services", href: "/services" },
    { label: "Book Repair", href: "/bool-repair" },
    { label: "Track Repair", href: "/track-repair" },
    { label: "Shop", href: "/shop" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulated submit
    setTimeout(() => {
      setSubmitting(false);
      alert("Repair request submitted");
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

      {/* PAGE CONTENT */}
      <section className="relative z-10 mt-16 px-6 py-20 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        {/* LEFT — IMAGE */}
        <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/Repair.jpg"
            alt="Professional repairing phone"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT — TEXT & FORM */}
        <div className="w-full md:w-1/2 space-y-8">
          <header className="space-y-4">
            <h2 className="text-3xl font-black leading-tight">Book a Professional Repair</h2>
            <p className="text-foreground/70">
              Tell us about your device and the issue you’re experiencing.
              Our technicians will review your request and get back to you
              with pricing and turnaround time.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-foreground/10 p-8 shadow-lg bg-background/90"
          >
            <header>
              <h3 className="text-xl font-bold">Repair Details</h3>
              <p className="text-sm text-foreground/60">All fields are required</p>
            </header>

            <input
              required
              placeholder="Device type (e.g. iPhone 13)"
              className="w-full rounded-xl border border-foreground/20
              bg-background px-4 py-3 outline-none
              focus:ring-2 focus:ring-foreground/30"
            />

            <textarea
              required
              placeholder="Describe the issue"
              rows={4}
              className="w-full rounded-xl border border-foreground/20
              bg-background px-4 py-3 outline-none
              focus:ring-2 focus:ring-foreground/30 resize-none"
            />

            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-foreground/20
              bg-background px-4 py-3 text-sm"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-foreground
              py-3 font-bold text-background
              transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit Repair Request"}
            </button>

            <p className="text-xs text-foreground/60 text-center">
              Your information is handled securely and will only be used
              to process your repair.
            </p>
          </form>

          {/* CTA */}
          <div className="rounded-2xl border border-foreground/10 p-6 bg-background/90 text-center">
            <h3 className="font-bold mb-2">Need Assistance?</h3>
            <p className="text-foreground/70 text-sm mb-4">
              You can also track an existing repair or contact us directly if you have questions.
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
