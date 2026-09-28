import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabelCategoria, getProductoBySlug, getProductos } from "@/lib/products";
import { formatoPrecio, siteConfig } from "@/lib/site-config";
import { ProductImage } from "@/components/ProductImage";
import { AgregarAlPedido } from "@/components/AgregarAlPedido";

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
  return { title: producto ? `${producto.nombre} — ${siteConfig.nombre}` : siteConfig.nombre };
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

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-6xl mx-auto pb-lg pt-md">
      <Link
        href="/catalogo"
        className="font-sans text-label-md text-on-surface-variant hover:text-primary transition-colors"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-md md:gap-lg mt-md">
        <div>
          <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-surface-container">
            <ProductImage
              src={producto.imagenes[0]}
              alt={producto.nombre}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {producto.imagenes.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {producto.imagenes.slice(1).map((imagen) => (
                <div
                  key={imagen}
                  className="aspect-square relative overflow-hidden rounded-lg bg-surface-container"
                >
                  <ProductImage src={imagen} alt={producto.nombre} sizes="25vw" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:py-md">
          <p className="font-sans text-label-sm uppercase text-secondary mb-2">
            {getLabelCategoria(producto.categoria)}
          </p>
          <h1 className="font-serif text-headline-lg text-on-surface mb-2">{producto.nombre}</h1>
          {producto.presentacion && (
            <p className="font-sans text-body-md text-on-surface-variant mb-3">
              {producto.presentacion}
            </p>
          )}
          <p className="font-serif text-headline-md text-primary mb-md">
            {formatoPrecio.format(producto.precio)}
          </p>

          <div className="font-sans text-body-md text-on-surface-variant whitespace-pre-line mb-md">
            {producto.descripcion}
          </div>

          <p className="font-sans text-label-md mb-4">
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
        </div>
      </div>
    </section>
  );
}
