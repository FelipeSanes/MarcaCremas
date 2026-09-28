# reglas.md

Reglas de contenido y diseño para Aura Botánica.

## 1. Formato de producto

Cada producto es un archivo `.md` en `content/productos/`, nombrado como su
`slug`, con este frontmatter:

```yaml
---
slug: crema-facial-hidratante
nombre: Crema Facial Hidratante
categoria: rostro           # rostro | cuerpo | cabello | higiene | kits
precio: 18500
moneda: ARS
stock: 14
presentacion: Frasco 50 ml  # opcional (tamaño, contenido del kit, etc.)
imagenes:
  - /productos/crema-facial-hidratante/1.jpg
  - /productos/crema-facial-hidratante/2.jpg
destacado: true
publicado: true
---

Descripción del producto (beneficios, ingredientes, modo de uso).
```

- `slug` único, en minúsculas, sin espacios ni tildes, separado por guiones.
- `precio` numérico, sin puntos ni símbolo de moneda.
- Al menos 1 imagen; la primera es la portada.
- `publicado: false` oculta el producto sin borrarlo.
- `destacado: true` lo muestra en la portada (se ven hasta 4).
- `stock: 0` muestra "Sin stock" y cambia el botón por "Avisame cuando haya stock".

## 2. Imágenes

- Formato: JPG o WEBP (los `.svg` actuales son placeholders de ejemplo).
- Carpeta: `public/productos/<slug>/`, numeradas `1.jpg`, `2.jpg`, ...
- Relación de aspecto: **4:5 vertical** (ej. 1200×1500 px), fondo claro/uniforme.
- Peso objetivo: ≤ 500 KB por imagen.
- Solo fotos propias o con derechos de uso.

## 3. Diseño

- `content/design/` es la fuente de verdad de la identidad visual.
- El sitio es mobile-first: la mayoría del tráfico llega desde WhatsApp/Instagram.

## 4. WhatsApp

- Los botones usan `wa.me/<numero>?text=<mensaje>` con los productos incluidos.
- El número vive en `lib/site-config.ts`.
