import Link from "next/link";
import { BreakingTicker } from "@/components/breaking-ticker";
import { MarketsWidget } from "@/components/markets-widget";
import { Masthead } from "@/components/masthead";
import { PressPhoto } from "@/components/press-photo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StoryLink, StoryRow } from "@/components/story-link";
import { WeatherWidget } from "@/components/weather-widget";
import { getPublishedArticles, pickHomeLayout } from "@/lib/articles";
import { splitParagraphs } from "@/lib/format";

export const revalidate = 60;

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const { featured, secondary, rest, breaking, opinion } = pickHomeLayout(articles);
  const lead = featured ? splitParagraphs(featured.body)[0] : "";
  const quote = opinion[0];

  return (
    <>
      <Masthead />
      <SiteNav />
      <BreakingTicker items={breaking} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {featured ? (
          <section className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <article>
              <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em] text-blue">
                {featured.kicker}
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-[1.05] sm:text-5xl">
                <Link href={`/articulo/${featured.slug}`}>{featured.title}</Link>
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed">{featured.dek}</p>
              <div className="mt-5">
                <PressPhoto
                  src={featured.coverImage}
                  alt={featured.title}
                  caption={featured.coverCaption}
                  priority
                />
              </div>
              <p className="drop-cap mt-5 max-w-3xl text-[1.05rem] leading-8">{lead}</p>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-[12px] text-muted">
                Por {featured.authorName} · {featured.authorTitle}
              </p>
            </article>
            <aside className="border-t border-ink pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {secondary.map((article) => (
                <StoryRow key={article.id} article={article} />
              ))}
            </aside>
          </section>
        ) : null}

        <section className="mt-10 grid gap-6 border-t-[3px] border-ink pt-6 md:grid-cols-4">
          {quote ? (
            <blockquote className="md:col-span-1">
              <p className="font-[family-name:var(--font-display)] text-2xl italic leading-snug">
                “{quote.title}”
              </p>
              <footer className="mt-3 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.16em] text-muted">
                {quote.authorName} · {quote.authorTitle}
              </footer>
              <Link href={`/articulo/${quote.slug}`} className="mt-3 inline-block text-sm">
                Leer columna
              </Link>
            </blockquote>
          ) : null}
          <div className="space-y-4 md:col-span-1">
            <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em]">
              Más de la edición
            </h2>
            {rest.slice(0, 3).map((article) => (
              <StoryLink key={article.id} article={article} dek={false} />
            ))}
          </div>
          <MarketsWidget />
          <WeatherWidget />
        </section>

        <section className="mt-10 grid gap-8 border-t border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.slice(3).map((article) => (
            <StoryLink key={article.id} article={article} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
