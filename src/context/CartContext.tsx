"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/whatsapp";

export type AddedNotice = {
  model: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (model: string, size: string) => void;
  updateQty: (model: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lastAdded: AddedNotice | null;
  dismissNotice: () => void;
};

const STORAGE_KEY = "diesel-power-cart";

const CartContext = createContext<CartContextValue | null>(null);

function loadStored(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<AddedNotice | null>(null);

  useEffect(() => {
    setItems(loadStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.model === item.model && i.size === item.size
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { ...item, qty }];
      });
      setLastAdded({ model: item.model, size: item.size, qty });
    },
    []
  );

  const removeItem = useCallback((model: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.model === model && i.size === size))
    );
  }, []);

  const updateQty = useCallback((model: string, size: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) =>
        prev.filter((i) => !(i.model === model && i.size === size))
      );
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.model === model && i.size === size ? { ...i, qty } : i
      )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const dismissNotice = useCallback(() => setLastAdded(null), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.priceFrom * i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotal,
      lastAdded,
      dismissNotice,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotal,
      lastAdded,
      dismissNotice,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
