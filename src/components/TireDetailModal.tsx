"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FILTER_LABELS,
  TIRE_POSITION_LABELS,
  type Tire,
} from "@/data/tires";
import { getSpecsForModel, SPEC_COLUMNS } from "@/data/tireSpecs";
import { useCart } from "@/context/CartContext";

type TireDetailModalProps = {
  tire: Tire | null;
  onClose: () => void;
  onAdded?: () => void;
};

export function TireDetailModal({ tire, onClose, onAdded }: TireDetailModalProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (tire) {
      setSize(tire.sizes[0]);
      setQty(1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [tire]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!tire) return null;

  const specs = getSpecsForModel(tire.model);

  return (
    <>
      <div
        className="fixed inset-0 z-[1300] bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed inset-0 z-[1400] flex flex-col overflow-hidden bg-white shadow-2xl sm:inset-3 sm:rounded-2xl md:inset-6 lg:inset-10 lg:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tire-spec-title"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 sm:px-6">
          <h2
            id="tire-spec-title"
            className="text-lg font-extrabold text-slate-900 sm:text-xl"
          >
            {tire.model} — Especificaciones
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-black/10 p-2 text-slate-900 transition hover:bg-black/20"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-6 border-b border-slate-100 p-4 sm:p-6 lg:grid-cols-[280px_1fr] lg:gap-8">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-black p-4">
              <Image
                src={tire.detailImage}
                alt={`Banda de rodadura ${tire.model}`}
                width={400}
                height={500}
                className="h-auto max-h-64 w-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-700">
                {TIRE_POSITION_LABELS[tire.position]}
              </p>
              <p className="mt-2 text-slate-600">{tire.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tire.filters.map((f) => (
                  <span
                    key={f}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600"
                  >
                    {FILTER_LABELS[f]}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900">
                Desde{" "}
                <span className="text-amber-600">${tire.priceFrom}</span>
                <span className="text-sm font-normal text-slate-500">
                  {" "}
                  / unidad
                </span>
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-base sm:w-auto sm:min-w-[140px]"
                >
                  {tire.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-center text-base sm:w-20"
                  aria-label="Cantidad"
                />
                <button
                  type="button"
                  onClick={() => {
                    addItem(
                      { model: tire.model, size, priceFrom: tire.priceFrom },
                      qty
                    );
                    onAdded?.();
                    onClose();
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3.5 text-sm font-bold text-black hover:bg-amber-400 sm:w-auto sm:flex-1"
                >
                  <Plus className="h-4 w-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <p className="mb-2 text-xs text-slate-500 sm:hidden">
              Desliza la tabla →
            </p>
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="inline-block min-w-full rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-center text-[10px] sm:min-w-[1000px] sm:text-xs md:text-sm">
                <thead>
                  <tr className="bg-amber-400">
                    {SPEC_COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className="border border-amber-500 px-2 py-3 font-bold text-slate-900 whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.map((row, idx) => (
                    <tr
                      key={row.productCode}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      {SPEC_COLUMNS.map((col) => (
                        <td
                          key={col.key}
                          className="border border-slate-200 px-2 py-2.5 text-slate-800 whitespace-nowrap"
                        >
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            {specs.length === 0 && (
              <p className="py-8 text-center text-slate-500">
                Especificaciones no disponibles para este modelo.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
