import type { Metadata } from "next";
import Link from "next/link";
import { categorias, getProductos } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Catálogo — Aura Botánica" };

const filtros = [{ valor: "all", label: "Todo" }, ...categorias];

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const productos = getProductos().filter(
    (producto) => !categoria || categoria === "all" || producto.categoria === categoria
  );

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto pb-lg">
      <h1 className="font-serif text-headline-lg text-on-surface mt-md mb-1">Catálogo</h1>
      <p className="font-sans text-body-md text-on-surface-variant mb-md">
        {productos.length} {productos.length === 1 ? "producto" : "productos"} · Tocá uno para ver el
        detalle
      </p>

      <div className="flex gap-2 overflow-x-auto pb-md -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        {filtros.map(({ valor, label }) => {
          const activa = (categoria ?? "all") === valor;
          return (
            <Link
              key={valor}
              href={valor === "all" ? "/catalogo" : `/catalogo?categoria=${valor}`}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-sans text-label-md transition-colors ${
                activa
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {productos.length === 0 ? (
        <p className="font-sans text-body-md text-on-surface-variant py-lg text-center">
          Todavía no hay productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-gutter">
          {productos.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>
      )}
    </section>
  );
}
