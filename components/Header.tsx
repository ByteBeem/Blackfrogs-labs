"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuLinks = [
    { label: "Services", href: "/services" },
    { label: "Book Repair", href: "/book-repair" },
    { label: "Track Repair", href: "/track-repair" },
    { label: "Shop", href: "/shop" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-emerald-500/20"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 group"
        >
          <div className="relative w-9 h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.jpg"
              alt="BlackFrogs Labs"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <span className="text-base md:text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Black Frog Labs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          
       

          {/* CTA Button */}
          <Link
            href="/book-repair"
            className="ml-4 px-5 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle */}
        
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-950/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 px-4 py-4">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-all duration-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:pl-6"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-repair"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}