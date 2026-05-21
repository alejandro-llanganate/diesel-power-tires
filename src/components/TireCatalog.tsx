"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter, Plus, Star } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CATALOG_IMAGE,
  FILTER_LABELS,
  TIRE_POSITION_LABELS,
  tires,
  type Tire,
  type TireFilter,
} from "@/data/tires";
import { TireDetailModal } from "@/components/TireDetailModal";
import { useCart } from "@/context/CartContext";

const filters: { id: TireFilter | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "larga-distancia", label: "Larga distancia" },
  { id: "todas-posiciones", label: "Todas las posiciones" },
  { id: "eficiencia-combustible", label: "Eficiencia combustible" },
  { id: "base-ancha", label: "Base ancha" },
];

const PREVIEW_COUNT = 8;

type TireCatalogProps = {
  preview?: boolean;
  onCartOpen?: () => void;
};

export function TireCatalog({ preview = false, onCartOpen }: TireCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<TireFilter | "all">("all");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);
  const { addItem } = useCart();

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    tires.forEach((t) => t.sizes.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return tires.filter((t) => {
      const matchFilter =
        activeFilter === "all" || t.filters.includes(activeFilter);
      const matchSize =
        sizeFilter === "all" || t.sizes.includes(sizeFilter);
      return matchFilter && matchSize;
    });
  }, [activeFilter, sizeFilter]);

  const displayed = preview ? filtered.slice(0, PREVIEW_COUNT) : filtered;

  const handleAdd = (tire: Tire, size: string, qty: number) => {
    addItem({ model: tire.model, size, priceFrom: tire.priceFrom }, qty);
  };

  return (
    <section
      id="catalogo"
      className="scroll-mt-24 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Camión y Bus
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              {preview ? "Catálogo destacado" : "Catálogo completo Double Coin"}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              {preview
                ? `${PREVIEW_COUNT} modelos destacados. Haz clic para ver especificaciones.`
                : `${filtered.length} modelos. Clic en la llanta para ficha técnica.`}
            </p>
          </div>
          {!preview && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Filter className="h-4 w-4 text-amber-500" />
              Filtra tu búsqueda
            </div>
          )}
        </div>

        {!preview && (
          <>
            <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    activeFilter === f.id
                      ? "bg-blue-700 text-white"
                      : "border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-slate-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <label className="text-sm font-medium text-slate-600">
                Medida:
              </label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base outline-none focus:border-amber-500 sm:w-auto sm:py-2 sm:text-sm"
              >
                <option value="all">Todos los tamaños</option>
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:mt-10 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((tire) => (
            <TireCard
              key={tire.id}
              tire={tire}
              onOpen={() => setSelectedTire(tire)}
              onAdd={(size, qty) => handleAdd(tire, size, qty)}
            />
          ))}
        </div>

        {displayed.length === 0 && (
          <p className="mt-12 text-center text-slate-500">
            No hay llantas con esos filtros.
          </p>
        )}

        {preview && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-blue-800"
            >
              Ver más modelos ({tires.length} en total)
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>

      <TireDetailModal
        tire={selectedTire}
        onClose={() => setSelectedTire(null)}
        onAdded={onCartOpen}
      />
    </section>
  );
}

function TireCard({
  tire,
  onOpen,
  onAdd,
}: {
  tire: Tire;
  onOpen: () => void;
  onAdd: (size: string, qty: number) => void;
}) {
  const [size, setSize] = useState(tire.sizes[0]);
  const [qty, setQty] = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);

  const handleAdd = () => {
    onAdd(size, qty);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1500);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-300 hover:shadow-lg">
      <button
        type="button"
        onClick={onOpen}
        className="relative aspect-square overflow-hidden bg-slate-50 text-left"
      >
        <Image
          src={CATALOG_IMAGE}
          alt={`Llanta Double Coin ${tire.model}`}
          fill
          className="object-contain p-4 transition group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {tire.smartway && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-blue-700/90 px-2 py-1 text-[10px] font-bold text-white">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            SmartWay®
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-2 py-1 text-[10px] font-bold text-blue-700 shadow">
          Especificaciones →
        </span>
      </button>
      <div className="flex flex-1 flex-col p-4">
        <button type="button" onClick={onOpen} className="text-left">
          <h3 className="text-lg font-extrabold text-slate-900 hover:text-blue-700">
            {tire.model}
          </h3>
          <span className="mt-1 inline-block rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            {TIRE_POSITION_LABELS[tire.position]}
          </span>
        </button>
        <p className="mt-3 text-base font-bold text-slate-900">
          Desde <span className="text-amber-600">${tire.priceFrom}</span>
        </p>
        <div className="mt-3 flex gap-2">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-2.5 text-sm"
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
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 shrink-0 rounded-lg border border-slate-200 py-2.5 text-center text-sm"
            aria-label="Cantidad"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-3 flex w-full min-h-[44px] items-center justify-center gap-1 rounded-xl py-3 text-sm font-bold transition ${
            addedFlash
              ? "bg-green-500 text-white"
              : "bg-amber-500 text-black hover:bg-amber-400"
          }`}
        >
          <Plus className="h-3.5 w-3.5" />
          {addedFlash ? "¡Agregado!" : "Añadir al carrito"}
        </button>
      </div>
    </article>
  );
}
