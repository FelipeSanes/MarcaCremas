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
      ? "bg-primary text-on-primary hover:bg-primary-hover"
      : "border border-primary text-primary hover:bg-primary-container";

  return (
    <a
      href={whatsappLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-sans text-label-md px-6 py-4 rounded-full transition-colors ${estilos} ${className}`}
    >
      <WhatsAppIcon />
      {texto}
    </a>
  );
}
