# CLAUDE.md

Guía técnica de Aura Botánica para trabajar en este repositorio.

## Qué es

Tienda de productos de higiene y cuidado personal (rostro, cuerpo, cabello,
higiene, kits). No hay pago online: el cliente arma un pedido en el sitio y lo
envía por WhatsApp con el detalle de productos, cantidades y total estimado.

## Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS.
- **Hosting**: pensado para Vercel (deploy automático al pushear a `main`).
- **Contenido**: Markdown + frontmatter en `content/productos/`, parseado en
  build time con `gray-matter` (`lib/products.ts`). Sin base de datos.
- **Diseño**: tokens en `tailwind.config.ts` (colores, tipografías, spacing).
  Los valores actuales son provisorios hasta cargar el export de Stitch en
  `content/design/stitch/`.
- **Pedido**: estado en el navegador (`components/PedidoProvider.tsx`, guardado
  en `localStorage`) y mensaje armado en `lib/mensajes.ts`.

## Estructura

```
app/
├── page.tsx              # Portada: imagen + botón "Ver catálogo" + destacados
├── catalogo/             # Grilla con filtro por categoría (?categoria=)
├── producto/[slug]/      # Detalle: fotos, precio, cantidad, agregar al pedido
└── pedido/               # Resumen del pedido + "Enviar pedido por WhatsApp"
components/               # Header, BottomNav (móvil), Footer, ProductCard, etc.
lib/
├── products.ts           # Lectura de productos y categorías
├── mensajes.ts           # Textos precargados de WhatsApp
└── site-config.ts        # Nombre, número de WhatsApp, Instagram, formato de precio
content/productos/        # Una nota .md por producto
content/design/           # Material de marca / export de Stitch
public/productos/<slug>/  # Fotos de cada producto
public/marca/             # Imagen de portada, logo
```

## Tareas comunes

- **Agregar/editar un producto**: crear `content/productos/<slug>.md` (formato
  en `reglas.md`) y sus fotos en `public/productos/<slug>/`. No hace falta tocar
  código.
- **Cambiar número de WhatsApp o Instagram**: `lib/site-config.ts`.
- **Cambiar categorías**: array `categorias` en `lib/products.ts`.
- **Cambiar colores/tipografías**: `tailwind.config.ts` (tokens) y fuentes en
  `app/layout.tsx`.
- **Cambiar la imagen de portada**: reemplazar `public/marca/hero.svg` (o subir
  `hero.jpg` y actualizar el `src` en `app/page.tsx`).

## Desarrollo

```bash
npm run dev     # servidor local
npm run build   # build de producción
npm run lint    # ESLint
```

## Git

- No commitear secretos, tokens ni credenciales.
