"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/Logo";
import { BagIcon } from "@/components/Icons";
import { usePedido } from "@/components/PedidoProvider";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export function Header() {
  const pathname = usePathname();
  const { totalUnidades } = usePedido();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/85 backdrop-blur-xl border-b border-outline-variant">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 max-w-7xl mx-auto">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const activo = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`font-sans text-label-sm uppercase transition-colors ${
                  activo ? "text-primary" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-label-sm uppercase text-on-surface-variant hover:text-primary transition-colors"
          >
            Instagram
          </a>
        </nav>

        <Link
          href="/pedido"
          aria-label={`Ver mi pedido (${totalUnidades} productos)`}
          className="relative p-2 -mr-2 text-on-surface hover:text-primary transition-colors"
        >
          <BagIcon />
          {totalUnidades > 0 && (
            <span className="absolute top-0 right-0 min-w-5 h-5 px-1 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">
              {totalUnidades}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
