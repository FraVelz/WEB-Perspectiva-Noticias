"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/admin/auth-provider";
import { listAllArticles, removeArticle } from "@/lib/articles-admin";
import { formatBylineDate } from "@/lib/format";
import type { Article } from "@/lib/types";

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
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl">Artículos</h1>
          <p className="mt-1 text-muted">Archivo de la redacción</p>
        </div>
        <Link className="border border-ink bg-ink px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-paper" href="/admin/articulos/nuevo">
          Nuevo
        </Link>
      </div>
      {error ? <p className="mt-4 text-breaking">{error}</p> : null}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-t border-ink text-left text-sm">
          <thead className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.18em]">
            <tr>
              <th className="py-3">Titular</th>
              <th>Sección</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t border-[var(--rule-soft)]">
                <td className="py-3 pr-4 font-[family-name:var(--font-display)] text-lg">
                  {article.title}
                </td>
                <td className="uppercase tracking-[0.12em] text-[11px]">{article.section}</td>
                <td>{article.status === "published" ? "Publicado" : "Borrador"}</td>
                <td className="text-muted">{formatBylineDate(article.publishedAt)}</td>
                <td className="space-x-3 text-right">
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
