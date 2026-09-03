"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/admin/auth-provider";
import { listAllArticles } from "@/lib/articles-admin";
import type { Article } from "@/lib/types";

export default function AdminHomePage() {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    listAllArticles()
      .then(setArticles)
      .catch(() => setArticles([]));
  }, [isAdmin]);

  const published = articles.filter((a) => a.status === "published").length;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Redacción</h1>
      <p className="mt-2 text-muted">Mesa de edición de Perspectiva Noticias.</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3 font-[family-name:var(--font-sans)]">
        <div className="border border-ink p-4">
          <dt className="text-[10px] uppercase tracking-[0.2em]">Piezas</dt>
          <dd className="mt-2 font-[family-name:var(--font-display)] text-3xl">{articles.length}</dd>
        </div>
        <div className="border border-ink p-4">
          <dt className="text-[10px] uppercase tracking-[0.2em]">Publicadas</dt>
          <dd className="mt-2 font-[family-name:var(--font-display)] text-3xl">{published}</dd>
        </div>
        <div className="border border-ink p-4">
          <dt className="text-[10px] uppercase tracking-[0.2em]">Borradores</dt>
          <dd className="mt-2 font-[family-name:var(--font-display)] text-3xl">
            {articles.length - published}
          </dd>
        </div>
      </dl>
      <div className="mt-8 flex gap-4 text-sm">
        <Link className="border border-ink bg-ink px-4 py-2 text-paper" href="/admin/articulos/nuevo">
          Nueva pieza
        </Link>
        <Link className="border border-ink px-4 py-2" href="/">
          Ver periódico
        </Link>
      </div>
    </div>
  );
}
