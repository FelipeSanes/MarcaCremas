"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ordenes = [
  { valor: "nombre", label: "Nombre" },
  { valor: "menor", label: "Menor precio" },
  { valor: "mayor", label: "Mayor precio" },
] as const;

export function OrdenSelect({ actual }: { actual: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <label className="flex items-center gap-2 font-sans text-body-sm text-on-surface-variant">
      Ordenar por
      <select
        value={actual}
        onChange={(e) => {
          const nuevos = new URLSearchParams(params);
          if (e.target.value === "nombre") nuevos.delete("orden");
          else nuevos.set("orden", e.target.value);
          const qs = nuevos.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        }}
        className="rounded-full border border-outline-variant bg-surface-container-low text-on-surface px-3 py-1.5 focus:outline-none focus:border-primary"
      >
        {ordenes.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
