"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Wrench,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { useToast } from "../../context/ToastContext";

const API_URL = process.env.NEXT_PUBLIC_ISDEVELOPMENT === "true" ? "http://localhost:5041" : "https://api.blackfroglabs.co.za";

const DEVICE_TYPES = ["Smartphone", "Tablet", "Laptop", "Smartwatch", "Other"];
const ISSUES = [
  "Cracked / broken screen",
  "Battery draining fast",
  "Charging port issue",
  "Water / liquid damage",
  "Won't turn on",
  "Other issue",
];

const todayIso = () => new Date().toISOString().split("T")[0];

export default function BookRepairPage() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    deviceType: "Smartphone",
    model: "",
    issue: ISSUES[0],
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/repairs`, {
        method: "POST",
        credentials: "include", // links booking to the logged-in user if a session cookie exists
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceType: form.deviceType,
          model: form.model,
          issue: form.issue,
          notes: form.notes || null,
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          preferredDate: form.date,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(
          data?.error ||
            data?.title ||
            "Couldn't submit your booking. Please check your details and try again."
        );
        setIsSubmitting(false);
        return;
      }

      setReference(data.reference);
      setSubmitted(true);
      showToast("Repair booking received!");
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-5 animate-[scale-in_0.3s_ease-out]">
            <CheckCircle2 size={30} className="text-white" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Booking Received!</h1>
          <p className="text-gray-500 mb-4">
            We&apos;ll contact you at {form.email || form.phone} to confirm your appointment.
          </p>

          <button
            onClick={handleCopyReference}
            className="group inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-3 py-2 mb-8 hover:border-gray-300 transition-colors"
          >
            <span className="text-sm text-gray-500">Ref:</span>
            <span className="font-bold text-black text-sm tracking-wide">{reference}</span>
            {copied ? (
              <Check size={14} className="text-green-600" />
            ) : (
              <Copy size={14} className="text-gray-400 group-hover:text-gray-600" />
            )}
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/track-repair?ref=${encodeURIComponent(reference)}`}
              className="flex-1 bg-black text-white font-bold py-3.5 rounded-full hover:bg-gray-800 active:scale-[0.98] transition-all"
            >
              Track My Repair
            </Link>
            <Link
              href="/shop"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-black font-bold py-3.5 rounded-full hover:bg-black hover:text-white transition-colors"
            >
              Browse the Shop <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Book a Repair"
        title="Let's get your device fixed"
        description="Tell us what's wrong and we'll confirm your appointment and a diagnostic quote."
      />

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-14 md:py-16">
        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-200 rounded-2xl p-6 md:p-8">
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-xl px-4 py-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Smartphone size={18} /> Device Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-xs font-bold text-gray-500 mb-1.5">Device Type</span>
                <select
                  value={form.deviceType}
                  onChange={(e) => setForm({ ...form, deviceType: e.target.value })}
                  className="input"
                >
                  {DEVICE_TYPES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-gray-500 mb-1.5">Model</span>
                <input
                  required
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  className="input"
                  placeholder="e.g. iPhone 13, Galaxy S22"
                />
              </label>
            </div>
            <label className="block mt-4">
              <span className="block text-xs font-bold text-gray-500 mb-1.5">What&apos;s the issue?</span>
              <select
                value={form.issue}
                onChange={(e) => setForm({ ...form, issue: e.target.value })}
                className="input"
              >
                {ISSUES.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </label>
            <label className="block mt-4">
              <span className="block text-xs font-bold text-gray-500 mb-1.5">Additional Notes (optional)</span>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="input resize-none"
                placeholder="Anything else we should know?"
              />
            </label>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Wrench size={18} /> Contact Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
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
                <span className="block text-xs font-bold text-gray-500 mb-1.5">Phone Number</span>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                  placeholder="082 000 0000"
                />
              </label>
            </div>
            <label className="block mt-4">
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
            <label className="block mt-4">
              <span className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Calendar size={13} /> Preferred Date
              </span>
              <input
                type="date"
                required
                min={todayIso()}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={17} className="animate-spin" /> Submitting…
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}