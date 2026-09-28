import { whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/Icons";

export function WhatsAppButton({
  mensaje,
  texto = "Consultar por WhatsApp",
  variante = "solido",
  className = "",
}: {
  mensaje: string;
  texto?: string;
  variante?: "solido" | "borde";
  className?: string;
}) {
  const estilos =
    variante === "solido"
      ? "bg-primary text-on-primary hover:bg-primary-hover hover:shadow-glow"
      : "bg-surface-container-low border border-lilac text-primary hover:bg-blush-tint hover:border-blush-tint";

  return (
    <a
      href={whatsappLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-sans text-label-lg uppercase px-7 py-3.5 rounded-full transition-all ${estilos} ${className}`}
    >
      <WhatsAppIcon />
      {texto}
    </a>
  );
}
