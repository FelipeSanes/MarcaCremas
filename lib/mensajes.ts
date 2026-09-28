import { formatoPrecio, siteConfig } from "@/lib/site-config";

type Linea = { nombre: string; precio: number; cantidad: number };

export function mensajeProducto(nombre: string, precio: number): string {
  return `Hola ${siteConfig.nombre}! Te consulto por: ${nombre} (${formatoPrecio.format(precio)}). ¿Está disponible?`;
}

export function mensajePedido(lineas: Linea[], nota?: string): string {
  const detalle = lineas
    .map((l) => `• ${l.cantidad} x ${l.nombre} — ${formatoPrecio.format(l.precio * l.cantidad)}`)
    .join("\n");
  const total = lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0);

  return [
    `Hola ${siteConfig.nombre}! Quiero hacer este pedido:`,
    "",
    detalle,
    "",
    `Total estimado: ${formatoPrecio.format(total)}`,
    nota?.trim() ? `\nNota: ${nota.trim()}` : "",
  ]
    .join("\n")
    .trim();
}
