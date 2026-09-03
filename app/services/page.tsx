import { Metadata } from "next";
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
  ArrowRight,
  Star,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

export const metadata: Metadata = {
  title: "Repair Services",
  description: "Professional mobile device repairs in Lydenburg — screen repair, battery replacement, charging port repair, and water damage treatment.",
};

const SERVICES = [
  {
    title: "Screen Repair",
    icon: Smartphone,
    description: "High-quality OLED & LCD replacements with precision calibration.",
    features: ["Same-day service", "OEM-quality parts", "Touch sensitivity test", "Colour accuracy guaranteed"],
    price: "From R450",
    popular: true,
  },
  {
    title: "Battery Replacement",
    icon: BatteryCharging,
    description: "Premium batteries for extended device longevity and performance.",
    features: ["90-day warranty", "Capacity testing", "Safe disposal", "Battery health diagnostics"],
    price: "From R350",
    popular: false,
  },
  {
    title: "Charging Port Repair",
    icon: PlugZap,
    description: "Restore fast, stable charging and data transfer.",
    features: ["USB-C & Lightning", "Fast turnaround", "Connection testing", "Charging optimisation"],
    price: "From R300",
    popular: false,
  },
  {
    title: "Water Damage Treatment",
    icon: Droplet,
    description: "Advanced liquid damage diagnostics and recovery.",
    features: ["Ultrasonic cleaning", "Component-level repair", "Data recovery options", "Prevention advice"],
    price: "From R500",
    popular: false,
  },
];

const PAYMENT_METHODS = [
  { icon: CreditCard, name: "Visa / Mastercard" },
  { icon: Wallet, name: "Instant EFT" },
  { icon: Banknote, name: "Cash Payments" },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Repairs"
        title="Professional Repair Services"
        description="Precision, speed, and reliability — the same standard we apply to every accessory we sell."
      />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-16">
          {SERVICES.map(({ title, icon: Icon, description, features, price, popular }) => (
            <div
              key={title}
              className={`relative border-2 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 ${
                popular ? "border-black shadow-xl" : "border-gray-200 hover:border-black"
              }`}
            >
              {popular && (
                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={11} fill="currentColor" /> Popular
                </div>
              )}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm">{description}</p>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
                  <p className="text-xl font-black">{price}</p>
                </div>
                <Link
                  href="/book-repair"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors text-sm"
                >
                  Book Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-12 text-center">
          <h3 className="text-xl font-black mb-6">Secure Payment Options</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {PAYMENT_METHODS.map(({ icon: Icon, name }) => (
              <div key={name} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gray-200">
                <Icon size={16} /> <span className="text-sm font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
