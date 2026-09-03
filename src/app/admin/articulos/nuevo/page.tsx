import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">Nueva pieza</h1>
      <ArticleForm />
    </div>
  );
}
