"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_URL = process.env.NEXT_PUBLIC_ISDEVELOPMENT === "true" ? "http://localhost:5041" : "https://api.blackfroglabs.co.za";

interface PublicUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextValue {
  user: PublicUser | null;
  isLoading: boolean;
  signUp: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logIn: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logOut: () => Promise<void>;
  updateProfile: (data: {
    fullName?: string;
    phone?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---- api helpers ----------------------------------------------------------
// No token handling here at all — the httpOnly cookie set by the API is sent
// automatically by the browser as long as we pass credentials: "include".

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    const error =
      data?.error ||
      data?.title ||
      data?.message ||
      "Something went wrong. Please try again.";
    return { ok: false as const, error, data: null };
  }

  return { ok: true as const, error: undefined, data };
}

function toPublicUser(u: any): PublicUser {
  return {
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    phone: u.phone ?? undefined,
    createdAt: u.createdAt,
  };
}

// ---- provider ---------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      // No way to check for a token client-side anymore (it's httpOnly),
      // so we just ask the API — it'll 401 if there's no valid cookie.
      const res = await apiFetch("/api/auth/me");
      if (res.ok && res.data) {
        setUser(toPublicUser(res.data));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const signUp: AuthContextValue["signUp"] = async (
    fullName,
    email,
    password
  ) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!fullName.trim() || !normalizedEmail || password.length < 6) {
      return {
        ok: false,
        error:
          "Please fill in every field. Passwords need at least 6 characters.",
      };
    }

    const res = await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        fullName: fullName.trim(),
        email: normalizedEmail,
        password,
      }),
    });

    if (!res.ok) {
      return { ok: false, error: res.error };
    }

    setUser(toPublicUser(res.data.user));
    return { ok: true };
  };

  const logIn: AuthContextValue["logIn"] = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: normalizedEmail, password }),
    });

    if (!res.ok) {
      return { ok: false, error: res.error };
    }

    setUser(toPublicUser(res.data.user));
    return { ok: true };
  };

  const logOut: AuthContextValue["logOut"] = async () => {
    // Wait for this to actually complete before clearing local state —
    // this is what deletes the httpOnly cookie server-side, which is the
    // only place it can be deleted from since JS can't touch it.
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const updateProfile: AuthContextValue["updateProfile"] = async (data) => {
    if (!user) return { ok: false, error: "Not logged in." };

    const res = await apiFetch("/api/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { ok: false, error: res.error };
    }

    setUser(toPublicUser(res.data));
    return { ok: true };
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signUp, logIn, logOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}