import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "Diesel Power Tires | Double Coin — Camión y Bus",
  description:
    "Distribuidor autorizado Double Coin en Ecuador. Catálogo de llantas para camión, bus y remolque. Pedidos por WhatsApp y cotización premium.",
  keywords: [
    "Double Coin",
    "llantas camión",
    "Diesel Power",
    "Guayaquil",
    "Daule",
    "Durán",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} scroll-smooth bg-white text-slate-900`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
