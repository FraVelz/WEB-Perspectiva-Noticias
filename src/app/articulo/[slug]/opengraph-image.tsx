import { getArticleBySlug } from "@/lib/articles";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderArticleOgImage, renderSiteOgImage } from "@/lib/og-card";

export const runtime = "nodejs";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 60;

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return renderSiteOgImage();

  return renderArticleOgImage({
    title: article.title,
    dek: article.dek,
    kicker: article.kicker,
    authorName: article.authorName,
    coverImage: article.coverImage,
  });
}
