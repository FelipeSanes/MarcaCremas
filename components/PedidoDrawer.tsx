"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePedido } from "@/components/PedidoProvider";
import { ProductImage } from "@/components/ProductImage";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BagIcon, CloseIcon, TrashIcon } from "@/components/Icons";
import { mensajePedido } from "@/lib/mensajes";
import { formatoPrecio } from "@/lib/site-config";

// "Tu bolsa": panel lateral con el pedido. En vez de pagar, envía el
// detalle por WhatsApp.
export function PedidoDrawer() {
  const { items, totalUnidades, totalPrecio, cambiarCantidad, quitar, vaciar, abierto, cerrar } =
    usePedido();
  const [nota, setNota] = useState("");

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrar();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierto, cerrar]);

  return (
    <div
      className={`fixed inset-0 z-50 ${abierto ? "" : "pointer-events-none"}`}
      aria-hidden={!abierto}
    >
      <div
        onClick={cerrar}
        className={`absolute inset-0 bg-on-surface/30 backdrop-blur-[4px] transition-opacity duration-300 ${
          abierto ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu bolsa"
        inert={!abierto}
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-lift-3 flex flex-col transition-transform duration-300 ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-outline-variant">
          <div className="flex items-center gap-2 text-on-surface">
            <BagIcon className="text-primary" />
            <h2 className="font-serif text-headline-sm">Tu bolsa</h2>
            {totalUnidades > 0 && (
              <span className="ml-1 rounded-full bg-blush-tint text-primary font-sans text-label-md px-2 py-0.5">
                {totalUnidades}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className="p-2 -mr-2 text-on-surface-variant hover:text-primary"
          >
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <p className="font-serif text-headline-sm text-on-surface mb-2">Tu bolsa está vacía</p>
            <p className="font-sans text-body-md text-on-surface-variant mb-6">
              Sumá productos desde el catálogo.
            </p>
            <Link
              href="/catalogo"
              onClick={cerrar}
              className="rounded-full bg-primary text-on-primary font-sans text-label-lg uppercase px-7 py-3.5 hover:bg-primary-hover transition-colors"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 divide-y divide-outline-variant">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <Link
                    href={`/producto/${item.slug}`}
                    onClick={cerrar}
                    className="relative w-20 h-24 shrink-0 rounded-md overflow-hidden bg-surface-container-low border border-outline-variant"
                  >
                    <ProductImage src={item.imagen} alt={item.nombre} sizes="80px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/producto/${item.slug}`}
                        onClick={cerrar}
                        className="font-serif text-title-md text-on-surface leading-snug hover:text-primary"
                      >
                        {item.nombre}
                      </Link>
                      <button
                        type="button"
                        onClick={() => quitar(item.slug)}
                        aria-label={`Quitar ${item.nombre}`}
                        className="text-on-surface-variant hover:text-error self-start p-1"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center rounded-full bg-surface-container-low border border-outline-variant">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.slug, item.cantidad - 1)}
                          className="w-8 h-8 text-primary"
                          aria-label={`Restar uno de ${item.nombre}`}
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-sans text-price-md">{item.cantidad}</span>
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.slug, item.cantidad + 1)}
                          className="w-8 h-8 text-primary"
                          aria-label={`Sumar uno de ${item.nombre}`}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-sans text-price-md text-primary">
                        {formatoPrecio.format(item.precio * item.cantidad)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-outline-variant bg-surface-container-low px-6 py-5 space-y-4">
              <label className="block">
                <span className="font-sans text-label-md uppercase text-on-surface-variant">
                  Nota (opcional)
                </span>
                <textarea
                  value={nota}
                  onChange={(e) => setNota(e.target.value.slice(0, 300))}
                  rows={2}
                  placeholder="Nombre, zona de entrega, consultas…"
                  className="mt-1.5 w-full rounded border border-outline-variant bg-surface-container-lowest px-4 py-3 font-sans text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-lilac/25"
                />
              </label>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-title-md text-on-surface">Total estimado</span>
                <span className="font-sans text-price-lg text-primary">
                  {formatoPrecio.format(totalPrecio)}
                </span>
              </div>
              <WhatsAppButton
                mensaje={mensajePedido(items, nota)}
                texto="Enviar pedido por WhatsApp"
                className="w-full"
              />
              <p className="text-center font-sans text-body-sm text-on-surface-variant">
                Coordinamos pago y envío por WhatsApp.{" "}
                <button type="button" onClick={vaciar} className="underline hover:text-error">
                  Vaciar bolsa
                </button>
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
