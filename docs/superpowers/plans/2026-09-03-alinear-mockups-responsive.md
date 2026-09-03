# Alinear Perspectiva Noticias a mockups + responsive

> **For agentic workers:** Execute in this session. Visual newspaper UI — verify by rendering routes, not unit tests.

**Goal:** Hacer que la web viva coincida con `docs/mockups/` (portada clara/oscura, artículo, admin) y funcione en móvil, tablet y escritorio.

**Architecture:** Un `EditionShell` envuelve páginas públicas (cabecera, nav con menú hamburguesa, ticker fijo inferior, pie). Fotos de prensa locales en `public/press/`. El admin replica la mesa oscura del mockup con tabla en desktop y tarjetas en móvil.

**Tech Stack:** Next.js 15 App Router, Tailwind 4, Firebase Auth/Firestore, fotos locales + `next/image`.

## Global Constraints

- Paleta papel/tinta; azul solo en marca; rojo solo en «Última hora» y caídas de mercado.
- Tipografía: serif titulares (`Playfair`), cuerpo serif, UI sans (`Inter`), wordmark condensed (`Oswald`).
- Fotos siempre en escala de grises (clase `.photo-press`).
- Copy en español. Sin cards coloridas ni sombras suaves.
- Breakpoints: base móvil, `md` tablet, `lg`/`xl` broadsheet.
- Ticker de última hora pegado al borde inferior en viewport (con padding en el contenido).

---

### Task 1: Fotos de prensa locales

**Files:**
- Create: `public/press/plaza-bolivar.jpg`, `capitolio-nacional.jpg`, `bogota-noche.jpg`, `dolar-prensa.jpg`, `mazo-prensa.jpg`, `caribe-prensa.jpg`
- Modify: `src/lib/seed-data.ts` (coverImage → `/press/...`)

- [x] Generar fotos B/N de Plaza de Bolívar, Capitolio, skyline nocturno, dólar, mazo, Caribe
- [x] Apuntar cada pieza seed a su archivo local
- [x] Re-sembrar Firestore (`npx tsx scripts/seed-articles.ts`)

### Task 2: Cromado de edición (cabecera + nav + ticker)

**Files:**
- Create: `src/components/icons.tsx`, `src/components/site-header.tsx`, `src/components/edition-shell.tsx`
- Modify: `src/components/masthead.tsx`, `src/components/site-nav.tsx`, `src/components/breaking-ticker.tsx`, `src/components/brand-mark.tsx`, `src/app/globals.css`

- [x] Barra de utilidad: fecha/edición/ciudad a la izquierda; buscar, suscríbete, usuario, tema a la derecha
- [x] Logo centrado en desktop; compacto en móvil
- [x] Nav con divisores verticales; hamburguesa + panel en `<md`
- [x] Ticker fijo inferior con etiqueta roja ÚLTIMA HORA

### Task 3: Portada broadsheet

**Files:**
- Modify: `src/app/page.tsx`, `src/lib/articles.ts` (`pickHomeLayout`), widgets clima/mercados, `src/components/story-link.tsx`, `src/components/press-photo.tsx`

- [x] Hero ~3/4 + riel 3 notas con miniatura
- [x] Franja inferior: drop cap, cita, Mundo, Cultura, Opinión, Mercados, Clima (humedad/viento)
- [x] Columnas que apilan en móvil

### Task 4: Artículo y secciones

**Files:**
- Modify: `src/app/articulo/[slug]/page.tsx`, `src/app/seccion/[slug]/page.tsx`, `src/app/buscar/page.tsx`, `src/app/not-found.tsx`, `src/app/suscribirse/page.tsx`

- [x] Cuerpo justificado; 3 columnas desde `lg`; 1 columna en móvil
- [x] Riel «Notas relacionadas»
- [x] Usar `EditionShell`

### Task 5: Admin mesa de redacción

**Files:**
- Modify: `src/components/admin/admin-shell.tsx`, `src/app/admin/articulos/page.tsx`
- Create: `src/app/admin/categorias/page.tsx`, `src/app/admin/autores/page.tsx`

- [x] Iconos de menú; botón crema «Nuevo artículo»; badges Publicado/Borrador
- [x] Sidebar colapsable en móvil; tabla → tarjetas

### Task 6: Verificar + mockups móvil + commit

- [x] `curl` home/artículo/admin; `npm run build`
- [x] Mockups 9:16 claro/oscuro en `docs/mockups/`
- [ ] `/auto-commit`
