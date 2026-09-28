import { porcentajeAhorro, type Producto } from "@/lib/products";
import { formatoPrecio } from "@/lib/site-config";

export function Precio({ producto, grande = false }: { producto: Producto; grande?: boolean }) {
  const ahorro = porcentajeAhorro(producto);
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={`font-sans text-primary ${grande ? "text-price-lg" : "text-price-md"}`}>
        {formatoPrecio.format(producto.precio)}
      </span>
      {ahorro && producto.precioAnterior && (
        <>
          <span className="font-sans text-body-sm text-on-surface-variant line-through">
            {formatoPrecio.format(producto.precioAnterior)}
          </span>
          <span className="font-sans text-label-md uppercase text-secondary">-{ahorro}%</span>
        </>
      )}
    </div>
  );
}
