"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { formatPrice } from "../../../lib/products"; // pure formatter, unrelated to the static PRODUCTS array
import { ProductVisual } from "../../../components/ProductVisual";
import { StarRating } from "../../../components/StarRating";
import { ProductCard } from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../context/ToastContext";
import {
  fetchProductBySlug,
  fetchRelatedProducts,
  toCardProduct,
  ApiProduct,
  ApiProductListItem,
} from "../../../lib/api";


export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { addItem, isWishlisted, toggleWishlist } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [related, setRelated] = useState<ApiProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"description" | "features" | "shipping">("description");

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setNotFound(false);

    fetchProductBySlug(params.slug)
      .then(async (p) => {
        if (cancelled) return;
        if (!p) {
          setNotFound(true);
          return;
        }
        setProduct(p);
        try {
          const relatedItems = await fetchRelatedProducts(p.id);
          if (!cancelled) setRelated(relatedItems);
        } catch {
          // related products are a nice-to-have — fail silently
        }
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="pt-40 pb-40 flex flex-col items-center justify-center gap-3 text-gray-400">
        <Loader2 size={24} className="animate-spin" />
        <span className="text-sm font-medium">Loading product…</span>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="pt-40 pb-24 text-center px-4">
        <h1 className="text-2xl font-bold mb-3">Product not found</h1>
        <p className="text-gray-500 mb-6">This item may have been removed or the link is incorrect.</p>
        <Link href="/shop" className="bg-black text-white font-bold px-6 py-3 rounded-full">
          Back to Shop
        </Link>
      </div>
    );
  }

  const cardProduct = toCardProduct(product);
  const wishlisted = isWishlisted(product.id);
  const relatedCardProducts = related.map(toCardProduct);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    showToast(`${quantity} × ${product.name} added to your cart.`);
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    router.push("/checkout");
  };

  return (
    <div className="bg-white pt-24 md:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-black">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
          {/* Visual */}
          <div className="lg:sticky lg:top-28 h-fit">
            {product.images.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full aspect-square rounded-3xl object-cover border border-gray-100"
              />
            ) : (
              <ProductVisual product={cardProduct} className="w-full aspect-square rounded-3xl" iconSize={90} />
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {product.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size={16} />
              <span className="text-xs text-gray-300">|</span>
              <span className="text-xs font-medium text-gray-500">SKU: {product.sku}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
              <span className="text-3xl font-black">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="text-xs font-bold text-white bg-black px-2 py-1 rounded-full">
                  Save {Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-6">Price includes VAT. Shipping calculated at checkout.</p>

            <p className="text-gray-600 leading-relaxed mb-7">{product.shortDescription}</p>

            {product.inStock ? (
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-6">
                <CheckCircle2 size={16} className="text-black" />
                In stock — {product.stockCount} available
              </p>
            ) : (
              <p className="text-sm font-semibold text-gray-500 mb-6">Currently out of stock</p>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border-2 border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 rounded-full"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 rounded-full"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-black transition-colors shrink-0"
              >
                <Heart size={17} className={wishlisted ? "fill-black text-black" : "text-gray-500"} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={17} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-black font-bold py-4 rounded-full hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: "Free delivery over R1,000" },
                { icon: RotateCcw, label: "30-day returns" },
                { icon: ShieldCheck, label: "90-day warranty" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 border border-gray-100 rounded-xl p-3 bg-gray-50/60">
                  <Icon size={17} />
                  <span className="text-[11px] font-medium text-gray-600 leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex gap-6 mb-5">
                {(["description", "features", "shipping"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-sm font-bold pb-2 border-b-2 transition-colors capitalize ${
                      tab === t ? "border-black text-black" : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tab === "description" && (
                <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
              )}
              {tab === "features" && (
                product.features.length > 0 ? (
                  <ul className="space-y-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle2 size={15} className="text-black shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No feature details listed for this product.</p>
                )
              )}
              {tab === "shipping" && (
                <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                  <p>Orders placed before 1pm on business days are dispatched the same day via courier, typically arriving in 1–3 business days across South Africa.</p>
                  <p>Free delivery applies automatically to orders over R1,000. Read our full <Link href="/policies/shipping-policy" className="underline font-semibold text-black">Shipping Policy</Link> and <Link href="/policies/refund-policy" className="underline font-semibold text-black">Refund Policy</Link> for details.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedCardProducts.length > 0 && (
          <div className="mt-20 md:mt-28">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedCardProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p as Parameters<typeof ProductCard>[0]["product"]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}