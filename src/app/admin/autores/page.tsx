"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/admin/auth-provider";
import { listAllArticles } from "@/lib/articles-admin";

export default function AuthorsPage() {
  const { isAdmin } = useAuth();
  const [authors, setAuthors] = useState<{ name: string; title: string; pieces: number }[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    listAllArticles().then((articles) => {
      const map = new Map<string, { name: string; title: string; pieces: number }>();
      for (const article of articles) {
        const current = map.get(article.authorName) ?? {
          name: article.authorName,
          title: article.authorTitle,
          pieces: 0,
        };
        current.pieces += 1;
        map.set(article.authorName, current);
      }
      setAuthors([...map.values()].sort((a, b) => b.pieces - a.pieces));
    });
  }, [isAdmin]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Autores</h1>
      <p className="mt-1 text-muted">Firmas presentes en el archivo de la mesa.</p>
      <ul className="mt-6 divide-y divide-[var(--rule-soft)] border-t border-ink">
        {authors.map((author) => (
          <li key={author.name} className="py-4">
            <p className="font-[family-name:var(--font-display)] text-2xl">{author.name}</p>
            <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.16em] text-muted">
              {author.title} · {author.pieces} {author.pieces === 1 ? "pieza" : "piezas"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
