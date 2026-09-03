"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/admin/auth-provider";
import { listAllArticles, removeArticle } from "@/lib/articles-admin";
import { formatBylineDate } from "@/lib/format";
import type { Article } from "@/lib/types";

function StatusBadge({ status }: { status: Article["status"] }) {
  return (
    <span className="inline-block border border-ink px-2 py-0.5 font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.16em]">
      {status === "published" ? "Publicado" : "Borrador"}
    </span>
  );
}

export default function ArticlesAdminPage() {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      setArticles(await listAllArticles());
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo leer la mesa");
    }
  }

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (!isAdmin) {
    return <p>Esta cuenta no puede editar. Usa el correo autorizado en NEXT_PUBLIC_ADMIN_EMAILS.</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl">Artículos</h1>
          <p className="mt-1 text-muted">Administra y organiza el contenido editorial.</p>
        </div>
        <Link
          className="inline-flex items-center justify-center bg-[#efe7d6] px-4 py-2 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.16em] text-[#121212]"
          href="/admin/articulos/nuevo"
        >
          Nuevo artículo
        </Link>
      </div>
      {error ? <p className="mt-4 text-breaking">{error}</p> : null}

      <div className="mt-6 space-y-3 md:hidden">
        {articles.map((article) => (
          <article key={article.id} className="border border-ink p-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl leading-tight">{article.title}</h2>
            <p className="mt-2 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.14em] text-muted">
              {article.section} · {formatBylineDate(article.publishedAt)}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <StatusBadge status={article.status} />
              <div className="space-x-3 text-sm">
                <Link href={`/admin/articulos/${article.id}`}>Editar</Link>
                <button
                  type="button"
                  className="text-breaking"
                  onClick={async () => {
                    if (!confirm("¿Eliminar esta pieza?")) return;
                    await removeArticle(article.id);
                    await load();
                  }}
                >
                  Borrar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 hidden overflow-x-auto border border-ink md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.18em]">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th>Sección</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t border-[var(--rule-soft)]">
                <td className="px-4 py-3 pr-4 font-[family-name:var(--font-display)] text-lg">
                  {article.title}
                </td>
                <td className="uppercase tracking-[0.12em] text-[11px]">{article.section}</td>
                <td>
                  <StatusBadge status={article.status} />
                </td>
                <td className="text-muted">{formatBylineDate(article.publishedAt)}</td>
                <td className="space-x-3 px-4 text-right">
                  <Link href={`/admin/articulos/${article.id}`}>Editar</Link>
                  <button
                    type="button"
                    className="text-breaking"
                    onClick={async () => {
                      if (!confirm("¿Eliminar esta pieza?")) return;
                      await removeArticle(article.id);
                      await load();
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
