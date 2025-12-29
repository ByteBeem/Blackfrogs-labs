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

export default function Services() {
  const services = [
    {
      title: "Screen Repair",
      icon: Smartphone,
      description: "High-quality OLED & LCD replacements with precision calibration",
      features: ["Same-day service", "OEM-quality parts", "Touch sensitivity test", "Color accuracy guaranteed"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Battery Replacement",
      icon: BatteryCharging,
      description: "Premium batteries for extended device longevity and performance",
      features: ["90-day warranty", "Capacity testing", "Safe disposal", "Health diagnostics"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Charging Port Repair",
      icon: PlugZap,
      description: "Fix connectivity issues and restore fast charging capabilities",
      features: ["USB-C & Lightning", "Quick turnaround", "Connection testing", "Cable included"],
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Water Damage Treatment",
      icon: Droplet,
      description: "Advanced liquid damage recovery with specialized equipment",
      features: ["Ultrasonic cleaning", "Component repair", "Data recovery", "Prevention tips"],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const paymentMethods = [
    { icon: CreditCard, name: "Visa / Mastercard" },
    { icon: Wallet, name: "Mobile Wallets" },
    { icon: Banknote, name: "Cash Payments" },
  ];

  const whyChooseUs = [
    { icon: Clock, title: "Fast Service", description: "Most repairs completed within 24 hours" },
    { icon: Shield, title: "Quality Guarantee", description: "90-day warranty on all repairs" },
    { icon: Wrench, title: "Expert Technicians", description: "Certified professionals with years of experience" },
    { icon: CheckCircle2, title: "Fair Pricing", description: "Competitive rates with no hidden fees" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header />

      {/* HERO SECTION */}
      <section className="relative z-10 mt-16 md:mt-20 pt-12 md:pt-20 pb-12 md:pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Professional Mobile Repair Services
          </h1>
          <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Expert repairs for all your devices with certified technicians, premium parts,
            and lightning-fast turnaround times
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative z-10 px-4 md:px-6 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {whyChooseUs.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mb-3 md:mb-4" />
                <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2">{title}</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative z-10 px-4 md:px-6 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map(({ title, icon: Icon, description, features, color }) => (
              <div
                key={title}
                className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-transparent transition-all duration-500 hover:scale-[1.02] overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Header */}
                <div className="relative flex items-start gap-4 md:gap-6 mb-4 md:mb-6">
                  <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                      <Icon size={28} className="text-white md:w-8 md:h-8" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                
                {/* Features */}
                <ul className="relative space-y-2 md:space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-slate-300">
                      <CheckCircle2 size={16} className={`flex-shrink-0 text-emerald-400 md:w-5 md:h-5`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Bottom line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 px-4 md:px-6 pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-50" />
            
            <div className="relative space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Need Help with Your Device?
              </h3>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
                Book a repair or track your device in real-time. Our team is ready to assist you
                with any mobile repair needs!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/book-repair"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
                >
                  Book Repair
                </Link>
                <Link
                  href="/track-repair"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 border-2 border-emerald-500 text-emerald-400 font-bold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Track Repair
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="relative z-10 border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm py-10 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6 md:space-y-8">
          <h4 className="text-lg md:text-xl font-bold text-slate-300">
            Secure & Convenient Payment Methods
          </h4>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {paymentMethods.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="flex items-center gap-2 md:gap-3 rounded-full border border-slate-800 bg-slate-900/50 px-4 md:px-6 py-2 md:py-3 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
              >
                <Icon size={18} className="text-emerald-400 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-medium text-slate-300">{name}</span>
              </div>
            ))}
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