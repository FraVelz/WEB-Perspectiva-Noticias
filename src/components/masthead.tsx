import Link from "next/link";
import { BrandMark, Tagline } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";
import { formatEditionDate } from "@/lib/format";
import { SITE } from "@/lib/seed-data";

export function Masthead() {
  return (
    <header className="px-4 sm:px-6">
      <div className="mx-auto max-w-6xl border-b border-ink py-3">
        <div className="grid items-center gap-3 md:grid-cols-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted font-[family-name:var(--font-sans)] md:justify-self-start">
            <div>{formatEditionDate()}</div>
            <div className="mt-1">{SITE.edition}</div>
            <div>{SITE.city}</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <BrandMark size={72} />
            <Tagline />
          </div>
          <div className="flex items-center justify-end gap-2 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.14em]">
            <Link href="/buscar" className="px-2 py-1 hover:text-blue">
              Buscar
            </Link>
            <Link
              href="/suscribirse"
              className="border border-ink bg-ink px-3 py-1 text-paper hover:bg-blue hover:border-blue hover:text-paper"
            >
              Suscríbete
            </Link>
            <Link href="/admin" className="px-2 py-1 hover:text-blue">
              Redacción
            </Link>
            <ThemeToggle compact />
          </div>
        </div>
      </div>
    </header>
  );
}
