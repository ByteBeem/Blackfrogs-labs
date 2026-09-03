"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../../lib/products";
import { ProductCard } from "../../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const products = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-20">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Saved for later</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">Your Wishlist</h1>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Heart size={26} className="text-gray-400" />
          </div>
          <p className="font-bold text-gray-900">Nothing saved yet</p>
          <p className="text-sm text-gray-500 max-w-xs">
            Tap the heart icon on any product to save it here for later.
          </p>
          <Link href="/shop" className="mt-2 bg-black text-white font-bold px-6 py-2.5 rounded-full text-sm">
            Browse the Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
