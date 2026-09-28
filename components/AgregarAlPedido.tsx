"use client";

import { useState } from "react";
import { usePedido } from "@/components/PedidoProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BagIcon } from "@/components/Icons";
import { mensajeProducto } from "@/lib/mensajes";

export function AgregarAlPedido({
  slug,
  nombre,
  precio,
  imagen,
  disponible,
}: {
  slug: string;
  nombre: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}) {
  const { agregar, abrir } = usePedido();
  const [cantidad, setCantidad] = useState(1);

  if (!disponible) {
    return (
      <WhatsAppButton
        mensaje={`Hola! Vi que ${nombre} está sin stock. ¿Cuándo vuelve a entrar?`}
        texto="Avisame cuando haya stock"
        className="w-full"
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex items-center rounded-full bg-surface-container-low border border-outline-variant">
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="w-11 h-12 text-body-lg text-primary"
            aria-label="Restar uno"
          >
            −
          </button>
          <span className="w-6 text-center font-sans text-price-md" aria-live="polite">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            className="w-11 h-12 text-body-lg text-primary"
            aria-label="Sumar uno"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            agregar({ slug, nombre, precio, imagen }, cantidad);
            setCantidad(1);
            abrir();
          }}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-sans text-label-lg uppercase rounded-full px-6 py-3.5 hover:bg-primary-hover hover:shadow-glow transition-all"
        >
          <BagIcon className="h-5 w-5" />
          Añadir a la bolsa
        </button>
      </div>

      <WhatsAppButton
        mensaje={mensajeProducto(nombre, precio)}
        texto="Consultar este producto"
        variante="borde"
        className="w-full"
      />
    </div>
  );
}
