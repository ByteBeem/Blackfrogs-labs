"use client";

import Image from "next/image";
import { useState } from "react";

export default function BookRepair() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Replace with real submit logic
    setTimeout(() => {
      setSubmitting(false);
      alert("Repair request submitted");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT — BRAND / CONTEXT */}
        <aside className="space-y-6">
          <div className="relative w-40 h-40">
            <Image
              src="/logo.jpg"
              alt="BlackFrogs Labs"
              fill
              className="object-contain opacity-90"
              priority
            />
          </div>

          <h2 className="text-3xl font-black leading-tight">
            Book a Professional Repair
          </h2>

          <p className="text-foreground/70">
            Tell us about your device and the issue you’re experiencing.
            Our technicians will review your request and get back to you
            with pricing and turnaround time.
          </p>

          <ul className="space-y-2 text-sm text-foreground/70">
            <li>• Certified technicians</li>
            <li>• Genuine or high-grade parts</li>
            <li>• Fast turnaround times</li>
          </ul>
        </aside>

        {/* RIGHT — FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-foreground/10 p-8 shadow-sm"
        >
          <header>
            <h3 className="text-xl font-bold">
              Repair Details
            </h3>
            <p className="text-sm text-foreground/60">
              All fields are required
            </p>
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
      </div>
    </main>
  );
}
