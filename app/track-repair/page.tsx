"use client";

import { useState } from "react";

export default function TrackRepair() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found">("idle");

  const handleTrack = () => {
    if (!query.trim()) return;
    setStatus("loading");

    // Simulated API call
    setTimeout(() => {
      setStatus("found");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Title */}
        <header className="text-center space-y-2">
          <h2 className="text-3xl font-black">
            Track Your Repair
          </h2>
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
            <p className="text-sm text-foreground/60">
              Current Status
            </p>
            <p className="mt-1 font-semibold text-lg">
              In Repair
            </p>

            <div className="mt-3 text-sm text-foreground/70">
              Estimated completion: 1–2 business days
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
