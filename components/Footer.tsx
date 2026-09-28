import Link from "next/link";
import { categorias } from "@/lib/products";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Marca } from "@/components/Marca";

export function Footer() {
  const anio = new Date().getFullYear();
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="max-w-page mx-auto px-margin-mobile md:px-margin py-space-xl grid gap-space-lg md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <Marca />
          <p className="font-sans text-body-md text-on-surface-variant mt-3">
            Fórmulas botánicas conscientes, pensadas para el bienestar de tu piel y del entorno.
          </p>
        </div>
        <div>
          <p className="font-sans text-label-lg uppercase text-on-surface mb-3">Explorar</p>
          <ul className="space-y-2 font-sans text-body-md text-on-surface-variant">
            <li>
              <Link href="/catalogo" className="hover:text-primary">
                Catálogo completo
              </Link>
            </li>
            {categorias.map((c) => (
              <li key={c.valor}>
                <Link href={`/catalogo?categoria=${c.valor}`} className="hover:text-primary">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-label-lg uppercase text-on-surface mb-3">Atención</p>
          <ul className="space-y-2 font-sans text-body-md text-on-surface-variant">
            <li>
              <a
                href={whatsappLink(`Hola ${siteConfig.nombre}! Tengo una consulta.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-outline-variant">
        <p className="max-w-page mx-auto px-margin-mobile md:px-margin py-4 font-sans text-body-sm text-on-surface-variant">
          © {anio} {siteConfig.nombre}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
