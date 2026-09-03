"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/products";
import { ProductVisual } from "./ProductVisual";

export default function CartDrawer() {
  const {
    isDrawerOpen,
    closeDrawer,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingRemaining,
  } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={closeDrawer}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slideInRight">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-black text-lg flex items-center gap-2">
            <ShoppingBag size={20} /> Your Cart
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag size={26} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-900">Your cart is empty</p>
            <p className="text-sm text-gray-500">Browse the shop to find chargers, cables, cases and more.</p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="mt-2 bg-black text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {freeShippingRemaining > 0 ? (
              <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-600">
                Add <span className="font-bold text-black">{formatPrice(freeShippingRemaining)}</span> more for free delivery.
              </div>
            ) : (
              <div className="px-5 py-2.5 bg-black text-white border-b border-gray-100 text-xs font-bold">
                You&apos;ve unlocked free delivery! 🎉
              </div>
            )}

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 px-5 py-4">
                  <Link href={`/shop/${product.slug}`} onClick={closeDrawer} className="shrink-0">
                    <ProductVisual product={product} className="w-20 h-20 rounded-xl" iconSize={26} />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${product.slug}`}
                      onClick={closeDrawer}
                      className="text-sm font-semibold text-gray-900 hover:underline line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-full">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label="Remove item"
                        className="p-1.5 text-gray-400 hover:text-black transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-400">Shipping, taxes &amp; discounts calculated at checkout.</p>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="block text-center bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="block text-center border border-gray-300 text-gray-700 font-semibold py-3 rounded-full hover:border-black transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
