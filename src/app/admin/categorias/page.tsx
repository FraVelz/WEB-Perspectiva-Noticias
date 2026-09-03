import { SECTIONS } from "@/lib/sections";

export default function CategoriesPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Categorías</h1>
      <p className="mt-1 text-muted">Secciones de la edición. El mapa vive en el código y en Firestore.</p>
      <ul className="mt-6 divide-y divide-[var(--rule-soft)] border-t border-ink">
        {SECTIONS.map((section) => (
          <li key={section.slug} className="flex items-center justify-between py-4">
            <span className="font-[family-name:var(--font-display)] text-2xl">{section.label}</span>
            <span className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.18em] text-muted">
              /seccion/{section.slug}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
