# reglas.md

Reglas de contenido y diseño para Aura Botánica.

## 1. Formato de producto

Cada producto es un archivo `.md` en `content/productos/`, nombrado como su
`slug`, con este frontmatter:

```yaml
---
slug: serum-rosa-mosqueta
nombre: "Sérum Iluminador Rosa Mosqueta"
categoria: aceites          # facial | higiene | aceites | rutinas
precio: 28500
precioAnterior: 34000       # opcional: muestra precio tachado y % de ahorro
moneda: ARS
stock: 15
presentacion: "Frasco 30 ml con pipeta"   # opcional
etiqueta: "Best Seller"                   # opcional: badge sobre la foto
resumen: "Frase corta para la tarjeta del catálogo."
beneficios:                               # opcional: lista de puntos
  - "Atenúa manchas."
ingredientes: "Aceite de rosa mosqueta, ..."   # opcional
modoDeUso: "Aplicar 3 a 4 gotas ..."           # opcional
imagenes:
  - /productos/serum-rosa-mosqueta/1.jpg
  - /productos/serum-rosa-mosqueta/2.jpg
destacado: true
publicado: true
---

Descripción del producto.
```

- `slug` único, en minúsculas, sin espacios ni tildes, separado por guiones.
- `precio` numérico, sin puntos ni símbolo de moneda.
- Al menos 1 imagen; la primera es la portada.
- `publicado: false` oculta el producto sin borrarlo.
- `destacado: true` lo muestra en la portada (se ven hasta 4).
- `stock: 0` muestra "Sin stock" y cambia el botón por "Avisame cuando haya stock".

## 2. Imágenes

- Formato: JPG o WEBP (las fotos actuales son de ejemplo, generadas por Stitch).
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
