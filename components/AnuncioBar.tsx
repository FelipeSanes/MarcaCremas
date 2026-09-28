import { LeafIcon } from "@/components/Icons";

export function AnuncioBar() {
  return (
    <div className="w-full bg-surface-container-low border-b border-outline-variant">
      <div className="max-w-page mx-auto px-margin-mobile md:px-margin py-2 flex items-center justify-center md:justify-start gap-2 font-sans text-body-sm text-on-surface-variant">
        <LeafIcon className="h-4 w-4 text-secondary" />
        <span>Pedidos, pagos y envíos coordinados por WhatsApp</span>
      </div>
    </div>
  );
}
