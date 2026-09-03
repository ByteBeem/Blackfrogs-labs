"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/products";
import { ProductVisual } from "./ProductVisual";
import { StarRating } from "./StarRating";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const BADGE_STYLES: Record<string, string> = {
  New: "bg-white text-black border border-black",
  Bestseller: "bg-black text-white",
  Sale: "bg-white text-black border border-black",
  Limited: "bg-black text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem, isWishlisted, toggleWishlist } = useCart();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product.id, 1);
    showToast(`${product.name} added to your cart.`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      wishlisted ? `Removed from your wishlist.` : `Saved to your wishlist.`,
      "info"
    );
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-black hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.25)] transition-all duration-300"
    >
      <div className="relative aspect-square">
        <ProductVisual product={product} className="w-full h-full" iconSize={56} />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-black text-black" : "text-gray-700"}
          />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-xs font-bold tracking-wide uppercase bg-black text-white px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800 disabled:opacity-0"
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto pt-2 flex items-center gap-2">
          <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
