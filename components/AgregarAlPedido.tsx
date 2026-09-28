"use client";

import Link from "next/link";
import { useState } from "react";
import { usePedido } from "@/components/PedidoProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
  const { agregar } = usePedido();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

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
        <div className="flex items-center border border-outline-variant rounded-full">
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="w-11 h-12 text-body-lg text-on-surface-variant hover:text-primary"
            aria-label="Restar uno"
          >
            −
          </button>
          <span className="w-6 text-center font-sans text-label-md" aria-live="polite">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            className="w-11 h-12 text-body-lg text-on-surface-variant hover:text-primary"
            aria-label="Sumar uno"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            agregar({ slug, nombre, precio, imagen }, cantidad);
            setAgregado(true);
            setCantidad(1);
          }}
          className="flex-1 bg-primary text-on-primary font-sans text-label-md rounded-full px-6 py-3 hover:bg-primary-hover transition-colors"
        >
          Agregar al pedido
        </button>
      </div>

      {agregado && (
        <p className="font-sans text-body-md text-primary bg-primary-container/60 rounded-lg px-4 py-3">
          ¡Agregado!{" "}
          <Link href="/pedido" className="underline font-semibold">
            Ver mi pedido
          </Link>{" "}
          o seguí sumando productos.
        </p>
      )}

      <WhatsAppButton
        mensaje={mensajeProducto(nombre, precio)}
        texto="Consultar solo este producto"
        variante="borde"
        className="w-full"
      />
    </div>
  );
}
