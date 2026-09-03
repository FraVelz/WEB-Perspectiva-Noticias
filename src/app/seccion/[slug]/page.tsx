import { notFound } from "next/navigation";
import { Masthead } from "@/components/masthead";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StoryRow } from "@/components/story-link";
import { getArticlesBySection } from "@/lib/articles";
import { sectionBySlug } from "@/lib/sections";
import type { SectionSlug } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = sectionBySlug(slug);
  return { title: section?.label ?? "Sección" };
}

export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = sectionBySlug(slug);
  if (!section) notFound();
  const articles = await getArticlesBySection(slug as SectionSlug);

  return (
    <>
      <Masthead />
      <SiteNav current={section.slug} />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.28em] text-blue">
          Sección
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl">{section.label}</h1>
        <div className="mt-8">
          {articles.map((article) => (
            <StoryRow key={article.id} article={article} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
