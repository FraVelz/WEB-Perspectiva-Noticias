import Link from "next/link";
import { EditionShell } from "@/components/edition-shell";
import { MarketsWidget } from "@/components/markets-widget";
import { PressPhoto } from "@/components/press-photo";
import { StoryLink, StoryRow } from "@/components/story-link";
import { WeatherWidget } from "@/components/weather-widget";
import { getPublishedArticles, pickHomeLayout } from "@/lib/articles";
import { splitParagraphs } from "@/lib/format";

export const revalidate = 60;

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const { featured, secondary, rest, breaking, opinion, mundo, cultura } = pickHomeLayout(articles);
  const lead = featured ? splitParagraphs(featured.body)[0] : "";
  const quote = opinion[0];

  return (
    <EditionShell ticker={breaking}>
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        {featured ? (
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,0.85fr)]">
            <article>
              <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em] text-blue">
                {featured.kicker}
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-[2rem] leading-[1.05] sm:text-5xl lg:text-[3.35rem]">
                <Link href={`/articulo/${featured.slug}`}>{featured.title}</Link>
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">{featured.dek}</p>
              <div className="mt-5">
                <PressPhoto
                  src={featured.coverImage}
                  alt={featured.title}
                  caption={featured.coverCaption}
                  priority
                />
              </div>
              <p className="mt-3 font-[family-name:var(--font-sans)] text-[12px] text-muted">
                Por {featured.authorName} · {featured.authorTitle}
              </p>
            </article>
            <aside className="border-t border-ink pt-4 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              {secondary.map((article) => (
                <StoryRow key={article.id} article={article} />
              ))}
            </aside>
          </section>
        ) : null}

        <section className="mt-10 grid gap-8 border-t-[3px] border-ink pt-6 sm:grid-cols-2 xl:grid-cols-5">
          {featured ? (
            <div>
              <p className="drop-cap text-[1.02rem] leading-8">{lead}</p>
              <Link href={`/articulo/${featured.slug}`} className="mt-3 inline-block text-sm">
                Continuar en portada
              </Link>
            </div>
          ) : null}
          {quote ? (
            <blockquote className="border-l-2 border-ink pl-4">
              <p className="font-[family-name:var(--font-display)] text-[1.65rem] italic leading-snug">
                “{quote.dek}”
              </p>
              <footer className="mt-3 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.16em] text-muted">
                {quote.authorName} · {quote.authorTitle}
              </footer>
              <Link href={`/articulo/${quote.slug}`} className="mt-3 inline-block text-sm">
                Leer columna
              </Link>
            </blockquote>
          ) : null}
          <div className="space-y-5">
            <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em]">
              Mundo
            </h2>
            {(mundo.length ? mundo : rest).slice(0, 2).map((article) => (
              <StoryLink key={article.id} article={article} dek={false} pageMark />
            ))}
          </div>
          <div className="space-y-5">
            <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em]">
              Cultura
            </h2>
            {(cultura.length ? cultura : rest.slice(2, 4)).slice(0, 2).map((article) => (
              <StoryLink key={article.id} article={article} dek={false} pageMark />
            ))}
            <h2 className="pt-4 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.24em]">
              Opinión
            </h2>
            {opinion.map((article) => (
              <StoryLink key={article.id} article={article} dek={false} />
            ))}
          </div>
          <div className="space-y-4 sm:col-span-2 xl:col-span-1">
            <MarketsWidget />
            <WeatherWidget />
          </div>
        </section>

        <section className="mt-10 grid gap-8 border-t border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.slice(0, 4).map((article) => (
            <StoryLink key={article.id} article={article} />
          ))}
        </section>
      </main>
    </EditionShell>
  );
}
