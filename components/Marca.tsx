import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

// Logo de Stitch (public/marca/logo-emblema.png) + nombre en Playfair Display.
export function Marca({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <Image src="/marca/logo-emblema.png" alt="" width={36} height={36} priority />
      <span className="font-serif text-headline-sm text-primary tracking-tight">
        {siteConfig.nombre}
      </span>
    </Link>
  );
}
