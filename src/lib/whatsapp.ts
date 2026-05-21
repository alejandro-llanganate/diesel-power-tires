import { WHATSAPP_NUMBER } from "@/data/locations";

export type CartItem = {
  model: string;
  size: string;
  qty: number;
  priceFrom: number;
};

export type PaymentMethod = "whatsapp" | "tarjeta" | "deuna";

export function buildWhatsAppUrl(
  items: CartItem[],
  options: {
    payment: PaymentMethod;
    branch?: string;
    customerName?: string;
    notes?: string;
  }
): string {
  const isPremium =
    options.payment === "tarjeta" || options.payment === "deuna";

  const header = isPremium
    ? "🌟 *COTIZACIÓN PREMIUM — Diesel Power Tires*\n"
    : "🛞 *Pedido — Diesel Power Tires (Double Coin)*\n";

  const paymentLine =
    options.payment === "tarjeta"
      ? "💳 Pago solicitado: *Tarjeta*\n"
      : options.payment === "deuna"
        ? "📱 Pago solicitado: *Deuna*\n"
        : "💬 Pago: coordinar por WhatsApp\n";

  const lines = items.map(
    (i) =>
      `• ${i.model} (${i.size}) × ${i.qty} — desde $${i.priceFrom * i.qty}`
  );

  const body = [
    header,
    paymentLine,
    options.branch ? `📍 Retiro en: ${options.branch}\n` : "",
    options.customerName ? `👤 Cliente: ${options.customerName}\n` : "",
    "\n*Detalle:*\n",
    ...lines,
    `\n*Subtotal estimado:* $${items.reduce((s, i) => s + i.priceFrom * i.qty, 0)}`,
    options.notes ? `\n\nNotas: ${options.notes}` : "",
    "\n\nGracias por elegir Diesel Power — distribuidor Double Coin.",
  ].join("");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

export function openWhatsApp(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
