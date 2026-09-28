import Image from "next/image";
import Link from "next/link";
import { categorias, getDestacados, getProductoBySlug, getProductos } from "@/lib/products";
import { formatoPrecio, siteConfig, whatsappLink } from "@/lib/site-config";
import { ProductCard } from "@/components/ProductCard";
import { BotonAnadir } from "@/components/BotonAnadir";
import { LeafIcon } from "@/components/Icons";

const sellos = [
  { titulo: "100% Vegano", detalle: "Sin derivados animales" },
  { titulo: "Cruelty Free", detalle: "No testeado en animales" },
  { titulo: "Envases Eco", detalle: "Reciclables" },
  { titulo: "Pieles sensibles", detalle: "Fórmulas suaves" },
];

const pasos = [
  { n: "01", titulo: "Purificar", slug: "limpiador-facial-lavanda", nota: "Mañana & noche" },
  { n: "02", titulo: "Nutrir", slug: "serum-rosa-mosqueta", nota: "Absorción rápida" },
  { n: "03", titulo: "Sellar", slug: "crema-reafirmante-karite", nota: "Acción regeneradora" },
];

export default function HomePage() {
  const destacados = getDestacados();
  const productos = (destacados.length > 0 ? destacados : getProductos()).slice(0, 4);
  const pack = getProductoBySlug("pack-ritual-completo");

  return (
    <>
      {/* Portada */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-blush-tint/40">
        <div className="max-w-page mx-auto px-margin-mobile md:px-margin pt-space-md pb-space-xl md:py-space-2xl grid md:grid-cols-[1.1fr_0.9fr] gap-space-lg md:gap-space-xl items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-tint text-primary font-sans text-label-md uppercase px-3 py-1.5 mb-space-md md:mb-space-lg">
              <LeafIcon className="h-3.5 w-3.5" />
              Cosmética botánica
            </span>
            <h1 className="font-serif text-display-mobile md:text-display text-on-surface mb-space-md">
              El renacer <em className="text-primary">natural</em> de tu piel
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant max-w-lg mb-space-lg">
              Formulaciones botánicas puras, creadas con respeto hacia tu cuerpo y la naturaleza.
              Elegí tus productos y envianos el pedido directo por WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-on-primary font-sans text-label-lg uppercase px-7 py-4 hover:bg-primary-hover hover:shadow-glow transition-all"
              >
                Explorar catálogo <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/producto/serum-rosa-mosqueta"
                className="inline-flex items-center gap-2 rounded-full bg-surface-container-low border border-lilac text-primary font-sans text-label-lg uppercase px-7 py-4 hover:bg-blush-tint hover:border-blush-tint transition-colors"
              >
                Ver destacado
              </Link>
            </div>

            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-space-xl">
              {sellos.map((s) => (
                <li
                  key={s.titulo}
                  className="rounded-md border border-outline-variant bg-surface-container-low/70 px-3 py-2.5"
                >
                  <p className="font-sans text-body-sm font-semibold text-on-surface">{s.titulo}</p>
                  <p className="font-sans text-body-sm text-on-surface-variant">{s.detalle}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-first md:order-none">
            <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-xl overflow-hidden border border-outline-variant shadow-lift-2">
              <Image
                src="/marca/portada.jpg"
                alt="Productos botánicos con pétalos y rosa mosqueta"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-[65%_center]"
              />
            </div>
            <div className="hidden md:block absolute bottom-4 -left-8 max-w-xs rounded-lg bg-background/90 backdrop-blur-md border border-outline-variant shadow-lift-2 p-4">
              <p className="font-sans text-label-md uppercase text-secondary mb-1">Cosecha limitada</p>
              <p className="font-serif text-headline-sm text-on-surface">Rosa Mosqueta</p>
              <p className="font-sans text-body-sm text-on-surface-variant">
                Aceite prensado en frío para nuestro sérum iluminador.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-page mx-auto px-margin-mobile md:px-margin py-space-xl md:py-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-space-lg">
          <div>
            <p className="font-sans text-label-md uppercase text-on-surface-variant mb-2">
              Colección botánica
            </p>
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Fórmulas seleccionadas a mano
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="font-sans text-label-lg uppercase text-primary underline underline-offset-[6px] hover:text-primary-hover"
          >
            Ver catálogo completo
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter-mobile md:gap-gutter">
          {productos.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>
      </section>

      {/* Ritual en 3 pasos */}
      {pack && (
        <section className="max-w-page mx-auto px-margin-mobile md:px-margin pb-space-xl md:pb-space-2xl">
          <div className="rounded-xl border border-outline-variant bg-gradient-to-br from-blush-tint/50 via-surface-container-low to-lilac-wash/60 p-6 md:p-space-xl grid lg:grid-cols-[1fr_1.3fr] gap-space-lg items-center">
            <div>
              <p className="font-sans text-label-md uppercase text-secondary mb-2">Ritual diario</p>
              <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3">
                El poder del ritual en 3 pasos
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant mb-space-lg">
                Limpieza suave, nutrición y sellado: una rutina simple para acompañar tu piel todos
                los días.
              </p>
              <div className="rounded-lg bg-background/80 border border-outline-variant p-4 mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-serif text-title-lg text-on-surface">{pack.nombre}</p>
                  <p className="font-sans text-body-sm text-on-surface-variant">
                    Ahorrá comprando el set completo
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-price-lg text-primary">
                    {formatoPrecio.format(pack.precio)}
                  </p>
                  {pack.precioAnterior && (
                    <p className="font-sans text-body-sm text-on-surface-variant line-through">
                      {formatoPrecio.format(pack.precioAnterior)}
                    </p>
                  )}
                </div>
              </div>
              <BotonAnadir
                slug={pack.slug}
                nombre={pack.nombre}
                precio={pack.precio}
                imagen={pack.imagenes[0]}
                texto="Añadir set completo"
                className="w-full sm:w-auto !text-label-lg !px-7 !py-3.5"
              />
            </div>
            <ol className="grid sm:grid-cols-3 gap-3">
              {pasos.map((paso) => {
                const producto = getProductoBySlug(paso.slug);
                return (
                  <li key={paso.n}>
                    <Link
                      href={`/producto/${paso.slug}`}
                      className="block h-full rounded-lg bg-background/90 border border-outline-variant p-5 hover:shadow-lift-1 transition-shadow"
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blush-tint text-primary font-sans text-label-md mb-3">
                        {paso.n}
                      </span>
                      <p className="font-serif text-headline-sm text-on-surface mb-1">{paso.titulo}</p>
                      <p className="font-sans text-body-sm text-on-surface-variant mb-3">
                        {producto?.nombre}
                      </p>
                      <p className="font-sans text-label-md uppercase text-primary">{paso.nota}</p>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* Explorador */}
      <section className="bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-page mx-auto px-margin-mobile md:px-margin py-space-xl md:py-space-2xl">
          <div className="text-center max-w-xl mx-auto mb-space-lg">
            <p className="font-sans text-label-md uppercase text-on-surface-variant mb-2">
              Asesoramiento
            </p>
            <h2 className="font-serif text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Encontrá tu rutina ideal
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-gutter">
            {categorias.map((c) => (
              <Link
                key={c.valor}
                href={`/catalogo?categoria=${c.valor}`}
                className="rounded-lg bg-background border border-outline-variant p-5 hover:shadow-lift-1 hover:border-lilac transition-all"
              >
                <p className="font-serif text-title-lg text-on-surface mb-1">{c.label}</p>
                <span className="font-sans text-label-md uppercase text-primary">Ver productos →</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-space-lg">
            <a
              href={whatsappLink(`Hola ${siteConfig.nombre}! Quisiera asesoramiento para elegir productos.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-label-lg uppercase text-primary underline underline-offset-[6px]"
            >
              ¿Dudas? Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
