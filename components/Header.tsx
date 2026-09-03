"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  LogOut,
  Package,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Repair Services", href: "/services" },
  { label: "Track Repair", href: "/track-repair" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, wishlist, openDrawer } = useCart();
  const { user, logOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
    >
      {/* Announcement bar */}
      <div className="hidden md:block bg-black text-white text-center text-xs font-medium tracking-wide py-2">
        Free delivery on orders over R500 &nbsp;•&nbsp; 90-day warranty on every product
      </div>

      <div className="mx-auto flex h-16 md:h-[72px] max-w-7xl items-center justify-between px-4 md:px-6 gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
  <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
    <img
      src="/logo.jpg"
      alt="Black Frog Labs logo"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="flex flex-col leading-none">
    <span className="text-base md:text-lg font-black tracking-tight text-gray-900">
      Black Frog Labs
    </span>
    <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase hidden sm:block">
      Repairs &amp; Accessories
    </span>
  </div>
</Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-colors ${
                pathname === link.href
                  ? "text-white bg-black"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search size={19} />
          </button>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden sm:flex relative p-2.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-black text-white rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <div className="relative hidden sm:block">
            <button
              onClick={() => setAccountOpen((v) => !v)}
              aria-label="Account"
              className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1"
            >
              <User size={19} />
              <ChevronDown size={13} className={`transition-transform ${accountOpen ? "rotate-180" : ""}`} />
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-fadeIn">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User size={15} /> My Account
                    </Link>
                    <Link href="/account?tab=orders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Package size={15} /> Order History
                    </Link>
                    <button
                      onClick={logOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut size={15} /> Log Out
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-1 flex flex-col gap-2">
                    <p className="text-xs text-gray-500 mb-1">Sign in for faster checkout &amp; order tracking.</p>
                    <Link
                      href="/login"
                      className="text-center text-sm font-bold bg-black text-white rounded-full py-2 hover:bg-gray-800 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="text-center text-sm font-bold border border-black rounded-full py-2 hover:bg-gray-50 transition-colors"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={openDrawer}
            aria-label="Cart"
            className="relative p-2.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-black text-white rounded-full">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden p-2.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 animate-fadeIn">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chargers, cables, cases, audio..."
              className="flex-1 bg-transparent outline-none text-sm py-1"
            />
            <button type="submit" className="text-sm font-bold bg-black text-white px-4 py-1.5 rounded-full">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 border-t border-gray-200 bg-white ${
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col px-4 py-3 gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                pathname === link.href ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/wishlist" className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Wishlist ({wishlist.length})
          </Link>
          {user ? (
            <>
              <Link href="/account" className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                My Account
              </Link>
              <button onClick={logOut} className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-2 mt-1 pb-1">
              <Link href="/login" className="flex-1 text-center text-sm font-bold bg-black text-white rounded-full py-2.5">
                Log In
              </Link>
              <Link href="/signup" className="flex-1 text-center text-sm font-bold border border-black rounded-full py-2.5">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
