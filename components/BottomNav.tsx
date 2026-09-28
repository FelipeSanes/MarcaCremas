"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { BagIcon, GridIcon, HomeIcon, InstagramIcon } from "@/components/Icons";
import { usePedido } from "@/components/PedidoProvider";

const items = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/catalogo", label: "Catálogo", icon: GridIcon },
  { href: "/pedido", label: "Pedido", icon: BagIcon },
  { href: siteConfig.instagramUrl, label: "Instagram", icon: InstagramIcon, external: true },
];

export function BottomNav() {
  const pathname = usePathname();
  const { totalUnidades } = usePedido();

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-background/90 backdrop-blur-xl border-t border-outline-variant md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center py-3 px-2">
        {items.map(({ href, label, icon: Icon, external }) => {
          const activo = !external && (href === "/" ? pathname === "/" : pathname.startsWith(href));
          const className = `relative flex flex-col items-center justify-center gap-1 px-3 transition-colors ${
            activo ? "text-primary" : "text-on-surface-variant hover:text-primary"
          }`;
          const contenido = (
            <>
              <Icon />
              {href === "/pedido" && totalUnidades > 0 && (
                <span className="absolute -top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                  {totalUnidades}
                </span>
              )}
              <span className="font-sans text-[11px] font-semibold">{label}</span>
            </>
          );

          return external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {contenido}
            </a>
          ) : (
            <Link key={label} href={href} className={className}>
              {contenido}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
