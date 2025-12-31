"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  BatteryCharging,
  PlugZap,
  Droplet,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Zap,
  Award,
} from "lucide-react";
import ProductSlideshow from "../components/ProductSlideshow";
import ChatBot from "../components/ChatBot";
import Header from "../components/Header";


export default function Home() {
  const services = [
    {
      title: "Screen Repair",
      icon: Smartphone,
      description: "Crystal-clear displays restored with precision",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Battery Replacement",
      icon: BatteryCharging,
      description: "Extended battery life for all-day power",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Charging Port Repair",
      icon: PlugZap,
      description: "Fast, reliable charging restored instantly",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Water Damage Treatment",
      icon: Droplet,
      description: "Advanced diagnostics and recovery",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const features = [
    { icon: Clock, title: "Fast Turnaround", description: "Same-day repairs available" },
    { icon: Shield, title: "Quality Guaranteed", description: "90-day warranty on all repairs" },
    { icon: Award, title: "Expert Technicians", description: "Certified professionals" },
    { icon: Zap, title: "Competitive Pricing", description: "Best value in town" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-500/3 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Header />

      {/* HERO / SLIDESHOW */}
      <section className="relative z-10 mt-6 md:mt-8 px-4 md:px-6 max-w-7xl mx-auto">
        <ProductSlideshow />
      </section>

      {/* FEATURES BAR */}
      <section className="relative z-10 mt-12 md:mt-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20"
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 dark:text-emerald-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-sm md:text-base mb-1 text-slate-900 dark:text-white">{title}</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative z-10 mt-16 md:mt-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Our Expert Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Professional repairs with certified technicians and premium parts
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {services.map(({ title, icon: Icon, description, color }) => (
            <div
              key={title}
              className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-transparent transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`relative w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br ${color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Icon size={28} className="text-slate-900 dark:text-white md:w-8 md:h-8" />
                </div>
              </div>
              
              {/* Content */}
              <h3 className="relative text-lg md:text-xl font-bold mb-2 text-center text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {title}
              </h3>
              <p className="relative text-xs md:text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                {description}
              </p>
              
              {/* Hover effect line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="relative z-10 mt-16 md:mt-24 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="relative bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin size={32} className="text-white md:w-10 md:h-10" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-slate-900 dark:text-white">Visit Our Repair Lab</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8 text-sm md:text-base">
              Located in the heart of Lydenburg
            </p>
            
            <a
              href="https://www.google.com/maps/search/?api=1&query=-25.087717,30.416010"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              <MapPin size={20} />
              Open in Maps
            </a>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 mt-16 md:mt-24 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center space-y-6 md:space-y-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Ready to Get Started?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Get in touch with us today for fast, reliable mobile repairs
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/27663743513"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
            
            <a
              href="tel:+27663743513"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Phone size={20} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mt-20 md:mt-32 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
          <div className="flex flex-col items-center gap-4 md:gap-6 text-center">
            <div className="relative w-12 h-12 md:w-16 md:h-16 group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <Image
                src="/logo.jpg"
                alt="BlackFrogs Labs"
                fill
                className="object-contain relative rounded-xl"
              />
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                BlackFrogs Labs
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                Professional Mobile Repairs • Lydenburg
              </p>
            </div>
            
            <div className="flex gap-4 md:gap-6 text-slate-600 dark:text-slate-400 text-xs md:text-sm">
              <Link href="/services" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                Services
              </Link>
              <Link href="/book-repair" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                Book Repair
              </Link>
              <Link href="/track-repair" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                Track Repair
              </Link>
              <Link href="/shop" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                Shop
              </Link>
            </div>
            
            <p className="text-slate-500 dark:text-slate-500 text-xs md:text-sm">
              © 2025 BlackFrogs Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>


      <ChatBot />
    </main>
  );
}