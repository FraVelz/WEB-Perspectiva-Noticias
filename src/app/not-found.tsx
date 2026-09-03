import Link from "next/link";
import { EditionShell } from "@/components/edition-shell";

export default function NotFound() {
  return (
    <EditionShell>
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.28em]">
          404
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl">Esa pieza no está en la edición</h1>
        <Link href="/" className="mt-6 inline-block">
          Volver a portada
        </Link>
      </main>
    </EditionShell>
  );
}
