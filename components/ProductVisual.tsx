import {
  Zap,
  Cable,
  ShieldCheck,
  ShieldHalf,
  BatteryCharging,
  BatteryFull,
  Headphones,
  Wrench,
  Sparkles,
  Magnet,
  Car,
  Speaker,
  Package,
  LucideIcon,
} from "lucide-react";
import { Product } from "../lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Cable,
  ShieldCheck,
  ShieldHalf,
  BatteryCharging,
  BatteryFull,
  Headphones,
  Wrench,
  Sparkles,
  Magnet,
  Car,
  Speaker,
};

export function ProductVisual({
  product,
  className = "",
  iconSize = 40,
}: {
  product: Pick<Product, "icon" | "colorway" | "name">;
  className?: string;
  iconSize?: number;
}) {
  const Icon = (product.icon && ICON_MAP[product.icon]) || Package;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, ${product.colorway?.[0] ?? "#1f2937"}, ${product.colorway?.[1] ?? "#111827"})`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
      <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full border border-white/10" />
      <div className="absolute -left-8 -top-8 w-20 h-20 rounded-full border border-white/10" />
      <Icon
        size={iconSize}
        strokeWidth={1.4}
        className="relative text-white/90 group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
}
