"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SECTIONS } from "@/lib/sections";
import { saveArticle } from "@/lib/articles-admin";
import { slugify } from "@/lib/format";
import type { Article, ArticleInput, SectionSlug } from "@/lib/types";

const empty: ArticleInput = {
  title: "",
  slug: "",
  dek: "",
  body: "",
  kicker: "Política",
  section: "politica",
  authorName: "",
  authorTitle: "Redacción",
  coverImage: "",
  coverCaption: "",
  status: "draft",
  featured: false,
  breaking: false,
  publishedAt: new Date().toISOString(),
};

export function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
  const [form, setForm] = useState<ArticleInput>(article ? { ...article } : empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ArticleInput>(key: K, value: ArticleInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const slug = form.slug || slugify(form.title);
      await saveArticle({ ...form, slug, kicker: SECTIONS.find((s) => s.slug === form.section)?.kicker ?? form.kicker }, article?.id);
      router.push("/admin/articulos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-4 font-[family-name:var(--font-sans)]">
      <label className="block text-sm">
        Titular
        <input
          required
          value={form.title}
          onChange={(e) => {
            set("title", e.target.value);
            if (!article) set("slug", slugify(e.target.value));
          }}
          className="mt-1 w-full border border-ink bg-paper px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Bajada
        <textarea
          required
          value={form.dek}
          onChange={(e) => set("dek", e.target.value)}
          rows={3}
          className="mt-1 w-full border border-ink bg-paper px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Cuerpo (párrafos separados por una línea en blanco)
        <textarea
          required
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          rows={14}
          className="mt-1 w-full border border-ink bg-paper px-3 py-2 font-serif"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Sección
          <select
            value={form.section}
            onChange={(e) => set("section", e.target.value as SectionSlug)}
            className="mt-1 w-full border border-ink bg-paper px-3 py-2"
          >
            {SECTIONS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Estado
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as Article["status"])}
            className="mt-1 w-full border border-ink bg-paper px-3 py-2"
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
          </select>
        </label>
        <label className="block text-sm">
          Autor
          <input
            value={form.authorName}
            onChange={(e) => set("authorName", e.target.value)}
            className="mt-1 w-full border border-ink bg-paper px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Cargo
          <input
            value={form.authorTitle}
            onChange={(e) => set("authorTitle", e.target.value)}
            className="mt-1 w-full border border-ink bg-paper px-3 py-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        URL de foto
        <input
          value={form.coverImage}
          onChange={(e) => set("coverImage", e.target.value)}
          className="mt-1 w-full border border-ink bg-paper px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Pie de foto
        <input
          value={form.coverCaption}
          onChange={(e) => set("coverCaption", e.target.value)}
          className="mt-1 w-full border border-ink bg-paper px-3 py-2"
        />
      </label>
      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Destacado de portada
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.breaking}
            onChange={(e) => set("breaking", e.target.checked)}
          />
          Última hora
        </label>
      </div>
      {error ? <p className="text-sm text-breaking">{error}</p> : null}
      <button
        type="submit"
        disabled={saving}
        className="border border-ink bg-ink px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-paper disabled:opacity-60"
      >
        {saving ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
