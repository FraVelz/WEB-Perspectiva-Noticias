import { notFound } from "next/navigation";
import { BreakingTicker } from "@/components/breaking-ticker";
import { Masthead } from "@/components/masthead";
import { PressPhoto } from "@/components/press-photo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StoryLink } from "@/components/story-link";
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
  const related = (await getPublishedArticles())
    .filter((a) => a.id !== article.id && a.section === article.section)
    .slice(0, 4);
  const paragraphs = splitParagraphs(article.body);

  return (
    <>
      <Masthead />
      <SiteNav current={article.section} />
      <BreakingTicker items={[]} />
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_18rem] sm:px-6">
        <article>
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em] text-blue">
            {article.kicker}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[1.08] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">{article.dek}</p>
          <p className="mt-4 font-[family-name:var(--font-sans)] text-[12px] text-muted">
            Por {article.authorName} · {article.authorTitle} · {formatBylineDate(article.publishedAt)} ·{" "}
            {estimateReadMinutes(article.body)} min de lectura
          </p>
          <div className="mt-6">
            <PressPhoto src={article.coverImage} alt={article.title} caption={article.coverCaption} priority />
          </div>
          <div className="mt-8 max-w-[42rem] space-y-5 text-[1.08rem] leading-8">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "drop-cap" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </article>
        <aside className="h-fit border-t border-ink pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em]">
            Relacionadas
          </h2>
          <div className="mt-4 space-y-5">
            {related.map((item) => (
              <StoryLink key={item.id} article={item} dek={false} />
            ))}
          </div>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
