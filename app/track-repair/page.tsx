"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Package,
  Wrench,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Header from "../../components/Header";

export default function TrackRepair() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle");

  // Mock repair status data
  const repairStatus = {
    id: "REP-2024-001",
    device: "iPhone 13 Pro",
    status: "in-repair",
    estimatedCompletion: "1-2 business days",
    currentStage: "diagnostics-complete",
    stages: [
      { key: "received", label: "Received", completed: true },
      { key: "diagnostics", label: "Diagnostics", completed: true },
      { key: "repair", label: "In Repair", completed: false },
      { key: "testing", label: "Testing", completed: false },
      { key: "ready", label: "Ready for Pickup", completed: false },
    ],
  };

  const handleTrack = () => {
    if (!query.trim()) return;
    setStatus("loading");

    // Simulated API call
    setTimeout(() => {
      // Simulate found/not found
      if (query.length > 3) {
        setStatus("found");
      } else {
        setStatus("not-found");
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      {/* PAGE CONTENT */}
      <section className="relative z-10 mt-16 md:mt-20 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Track Your Repair
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
              Enter your repair reference number or phone number to check the status of your device
            </p>
          </div>

          {/* Search Input */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter Repair ID or Phone Number"
                className="w-full rounded-xl md:rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm pl-12 pr-4 py-4 md:py-5 text-sm md:text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>

            <button
              onClick={handleTrack}
              disabled={!query || status === "loading"}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span>Track Repair</span>
                </>
              )}
            </button>
          </div>

          {/* Status Display */}
          {status === "found" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Status Card */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-slate-500 mb-1">Repair ID</p>
                    <p className="text-lg md:text-xl font-bold text-emerald-400">{repairStatus.id}</p>
                  </div>
                  <div className="px-3 md:px-4 py-1.5 md:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    <p className="text-xs md:text-sm font-semibold text-amber-400">In Progress</p>
                  </div>
                </div>

                {/* Device Info */}
                <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Package size={24} className="text-white md:w-7 md:h-7" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-500">Device</p>
                    <p className="text-base md:text-lg font-semibold">{repairStatus.device}</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  <p className="text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Repair Progress
                  </p>
                  
                  <div className="space-y-3 md:space-y-4">
                    {repairStatus.stages.map((stage, index) => {
                      const isActive = stage.key === repairStatus.currentStage;
                      const isCompleted = stage.completed;
                      
                      return (
                        <div
                          key={stage.key}
                          className={`flex items-center gap-3 md:gap-4 ${
                            isCompleted || isActive ? "opacity-100" : "opacity-40"
                          }`}
                        >
                          {/* Icon */}
                          <div
                            className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? "bg-gradient-to-br from-emerald-500 to-cyan-500"
                                : isActive
                                ? "bg-amber-500/20 border-2 border-amber-500"
                                : "bg-slate-800 border-2 border-slate-700"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={16} className="text-white md:w-5 md:h-5" />
                            ) : isActive ? (
                              <Loader2 size={16} className="text-amber-400 animate-spin md:w-5 md:h-5" />
                            ) : (
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-slate-600 rounded-full" />
                            )}
                          </div>
                          
                          {/* Label */}
                          <div className="flex-1">
                            <p
                              className={`text-sm md:text-base font-medium ${
                                isCompleted
                                  ? "text-white"
                                  : isActive
                                  ? "text-amber-400"
                                  : "text-slate-500"
                              }`}
                            >
                              {stage.label}
                            </p>
                          </div>
                          
                          {/* Status badge */}
                          {isActive && (
                            <span className="text-xs font-medium px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Completion */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-800">
                  <Clock className="text-emerald-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-xs md:text-sm text-slate-500">Estimated Completion</p>
                    <p className="text-sm md:text-base font-semibold text-white">
                      {repairStatus.estimatedCompletion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Alert */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-5 flex gap-3">
                <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="space-y-1">
                  <p className="text-sm md:text-base font-semibold text-blue-400">
                    We'll notify you when your device is ready
                  </p>
                  <p className="text-xs md:text-sm text-slate-400">
                    You'll receive an SMS and email notification once your repair is complete and ready for pickup.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Not Found */}
          {status === "not-found" && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl md:rounded-2xl p-6 md:p-8 text-center space-y-3 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-red-500/20 rounded-full mb-2">
                <AlertCircle size={24} className="text-red-400 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-red-400">Repair Not Found</h3>
              <p className="text-sm md:text-base text-slate-400 max-w-md mx-auto">
                We couldn't find a repair with that ID or phone number. Please check your details and try again.
              </p>
            </div>
          )}

          {/* Help Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center space-y-4">
            <h3 className="text-lg md:text-xl font-bold">Need Assistance?</h3>
            <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto">
              Can't find your repair or have questions? Contact us directly and we'll help you out.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2">
              <a
                href="https://wa.me/27663743513"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              
              <a
                href="tel:+27663743513"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 border-2 border-emerald-500 text-emerald-400 font-semibold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
          <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image src="/logo.jpg" alt="BlackFrogs Labs" fill className="object-contain rounded-xl" />
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                BlackFrogs Labs
              </h4>
              <p className="text-slate-400 text-xs md:text-sm">
                Professional Mobile Repairs • Lydenburg
              </p>
            </div>
            
            <p className="text-slate-500 text-xs md:text-sm">
              © 2025 BlackFrogs Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}