"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { BagIcon, ChatIcon, GridIcon, HomeIcon } from "@/components/Icons";
import { usePedido } from "@/components/PedidoProvider";

const base = "relative flex flex-col items-center justify-center gap-1 px-3 transition-colors";
const texto = "font-sans text-[11px] font-semibold";

export function BottomNav() {
  const pathname = usePathname();
  const { totalUnidades, abrir } = usePedido();
  const color = (activo: boolean) =>
    activo ? "text-primary" : "text-on-surface-variant hover:text-primary";

  return (
    <nav className="fixed bottom-0 w-full z-40 bg-background/90 backdrop-blur-md border-t border-outline-variant md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center py-3 px-2">
        <Link href="/" className={`${base} ${color(pathname === "/")}`}>
          <HomeIcon />
          <span className={texto}>Inicio</span>
        </Link>
        <Link href="/catalogo" className={`${base} ${color(pathname.startsWith("/catalogo"))}`}>
          <GridIcon />
          <span className={texto}>Catálogo</span>
        </Link>
        <button type="button" onClick={abrir} className={`${base} ${color(false)}`}>
          <BagIcon />
          {totalUnidades > 0 && (
            <span className="absolute -top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
              {totalUnidades}
            </span>
          )}
          <span className={texto}>Bolsa</span>
        </button>
        <a
          href={whatsappLink(`Hola ${siteConfig.nombre}! Tengo una consulta.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${color(false)}`}
        >
          <ChatIcon />
          <span className={texto}>Contacto</span>
        </a>
      </div>
    </nav>
  );
}
