"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const label = theme === "paper" ? "Tinta" : "Papel";
  return (
    <button
      type="button"
      onClick={toggle}
      className="border border-ink px-2 py-1 text-[10px] uppercase tracking-[0.18em] font-[family-name:var(--font-sans)] hover:bg-ink hover:text-paper transition-colors"
      aria-label={`Cambiar a modo ${label}`}
    >
      {compact ? (theme === "paper" ? "Oscuro" : "Claro") : `Edición ${label}`}
    </button>
  );
}
