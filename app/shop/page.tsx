"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, PackageSearch, Loader2, WifiOff } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";
import {
  fetchProducts,
  fetchCategories,
  toCardProduct,
  ApiProductListItem,
} from "../../lib/api";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ApiProductListItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedMaxPrice = useDebouncedValue(maxPrice, 350);

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(["All", ...cats]))
      .catch(() => setCategories(["All"]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchProducts({
      category: activeCategory,
      query,
      maxPrice: debouncedMaxPrice,
      sortBy,
      pageSize: 60,
    })
      .then((result) => {
        if (cancelled) return;
        setProducts(result.items);
        setTotalCount(result.totalCount);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Couldn't load products right now. Please try again shortly.");
        setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeCategory, query, sortBy, debouncedMaxPrice]);

  const updateCategory = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    router.push(`/shop?${params.toString()}`);
  };

  const cardProducts = useMemo(() => products.map(toCardProduct), [products]);

  return (
    <div className="bg-white min-h-screen pt-28 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">The Store</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            {isLoading ? "Loading…" : `${totalCount} product${totalCount !== 1 ? "s" : ""}`}
            {query ? ` for "${query}"` : ""}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar (desktop) */}
          <aside className="hidden md:block w-56 shrink-0">
            <FilterPanel
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={updateCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </aside>

          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="md:hidden inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <div className="flex-1 md:flex-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold outline-none hover:border-black transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    Sort: {o.label}
                  </option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
                <Loader2 size={28} className="animate-spin" />
                <p className="text-sm font-medium">Loading products…</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center text-center py-24 gap-3">
                <WifiOff size={36} className="text-gray-300" />
                <p className="font-bold text-gray-900">{error}</p>
                <button
                  onClick={() => {
                    // trigger refetch by nudging a dependency
                    setSortBy((s) => s);
                    setIsLoading(true);
                  }}
                  className="mt-2 text-sm font-bold bg-black text-white px-5 py-2.5 rounded-full"
                >
                  Try Again
                </button>
              </div>
            ) : cardProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-24 gap-3">
                <PackageSearch size={40} className="text-gray-300" />
                <p className="font-bold text-gray-900">
                  {totalCount === 0 && activeCategory === "All" && !query
                    ? "No products yet"
                    : "No products found"}
                </p>
                <p className="text-sm text-gray-500 max-w-xs">
                  {totalCount === 0 && activeCategory === "All" && !query
                    ? "Check back soon — new stock is on the way."
                    : "Try a different search term or clear your filters to see the full catalog."}
                </p>
                {(query || activeCategory !== "All" || maxPrice !== 2000) && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setMaxPrice(2000);
                      updateCategory("All");
                    }}
                    className="mt-2 text-sm font-bold bg-black text-white px-5 py-2.5 rounded-full"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {cardProducts.map((p) => (
                  <ProductCard
                  key={p.id}
                  product={p as Parameters<typeof ProductCard>[0]["product"]}
                />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-xs bg-white p-5 overflow-y-auto animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <FilterPanel
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={(c) => {
                updateCategory(c);
                setShowFilters(false);
              }}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({
  categories,
  activeCategory,
  setActiveCategory,
  maxPrice,
  setMaxPrice,
}: {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  maxPrice: number;
  setMaxPrice: (n: number) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-sm mb-3">Category</h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-black text-white font-bold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-sm mb-3">Max Price: R{maxPrice}</h3>
        <input
          type="range"
          min={100}
          max={2000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>R100</span>
          <span>R2,000</span>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading store…</div>}>
      <ShopContent />
    </Suspense>
  );
}