import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { categorias, getProductos } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { ProductCard } from "@/components/ProductCard";
import { OrdenSelect } from "@/components/OrdenSelect";

export const metadata: Metadata = { title: `Catálogo — ${siteConfig.nombre}` };

const filtros = [{ valor: "all", label: "Todos los productos" }, ...categorias];

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; orden?: string }>;
}) {
  const { categoria, orden = "nombre" } = await searchParams;
  const productos = getProductos()
    .filter((p) => !categoria || categoria === "all" || p.categoria === categoria)
    .sort((a, b) =>
      orden === "menor" ? a.precio - b.precio : orden === "mayor" ? b.precio - a.precio : 0
    );

  const href = (valor: string) => {
    const qs = new URLSearchParams();
    if (valor !== "all") qs.set("categoria", valor);
    if (orden !== "nombre") qs.set("orden", orden);
    const s = qs.toString();
    return s ? `/catalogo?${s}` : "/catalogo";
  };

  return (
    <section className="max-w-page mx-auto px-margin-mobile md:px-margin py-space-xl">
      <div className="grid md:grid-cols-2 gap-3 md:items-end mb-space-lg">
        <div>
          <p className="font-sans text-label-md uppercase text-on-surface-variant mb-2">
            Colección botánica
          </p>
          <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Catálogo
          </h1>
        </div>
        <p className="font-sans text-body-md text-on-surface-variant md:text-right">
          Tocá un producto para ver el detalle o añadilo directo a tu bolsa.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-space-lg">
        <div className="flex gap-2 overflow-x-auto -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 pb-1">
          {filtros.map(({ valor, label }) => {
            const activa = (categoria ?? "all") === valor;
            return (
              <Link
                key={valor}
                href={href(valor)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 font-sans text-body-sm font-semibold transition-colors ${
                  activa
                    ? "bg-lilac-wash border-primary text-on-surface"
                    : "bg-surface-container-low border-outline-variant text-on-surface-variant hover:bg-blush-tint"
                }`}
              >
                {activa && <span aria-hidden="true">✓ </span>}
                {label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center justify-between lg:justify-end gap-4 lg:ml-auto">
          <span className="font-sans text-body-sm text-on-surface-variant">
            {productos.length} {productos.length === 1 ? "producto" : "productos"}
          </span>
          <Suspense>
            <OrdenSelect actual={orden} />
          </Suspense>
        </div>
      </div>

      {productos.length === 0 ? (
        <p className="font-sans text-body-lg text-on-surface-variant py-space-xl text-center">
          Todavía no hay productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-gutter-mobile md:gap-gutter">
          {productos.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>
      )}
    </section>
  );
}
