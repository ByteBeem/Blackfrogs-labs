"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

const FAQS = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Most orders arrive within 1–4 business days depending on your location. Orders placed before 1pm on a business day ship the same day. See our Shipping Policy for full details.",
      },
      {
        q: "Is delivery free?",
        a: "Yes — delivery is free automatically on orders over R1,000. Below that, a flat R85 shipping fee applies, shown at checkout.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Once dispatched, you'll receive tracking details by email, and you can view order status anytime from your Account > Order History page.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What's your return policy?",
        a: "Unused, unopened items can be returned within 30 days of delivery for a refund or exchange. Faulty items are covered regardless of the return window, in line with the Consumer Protection Act. See our Refund Policy for full details.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect a returned item, refunds are processed within 7–10 business days to your original payment method.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        q: "Do products come with a warranty?",
        a: "Yes, every product sold through our store carries a 90-day warranty against manufacturing defects.",
      },
      {
        q: "Are your cables and chargers compatible with my device?",
        a: "Product pages list compatibility details in the Features tab. If you're unsure, contact us before ordering and we'll help you choose the right item.",
      },
    ],
  },
  {
    category: "Repairs",
    items: [
      {
        q: "How do I book a repair?",
        a: "Head to the Book a Repair page, tell us about your device and the issue, and choose a convenient time. We'll confirm your booking and provide a diagnostic quote.",
      },
      {
        q: "How long do repairs take?",
        a: "Most common repairs — like screen or battery replacement — are completed same-day. More complex repairs, such as water damage treatment, may take 2–5 business days.",
      },
      {
        q: "Will I lose my data during a repair?",
        a: "We take care to preserve your data, but we always recommend backing up your device before any repair, as some repairs carry an inherent risk of data loss.",
      },
    ],
  },
  {
    category: "Account & Payments",
    items: [
      {
        q: "Do I need an account to order?",
        a: "No, you can check out as a guest. Creating a free account lets you track orders, save a wishlist, and check out faster next time.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major debit/credit cards, Instant EFT, and Cash on Delivery for eligible areas.",
      },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        description="Everything you need to know about ordering, shipping, returns, and repairs."
      />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
        {FAQS.map((group) => (
          <div key={group.category} className="mb-10">
            <h2 className="font-display text-xl font-bold mb-4">{group.category}</h2>
            <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden">
              {group.items.map((item) => {
                const id = `${group.category}-${item.q}`;
                const isOpen = open === id;
                return (
                  <div key={id}>
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-sm md:text-base">{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed animate-fadeIn">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center border border-dashed border-gray-300 rounded-2xl p-8 mt-4">
          <MessageCircle size={26} className="text-gray-400 mx-auto mb-3" />
          <p className="font-bold mb-1">Still have questions?</p>
          <p className="text-sm text-gray-500 mb-5">Our team is happy to help with anything not covered here.</p>
          <Link href="/contact" className="inline-block bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
