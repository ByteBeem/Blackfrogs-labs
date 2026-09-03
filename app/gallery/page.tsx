import { Metadata } from "next";
import Link from "next/link";
import { Smartphone, BatteryCharging, PlugZap, Droplet, ArrowRight } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

export const metadata: Metadata = {
  title: "Repair Gallery",
  description: "A look at recent repair work completed by the Black Frog Labs team.",
};

const GALLERY = [
  { icon: Smartphone, title: "Cracked Screen Restoration", desc: "OLED replacement on a shattered flagship display, colour-calibrated to factory spec.", tag: "Screen Repair" },
  { icon: BatteryCharging, title: "Battery Health Recovery", desc: "Swollen battery safely replaced, restoring capacity from 61% to 100% health.", tag: "Battery" },
  { icon: PlugZap, title: "Charging Port Rebuild", desc: "Micro-soldered charging port repair after years of daily-use wear.", tag: "Charging Port" },
  { icon: Droplet, title: "Water Damage Recovery", desc: "Full ultrasonic clean and component-level repair after liquid exposure.", tag: "Water Damage" },
  { icon: Smartphone, title: "Camera Module Replacement", desc: "Precision camera assembly swap with full focus and stabilisation testing.", tag: "Camera" },
  { icon: BatteryCharging, title: "Tablet Battery Service", desc: "Same-day battery replacement on a daily-driver tablet.", tag: "Battery" },
];

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Our Work"
        title="Repair Gallery"
        description="A snapshot of the repairs our technicians complete every week."
      />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY.map(({ icon: Icon, title, desc, tag }, i) => (
            <div key={i} className="group border border-gray-200 rounded-2xl overflow-hidden hover:border-black transition-colors">
              <div className="aspect-[4/3] bg-black flex items-center justify-center relative">
                <Icon size={44} strokeWidth={1.3} className="text-white/80 group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-white text-black px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-gray-500 mb-5">Want your device added to the list?</p>
          <Link href="/book-repair" className="inline-flex items-center gap-2 bg-black text-white font-bold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-colors">
            Book a Repair <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
