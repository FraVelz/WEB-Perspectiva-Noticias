import Link from "next/link";
import { SECTIONS } from "@/lib/sections";

export function SiteNav({ current }: { current?: string }) {
  return (
    <nav className="px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 border-b-[3px] border-ink py-2 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.22em]">
        <Link href="/" className={current ? "text-muted" : "font-semibold"}>
          Inicio
        </Link>
        {SECTIONS.map((section) => (
          <Link
            key={section.slug}
            href={`/seccion/${section.slug}`}
            className={current === section.slug ? "font-semibold" : "text-ink"}
          >
            {section.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
