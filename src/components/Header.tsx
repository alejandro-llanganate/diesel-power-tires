"use client";

import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER } from "@/data/locations";

const nav = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/catalogo", label: "Todos los modelos" },
  { href: "/#descargas", label: "Descargas" },
  { href: "/#videos", label: "Videos" },
  { href: "/#soporte", label: "Soporte" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#ubicaciones", label: "Ubicaciones" },
  { href: "/#contacto", label: "Contacto" },
];

type HeaderProps = {
  onCartOpen: () => void;
};

export function Header({ onCartOpen }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-[1000] border-b border-amber-100/80 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={assetPath("/double_coin_play.png")}
            alt="Double Coin Tires"
            width={200}
            height={100}
            className="h-12 w-auto object-contain sm:h-14 lg:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-amber-50 hover:text-amber-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-amber-400 md:h-auto md:w-auto md:gap-2 md:px-3 md:py-2"
            aria-label="Llamar 0999660912"
          >
            <Phone className="h-4 w-4 shrink-0 text-amber-500" />
            <span className="hidden text-sm font-semibold md:inline">
              099 966 0912
            </span>
          </a>
          <button
            type="button"
            onClick={onCartOpen}
            className="relative flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-black transition hover:bg-amber-400"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-800 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-amber-100 bg-amber-50/50 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
