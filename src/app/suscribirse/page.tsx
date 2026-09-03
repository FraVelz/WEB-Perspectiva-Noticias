import { EditionShell } from "@/components/edition-shell";

export const metadata = { title: "Suscríbete" };

export default function SubscribePage() {
  return (
    <EditionShell>
      <main className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.28em] text-blue">
          Edición digital
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl">La edición es abierta</h1>
        <p className="mt-4 text-lg text-muted">
          Perspectiva Noticias publica en abierto mientras construimos la redacción. El archivo, el
          contexto y el criterio no deberían estar detrás de un muro.
        </p>
        <p className="mt-6 text-sm">
          Si quieres escribir a la mesa:{" "}
          <a href="mailto:redaccion@perspectivanoticias.co">redaccion@perspectivanoticias.co</a>
        </p>
      </main>
    </EditionShell>
  );
}
