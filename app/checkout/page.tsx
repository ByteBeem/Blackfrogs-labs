"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  Lock,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { formatPrice } from "../../lib/products";
import { ProductVisual } from "../../components/ProductVisual";
import { saveOrder, generateOrderId } from "../../lib/orders";
import { Address } from "../../lib/types";

const PROVINCES = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo",
  "Mpumalanga", "Northern Cape", "North West", "Western Cape",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState<Address>({
    fullName: user?.fullName || "",
    line1: "",
    city: "",
    province: "Mpumalanga",
    postalCode: "",
    country: "South Africa",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "eft" | "cod">("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });

  useEffect(() => {
    if (items.length === 0 && !isPlacingOrder) {
      router.replace("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      items,
      subtotal,
      shipping,
      tax,
      total,
      address,
      paymentMethod:
        paymentMethod === "card" ? "Card" : paymentMethod === "eft" ? "Instant EFT" : "Cash on Delivery",
      status: "Processing" as const,
      email,
    };
    setTimeout(() => {
      saveOrder(order);
      clearCart();
      router.push(`/checkout/success?order=${order.id}`);
    }, 1200);
  };

  if (items.length === 0) return null;

  const steps = [
    { n: 1, label: "Shipping" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Review" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-20">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black mb-6">
        <ChevronLeft size={16} /> Back to Cart
      </Link>

      <div className="flex items-center gap-3 mb-10">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s.n ? "bg-black text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > s.n ? <CheckCircle2 size={16} /> : s.n}
              </div>
              <span className={`text-sm font-semibold hidden sm:inline ${step >= s.n ? "text-black" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && <div className="w-8 md:w-16 h-px bg-gray-200" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="space-y-6 animate-fadeIn">
              <h2 className="font-display text-2xl font-bold mb-4">Shipping Information</h2>
              <Field label="Email Address">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name">
                  <input
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="input"
                    placeholder="Jane Dlamini"
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="input"
                    placeholder="082 000 0000"
                  />
                </Field>
              </div>
              <Field label="Street Address">
                <input
                  required
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  className="input"
                  placeholder="12 Main Street"
                />
              </Field>
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="City">
                  <input
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="input"
                    placeholder="Lydenburg"
                  />
                </Field>
                <Field label="Province">
                  <select
                    value={address.province}
                    onChange={(e) => setAddress({ ...address, province: e.target.value })}
                    className="input"
                  >
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Postal Code">
                  <input
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="input"
                    placeholder="1120"
                  />
                </Field>
              </div>
              <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors">
                Continue to Payment
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6 animate-fadeIn">
              <h2 className="font-display text-2xl font-bold mb-4">Payment Method</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "eft", label: "Instant EFT", icon: Wallet },
                  { id: "cod", label: "Cash on Delivery", icon: Banknote },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setPaymentMethod(id as typeof paymentMethod)}
                    className={`flex flex-col items-center gap-2 border-2 rounded-2xl py-5 transition-colors ${
                      paymentMethod === id ? "border-black bg-black text-white" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-bold">{label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 border border-gray-200 rounded-2xl p-5">
                  <Field label="Card Number">
                    <input
                      required
                      inputMode="numeric"
                      maxLength={19}
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      className="input"
                      placeholder="4242 4242 4242 4242"
                    />
                  </Field>
                  <Field label="Name on Card">
                    <input
                      required
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value })}
                      className="input"
                      placeholder="Jane Dlamini"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry (MM/YY)">
                      <input
                        required
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        className="input"
                        placeholder="08/28"
                      />
                    </Field>
                    <Field label="CVC">
                      <input
                        required
                        maxLength={4}
                        value={card.cvc}
                        onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                        className="input"
                        placeholder="123"
                      />
                    </Field>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-gray-400">
                    <Lock size={12} /> This is a demo store — no real payment is processed.
                  </p>
                </div>
              )}

              {paymentMethod === "eft" && (
                <div className="border border-gray-200 rounded-2xl p-5 text-sm text-gray-600">
                  You&apos;ll be redirected to your bank&apos;s secure portal to complete an Instant EFT payment after placing your order. (Demo store — no real payment is processed.)
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="border border-gray-200 rounded-2xl p-5 text-sm text-gray-600">
                  Pay in cash when your order is delivered or collected. A valid ID may be required at handover.
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 font-bold py-4 rounded-full hover:border-black transition-colors"
                >
                  Back
                </button>
                <button type="submit" className="flex-1 bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors">
                  Review Order
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="font-display text-2xl font-bold mb-4">Review &amp; Place Order</h2>

              <div className="border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">Shipping To</h3>
                  <button onClick={() => setStep(1)} className="text-xs font-bold underline">Edit</button>
                </div>
                <p className="text-sm text-gray-600">
                  {address.fullName}, {address.line1}, {address.city}, {address.province} {address.postalCode}
                  <br />
                  {address.phone} &middot; {email}
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">Payment Method</h3>
                  <button onClick={() => setStep(2)} className="text-xs font-bold underline">Edit</button>
                </div>
                <p className="text-sm text-gray-600 capitalize">
                  {paymentMethod === "card" ? "Card ending in " + (card.number.slice(-4) || "••••") : paymentMethod === "eft" ? "Instant EFT" : "Cash on Delivery"}
                </p>
              </div>

              <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 p-4">
                    <ProductVisual product={product} className="w-14 h-14 rounded-xl" iconSize={20} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">Qty {quantity}</p>
                    </div>
                    <span className="text-sm font-bold">{formatPrice(product.price * quantity)}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                {isPlacingOrder ? "Placing Order…" : `Place Order — ${formatPrice(total)}`}
              </button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <ShieldCheck size={13} /> By placing your order you agree to our{" "}
                <Link href="/policies/terms-of-service" className="underline">Terms of Service</Link>.
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-2xl p-6 sticky top-28">
            <h2 className="font-bold text-lg mb-5">Order Summary</h2>
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 py-3">
                  <ProductVisual product={product} className="w-12 h-12 rounded-lg" iconSize={16} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{product.name}</p>
                    <p className="text-[11px] text-gray-400">Qty {quantity}</p>
                  </div>
                  <span className="text-xs font-bold">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2.5 text-sm border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (15%)</span>
                <span className="font-semibold text-gray-900">{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4">
              <span className="font-bold">Total</span>
              <span className="font-black text-xl">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-gray-500 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
