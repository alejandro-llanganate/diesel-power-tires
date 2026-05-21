"use client";

import dynamic from "next/dynamic";
import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/Hero";
import { TireCatalog } from "@/components/TireCatalog";
import {
  AboutSection,
  ContactSection,
  DownloadsSection,
  SupportSection,
  VideosSection,
} from "@/components/Sections";

const LocationsMap = dynamic(
  () =>
    import("@/components/LocationsMap").then((m) => ({
      default: m.LocationsMap,
    })),
  {
    ssr: false,
    loading: () => (
      <section className="flex h-[70vh] min-h-[480px] items-center justify-center border-t border-slate-200 bg-slate-50">
        <p className="text-slate-500">Cargando mapa...</p>
      </section>
    ),
  }
);

export function HomePage() {
  return (
    <SiteShell>
      {(openCart) => (
        <main className="bg-white">
          <Hero />
          <TireCatalog preview onCartOpen={openCart} />
          <DownloadsSection />
          <VideosSection />
          <SupportSection />
          <AboutSection />
          <LocationsMap />
          <ContactSection />
        </main>
      )}
    </SiteShell>
  );
}
