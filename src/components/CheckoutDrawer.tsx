"use client";

import Image from "next/image";
import {
  CreditCard,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Smartphone,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { branches } from "@/data/locations";
import { CATALOG_IMAGE } from "@/data/tires";
import { useCart } from "@/context/CartContext";
import {
  buildWhatsAppUrl,
  openWhatsApp,
  type PaymentMethod,
} from "@/lib/whatsapp";

type CheckoutDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CheckoutDrawer({ open, onClose }: CheckoutDrawerProps) {
  const { items, updateQty, removeItem, clear, count, subtotal } = useCart();
  const [branch, setBranch] = useState(branches[0].name);
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [showPremium, setShowPremium] = useState(false);

  if (!open) return null;

  const sendOrder = (payment: PaymentMethod) => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, {
      payment,
      branch,
      customerName: customerName || undefined,
      notes: notes || undefined,
    });
    openWhatsApp(url);
    if (payment === "whatsapp") clear();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[1100] bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <aside
        className="fixed inset-x-0 bottom-0 z-[1200] flex max-h-[92dvh] flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-full sm:max-w-lg sm:rounded-none sm:rounded-l-3xl"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Asa móvil */}
        <div className="flex shrink-0 justify-center pt-3 sm:hidden">
          <div className="h-1 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Cabecera */}
        <div className="shrink-0 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500 shadow-md">
                <ShoppingBag className="h-5 w-5 text-black" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                  Tu carrito
                </h2>
                <p className="text-sm text-slate-500">
                  {count} {count === 1 ? "artículo" : "artículos"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              aria-label="Cerrar carrito"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contenido scroll */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center px-4 py-10 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <ShoppingBag className="h-10 w-10 text-slate-300" />
              </div>
              <p className="mt-4 text-base font-semibold text-slate-800">
                Carrito vacío
              </p>
              <p className="mt-2 max-w-xs text-sm text-slate-500">
                Explora el catálogo y agrega llantas Double Coin a tu pedido.
              </p>
              <a
                href="/catalogo"
                onClick={onClose}
                className="mt-6 w-full max-w-xs rounded-full bg-amber-500 px-6 py-3.5 text-center text-sm font-bold text-black hover:bg-amber-400 sm:w-auto"
              >
                Ver catálogo
              </a>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={`${item.model}-${item.size}`}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:h-24 sm:w-24">
                        <Image
                          src={CATALOG_IMAGE}
                          alt={item.model}
                          fill
                          className="object-contain p-2"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-base font-bold text-slate-900">
                              {item.model}
                            </p>
                            <p className="text-sm text-slate-500">{item.size}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.model, item.size)
                            }
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.model, item.size, item.qty - 1)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-white"
                              aria-label="Menos cantidad"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-bold text-slate-900">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.model, item.size, item.qty + 1)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-white"
                              aria-label="Más cantidad"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-lg font-extrabold text-amber-600">
                            ${item.priceFrom * item.qty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Datos del pedido
                </p>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Sucursal de retiro
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-500">
                    {branches.find((b) => b.name === branch)?.address}
                  </p>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nombre o empresa
                  </label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Notas
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Ejes, urgencia, facturación…"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Pie fijo */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:px-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Subtotal estimado</p>
                <p className="text-xs text-slate-400">Precio final por WhatsApp</p>
              </div>
              <p className="text-2xl font-extrabold text-amber-600 sm:text-3xl">
                ${subtotal}
              </p>
            </div>

            <button
              type="button"
              onClick={() => sendOrder("whatsapp")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-base font-bold text-white shadow-lg transition active:scale-[0.98] hover:brightness-105"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span className="text-center">Enviar pedido por WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPremium(!showPremium)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 py-3.5 text-sm font-bold text-amber-800 transition hover:bg-amber-100"
            >
              <Star className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
              Cotización Premium
            </button>

            {showPremium && (
              <div className="mt-3 space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-center text-xs text-slate-600">
                  Pago con tarjeta o Deuna — te contactamos con precio final.
                </p>
                <button
                  type="button"
                  onClick={() => sendOrder("tarjeta")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  Pago con tarjeta
                </button>
                <button
                  type="button"
                  onClick={() => sendOrder("deuna")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  <Smartphone className="h-4 w-4 text-amber-600" />
                  Pago con Deuna
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
