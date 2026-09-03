"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/products";
import { ProductVisual } from "../../components/ProductVisual";
import { useToast } from "../../context/ToastContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, shipping, tax, total, freeShippingRemaining } = useCart();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const { showToast } = useToast();

  const handlePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promo.trim()) return;
    setPromoApplied(true);
    showToast("Promo code applied at checkout — thanks!", "info");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-7 max-w-sm">
          Looks like you haven&apos;t added anything yet. Explore the store to find your next favorite accessory.
        </p>
        <Link href="/shop" className="bg-black text-white font-bold px-7 py-3.5 rounded-full hover:bg-gray-800 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-20">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 divide-y divide-gray-100 border-y border-gray-100">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 py-6">
              <Link href={`/shop/${product.slug}`} className="shrink-0">
                <ProductVisual product={product} className="w-24 h-24 md:w-28 md:h-28 rounded-2xl" iconSize={32} />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      {product.category}
                    </span>
                    <Link href={`/shop/${product.slug}`} className="block font-bold text-gray-900 hover:underline mt-0.5">
                      {product.name}
                    </Link>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove item"
                    className="p-2 text-gray-400 hover:text-black transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-bold text-gray-900">{formatPrice(product.price * quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-2xl p-6 sticky top-28">
            <h2 className="font-bold text-lg mb-5">Order Summary</h2>

            {freeShippingRemaining > 0 ? (
              <div className="mb-5 p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-600">
                Add <span className="font-bold text-black">{formatPrice(freeShippingRemaining)}</span> more to unlock free delivery.
              </div>
            ) : (
              <div className="mb-5 p-3 bg-black text-white rounded-xl text-xs font-bold">
                Free delivery unlocked 🎉
              </div>
            )}

            <div className="space-y-2.5 text-sm mb-5">
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
              {promoApplied && (
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1"><Tag size={12} /> Promo &quot;{promo.toUpperCase()}&quot;</span>
                  <span className="font-semibold text-gray-900">Applied</span>
                </div>
              )}
            </div>

            <form onSubmit={handlePromo} className="flex gap-2 mb-5">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-black transition-colors"
              />
              <button type="submit" className="text-sm font-bold border-2 border-black px-4 rounded-full hover:bg-black hover:text-white transition-colors">
                Apply
              </button>
            </form>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
              <span className="font-bold">Total</span>
              <span className="font-black text-xl">{formatPrice(total)}</span>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 bg-black text-white font-bold py-3.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 mt-3 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
