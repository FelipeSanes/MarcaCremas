import Image from "next/image";

// Envuelve next/image. Los SVG (placeholders) se sirven sin optimizar;
// las fotos reales (JPG/WEBP) pasan por el optimizador de Next.
export function ProductImage({
  src,
  alt,
  sizes,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      className={`object-cover ${className}`}
    />
  );
}
