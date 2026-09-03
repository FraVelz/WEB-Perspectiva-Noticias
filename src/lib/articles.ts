import type { Article, ArticleStatus, SectionSlug } from "./types";
import { SEED_ARTICLES } from "./seed-data";

const PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

type FirestoreValue = {
  stringValue?: string;
  booleanValue?: boolean;
  timestampValue?: string;
};

type FirestoreDoc = {
  name?: string;
  fields?: Record<string, FirestoreValue>;
};

function readString(fields: Record<string, FirestoreValue> | undefined, key: string, fallback = "") {
  return fields?.[key]?.stringValue ?? fallback;
}

function docToArticle(doc: FirestoreDoc): Article | null {
  if (!doc.fields) return null;
  const id = doc.name?.split("/").pop() ?? readString(doc.fields, "slug");
  const status = readString(doc.fields, "status", "draft") as ArticleStatus;
  const section = readString(doc.fields, "section", "politica") as SectionSlug;
  return {
    id,
    title: readString(doc.fields, "title"),
    slug: readString(doc.fields, "slug", id),
    dek: readString(doc.fields, "dek"),
    body: readString(doc.fields, "body"),
    kicker: readString(doc.fields, "kicker"),
    section,
    authorName: readString(doc.fields, "authorName"),
    authorTitle: readString(doc.fields, "authorTitle"),
    coverImage: readString(doc.fields, "coverImage"),
    coverCaption: readString(doc.fields, "coverCaption"),
    status,
    featured: Boolean(doc.fields.featured?.booleanValue),
    breaking: Boolean(doc.fields.breaking?.booleanValue),
    publishedAt: doc.fields.publishedAt?.timestampValue ?? new Date().toISOString(),
    updatedAt: doc.fields.updatedAt?.timestampValue ?? new Date().toISOString(),
  };
}

async function runQuery(body: unknown): Promise<Article[]> {
  if (!PROJECT || !API_KEY) return [];
  const res = await fetch(`${BASE}:runQuery?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const rows = (await res.json()) as { document?: FirestoreDoc }[];
  return rows
    .map((row) => row.document)
    .filter((doc): doc is FirestoreDoc => Boolean(doc))
    .map(docToArticle)
    .filter((a): a is Article => Boolean(a));
}

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const articles = await runQuery({
      structuredQuery: {
        from: [{ collectionId: "articles" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "status" },
            op: "EQUAL",
            value: { stringValue: "published" },
          },
        },
        orderBy: [{ field: { fieldPath: "publishedAt" }, direction: "DESCENDING" }],
        limit: 40,
      },
    });
    return articles.length ? articles : SEED_ARTICLES;
  } catch {
    return SEED_ARTICLES;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getPublishedArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getArticlesBySection(section: SectionSlug): Promise<Article[]> {
  const all = await getPublishedArticles();
  return all.filter((a) => a.section === section);
}

export function pickHomeLayout(articles: Article[]) {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured?.id);
  return {
    featured,
    secondary: rest.slice(0, 3),
    rest: rest.slice(3),
    breaking: articles.filter((a) => a.breaking),
    opinion: articles.filter((a) => a.section === "opinion"),
  };
}
