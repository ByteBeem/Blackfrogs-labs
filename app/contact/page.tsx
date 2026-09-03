"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { useToast } from "../../context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast("Message sent — we'll get back to you within one business day.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Get in Touch"
        title="We'd love to hear from you"
        description="Questions about an order, a repair booking, or anything else — reach out and our team will respond within one business day."
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <ContactCard icon={MapPin} title="Visit Us" lines={["Lydenburg, Mpumalanga", "South Africa"]} />
          <ContactCard icon={Phone} title="Call Us" lines={["+27 66 374 3513"]} href="tel:+27663743513" />
          <ContactCard icon={Mail} title="Email Us" lines={["info@blackfroglabs.co.za"]} href="mailto:info@blackfroglabs.co.za" />
          <ContactCard icon={Clock} title="Business Hours" lines={["Monday – Saturday", "09:00 – 17:00"]} />
          <div className="flex items-center gap-3 pt-2">
            <a href="https://www.instagram.com/blackfroglabs" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
              <Instagram size={17} />
            </a>
            <a href="https://www.facebook.com/blackfroglabs" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
              <Facebook size={17} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="border border-gray-200 rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-bold text-gray-500 mb-1.5">Full Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Jane Dlamini"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-gray-500 mb-1.5">Email Address</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="block text-xs font-bold text-gray-500 mb-1.5">Subject</span>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="input"
                placeholder="Order enquiry, repair question, etc."
              />
            </label>
            <label className="block">
              <span className="block text-xs font-bold text-gray-500 mb-1.5">Message</span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input resize-none"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-black text-white font-bold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Send Message <Send size={15} />
            </button>
            {sent && (
              <p className="text-sm text-gray-500">
                Thanks for reaching out — this is a demo form, so no message was actually sent, but in production this would notify our team instantly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 border border-gray-200 rounded-2xl p-5 hover:border-black transition-colors">
      <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center shrink-0">
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="font-bold text-sm mb-0.5">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-gray-500">{l}</p>
        ))}
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
