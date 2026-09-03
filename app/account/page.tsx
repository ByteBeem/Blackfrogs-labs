"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Loader2,
  Mail,
  Phone as PhoneIcon,
  Check,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getOrdersForEmail } from "../../lib/orders";
import { formatPrice, PRODUCTS } from "../../lib/products";
import { Order } from "../../lib/types";
import { ProductVisual } from "../../components/ProductVisual";
import { useToast } from "../../context/ToastContext";

type Tab = "profile" | "orders" | "wishlist";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function AccountContent() {
  const { user, isLoading, logOut, updateProfile } = useAuth();
  const { wishlist } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<Tab>((searchParams.get("tab") as Tab) || "profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  useEffect(() => {
    if (user) {
      setOrders(getOrdersForEmail(user.email));
      setFullName(user.fullName);
      setPhone(user.phone || "");
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="pt-40 pb-40 flex flex-col items-center justify-center gap-3 text-gray-400">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm font-medium">Loading account…</span>
      </div>
    );
  }

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateProfile({ fullName, phone });
    setIsSaving(false);
    if (res.ok) {
      showToast("Profile updated.");
    } else {
      showToast(res.error || "Couldn't update your profile. Try again.");
    }
  };

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    await logOut();
    router.push("/");
  };

  const TABS: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Order History", icon: Package, count: orders.length },
    { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlistProducts.length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">
      {/* Header */}
      <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Account</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 tracking-tight">
            Hi, {user.fullName.split(" ")[0]}
          </h1>
        </div>

        {/* Quick stats strip */}
        <div className="flex gap-3">
          <div className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 min-w-[92px]">
            <p className="text-xl font-black leading-none">{orders.length}</p>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mt-1">Orders</p>
          </div>
          <div className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 min-w-[92px]">
            <p className="text-xl font-black leading-none">{wishlistProducts.length}</p>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mt-1">Wishlist</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-28 space-y-4">
            {/* Avatar card — desktop only */}
            <div className="hidden lg:flex items-center gap-3 border border-gray-200 rounded-2xl p-4">
              <div className="w-11 h-11 rounded-full bg-black text-white font-black text-sm flex items-center justify-center shrink-0">
                {getInitials(user.fullName)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{user.fullName}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>

            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              {TABS.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                    tab === id
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                  {typeof count === "number" && count > 0 && (
                    <span
                      className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                        tab === id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={handleLogOut}
                disabled={isLoggingOut}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                {isLoggingOut ? "Logging out…" : "Log Out"}
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          {tab === "profile" && (
            <div className="border border-gray-200 rounded-2xl p-6 md:p-8 max-w-xl">
              <div className="flex items-center gap-3 mb-6 lg:hidden">
                <div className="w-12 h-12 rounded-full bg-black text-white font-black text-sm flex items-center justify-center shrink-0">
                  {getInitials(user.fullName)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{user.fullName}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>

              <h2 className="font-bold text-lg mb-5">Profile Details</h2>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <label className="block">
                  <span className="block text-xs font-bold text-gray-500 mb-1.5">Full Name</span>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-transparent transition-shadow"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs font-bold text-gray-500 mb-1.5">Email Address</span>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                      value={user.email}
                      disabled
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="block text-xs font-bold text-gray-500 mb-1.5">Phone Number</span>
                  <div className="relative">
                    <PhoneIcon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="082 000 0000"
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-transparent transition-shadow"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Saving…
                    </>
                  ) : (
                    <>
                      <Check size={15} /> Save Changes
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {tab === "orders" && (
            <div>
              {orders.length === 0 ? (
                <EmptyState
                  icon={<ShoppingBag size={30} className="text-gray-300" />}
                  title="No orders yet"
                  subtitle="When you place an order, it will show up here."
                />
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div>
                          <p className="font-bold text-sm">#{order.id}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.date).toLocaleDateString("en-ZA", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="flex -space-x-3 mb-4">
                        {order.items.slice(0, 5).map(({ product }) => (
                          <ProductVisual
                            key={product.id}
                            product={product}
                            className="w-10 h-10 rounded-full border-2 border-white"
                            iconSize={14}
                          />
                        ))}
                        {order.items.length > 5 && (
                          <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-500">
                            +{order.items.length - 5}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
                        <p className="font-black">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              {wishlistProducts.length === 0 ? (
                <EmptyState
                  icon={<Heart size={30} className="text-gray-300" />}
                  title="Your wishlist is empty"
                  subtitle="Tap the heart icon on any product to save it here."
                />
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/shop/${p.slug}`}
                      className="group flex items-center gap-3 border border-gray-200 rounded-2xl p-3 hover:border-black hover:shadow-sm transition-all"
                    >
                      <ProductVisual product={p} className="w-16 h-16 rounded-xl shrink-0" iconSize={22} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{p.name}</p>
                        <p className="text-sm font-bold text-gray-900">{formatPrice(p.price)}</p>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border border-dashed border-gray-300 rounded-2xl p-10 text-center">
      <div className="mx-auto mb-3 w-fit">{icon}</div>
      <p className="font-semibold text-gray-900 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-5">{subtitle}</p>
      <Link href="/shop" className="bg-black text-white font-bold px-6 py-2.5 rounded-full text-sm inline-block hover:bg-gray-800 transition-colors">
        Browse the Shop
      </Link>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const styles = normalized.includes("deliver") || normalized.includes("complete")
    ? "bg-green-100 text-green-700"
    : normalized.includes("cancel") || normalized.includes("refund")
    ? "bg-red-100 text-red-700"
    : normalized.includes("ship") || normalized.includes("transit")
    ? "bg-blue-100 text-blue-700"
    : "bg-gray-100 text-gray-600";

  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${styles}`}>{status}</span>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading…</div>}>
      <AccountContent />
    </Suspense>
  );
}