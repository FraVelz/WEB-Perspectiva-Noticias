import Link from "next/link";
import { BrandMark, Tagline } from "./brand-mark";
import { SECTIONS } from "@/lib/sections";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t-[3px] border-ink px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <BrandMark size={52} />
          <Tagline />
          <p className="mt-4 max-w-sm text-sm text-muted">
            Periódico digital de contexto. Informamos, analizamos y conectamos desde Bogotá para
            Colombia y la región.
          </p>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.22em]">
            Secciones
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.slug}>
                <Link href={`/seccion/${s.slug}`}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.22em]">
            Redacción
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link href="/admin">Panel de edición</Link>
            </li>
            <li>
              <Link href="/suscribirse">Edición digital</Link>
            </li>
            <li>
              <a href="mailto:redaccion@perspectivanoticias.co">redaccion@perspectivanoticias.co</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.18em] text-muted">
        © {new Date().getFullYear()} Perspectiva Noticias · Todos los derechos reservados
      </p>
    </footer>
  );
}
