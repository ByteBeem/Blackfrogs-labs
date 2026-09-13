"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Product } from "../lib/types";

const CART_KEY = "bfl_cart_v2";
const WISHLIST_KEY = "bfl_wishlist_v1";
const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 85;
const TAX_RATE = 0.15;

export interface CartLine {
  productId: string;
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  items: { product: Product; quantity: number }[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingRemaining: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);

      if (raw) {
        const saved = JSON.parse(raw);

        if (Array.isArray(saved)) {
          setLines(saved);
        }
      }

      const rawWish = localStorage.getItem(WISHLIST_KEY);

      if (rawWish) {
        const savedWishlist = JSON.parse(rawWish);

        if (Array.isArray(savedWishlist)) {
          setWishlist(savedWishlist);
        }
      }
    } catch {
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(WISHLIST_KEY);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, hydrated]);

  const addItem = (product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find(
        (line) => line.productId === product.id
      );

      if (existing) {
        return prev.map((line) =>
          line.productId === product.id
            ? {
                ...line,
                product,
                quantity: line.quantity + quantity,
              }
            : line
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          product,
          quantity,
        },
      ];
    });

    setDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setLines((prev) =>
      prev.filter((line) => line.productId !== productId)
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setLines((prev) =>
      prev.map((line) =>
        line.productId === productId
          ? { ...line, quantity }
          : line
      )
    );
  };

  const clearCart = () => {
    setLines([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) =>
    wishlist.includes(productId);

  const items = useMemo(
    () =>
      lines.map((line) => ({
        product: line.product,
        quantity: line.quantity,
      })),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;

  const tax = useMemo(
    () => Math.round(subtotal * TAX_RATE * 100) / 100,
    [subtotal]
  );

  const total = useMemo(
    () => subtotal + shipping + tax,
    [subtotal, shipping, tax]
  );

  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shipping,
        tax,
        total,
        freeShippingRemaining,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return ctx;
}
