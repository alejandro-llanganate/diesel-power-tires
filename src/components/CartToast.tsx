"use client";

import { Check, ShoppingCart, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

type CartToastProps = {
  onViewCart: () => void;
};

export function CartToast({ onViewCart }: CartToastProps) {
  const { lastAdded, dismissNotice, count } = useCart();

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(dismissNotice, 5000);
    return () => clearTimeout(t);
  }, [lastAdded, dismissNotice]);

  if (!lastAdded) return null;

  return (
    <div
      className="fixed bottom-20 left-3 right-3 z-[1000] mx-auto max-w-lg sm:bottom-6 sm:left-auto sm:right-[5.5rem]"
      role="status"
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">Agregado al carrito</p>
            <p className="truncate text-xs text-slate-600">
              {lastAdded.model} · {lastAdded.size} × {lastAdded.qty}
            </p>
            <p className="text-xs text-slate-500">
              {count} en total
            </p>
          </div>
          <button
            type="button"
            onClick={dismissNotice}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 sm:hidden"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={() => {
              dismissNotice();
              onViewCart();
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-black hover:bg-amber-400 sm:flex-initial"
          >
            <ShoppingCart className="h-4 w-4" />
            Ver carrito
          </button>
          <button
            type="button"
            onClick={dismissNotice}
            className="hidden shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100 sm:flex"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
