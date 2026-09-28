import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { LeafIcon } from "@/components/Icons";

// Logo provisorio (texto + hoja). Cuando tengamos el logo final,
// guardarlo en public/marca/logo.svg y reemplazar este componente por un <Image>.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-primary ${className}`}>
      <LeafIcon className="h-6 w-6" />
      <span className="font-serif text-headline-md tracking-tight">{siteConfig.nombre}</span>
    </Link>
  );
}
