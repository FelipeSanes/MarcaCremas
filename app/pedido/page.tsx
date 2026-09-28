"use client";

import Link from "next/link";
import { useState } from "react";
import { usePedido } from "@/components/PedidoProvider";
import { ProductImage } from "@/components/ProductImage";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { mensajePedido } from "@/lib/mensajes";
import { formatoPrecio } from "@/lib/site-config";

export default function PedidoPage() {
  const { items, totalPrecio, cambiarCantidad, quitar, vaciar } = usePedido();
  const [nota, setNota] = useState("");

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto pb-lg">
      <h1 className="font-serif text-headline-lg text-on-surface mt-md mb-1">Mi pedido</h1>
      <p className="font-sans text-body-md text-on-surface-variant mb-md">
        Revisá los productos y envianos el pedido por WhatsApp. Ahí coordinamos pago y envío.
      </p>

      {items.length === 0 ? (
        <div className="text-center py-lg bg-surface-container-low rounded-2xl">
          <p className="font-serif text-headline-md text-on-surface mb-2">Tu pedido está vacío</p>
          <p className="font-sans text-body-md text-on-surface-variant mb-md">
            Sumá productos desde el catálogo.
          </p>
          <Link
            href="/catalogo"
            className="inline-block bg-primary text-on-primary font-sans text-label-md px-8 py-4 rounded-full hover:bg-primary-hover transition-colors"
          >
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_320px] gap-md items-start">
          <ul className="divide-y divide-outline-variant border-y border-outline-variant">
            {items.map((item) => (
              <li key={item.slug} className="flex gap-4 py-4">
                <Link
                  href={`/producto/${item.slug}`}
                  className="relative w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-surface-container"
                >
                  <ProductImage src={item.imagen} alt={item.nombre} sizes="80px" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/producto/${item.slug}`}
                    className="font-serif text-body-lg text-on-surface hover:text-primary"
                  >
                    {item.nombre}
                  </Link>
                  <p className="font-sans text-body-md text-on-surface-variant">
                    {formatoPrecio.format(item.precio)} c/u
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-outline-variant rounded-full">
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.slug, item.cantidad - 1)}
                        className="w-9 h-9 text-on-surface-variant hover:text-primary"
                        aria-label={`Restar uno de ${item.nombre}`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-sans text-label-md">{item.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.slug, item.cantidad + 1)}
                        className="w-9 h-9 text-on-surface-variant hover:text-primary"
                        aria-label={`Sumar uno de ${item.nombre}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => quitar(item.slug)}
                      className="font-sans text-label-md text-on-surface-variant hover:text-error underline"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <p className="font-sans text-label-md text-on-surface whitespace-nowrap">
                  {formatoPrecio.format(item.precio * item.cantidad)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="bg-surface-container-low rounded-2xl p-md space-y-4 md:sticky md:top-24">
            <div className="flex justify-between items-baseline">
              <span className="font-sans text-body-md text-on-surface-variant">Total estimado</span>
              <span className="font-serif text-headline-md text-primary">
                {formatoPrecio.format(totalPrecio)}
              </span>
            </div>
            <label className="block">
              <span className="font-sans text-label-md text-on-surface">Nota (opcional)</span>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value.slice(0, 300))}
                rows={3}
                placeholder="Ej: nombre, zona de entrega, consultas…"
                className="mt-1 w-full rounded-lg border border-outline-variant bg-background px-3 py-2 font-sans text-body-md focus:outline-none focus:border-primary"
              />
            </label>
            <WhatsAppButton
              mensaje={mensajePedido(items, nota)}
              texto="Enviar pedido por WhatsApp"
              className="w-full"
            />
            <button
              type="button"
              onClick={vaciar}
              className="w-full font-sans text-label-md text-on-surface-variant hover:text-error"
            >
              Vaciar pedido
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
