import Link from "next/link";
import type { Article } from "@/lib/types";
import { relativeTime } from "@/lib/format";
import { PressPhoto } from "./press-photo";

export function StoryLink({ article, dek = true }: { article: Article; dek?: boolean }) {
  return (
    <article className="space-y-2">
      <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.22em] text-blue">
        {article.kicker}
      </p>
      <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight">
        <Link href={`/articulo/${article.slug}`}>{article.title}</Link>
      </h3>
      {dek ? <p className="text-sm leading-relaxed text-muted">{article.dek}</p> : null}
      <p className="font-[family-name:var(--font-sans)] text-[11px] text-muted">
        Por {article.authorName} · {relativeTime(article.publishedAt)}
      </p>
    </article>
  );
}

export function StoryRow({ article }: { article: Article }) {
  return (
    <article className="grid grid-cols-[1fr_7rem] gap-3 border-t border-[var(--rule-soft)] py-4 first:border-t-0 first:pt-0">
      <div>
        <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.22em] text-blue">
          {article.kicker}
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl leading-tight">
          <Link href={`/articulo/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{article.dek}</p>
      </div>
      <PressPhoto src={article.coverImage} alt={article.title} className="min-w-0" />
    </article>
  );
}
