import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PRODUCTOS_DIR = path.join(process.cwd(), "content", "productos");

export const categorias = [
  { valor: "rostro", label: "Rostro" },
  { valor: "cuerpo", label: "Cuerpo" },
  { valor: "cabello", label: "Cabello" },
  { valor: "higiene", label: "Higiene" },
  { valor: "kits", label: "Kits" },
] as const;

export type Categoria = (typeof categorias)[number]["valor"];

export type Producto = {
  slug: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  moneda: string;
  stock: number;
  presentacion: string;
  imagenes: string[];
  destacado: boolean;
  publicado: boolean;
  descripcion: string;
};

function leerNota(archivo: string): Producto {
  const raw = fs.readFileSync(path.join(PRODUCTOS_DIR, archivo), "utf8");
  const { data, content } = matter(raw);

  return {
    slug: data.slug,
    nombre: data.nombre,
    categoria: data.categoria,
    precio: Number(data.precio) || 0,
    moneda: data.moneda ?? "ARS",
    stock: Number(data.stock) || 0,
    presentacion: data.presentacion ?? "",
    imagenes: data.imagenes ?? [],
    destacado: Boolean(data.destacado),
    publicado: Boolean(data.publicado),
    descripcion: content.replace(/<!--[\s\S]*?-->/g, "").trim(),
  };
}

export function getProductos(): Producto[] {
  return fs
    .readdirSync(PRODUCTOS_DIR)
    .filter((archivo) => archivo.endsWith(".md") && archivo !== "README.md")
    .map(leerNota)
    .filter((producto) => producto.publicado)
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
}

export function getProductoBySlug(slug: string): Producto | undefined {
  return getProductos().find((producto) => producto.slug === slug);
}

export function getDestacados(): Producto[] {
  return getProductos().filter((producto) => producto.destacado);
}

export function getLabelCategoria(valor: string): string {
  return categorias.find((c) => c.valor === valor)?.label ?? valor;
}
