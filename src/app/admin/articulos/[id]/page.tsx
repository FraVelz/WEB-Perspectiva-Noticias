"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticle } from "@/lib/articles-admin";
import type { Article } from "@/lib/types";

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);

  useEffect(() => {
    getArticle(params.id).then(setArticle);
  }, [params.id]);

  if (article === undefined) return <p>Cargando pieza…</p>;
  if (!article) return <p>No está en el archivo.</p>;

  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">Editar pieza</h1>
      <ArticleForm article={article} />
    </div>
  );
}
