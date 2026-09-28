import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low mt-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="font-sans text-body-md text-on-surface-variant mt-2">{siteConfig.lema}</p>
        </div>
        <div className="flex gap-6 font-sans text-label-md">
          <a
            href={whatsappLink(`Hola ${siteConfig.nombre}! Tengo una consulta.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary"
          >
            WhatsApp
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
