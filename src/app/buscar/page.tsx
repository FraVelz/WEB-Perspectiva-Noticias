import { EditionShell } from "@/components/edition-shell";
import { StoryRow } from "@/components/story-link";
import { getPublishedArticles } from "@/lib/articles";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const articles = await getPublishedArticles();
  const results = query
    ? articles.filter((a) =>
        `${a.title} ${a.dek} ${a.body} ${a.authorName}`.toLowerCase().includes(query),
      )
    : articles.slice(0, 8);

  return (
    <EditionShell ticker={articles.filter((a) => a.breaking)}>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Buscar</h1>
        <form className="mt-6">
          <input
            name="q"
            defaultValue={q}
            placeholder="Titular, autor o palabra clave"
            className="w-full border border-ink bg-paper px-3 py-2 font-[family-name:var(--font-sans)] outline-none"
          />
        </form>
        <div className="mt-8">
          {results.map((article) => (
            <StoryRow key={article.id} article={article} />
          ))}
        </div>
      </main>
    </EditionShell>
  );
}
