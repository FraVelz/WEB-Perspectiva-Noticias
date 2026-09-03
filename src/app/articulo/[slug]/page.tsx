import { notFound } from "next/navigation";
import { EditionShell } from "@/components/edition-shell";
import { PressPhoto } from "@/components/press-photo";
import { RelatedNote } from "@/components/story-link";
import { getArticleBySlug, getPublishedArticles } from "@/lib/articles";
import { estimateReadMinutes, formatBylineDate, splitParagraphs } from "@/lib/format";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: article?.title ?? "Artículo",
    description: article?.dek,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const all = await getPublishedArticles();
  const related = all.filter((a) => a.id !== article.id && a.section === article.section).slice(0, 5);
  const paragraphs = splitParagraphs(article.body);
  const ticker = all.filter((a) => a.breaking);

  return (
    <EditionShell current={article.section} ticker={ticker}>
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_17rem] sm:px-6">
        <article>
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em] text-blue">
            {article.kicker}
          </p>
          <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-[2rem] leading-[1.08] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg italic leading-relaxed text-muted sm:text-xl">{article.dek}</p>
          <p className="mt-4 font-[family-name:var(--font-sans)] text-[12px] text-muted">
            Por {article.authorName} | {article.authorTitle} · {formatBylineDate(article.publishedAt)} ·{" "}
            {estimateReadMinutes(article.body)} min de lectura
          </p>
          <div className="mt-6">
            <PressPhoto src={article.coverImage} alt={article.title} caption={article.coverCaption} priority />
          </div>
          <div className="article-columns mt-8 text-[1.05rem] leading-8">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "drop-cap" : "mt-5 lg:mt-0"}>
                {p}
              </p>
            ))}
          </div>
        </article>
        <aside className="h-fit lg:border-l lg:border-ink lg:pl-6">
          <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em]">
            Notas relacionadas
          </h2>
          <div className="mt-2">
            {related.map((item) => (
              <RelatedNote key={item.id} article={item} />
            ))}
          </div>
        </aside>
      </main>
    </EditionShell>
  );
}
