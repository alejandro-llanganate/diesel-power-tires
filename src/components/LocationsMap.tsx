"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { branches } from "@/data/locations";
import { useEffect } from "react";
import { MapPin, Phone } from "lucide-react";

const icon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(
      branches.map((b) => [b.lat, b.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 12 });
  }, [map]);
  return null;
}

export function LocationsMap() {
  const center: [number, number] = [-2.176, -79.861];

  return (
    <section
      id="ubicaciones"
      className="scroll-mt-24 border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--blue-glow)]">
            Encuéntranos
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--text)] sm:text-3xl lg:text-5xl">
            Nuestras ubicaciones
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
            Dos sucursales en el eje Guayaquil–Daule–Durán. Mapa interactivo a
            continuación — retira tu pedido en la más cercana.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {branches.map((b) => (
            <div
              key={b.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-400/50"
            >
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-amber-600" />
              <div>
                <h3 className="text-lg font-bold text-[var(--text)]">{b.name}</h3>
                <p className="mt-1 text-[var(--text-muted)]">{b.address}</p>
                <a
                  href={`tel:${b.phone}`}
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-amber-600 hover:underline"
                >
                  <Phone className="h-4 w-4 text-amber-600" />
                  {b.phone}
                </a>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {b.hours}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa gigante — aislado para no tapar navbar ni WhatsApp */}
      <div className="relative isolate z-0 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] mx-auto max-w-7xl px-4 pt-2 lg:px-8">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-white/95 px-4 py-2 text-sm font-bold text-[var(--text)] shadow-md backdrop-blur">
            Mapa en vivo — zoom y desplaza
          </span>
        </div>
        <div className="relative z-0 h-[50vh] min-h-[280px] w-full sm:h-[60vh] sm:min-h-[400px] md:min-h-[520px] lg:min-h-[600px] lg:h-[70vh]">
          <MapContainer
            center={center}
            zoom={11}
            scrollWheelZoom
            className="h-full w-full"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <FitBounds />
            {branches.map((b) => (
              <Marker key={b.id} position={[b.lat, b.lng]} icon={icon}>
                <Popup>
                  <strong>{b.name}</strong>
                  <br />
                  {b.address}
                  <br />
                  <a href={`tel:${b.phone}`}>{b.phone}</a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
