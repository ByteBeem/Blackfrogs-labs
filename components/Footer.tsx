"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
} from "lucide-react";
import { useToast } from "../context/ToastContext";

const SHOP_LINKS = [
  { label: "All Products", href: "/shop" },
  { label: "Chargers", href: "/shop?category=Chargers" },
  { label: "Cables", href: "/shop?category=Cables" },
  { label: "Power Banks", href: "/shop?category=Power+Banks" },
  { label: "Cases & Protection", href: "/shop?category=Cases+%26+Protection" },
  { label: "Audio", href: "/shop?category=Audio" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Repair Services", href: "/services" },
  { label: "Book a Repair", href: "/book-repair" },
  { label: "Track My Repair", href: "/track-repair" },
  { label: "Repair Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Policy", href: "/policies/shipping-policy" },
  { label: "Refund & Returns", href: "/policies/refund-policy" },
  { label: "Terms of Service", href: "/policies/terms-of-service" },
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Disclaimer", href: "/policies/disclaimer" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast("You're subscribed! Watch your inbox for exclusive offers.");
    setEmail("");
  };

  return (
    <footer className="bg-black text-gray-300 mt-24">
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Delivery", desc: "On orders over R500" },
            { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free process" },
            { icon: ShieldCheck, title: "90-Day Warranty", desc: "On every product" },
            { icon: CreditCard, title: "Secure Checkout", desc: "Encrypted & protected" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon size={20} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
             <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
    <img
      src="/logo.jpg"
      alt="Black Frog Labs logo"
      className="w-full h-full object-cover"
    />
  </div>
            <span className="text-white font-black text-lg">Black Frog Labs</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Premium mobile accessories and expert device repairs, based in
            Lydenburg and shipping across South Africa.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2.5 text-gray-400">
              <MapPin size={15} className="shrink-0" /> Lydenburg, Mpumalanga, South Africa
            </div>
            <a href="tel:+27663743513" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
              <Phone size={15} className="shrink-0" /> +27 66 374 3513
            </a>
            <a href="mailto:info@blackfroglabs.co.za" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
              <Mail size={15} className="shrink-0" /> info@blackfroglabs.co.za
            </a>
            <div className="flex items-center gap-2.5 text-gray-400">
              <Clock size={15} className="shrink-0" /> Mon–Sat, 09:00–17:00
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://www.instagram.com/blackfroglabs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/blackfroglabs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={SHOP_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Support" links={SUPPORT_LINKS} />

        <div className="col-span-2 md:col-span-1">
          <h4 className="text-white font-bold text-sm mb-4">Stay in the loop</h4>
          <p className="text-sm text-gray-400 mb-3">
            Get early access to new arrivals and member-only pricing.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center gap-1 bg-white/5 border border-white/15 rounded-full pl-4 pr-1.5 py-1.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none min-w-0"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:bg-gray-200 transition-colors"
            >
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Black Frog Labs. All rights reserved.</p>
          <p>Prices in South African Rand (ZAR). Company Reg No. 2024/000000/07.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-white font-bold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
