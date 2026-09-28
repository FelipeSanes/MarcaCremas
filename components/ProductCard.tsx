import Link from "next/link";
import type { Producto } from "@/lib/products";
import { getLabelCategoria } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { BotonAnadir } from "@/components/BotonAnadir";
import { Precio } from "@/components/Precio";

export function ProductCard({ producto }: { producto: Producto }) {
  const href = `/producto/${producto.slug}`;
  return (
    <article className="group flex flex-col bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden hover:shadow-lift-1 transition-shadow">
      <Link href={href} className="block aspect-[4/5] relative overflow-hidden bg-surface-container">
        <ProductImage
          src={producto.imagenes[0]}
          alt={producto.nombre}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="group-hover:scale-[1.03] transition-transform duration-500"
        />
        {producto.etiqueta && (
          <span className="absolute top-3 left-3 rounded-full bg-blush-tint text-primary font-sans text-label-md uppercase px-2.5 py-1">
            {producto.etiqueta}
          </span>
        )}
        {producto.stock === 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-background/90 text-on-surface-variant font-sans text-label-md uppercase px-2.5 py-1">
            Sin stock
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-3 md:p-4">
        <p className="font-sans text-label-md uppercase text-on-surface-variant mb-1.5 line-clamp-1">
          {getLabelCategoria(producto.categoria)}
          {producto.presentacion && ` • ${producto.presentacion}`}
        </p>
        <Link href={href}>
          <h3 className="font-serif text-title-md md:text-headline-sm text-on-surface leading-snug hover:text-primary transition-colors">
            {producto.nombre}
          </h3>
        </Link>
        {producto.resumen && (
          <p className="hidden md:block font-sans text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
            {producto.resumen}
          </p>
        )}
        <div className="mt-auto pt-3">
          <Precio producto={producto} />
          <div className="flex gap-2 mt-3">
            <Link
              href={href}
              className="flex-1 inline-flex items-center justify-center rounded-full bg-surface-container border border-outline-variant text-on-surface-variant font-sans text-label-md uppercase px-3 py-2.5 hover:bg-blush-tint hover:text-primary transition-colors"
            >
              Ver detalle
            </Link>
            {producto.stock > 0 && (
              <BotonAnadir
                slug={producto.slug}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagenes[0]}
                className="flex-1"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
