# CLAUDE.md

Guía técnica de Aura Botánica para trabajar en este repositorio.

## Qué es

Tienda de productos de higiene y cuidado personal (cuidado facial, higiene &
ducha, aceites & sérums, rutinas & packs). No hay pago online: el cliente arma un pedido en el sitio y lo
envía por WhatsApp con el detalle de productos, cantidades y total estimado.

## Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS.
- **Hosting**: pensado para Vercel (deploy automático al pushear a `main`).
- **Contenido**: Markdown + frontmatter en `content/productos/`, parseado en
  build time con `gray-matter` (`lib/products.ts`). Sin base de datos.
- **Diseño**: export de Google Stitch en `content/design/stitch/` (sistema
  "Atelier Botanical & Skin"). Sus tokens (colores, tipografías Playfair Display
  + Plus Jakarta Sans, radios, sombras) están en `tailwind.config.ts`.
- **Pedido ("bolsa")**: estado en el navegador (`components/PedidoProvider.tsx`,
  guardado en `localStorage`), panel lateral `components/PedidoDrawer.tsx` y
  mensaje de WhatsApp armado en `lib/mensajes.ts`.

## Estructura

```
app/
├── page.tsx              # Portada: imagen + "Explorar catálogo", destacados, ritual
├── catalogo/             # Grilla con filtro (?categoria=) y orden (?orden=)
└── producto/[slug]/      # Detalle: galería, precio, cantidad, añadir a la bolsa
components/               # Header, BottomNav (móvil), PedidoDrawer, ProductCard, etc.
lib/
├── products.ts           # Lectura de productos y categorías
├── mensajes.ts           # Textos precargados de WhatsApp
└── site-config.ts        # Nombre, número de WhatsApp, Instagram, formato de precio
content/productos/        # Una nota .md por producto
content/design/           # Material de marca / export de Stitch
public/productos/<slug>/  # Fotos de cada producto
public/marca/             # portada.jpg, logo.png, logo-emblema.png
```

## Tareas comunes

- **Agregar/editar un producto**: crear `content/productos/<slug>.md` (formato
  en `reglas.md`) y sus fotos en `public/productos/<slug>/`. No hace falta tocar
  código.
- **Cambiar número de WhatsApp o Instagram**: `lib/site-config.ts`.
- **Cambiar categorías**: array `categorias` en `lib/products.ts`.
- **Cambiar colores/tipografías**: `tailwind.config.ts` (tokens) y fuentes en
  `app/layout.tsx`.
- **Cambiar nombre de marca / logo**: `siteConfig.nombre` en
  `lib/site-config.ts` y las imágenes de `public/marca/` (el header usa
  `logo-emblema.png`).
- **Cambiar la imagen de portada**: reemplazar `public/marca/portada.jpg`.

## Desarrollo

```bash
npm run dev     # servidor local
npm run build   # build de producción
npm run lint    # ESLint
```

## Git

- No commitear secretos, tokens ni credenciales.
