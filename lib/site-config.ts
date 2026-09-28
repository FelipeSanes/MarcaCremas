export const siteConfig = {
  nombre: "Aura Botánica",
  lema: "Cuidado personal e higiene, natural",
  // TODO: reemplazar por el usuario real de Instagram.
  instagramUrl: "https://instagram.com/aurabotanica",
  // TODO: reemplazar por el número real. Formato internacional, sin espacios ni símbolos.
  whatsappNumero: "5491100000000",
};

export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

export const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
