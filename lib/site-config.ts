export const siteConfig = {
  // Nombre provisorio de la marca (se cambia acá y en public/marca/).
  nombre: "Aura Botánica",
  lema: "Cosmética botánica para tu ritual diario",
  // TODO: reemplazar por el usuario real de Instagram.
  instagramUrl: "https://instagram.com/aurabotanica",
  // Número de WhatsApp en formato internacional, sin espacios ni símbolos.
  whatsappNumero: "5491151259002",
};

export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

export const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
