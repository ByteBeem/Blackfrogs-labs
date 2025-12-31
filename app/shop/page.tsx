"use client";

import Image from "next/image";
import { AlertCircle, Loader2, Phone, MessageCircle } from "lucide-react";
import Header from "../../components/Header";
import Link from "next/link";

export default function Shop() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <Header />

      {/* Maintenance Card */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-xl w-full text-center space-y-6 animate-fadeIn shadow-lg">
          {/* Icon */}
          <div className="flex justify-center">
            <AlertCircle className="text-cyan-500 dark:text-emerald-400 w-16 h-16 animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Shop Under Maintenance
          </h2>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg">
            We're improving your shopping experience. Check back soon for our amazing products!
          </p>

          {/* Loader */}
          <div className="flex justify-center">
            <Loader2 className="text-emerald-500 dark:text-cyan-500 w-10 h-10 animate-spin" />
          </div>

          {/* Coming Soon Products Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {["Phone Covers", "Fast Chargers", "USB Cables", "Screen Protectors"].map((item) => (
              <div
                key={item}
                className="bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-300"
              >
                <div className="h-20 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-slate-400 dark:text-slate-400 text-sm">{item.slice(0, 2)}</span>
                </div>
                <p className="text-slate-900 dark:text-white text-sm font-medium text-center">{item}</p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <a
              href="https://wa.me/27663743513"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
            <a
              href="tel:+27663743513"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-emerald-500 dark:border-cyan-500 text-emerald-500 dark:text-cyan-500 font-bold rounded-full hover:bg-emerald-500 dark:hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Phone size={20} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12 text-center space-y-4">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <div className="relative w-16 h-16">
              <Image src="/logo.jpg" alt="BlackFrogs Labs" fill className="object-contain rounded-xl" />
            </div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              BlackFrogs Labs
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Professional Mobile Repairs • Lydenburg
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
              © 2025 Black Frog Labs. All rights reserved.
            </p>
            <div className="flex gap-4 md:gap-6 text-slate-600 dark:text-slate-400 text-sm md:text-base">
              <Link href="/services" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Services</Link>
              <Link href="/book-repair" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Book Repair</Link>
              <Link href="/track-repair" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Track Repair</Link>
              <Link href="/shop" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">Shop</Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </main>
  );
}
