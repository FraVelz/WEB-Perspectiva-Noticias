# Perspectiva Noticias

Periódico digital en blanco y negro — **más contexto, mejores decisiones**.

Stack: Next.js 15, Tailwind 4, Firebase Auth y Cloud Firestore (`perspectiva-noticias`, región `southamerica-east1`).

## Cómo se ve

Mockups de portada, artículo y mesa de redacción:

- [Portada clara](docs/mockups/perspectiva-home-claro.png)
- [Portada oscura](docs/mockups/perspectiva-home-oscuro.png)
- [Artículo](docs/mockups/perspectiva-articulo-claro.png)
- [Panel admin](docs/mockups/perspectiva-admin-oscuro.png)

En la web, el botón **Edición tinta / papel** cambia entre los dos modos.

## Arranque local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Redacción

1. Entra a `/admin/login`.
2. Crea la primera cuenta con `fravelzfv@gmail.com` (o el correo de `NEXT_PUBLIC_ADMIN_EMAILS`).
3. Publica, edita y retira piezas. Solo ese correo puede escribir en Firestore.

## Firebase

Proyecto: `perspectiva-noticias`  
App web: `1:856746377043:web:6fbfc81ea0202dc37d2ba6`  
Consola: https://console.firebase.google.com/project/perspectiva-noticias/overview

Colecciones:

- `articles` — piezas con `status: published | draft`
- `site/settings` — nombre y lema
- `admins/{uid}` — opcional, además del correo autorizado

Sembrar de nuevo la edición de ejemplo:

```bash
node scripts/seed-articles.mjs
```
