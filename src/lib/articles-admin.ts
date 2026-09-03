"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import type { Article, ArticleInput } from "./types";

function toIso(value: unknown, fallback: string) {
  if (value && typeof value === "object" && "toDate" in value) {
    const dated = value as { toDate?: () => Date };
    if (typeof dated.toDate === "function") return dated.toDate().toISOString();
  }
  if (typeof value === "string") return value;
  return fallback;
}

function mapArticle(id: string, data: Record<string, unknown>): Article {
  const now = new Date().toISOString();
  return {
    id,
    title: String(data.title ?? ""),
    slug: String(data.slug ?? id),
    dek: String(data.dek ?? ""),
    body: String(data.body ?? ""),
    kicker: String(data.kicker ?? ""),
    section: (data.section as Article["section"]) ?? "politica",
    authorName: String(data.authorName ?? ""),
    authorTitle: String(data.authorTitle ?? ""),
    coverImage: String(data.coverImage ?? ""),
    coverCaption: String(data.coverCaption ?? ""),
    status: data.status === "published" ? "published" : "draft",
    featured: Boolean(data.featured),
    breaking: Boolean(data.breaking),
    publishedAt: toIso(data.publishedAt, now),
    updatedAt: toIso(data.updatedAt, now),
  };
}

export async function listAllArticles(): Promise<Article[]> {
  const snap = await getDocs(collection(getFirebaseDb(), "articles"));
  return snap.docs
    .map((d) => mapArticle(d.id, d.data() as Record<string, unknown>))
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getArticle(id: string): Promise<Article | null> {
  const snap = await getDoc(doc(getFirebaseDb(), "articles", id));
  if (!snap.exists()) return null;
  return mapArticle(snap.id, snap.data() as Record<string, unknown>);
}

export async function saveArticle(input: ArticleInput, id?: string) {
  const db = getFirebaseDb();
  const payload = {
    ...input,
    publishedAt: new Date(input.publishedAt),
    updatedAt: serverTimestamp(),
  };
  if (id) {
    await updateDoc(doc(db, "articles", id), payload);
    return id;
  }
  const ref = await addDoc(collection(db, "articles"), payload);
  await setDoc(ref, { slug: input.slug || ref.id }, { merge: true });
  return ref.id;
}

export async function removeArticle(id: string) {
  await deleteDoc(doc(getFirebaseDb(), "articles", id));
}
