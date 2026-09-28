import Link from "next/link";
import { getLabelCategoria, type Producto } from "@/lib/products";
import { formatoPrecio } from "@/lib/site-config";
import { ProductImage } from "@/components/ProductImage";

export function ProductCard({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group block bg-surface-container-low rounded-xl overflow-hidden border border-transparent hover:border-outline-variant hover:shadow-soft transition-all"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-surface-container">
        <ProductImage
          src={producto.imagenes[0]}
          alt={producto.nombre}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="group-hover:scale-105 transition-transform duration-500"
        />
        {producto.stock === 0 && (
          <span className="absolute top-3 left-3 bg-background/90 px-2 py-1 rounded font-sans text-label-sm uppercase text-on-surface-variant">
            Sin stock
          </span>
        )}
      </div>
      <div className="p-3 md:p-4">
        <p className="font-sans text-label-sm uppercase text-secondary mb-1">
          {getLabelCategoria(producto.categoria)}
        </p>
        <h3 className="font-serif text-body-md md:text-body-lg text-on-surface leading-snug mb-1">
          {producto.nombre}
        </h3>
        <p className="font-sans text-label-md text-primary">{formatoPrecio.format(producto.precio)}</p>
      </div>
    </Link>
  );
}
