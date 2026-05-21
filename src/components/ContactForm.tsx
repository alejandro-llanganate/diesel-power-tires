"use client";

export function ContactForm() {
  return (
    <form
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const msg = `Consulta web Diesel Power:\nNombre: ${fd.get("name")}\nEmail: ${fd.get("email")}\nMensaje: ${fd.get("message")}`;
        window.open(
          `https://wa.me/593999660912?text=${encodeURIComponent(msg)}`,
          "_blank"
        );
      }}
    >
      <input
        name="name"
        required
        placeholder="Nombre o empresa"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
      />
      <input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="¿Qué llantas necesitas? Modelo, medida, cantidad..."
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
      />
      <button
        type="submit"
        className="w-full min-h-[48px] rounded-xl bg-[#25D366] py-3.5 text-base font-bold text-white hover:brightness-110"
      >
        Enviar consulta por WhatsApp
      </button>
    </form>
  );
}
