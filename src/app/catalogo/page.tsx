"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { TireCatalog } from "@/components/TireCatalog";

export default function CatalogoPage() {
  return (
    <SiteShell>
      {(openCart) => (
        <main className="bg-white">
          <div className="border-b border-amber-100 bg-amber-50/40">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:py-6 lg:px-8">
              <Link
                href="/"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-amber-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Inicio
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Catálogo completo
                </h1>
                <p className="text-sm text-slate-600">
                  Todos los modelos Double Coin disponibles
                </p>
              </div>
            </div>
          </div>
          <TireCatalog onCartOpen={openCart} />
        </main>
      )}
    </SiteShell>
  );
}
