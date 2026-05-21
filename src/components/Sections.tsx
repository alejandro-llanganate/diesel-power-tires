import {
  BookOpen,
  Download,
  FileText,
  Headphones,
  Mail,
  Newspaper,
  Play,
  Quote,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export function TestimonialsSection() {
  const items = [
    {
      name: "Carlos M.",
      role: "Flota regional — Guayaquil",
      text: "Las FR610 en dirección bajaron el consumo notablemente. Diesel Power nos cotizó el mismo día por WhatsApp.",
    },
    {
      name: "Transportes Andina",
      role: "12 unidades tracción",
      text: "FD405 y RLB400 con excelente desgaste uniforme. Retiro en vía a Daule sin complicaciones.",
    },
    {
      name: "Jorge R.",
      role: "Operador bus interprovincial",
      text: "RT500 multiposición perfectas para nuestro perfil bajo. Cotización premium con tarjeta fue rápida.",
    },
  ];

  return (
    <section id="testimonios" className="scroll-mt-24 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          icon={Quote}
          label="Testimonios"
          title="Lo que dicen nuestros clientes"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-[var(--border)] bg-white p-6"
            >
              <p className="text-[var(--text-muted)] leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="mt-4 border-t border-[var(--border)] pt-4">
                <p className="font-bold text-[var(--text)]">{t.name}</p>
                <p className="text-sm text-[var(--yellow)]">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

const CATALOG_PDF =
  "https://www.doublecointires.com/wp-content/uploads/DC-TBR-Catalog-2025-Spanish-DIGITAL2.25.pdf";

export function DownloadsSection() {
  const docs = [
    {
      title: "Catálogo TBR 2025 — Camión y Bus",
      subtitle: "Manual oficial Double Coin en español",
    },
    {
      title: "Especificaciones y medidas",
      subtitle: "Incluido en el catálogo digital 2025",
    },
    {
      title: "Guía SmartWay® y eficiencia",
      subtitle: "Incluido en el catálogo digital 2025",
    },
    {
      title: "Aplicaciones por posición",
      subtitle: "Dirección, tracción y remolque",
    },
  ];

  return (
    <section id="descargas" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          icon={Download}
          label="Descargas"
          title="Manuales y catálogo"
        />
        <p className="mt-4 max-w-2xl text-slate-600">
          Descarga el catálogo oficial Double Coin TBR 2025 en español.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {docs.map((d) => (
            <a
              key={d.title}
              href={CATALOG_PDF}
              target="_blank"
              rel="noopener noreferrer"
              download="DC-TBR-Catalog-2025-Spanish.pdf"
              className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-amber-400 hover:shadow-md"
            >
              <FileText className="h-8 w-8 shrink-0 text-amber-600" />
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{d.title}</p>
                <p className="text-sm text-slate-500">{d.subtitle}</p>
              </div>
              <span className="text-sm font-bold text-amber-600">
                Descargar PDF
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideosSection() {
  const videos = [
    {
      title:
        "Por qué los neumáticos Double Coin OTR son la mejor opción (Español)",
      id: "GQ3ZyFm_Vho",
    },
    {
      title:
        "TBR - Top Tier Fuel Efficiency | Double Coin Tires (Español)",
      id: "iomZtfX5K3w",
    },
    {
      title: "New Tires: TR100 | Double Coin Tires",
      id: "udvHHB7-cxI",
    },
  ];

  return (
    <section id="videos" className="scroll-mt-24 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          icon={Play}
          label="Videos"
          title="Capacitación y producto"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <div
              key={v.title}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
            >
              <div className="aspect-video bg-slate-100">
                <iframe
                  title={v.title}
                  src={`https://www.youtube.com/embed/${v.id}`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="p-4 text-sm font-semibold text-[var(--text)]">{v.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SupportSection() {
  return (
    <section id="soporte" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          icon={Headphones}
          label="Soporte"
          title="Asesoría para tu flota"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Selección por aplicación",
              desc: "Te ayudamos a elegir dirección, tracción o remolque según tu ruta y carga.",
            },
            {
              title: "Garantía y reclamos",
              desc: "Soporte Double Coin con registro de serie y factura de compra.",
            },
            {
              title: "Presión y mantenimiento",
              desc: "Recomendaciones de inflado y revisión para maximizar vida útil.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-6"
            >
              <Wrench className="h-8 w-8 text-[var(--yellow)]" />
              <h3 className="mt-4 font-bold text-[var(--text)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="#contacto"
            className="inline-flex rounded-full bg-[var(--blue)] px-6 py-3 text-sm font-bold text-white hover:brightness-110"
          >
            Hablar con soporte
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  const posts = [
    {
      date: "12 May 2025",
      title: "Cómo elegir llanta de dirección vs tracción",
      excerpt: "Guía rápida para flotas de larga distancia en Ecuador.",
    },
    {
      date: "28 Abr 2025",
      title: "SmartWay®: qué significa para tu negocio",
      excerpt: "Ahorro de combustible y beneficios ambientales.",
    },
    {
      date: "10 Abr 2025",
      title: "Base ancha: cuándo conviene FT125+ o FD425",
      excerpt: "Capacidad de carga y estabilidad en autopista.",
    },
  ];

  return (
    <section id="blog" className="scroll-mt-24 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader icon={BookOpen} label="Blog" title="Consejos de flota" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-[var(--border)] bg-white p-6"
            >
              <time className="text-xs font-semibold text-[var(--blue-glow)]">
                {p.date}
              </time>
              <h3 className="mt-2 font-bold text-[var(--text)]">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {p.excerpt}
              </p>
              <Link
                href="#contacto"
                className="mt-4 inline-block text-sm font-semibold text-[var(--yellow)] hover:underline"
              >
                Leer más →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  const news = [
    {
      tag: "Promoción",
      title: "Bonificación por juego completo de 6 llantas",
      date: "Mayo 2025",
    },
    {
      tag: "Producto",
      title: "Nuevo stock FR610 y FT115 SmartWay®",
      date: "Abril 2025",
    },
    {
      tag: "Empresa",
      title: "Diesel Power refuerza sucursal Vía Durán km 26",
      date: "Marzo 2025",
    },
  ];

  return (
    <section id="noticias" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          icon={Newspaper}
          label="Noticias"
          title="Novedades y promociones"
        />
        <ul className="mt-10 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
          {news.map((n) => (
            <li
              key={n.title}
              className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="rounded-md bg-[var(--yellow)]/20 px-2 py-0.5 text-xs font-bold text-[var(--yellow)]">
                  {n.tag}
                </span>
                <h3 className="mt-2 font-bold text-[var(--text)]">{n.title}</h3>
              </div>
              <span className="text-sm text-[var(--text-muted)]">{n.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="nosotros" className="scroll-mt-24 bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          icon={Wrench}
          label="Nosotros"
          title="Diesel Power Tires × Double Coin"
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
            <p>
              <strong className="text-[var(--text)]">Diesel Power Tires</strong> es tu
              distribuidor de confianza para llantas{" "}
              <strong className="text-[var(--yellow)]">Double Coin</strong> en
              la región Guayaquil–Daule–Durán. Ofrecemos la línea completa de
              camión, bus y remolque con asesoría técnica local.
            </p>
            <p>
              Combinamos el respaldo de una marca global CMA con atención
              personalizada: cotización por WhatsApp, retiro en sucursal y
              opción de <strong className="text-[var(--text)]">Cotización Premium</strong>{" "}
              con pago por tarjeta o Deuna.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {[
              { n: "9+", l: "Modelos top" },
              { n: "2", l: "Sucursales" },
              { n: "15+", l: "Años experiencia" },
              { n: "24h", l: "Respuesta WhatsApp" },
            ].map((s) => (
              <li
                key={s.l}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center"
              >
                <p className="text-3xl font-extrabold text-[var(--yellow)]">
                  {s.n}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{s.l}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contacto" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          icon={Mail}
          label="Contacto"
          title="Escríbenos o visítanos"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[var(--text-muted)]">
              También puedes llamarnos directamente. Horario de atención: Lun–Sáb
              8:00 – 18:00.
            </p>
            <a
              href="tel:0999660912"
              className="break-all text-2xl font-extrabold text-[var(--yellow)] hover:underline sm:text-3xl"
            >
              099 966 0912
            </a>
            <Link
              href="#ubicaciones"
              className="text-[var(--blue-glow)] font-semibold hover:underline"
            >
              Ver mapa de sucursales →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  label,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--blue-glow)]">
        <Icon className="h-4 w-4" />
        {label}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold text-[var(--text)] sm:text-3xl">{title}</h2>
    </div>
  );
}
