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
import ChatBot from "../../components/ChatBot";

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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">

      {/* Background pulses */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      {/* HERO / FORM */}
      <section className="relative z-10 pt-24 pb-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT - Image + info */}
          <div className="space-y-8">
            <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/Repair.jpg"
                alt="Professional repairing phone"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50/60 dark:from-slate-950/60 to-transparent" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Book a Professional Repair
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                Tell us about your device and the issue you're experiencing. Our certified technicians will review your request and get back to you with pricing and estimated turnaround time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: CheckCircle2, text: "Quick response" },
                  { icon: CheckCircle2, text: "Fair pricing" },
                  { icon: CheckCircle2, text: "Quality parts" },
                  { icon: CheckCircle2, text: "90-day warranty" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Icon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Form */}
          <div className="relative">
            {submitted ? (
              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center space-y-6 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mb-4">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Request Submitted!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg">
                  Thank you for your repair request. We'll review it and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl"
              >
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold">Repair Details</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Fill in the info below to get started</p>
                </div>

                {/* Form fields */}
                {[
                  { name: "name", icon: Smartphone, placeholder: "John Doe", type: "text" },
                  { name: "phone", icon: Phone, placeholder: "+27 66 374 3513", type: "tel" },
                  { name: "email", icon: MessageCircle, placeholder: "john@example.com", type: "email" },
                  { name: "device", icon: Smartphone, placeholder: "iPhone 13, Samsung Galaxy S21", type: "text" },
                ].map(({ name, icon: Icon, placeholder, type }) => (
                  <div key={name} className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <Icon size={16} className="text-emerald-500" />
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </label>
                    <input
                      required
                      name={name}
                      type={type}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                  </div>
                ))}

                {/* Issue */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <FileText size={16} className="text-emerald-500" />
                    Describe the Issue
                  </label>
                  <textarea
                    required
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what's wrong with your device..."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                  />
                </div>

                {/* Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Upload size={16} className="text-emerald-500" />
                    Upload Photos (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 cursor-pointer"
                  />
                  <p className="text-xs text-slate-500 flex items-start gap-1">
                    <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                    Photos help us diagnose faster
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      <span>Submit Repair Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CHATBOT */}
      <ChatBot />

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <Image src="/logo.jpg" alt="Black Frog Labs" fill className="object-contain rounded-xl" />
          </div>
          <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Black Frog Labs
          </h4>
          <p className="text-sm text-slate-500">Professional Mobile Repairs • Lydenburg</p>
          <p className="text-xs text-slate-500">© 2025 Black Frog Labs. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
