"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  PackageCheck,
  XCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

const API_URL = process.env.NEXT_PUBLIC_ISDEVELOPMENT === "true" ? "http://localhost:5041" : "https://api.blackfroglabs.co.za";

interface Booking {
  reference: string;
  deviceType: string;
  model: string;
  issue: string;
  notes: string | null;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Mirrors backend RepairStatus enum order, minus Cancelled (handled separately)
const STEPS = [
  { key: "BookingReceived", label: "Booking Received" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "InDiagnostics", label: "Diagnosing" },
  { key: "AwaitingParts", label: "Awaiting Parts" },
  { key: "InRepair", label: "In Repair" },
  { key: "ReadyForCollection", label: "Ready for Collection" },
  { key: "Completed", label: "Completed" },
];

function getStepIndex(status: string) {
  return STEPS.findIndex((s) => s.key === status);
}

function TrackRepairContent() {
  const searchParams = useSearchParams();

  const [reference, setReference] = useState(searchParams.get("ref") || "");
  const [contactValue, setContactValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Booking | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSearching(true);

    try {
      const res = await fetch(`${API_URL}/api/repairs/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: reference.trim(),
          contactValue: contactValue.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setResult(null);
        setError(data?.error || "We couldn't find a booking with that reference and contact info.");
      } else {
        setResult(data);
      }
    } catch {
      setResult(null);
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSearching(false);
      setSearched(true);
    }
  };

  const isCancelled = result?.status === "Cancelled";
  const currentStepIndex = result ? getStepIndex(result.status) : -1;

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Track Repair"
        title="Check your repair status"
        description="Enter your reference number and the email or phone you booked with to see live status updates."
      />

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-14 md:py-16">
        <form
          onSubmit={handleSearch}
          className="border border-gray-200 rounded-2xl p-4 sm:p-5 mb-10 space-y-3"
        >
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              required
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Reference, e.g. RPR-A1B2C3"
              className="flex-1 outline-none text-sm py-3 bg-transparent uppercase placeholder:normal-case"
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3">
            <input
              required
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder="Email or phone used when booking"
              className="flex-1 outline-none text-sm py-3 bg-transparent"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-xl px-4 py-3">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="w-full bg-black text-white font-bold py-3.5 rounded-full text-sm hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Searching…
              </>
            ) : (
              "Track Repair"
            )}
          </button>
        </form>

        {searched && !result && !isSearching && (
          <div className="text-center border border-dashed border-gray-300 rounded-2xl p-10">
            <XCircle size={30} className="text-gray-300 mx-auto mb-3" />
            <p className="font-bold mb-1">No booking found</p>
            <p className="text-sm text-gray-500 mb-5">
              Double-check your reference number and contact details, or book a new repair below.
            </p>
            <Link href="/book-repair" className="bg-black text-white font-bold px-6 py-2.5 rounded-full text-sm">
              Book a Repair
            </Link>
          </div>
        )}

        {result && (
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              <div>
                <p className="text-xs text-gray-400">Reference</p>
                <p className="font-bold">{result.reference}</p>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  isCancelled ? "bg-red-100 text-red-700" : "bg-black text-white"
                }`}
              >
                {STEPS.find((s) => s.key === result.status)?.label || result.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Device</p>
                <p className="font-semibold">{result.deviceType} — {result.model}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Reported Issue</p>
                <p className="font-semibold">{result.issue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Customer</p>
                <p className="font-semibold">{result.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Booked On</p>
                <p className="font-semibold">
                  {new Date(result.createdAt).toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {isCancelled ? (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5">
                <XCircle size={18} className="text-red-600 shrink-0" />
                <p className="text-sm font-medium text-red-700">
                  This booking has been cancelled. Contact us if you think this is a mistake.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {STEPS.map((step, i) => (
                  <div key={step.key} className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        i <= currentStepIndex ? "bg-black text-white" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {i < currentStepIndex ? (
                        <CheckCircle2 size={14} />
                      ) : i === currentStepIndex ? (
                        <Clock size={13} />
                      ) : (
                        <Clock size={13} />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        i <= currentStepIndex ? "text-black" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                    {i === currentStepIndex && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 ml-auto">
                        In progress
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!result && !searched && (
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: Wrench, label: "Diagnosis usually completed within 2 hours of drop-off" },
              { icon: Clock, label: "Most repairs finished same day" },
              { icon: PackageCheck, label: "We'll notify you the moment it's ready" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/60">
                <Icon size={20} className="mx-auto mb-2.5" />
                <p className="text-xs text-gray-500 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackRepairPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading…</div>}>
      <TrackRepairContent />
    </Suspense>
  );
}