import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabelCategoria, getProductoBySlug, getProductos } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { AgregarAlPedido } from "@/components/AgregarAlPedido";
import { Galeria } from "@/components/Galeria";
import { Precio } from "@/components/Precio";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return getProductos().map((producto) => ({ slug: producto.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  return {
    title: producto ? `${producto.nombre} — ${siteConfig.nombre}` : siteConfig.nombre,
    description: producto?.resumen,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);

  if (!producto) {
    notFound();
  }

  const relacionados = getProductos()
    .filter((p) => p.categoria === producto.categoria && p.slug !== producto.slug)
    .slice(0, 4);

  return (
    <>
      <section className="max-w-page mx-auto px-margin-mobile md:px-margin pt-space-lg pb-space-xl">
        <nav className="font-sans text-body-sm text-on-surface-variant mb-space-lg">
          <Link href="/catalogo" className="hover:text-primary">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/catalogo?categoria=${producto.categoria}`} className="hover:text-primary">
            {getLabelCategoria(producto.categoria)}
          </Link>
        </nav>

        <div className="grid md:grid-cols-2 gap-space-lg lg:gap-space-2xl">
          <Galeria imagenes={producto.imagenes} nombre={producto.nombre} />

          <div>
            {producto.etiqueta && (
              <span className="inline-block rounded-full bg-blush-tint text-primary font-sans text-label-md uppercase px-3 py-1 mb-3">
                {producto.etiqueta}
              </span>
            )}
            <h1 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              {producto.nombre}
            </h1>
            {producto.presentacion && (
              <p className="font-sans text-label-md uppercase text-on-surface-variant mb-4">
                {producto.presentacion}
              </p>
            )}
            <div className="mb-space-lg">
              <Precio producto={producto} grande />
            </div>

            <p className="font-sans text-body-lg text-on-surface-variant whitespace-pre-line mb-space-lg">
              {producto.descripcion}
            </p>

            {producto.beneficios.length > 0 && (
              <div className="mb-space-lg">
                <p className="font-sans text-title-md text-on-surface mb-2">
                  {producto.categoria === "rutinas" ? "Incluye" : "Beneficios"}
                </p>
                <ul className="space-y-2">
                  {producto.beneficios.map((b) => (
                    <li key={b} className="flex gap-3 font-sans text-body-md text-on-surface-variant">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blush shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="font-sans text-label-md uppercase mb-3">
              {producto.stock > 0 ? (
                <span className="text-primary">● En stock</span>
              ) : (
                <span className="text-error">● Sin stock</span>
              )}
            </p>

            <AgregarAlPedido
              slug={producto.slug}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagenes[0]}
              disponible={producto.stock > 0}
            />

            {(producto.ingredientes || producto.modoDeUso) && (
              <div className="mt-space-lg border-t border-outline-variant divide-y divide-outline-variant">
                {producto.ingredientes && (
                  <details className="group py-4" open>
                    <summary className="flex justify-between cursor-pointer list-none font-sans text-title-md text-on-surface">
                      Ingredientes activos
                      <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="font-sans text-body-md text-on-surface-variant mt-2">
                      {producto.ingredientes}
                    </p>
                  </details>
                )}
                {producto.modoDeUso && (
                  <details className="group py-4">
                    <summary className="flex justify-between cursor-pointer list-none font-sans text-title-md text-on-surface">
                      Modo de uso
                      <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="font-sans text-body-md text-on-surface-variant mt-2">
                      {producto.modoDeUso}
                    </p>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="max-w-page mx-auto px-margin-mobile md:px-margin pb-space-xl">
          <h2 className="font-serif text-headline-md text-on-surface mb-space-md">
            También te puede gustar
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter-mobile md:gap-gutter">
            {relacionados.map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
