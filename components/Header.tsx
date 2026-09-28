"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Marca } from "@/components/Marca";
import { BagIcon } from "@/components/Icons";
import { usePedido } from "@/components/PedidoProvider";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export function Header() {
  const pathname = usePathname();
  const { totalUnidades, abrir } = usePedido();

  return (
    <header className="fixed top-0 w-full z-40 bg-background/85 backdrop-blur-md border-b border-outline-variant">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin h-16 max-w-page mx-auto">
        <Marca />

        <nav className="hidden md:flex items-center gap-8 font-sans text-body-md">
          {links.map(({ href, label }) => {
            const activo = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  activo ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <a
            href={whatsappLink(`Hola ${siteConfig.nombre}! Tengo una consulta.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Contacto
          </a>
        </nav>

        <button
          type="button"
          onClick={abrir}
          aria-label={`Abrir mi bolsa (${totalUnidades} productos)`}
          className="relative p-2 -mr-2 text-on-surface hover:text-primary transition-colors"
        >
          <BagIcon />
          {totalUnidades > 0 && (
            <span className="absolute top-0 right-0 min-w-5 h-5 px-1 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
              {totalUnidades}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
