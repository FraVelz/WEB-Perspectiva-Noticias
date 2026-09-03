import Link from "next/link";
import type { Article } from "@/lib/types";

export function BreakingTicker({ items }: { items: Article[] }) {
  if (!items.length) return null;
  const line = items.map((a) => a.title).join("   ·   ");
  return (
    <div className="px-4 sm:px-6">
      <div className="mx-auto mt-0 flex max-w-6xl items-stretch border-b border-ink font-[family-name:var(--font-sans)]">
        <div className="bg-breaking px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          Última hora
        </div>
        <div className="flex-1 overflow-hidden px-3 py-1.5 text-[12px]">
          <p className="truncate">
            {items.map((item, i) => (
              <span key={item.id}>
                {i > 0 ? "   ·   " : ""}
                <Link href={`/articulo/${item.slug}`}>{item.title}</Link>
              </span>
            ))}
            <span className="sr-only">{line}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
