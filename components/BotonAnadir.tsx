"use client";

import { usePedido } from "@/components/PedidoProvider";
import { BagIcon } from "@/components/Icons";

// Botón "Añadir" de las tarjetas: suma 1 unidad y abre la bolsa.
export function BotonAnadir({
  slug,
  nombre,
  precio,
  imagen,
  texto = "Añadir",
  className = "",
}: {
  slug: string;
  nombre: string;
  precio: number;
  imagen: string;
  texto?: string;
  className?: string;
}) {
  const { agregar, abrir } = usePedido();
  return (
    <button
      type="button"
      onClick={() => {
        agregar({ slug, nombre, precio, imagen });
        abrir();
      }}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-on-primary font-sans text-label-md uppercase px-4 py-2.5 hover:bg-primary-hover hover:shadow-glow transition-all ${className}`}
    >
      <BagIcon className="h-4 w-4" />
      {texto}
    </button>
  );
}
