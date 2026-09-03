import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Wrench, ShieldCheck, Award, MapPin } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Black Frog Labs — premium mobile accessories and expert device repairs based in Lydenburg, South Africa.",
};

const VALUES = [
  { icon: ShieldCheck, title: "Quality First", desc: "Every product is tested by the same technicians who repair thousands of devices a year." },
  { icon: Users, title: "People Over Process", desc: "Real support from real people — before, during, and after your order." },
  { icon: Wrench, title: "Built to Last", desc: "We stock accessories we'd genuinely recommend to our repair customers." },
  { icon: Award, title: "Standing Behind It", desc: "90-day warranty on every product, no fine print games." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Our Story"
        title="From repair bench to online store"
        description="Black Frog Labs started as a mobile device repair shop in Lydenburg — and grew into a store stocked with the same accessories we trust our customers' devices with."
      />

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">How it started</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-4">Built on the repair bench</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              After years of replacing cheap chargers and cables that failed within weeks, our technicians
              started stocking the parts and accessories they&apos;d actually trust with their own devices — and
              customers kept asking where to buy them.
            </p>
            <p className="text-gray-600 leading-relaxed">
              That demand became Black Frog Labs&apos; online store: chargers, cables, cases, power banks and audio
              gear, chosen with the same standard we apply to every repair that comes across our bench.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white rounded-2xl p-6 flex flex-col justify-center items-center text-center aspect-square">
              <span className="font-black text-3xl">4,000+</span>
              <span className="text-xs text-gray-300 mt-1">Devices repaired</span>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center aspect-square">
              <span className="font-black text-3xl">4.8/5</span>
              <span className="text-xs text-gray-500 mt-1">Average rating</span>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-center items-center text-center aspect-square">
              <span className="font-black text-3xl">90-day</span>
              <span className="text-xs text-gray-500 mt-1">Warranty, every order</span>
            </div>
            <div className="bg-black text-white rounded-2xl p-6 flex flex-col justify-center items-center text-center aspect-square">
              <span className="font-black text-3xl">1–3 day</span>
              <span className="text-xs text-gray-300 mt-1">Nationwide delivery</span>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">What we stand for</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-2">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-gray-200 rounded-2xl p-6 hover:border-black transition-colors">
                <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center mb-4">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-bold mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden bg-black text-white rounded-3xl px-6 md:px-14 py-12 md:py-14 text-center">
          <MapPin size={28} className="mx-auto mb-4 text-white/70" />
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Visit us in Lydenburg</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-7">
            Based in Lydenburg, Mpumalanga, and shipping across South Africa. Drop by for in-person repairs,
            or shop online and we&apos;ll bring it to you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/30 font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
