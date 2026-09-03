import Link from "next/link";
import type { Article } from "@/lib/types";

export function BreakingTicker({ items }: { items: Article[] }) {
  if (!items.length) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink bg-paper font-[family-name:var(--font-sans)]">
      <div className="mx-auto flex max-w-6xl items-stretch">
        <div className="shrink-0 bg-breaking px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          Última hora
        </div>
        <div className="flex-1 overflow-hidden px-3 py-2 text-[12px]">
          <p className="animate-none truncate md:whitespace-nowrap">
            {items.map((item, i) => (
              <span key={item.id}>
                {i > 0 ? "   ·   " : ""}
                <span className="text-muted">
                  {new Date(item.publishedAt).toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "America/Bogota",
                  })}
                </span>{" "}
                <Link href={`/articulo/${item.slug}`}>{item.title}</Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
