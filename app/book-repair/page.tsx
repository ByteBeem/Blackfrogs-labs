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
  Calendar,
  Clock,
  User,
  Mail
} from "lucide-react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";

export default function BookRepair() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    device: "",
    issue: "",
    date: "",
    time: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Map form fields to backend expected format
      const payload = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        device: formData.device,
        issue: formData.issue,
        date: formData.date,
        time: formData.time,
        notes: "Booked via website" // Optional default note
      };

      const res = await fetch("https://api.blackfroglabs.co.za/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit booking");
      }

      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", device: "", issue: "", date: "", time: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get tomorrow's date for min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

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
                Tell us about your device and the issue you're experiencing. Schedule a drop-off time, and our certified technicians will get your device working like new.
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
                <h3 className="text-2xl md:text-3xl font-bold">Booking Confirmed!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg">
                  Thank you for your booking. We have received your request and will see you at your selected time.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl"
              >
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold">Book Appointment</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Fill in the info below to schedule your repair</p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <User size={16} className="text-emerald-500" /> Name
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <Phone size={16} className="text-emerald-500" /> Phone
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 66 374 3513"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Mail size={16} className="text-emerald-500" /> Email (Optional)
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                {/* Device Info */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Smartphone size={16} className="text-emerald-500" /> Device Model
                  </label>
                  <input
                    required
                    name="device"
                    type="text"
                    value={formData.device}
                    onChange={handleChange}
                    placeholder="e.g. iPhone 13 Pro Max"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <Calendar size={16} className="text-cyan-500" /> Preferred Date
                    </label>
                    <input
                      required
                      name="date"
                      type="date"
                      min={minDate}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <Clock size={16} className="text-cyan-500" /> Preferred Time
                    </label>
                    <input
                      required
                      name="time"
                      type="time"
                      min="09:00"
                      max="17:00"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>

                {/* Issue Description */}
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
                    rows={3}
                    placeholder="Describe what's wrong with your device..."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-4 py-3 text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

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
                      <span>Confirm Booking</span>
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
