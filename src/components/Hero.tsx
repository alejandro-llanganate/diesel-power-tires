"use client";

import Image from "next/image";
import { ArrowRight, Shield, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { assetPath } from "@/lib/site";

const DIESEL_POWER_LOGO = assetPath("/diesel_power.png");
const DOUBLE_COIN_LOGO = assetPath("/double_coin_play.png");
const TRUCK_BG =
  "https://interborders.com/storage/posts/T8iFm1Es6dK30FGek7U821xTpKnqm0IiYHSG6Am5.jpg";
const TRUCK_BG_LOCAL = assetPath("/truck-hero.jpg");

export function Hero() {
  return (
    <section className="relative min-h-[min(100dvh,900px)] overflow-hidden border-b border-amber-200/40 sm:min-h-[78vh]">
      {/* Fondo camión con blur */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TRUCK_BG}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center blur-sm"
          fetchPriority="high"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el.src.includes("truck-hero")) el.src = TRUCK_BG_LOCAL;
          }}
        />
      </div>

      <div className="absolute inset-0 bg-slate-900/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-slate-900/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-3 py-10 text-center sm:px-4 sm:py-16 lg:py-20">
        <div className="relative w-full px-1">
          <Image
            src={DIESEL_POWER_LOGO}
            alt="Diesel Power Tires — Double Coin"
            width={1200}
            height={600}
            className="mx-auto h-32 w-full max-w-full object-contain drop-shadow-2xl sm:h-44 sm:max-w-[520px] md:h-52 md:max-w-[640px] lg:h-60 lg:max-w-[760px]"
            priority
          />
        </div>

        <div className="mt-3 flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 backdrop-blur-md sm:mt-4 sm:px-4">
          <Image
            src={DOUBLE_COIN_LOGO}
            alt="Double Coin"
            width={80}
            height={40}
            className="h-7 w-auto object-contain"
          />
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300 sm:text-xs">
            Distribuidor autorizado Double Coin · Ecuador
          </p>
        </div>

        <h1 className="mt-6 text-2xl font-extrabold leading-tight text-white drop-shadow-md sm:text-3xl lg:text-4xl">
          Llantas{" "}
          <span className="text-amber-400">Double Coin</span>
        </h1>
        <p className="mt-2 text-base font-semibold text-slate-100 sm:text-lg">
          para camión, bus y remolque
        </p>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
          Seguridad, rendimiento duradero y valor. Catálogo oficial con pedido
          por WhatsApp o cotización premium con tarjeta o Deuna.
        </p>

        <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="#catalogo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-amber-500/30 transition hover:bg-amber-400 sm:w-auto"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#ubicaciones"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
          >
            Nuestras sucursales
          </Link>
        </div>

        <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-2 border-t border-white/20 pt-6 sm:mt-10 sm:gap-4 sm:pt-8">
          {[
            { icon: Shield, label: "Seguridad certificada" },
            { icon: Truck, label: "22 modelos" },
            { icon: Zap, label: "SmartWay®" },
          ].map(({ icon: Icon, label }) => (
            <div key={label}>
              <Icon className="mx-auto h-4 w-4 text-amber-400" />
              <p className="mt-1.5 text-[10px] font-medium text-slate-200 sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
