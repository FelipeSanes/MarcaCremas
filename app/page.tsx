import Image from "next/image";
import Link from "next/link";
import { categorias, getDestacados, getProductos } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const destacados = getDestacados();
  const productos = (destacados.length > 0 ? destacados : getProductos()).slice(0, 4);

  return (
    <>
      {/* Portada: imagen a pantalla completa + botón al catálogo */}
      <section className="relative w-full h-[calc(100dvh-4rem-4.5rem)] md:h-[calc(100dvh-4rem)] min-h-[520px] max-h-[860px] flex items-end md:items-center overflow-hidden">
        <Image
          src="/marca/hero.svg"
          alt="Productos de cuidado natural Aura Botánica"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10 md:bg-gradient-to-r md:from-background/95 md:via-background/60 md:to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pb-lg md:pb-0">
          <p className="font-sans text-label-sm uppercase text-secondary mb-4">
            Cuidado personal · Higiene · Natural
          </p>
          <h1 className="font-serif text-display-mobile md:text-display-xl text-on-surface max-w-xl mb-4">
            Tu ritual diario, <em className="text-primary">de la naturaleza</em>
          </h1>
          <p className="font-sans text-body-md md:text-body-lg text-on-surface-variant max-w-md mb-8">
            Cremas, jabones y aceites con ingredientes botánicos. Elegí tus productos y enviá el
            pedido directo por WhatsApp.
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans text-label-md px-8 py-4 rounded-full hover:bg-primary-hover transition-colors shadow-soft"
          >
            Ver catálogo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto py-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-outline-variant py-md">
          {[
            { titulo: "Ingredientes naturales", detalle: "Fórmulas suaves, a base de plantas" },
            { titulo: "Pedí por WhatsApp", detalle: "Armá tu pedido y te respondemos directo" },
            { titulo: "Envíos", detalle: "Coordinamos la entrega por WhatsApp" },
          ].map((item) => (
            <div key={item.titulo} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              <div>
                <p className="font-sans text-label-md text-on-surface">{item.titulo}</p>
                <p className="font-sans text-body-md text-on-surface-variant">{item.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto pb-lg">
        <div className="flex justify-between items-end mb-md">
          <h2 className="font-serif text-headline-md md:text-headline-lg text-on-surface">Destacados</h2>
          <Link href="/catalogo" className="font-sans text-label-md text-primary hover:underline">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-gutter">
          {productos.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto pb-lg">
        <h2 className="font-serif text-headline-md md:text-headline-lg text-on-surface mb-md">
          Categorías
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categorias.map((categoria, i) => (
            <Link
              key={categoria.valor}
              href={`/catalogo?categoria=${categoria.valor}`}
              className={`rounded-xl p-5 aspect-[4/3] md:aspect-square flex items-end transition-transform hover:-translate-y-1 ${
                i % 2 === 0 ? "bg-primary-container" : "bg-secondary-container"
              }`}
            >
              <span className="font-serif text-body-lg text-on-surface">{categoria.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
