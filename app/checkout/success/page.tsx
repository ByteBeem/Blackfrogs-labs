"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, Mail } from "lucide-react";
import { getOrderById } from "../../../lib/orders";
import { formatPrice } from "../../../lib/products";
import { Order } from "../../../lib/types";
import { ProductVisual } from "../../../components/ProductVisual";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) setOrder(found);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="pt-40 pb-24 text-center px-4">
        <h1 className="text-2xl font-bold mb-3">Order not found</h1>
        <Link href="/shop" className="bg-black text-white font-bold px-6 py-3 rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-20">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-5 animate-slideUp">
          <CheckCircle2 size={30} className="text-white" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-500">
          Thank you — your order <span className="font-bold text-black">#{order.id}</span> has been placed successfully.
        </p>
        <p className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mt-2">
          <Mail size={14} /> A confirmation has been sent to {order.email}
        </p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold flex items-center gap-2"><Package size={17} /> Order Details</h2>
          <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full">{order.status}</span>
        </div>
        <div className="divide-y divide-gray-100">
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3 py-3">
              <ProductVisual product={product} className="w-14 h-14 rounded-xl" iconSize={20} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{product.name}</p>
                <p className="text-xs text-gray-400">Qty {quantity}</p>
              </div>
              <span className="text-sm font-bold">{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 text-sm border-t border-gray-200 pt-4 mt-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span><span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>VAT</span><span>{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between font-black text-base pt-2 border-t border-gray-100">
            <span>Total</span><span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="border border-gray-200 rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-1.5">Delivery Address</h3>
          <p className="text-sm text-gray-600">
            {order.address.fullName}<br />
            {order.address.line1}<br />
            {order.address.city}, {order.address.province} {order.address.postalCode}<br />
            {order.address.phone}
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-1.5">Payment Method</h3>
          <p className="text-sm text-gray-600">{order.paymentMethod}</p>
          <h3 className="font-bold text-sm mb-1.5 mt-4">Estimated Delivery</h3>
          <p className="text-sm text-gray-600">1–3 business days</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/account?tab=orders"
          className="flex-1 text-center bg-black text-white font-bold py-3.5 rounded-full hover:bg-gray-800 transition-colors"
        >
          View Order History
        </Link>
        <Link
          href="/shop"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-black font-bold py-3.5 rounded-full hover:bg-black hover:text-white transition-colors"
        >
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
