import Link from "next/link";
import type { Article } from "@/lib/types";
import { relativeTime } from "@/lib/format";
import { PressPhoto } from "./press-photo";

export function StoryLink({
  article,
  dek = true,
  pageMark = false,
}: {
  article: Article;
  dek?: boolean;
  pageMark?: boolean;
}) {
  return (
    <article className="space-y-2">
      <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.22em] text-blue">
        {article.kicker}
      </p>
      <h3 className="font-[family-name:var(--font-display)] text-xl leading-tight sm:text-2xl">
        <Link href={`/articulo/${article.slug}`}>{article.title}</Link>
      </h3>
      {dek ? <p className="text-sm leading-relaxed text-muted">{article.dek}</p> : null}
      <p className="font-[family-name:var(--font-sans)] text-[11px] text-muted">
        {pageMark ? `Página ${article.slug.length % 12 + 3} · ` : null}
        Por {article.authorName} · {relativeTime(article.publishedAt)}
      </p>
    </article>
  );
}

export function StoryRow({ article }: { article: Article }) {
  return (
    <article className="grid grid-cols-[1fr_5.5rem] gap-3 border-t border-[var(--rule-soft)] py-4 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_7.5rem]">
      <div>
        <p className="font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.22em] text-blue">
          {article.kicker}
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg leading-tight sm:text-xl">
          <Link href={`/articulo/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-2 hidden text-sm text-muted sm:block">{article.dek}</p>
      </div>
      <PressPhoto src={article.coverImage} alt={article.title} ratio="4/3" className="min-w-0" />
    </article>
  );
}

export function RelatedNote({ article }: { article: Article }) {
  return (
    <article className="border-t border-[var(--rule-soft)] py-4 first:border-t-0 first:pt-0">
      <h3 className="font-[family-name:var(--font-display)] text-lg leading-tight">
        <Link href={`/articulo/${article.slug}`}>{article.title}</Link>
      </h3>
      <p className="mt-1 font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.16em] text-muted">
        {article.kicker} · {relativeTime(article.publishedAt)}
      </p>
    </article>
  );
}
