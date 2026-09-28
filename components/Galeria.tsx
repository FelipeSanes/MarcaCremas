"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";

export function Galeria({ imagenes, nombre }: { imagenes: string[]; nombre: string }) {
  const [activa, setActiva] = useState(0);

  return (
    <div>
      <div className="aspect-[4/5] relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant">
        <ProductImage
          src={imagenes[activa]}
          alt={nombre}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {imagenes.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {imagenes.map((imagen, i) => (
            <button
              key={imagen}
              type="button"
              onClick={() => setActiva(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`aspect-square relative overflow-hidden rounded-md bg-surface-container border-2 transition-colors ${
                i === activa ? "border-primary" : "border-transparent hover:border-lilac"
              }`}
            >
              <ProductImage src={imagen} alt="" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
