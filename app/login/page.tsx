"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function LoginPage() {
  const { logIn } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await logIn(email, password);
    setIsSubmitting(false);
    if (result.ok) {
      showToast("Welcome back!");
      router.push("/account");
    } else {
      setError(result.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
             <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/logo.jpg"
              alt="Black Frog Labs logo"
              className="w-full h-full object-cover"
            />
          </div>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm">Log in to track orders and check out faster.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 border border-gray-200 rounded-2xl p-6 md:p-8">
          {error && (
            <div className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}

          <label className="block">
            <span className="block text-xs font-bold text-gray-500 mb-1.5">Email Address</span>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </label>

          <label className="block">
            <span className="block text-xs font-bold text-gray-500 mb-1.5">Password</span>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl pl-11 pr-11 py-3 text-sm outline-none focus:border-black transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold py-3.5 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Logging in…" : "Log In"} <ArrowRight size={16} />
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-black hover:underline">
              Create one
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
          Demo storefront: accounts are stored locally in your browser only
          and are never sent to a server.
        </p>
      </div>
    </div>
  );
}
