import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { SEED_ARTICLES } from "../src/lib/seed-data";

const PROJECT = "perspectiva-noticias";
const PARENT = `projects/${PROJECT}/databases/(default)/documents`;

function token() {
  const cfg = JSON.parse(
    readFileSync(join(homedir(), ".config/configstore/firebase-tools.json"), "utf8"),
  );
  return cfg.tokens.access_token as string;
}

function fields(article: (typeof SEED_ARTICLES)[number]) {
  return {
    title: { stringValue: article.title },
    slug: { stringValue: article.slug },
    dek: { stringValue: article.dek },
    body: { stringValue: article.body },
    kicker: { stringValue: article.kicker },
    section: { stringValue: article.section },
    authorName: { stringValue: article.authorName },
    authorTitle: { stringValue: article.authorTitle },
    coverImage: { stringValue: article.coverImage },
    coverCaption: { stringValue: article.coverCaption },
    status: { stringValue: article.status },
    featured: { booleanValue: article.featured },
    breaking: { booleanValue: article.breaking },
    publishedAt: { timestampValue: article.publishedAt },
    updatedAt: { timestampValue: article.updatedAt },
  };
}

async function upsert(article: (typeof SEED_ARTICLES)[number]) {
  const url = `https://firestore.googleapis.com/v1/${PARENT}/articles/${article.id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: fields(article) }),
  });
  if (!res.ok) {
    throw new Error(`${article.id}: ${res.status} ${await res.text()}`);
  }
  console.log("Sembrado", article.slug);
}

async function main() {
  for (const article of SEED_ARTICLES) {
    await upsert(article);
  }

  await fetch(`https://firestore.googleapis.com/v1/${PARENT}/site/settings`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        name: { stringValue: "Perspectiva Noticias" },
        tagline: { stringValue: "Más contexto, mejores decisiones" },
        city: { stringValue: "Bogotá, Colombia" },
      },
    }),
  });

  console.log("Edición sembrada en Firestore");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
