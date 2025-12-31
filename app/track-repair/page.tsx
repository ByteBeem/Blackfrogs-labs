"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";

type RepairStage = {
  key: string;
  label: string;
  completed: boolean;
};

type RepairStatus = {
  id: string;
  device: string;
  status: string;
  estimatedCompletion: string;
  currentStage: string;
  stages: RepairStage[];
};

export default function TrackRepair() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle");
  const [repairStatus, setRepairStatus] = useState<RepairStatus | null>(null);

  const handleTrack = async () => {
    if (!query.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch(`https://api.blackfroglabs.co.za/api/repairs/${query}`);
      if (res.status === 404) {
        setStatus("not-found");
        return;
      }

      const data: RepairStatus = await res.json();
      setRepairStatus(data);
      setStatus("found");
    } catch (err) {
      console.error("Track repair error:", err);
      setStatus("not-found");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleTrack();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      <section className="relative z-10 mt-16 md:mt-20 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">

          {/* Header */}
          <div className="text-center space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Track Your Repair
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Enter your repair reference number or phone number to check your device status
            </p>
          </div>

          {/* Search Input */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Repair ID or Phone Number"
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-900/50 backdrop-blur-md pl-12 pr-4 py-4 text-base text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>

            <button
              onClick={handleTrack}
              disabled={!query || status === "loading"}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Track Repair
                </>
              )}
            </button>
          </div>

          {/* Status Card */}
          {status === "found" && repairStatus && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white/20 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-lg">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Repair ID</p>
                    <p className="text-xl font-bold text-emerald-500 dark:text-cyan-400">{repairStatus.id}</p>
                  </div>
                  <div className="px-4 py-2 bg-emerald-500/10 dark:bg-cyan-400/10 border border-emerald-500 dark:border-cyan-400 rounded-full">
                    <p className="text-sm font-semibold text-emerald-500 dark:text-cyan-400">{repairStatus.status.replace("-", " ")}</p>
                  </div>
                </div>

                {/* Device Info */}
                <div className="flex items-center gap-4 border-b border-slate-300 dark:border-slate-700 pb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Package size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Device</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{repairStatus.device}</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                    Repair Progress
                  </p>
                  <div className="space-y-3">
                    {repairStatus.stages.map((stage) => {
                      const isActive = stage.key === repairStatus.currentStage;
                      const isCompleted = stage.completed;

                      return (
                        <div
                          key={stage.key}
                          className={`flex items-center gap-4 ${isCompleted || isActive ? "opacity-100" : "opacity-40"}`}
                        >
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? "bg-gradient-to-br from-emerald-500 to-cyan-500"
                                : isActive
                                ? "bg-cyan-500/20 border-2 border-cyan-500"
                                : "bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-800"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={20} className="text-white" />
                            ) : isActive ? (
                              <Loader2 size={20} className="text-cyan-500 animate-spin" />
                            ) : (
                              <div className="w-2.5 h-2.5 bg-slate-500 dark:bg-slate-600 rounded-full" />
                            )}
                          </div>
                          <p className={`text-base font-medium ${isCompleted ? "text-slate-900 dark:text-white" : isActive ? "text-cyan-500" : "text-slate-500 dark:text-slate-400"}`}>
                            {stage.label}
                          </p>
                          {isActive && <span className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-500 rounded-full">Current</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Completion */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-300 dark:border-slate-700">
                  <Clock className="text-cyan-500 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-slate-400 text-sm">Estimated Completion</p>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{repairStatus.estimatedCompletion}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Not Found */}
          {status === "not-found" && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-2">
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-red-400">Repair Not Found</h3>
              <p className="text-slate-500 text-base max-w-md mx-auto">
                We couldn't find a repair with that ID or phone number. Please check and try again.
              </p>
            </div>
          )}

          {/* Help Card */}
          <div className="bg-white/20 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Need Assistance?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
              Can't find your repair or have questions? Contact us directly and we'll help you out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/27663743513"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-base"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
              <a
                href="tel:+27663743513"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-105 text-base"
              >
                <Phone size={20} /> Call Now
              </a>
            </div>
          </div>

        </div>
      </section>

      <ChatBot />

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-6 text-center">
          <div className="relative w-16 h-16">
            <Image src="/logo.jpg" alt="BlackFrogs Labs" fill className="object-contain rounded-xl" />
          </div>
          <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            BlackFrogs Labs
          </h4>
          <p className="text-slate-600 dark:text-slate-400 text-base">Professional Mobile Repairs • Lydenburg</p>
          <p className="text-slate-500 text-base">© 2025 Black Frog Labs. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </main>
  );
}
