"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Upload,
  CheckCircle2,
  MessageCircle,
  Phone,
  Smartphone,
  FileText,
  AlertCircle,
} from "lucide-react";
import Header from "../../components/Header";

export default function BookRepair() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    device: "",
    issue: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulated submit
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ device: "", issue: "", name: "", phone: "", email: "" });
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* LEFT — IMAGE & INFO */}
            <div className="space-y-6 md:space-y-8">
              {/* Hero Image */}
              <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/Repair.jpg"
                  alt="Professional repairing phone"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Book a Professional Repair
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Tell us about your device and the issue you're experiencing. Our certified
                  technicians will review your request and get back to you with pricing and
                  estimated turnaround time.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4">
                  {[
                    { icon: CheckCircle2, text: "Quick response" },
                    { icon: CheckCircle2, text: "Fair pricing" },
                    { icon: CheckCircle2, text: "Quality parts" },
                    { icon: CheckCircle2, text: "90-day warranty" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-slate-300">
                      <Icon size={18} className="text-emerald-400 flex-shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — FORM */}
            <div className="relative">
              {submitted ? (
                // Success Message
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center space-y-6 animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mb-4">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">Request Submitted!</h3>
                  <p className="text-slate-400 text-sm md:text-base">
                    Thank you for your repair request. We'll review it and contact you within 24 hours
                    with a quote and estimated completion time.
                  </p>
                  <div className="pt-4">
                    <p className="text-xs md:text-sm text-slate-500">
                      Check your email for confirmation
                    </p>
                  </div>
                </div>
              ) : (
                // Form
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold">Repair Details</h3>
                    <p className="text-xs md:text-sm text-slate-400">
                      Fill in the information below to get started
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Smartphone size={16} className="text-emerald-400" />
                      Your Name
                    </label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Phone size={16} className="text-emerald-400" />
                      Phone Number
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 66 374 3513"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <MessageCircle size={16} className="text-emerald-400" />
                      Email Address
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  {/* Device Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Smartphone size={16} className="text-emerald-400" />
                      Device Type
                    </label>
                    <input
                      required
                      name="device"
                      value={formData.device}
                      onChange={handleChange}
                      placeholder="e.g. iPhone 13, Samsung Galaxy S21"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  {/* Issue Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <FileText size={16} className="text-emerald-400" />
                      Describe the Issue
                    </label>
                    <textarea
                      required
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      placeholder="Please describe what's wrong with your device..."
                      rows={4}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Upload size={16} className="text-emerald-400" />
                      Upload Photos (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 file:cursor-pointer cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-slate-500 flex items-start gap-1">
                      <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                      Photos help us diagnose the issue faster
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={20} />
                        <span>Submit Repair Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    Your information is handled securely and will only be used to process your repair.
                    We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative z-10 px-4 md:px-6 pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center space-y-4">
            <h3 className="text-lg md:text-xl font-bold">Need Immediate Assistance?</h3>
            <p className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto">
              You can also track an existing repair or contact us directly if you have questions
              about our services or repair process.
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
    </main>
  );
}