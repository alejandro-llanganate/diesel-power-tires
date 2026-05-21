import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-amber-50/30 py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <Image
            src={assetPath("/double_coin_play.png")}
            alt="Double Coin Tires"
            width={200}
            height={100}
            className="h-16 w-auto sm:h-20"
          />
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <Link href="/catalogo" className="hover:text-amber-800">
              Catálogo
            </Link>
            <Link href="/#ubicaciones" className="hover:text-amber-800">
              Ubicaciones
            </Link>
            <Link href="/#contacto" className="hover:text-amber-800">
              Contacto
            </Link>
            <Link href="/#nosotros" className="hover:text-amber-800">
              Nosotros
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          Distribuidor autorizado Double Coin · Ecuador ©{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
