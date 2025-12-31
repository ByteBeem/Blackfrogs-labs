"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  BatteryCharging,
  PlugZap,
  Droplet,
  CreditCard,
  Wallet,
  Banknote,
  CheckCircle2,
  Clock,
  Shield,
  Wrench,
} from "lucide-react";
import Header from "../../components/Header";
import ChatBot from "../../components/ChatBot";

export default function Services() {
  const services = [
    {
      title: "Screen Repair",
      icon: Smartphone,
      description: "High-quality OLED & LCD replacements with precision calibration",
      features: [
        "Same-day service",
        "OEM-quality parts",
        "Touch sensitivity test",
        "Color accuracy guaranteed",
      ],
      color: "from-emerald-500 to-cyan-500",
    },
    {
      title: "Battery Replacement",
      icon: BatteryCharging,
      description: "Premium batteries for extended device longevity and performance",
      features: [
        "90-day warranty",
        "Capacity testing",
        "Safe disposal",
        "Battery health diagnostics",
      ],
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Charging Port Repair",
      icon: PlugZap,
      description: "Restore fast, stable charging and data transfer",
      features: [
        "USB-C & Lightning",
        "Fast turnaround",
        "Connection testing",
        "Charging optimization",
      ],
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Water Damage Treatment",
      icon: Droplet,
      description: "Advanced liquid damage diagnostics and recovery",
      features: [
        "Ultrasonic cleaning",
        "Component-level repair",
        "Data recovery options",
        "Prevention advice",
      ],
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const whyChooseUs = [
    { icon: Clock, title: "Fast Turnaround", description: "Most repairs completed within 24 hours" },
    { icon: Shield, title: "Quality Guaranteed", description: "90-day warranty on all repairs" },
    { icon: Wrench, title: "Expert Technicians", description: "Certified repair specialists" },
    { icon: CheckCircle2, title: "Transparent Pricing", description: "No hidden costs or surprises" },
  ];

  const paymentMethods = [
    { icon: CreditCard, name: "Visa / Mastercard" },
    { icon: Wallet, name: "Mobile Wallets" },
    { icon: Banknote, name: "Cash Payments" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      {/* HERO */}
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Our Repair Services
          </h1>
          <p className="max-w-3xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
            Professional mobile repairs by Black Frog Labs — precision, speed, and reliability.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 hover:scale-105 transition-all duration-300"
            >
              <Icon className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative z-10 px-4 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(({ title, icon: Icon, description, features, color }) => (
            <div
              key={title}
              className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-transparent transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Icon header */}
              <div className="relative flex items-start gap-5 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} p-0.5 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-slate-900 dark:text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{description}</p>
                </div>
              </div>

              {/* Feature list */}
              <ul className="relative space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform`} />
            </div>
          ))}
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h4 className="text-xl font-bold text-slate-700 dark:text-slate-300">
            Secure Payment Options
          </h4>

          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-emerald-500/50 transition"
              >
                <Icon className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <Image src="/logo.jpg" alt="Black Frog Labs" fill className="object-contain rounded-xl" />
          </div>

          <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Black Frog Labs
          </h4>

          <p className="text-sm text-slate-500">
            Professional Mobile Repairs • Lydenburg
          </p>

          <p className="text-xs text-slate-500">
            © 2025 Black Frog Labs. All rights reserved.
          </p>
        </div>
      </footer>

      {/* CHATBOT */}
      <ChatBot />
    </main>
  );
}
