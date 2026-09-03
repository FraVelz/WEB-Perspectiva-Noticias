export type ArticleStatus = "draft" | "published";

export type SectionSlug =
  | "politica"
  | "economia"
  | "mundo"
  | "cultura"
  | "opinion"
  | "investigacion";

export type Article = {
  id: string;
  title: string;
  slug: string;
  dek: string;
  body: string;
  kicker: string;
  section: SectionSlug;
  authorName: string;
  authorTitle: string;
  coverImage: string;
  coverCaption: string;
  status: ArticleStatus;
  featured: boolean;
  breaking: boolean;
  publishedAt: string;
  updatedAt: string;
};

export type ArticleInput = Omit<Article, "id" | "updatedAt">;
