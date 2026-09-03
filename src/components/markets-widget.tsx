import { SEED_MARKETS } from "@/lib/seed-data";

export function MarketsWidget() {
  return (
    <aside className="border border-ink p-4">
      <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.28em]">
        Mercados
      </h2>
      <ul className="mt-3 divide-y divide-[var(--rule-soft)]">
        {SEED_MARKETS.map((row) => (
          <li key={row.name} className="flex items-baseline justify-between py-2 text-sm">
            <span className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.12em]">
              {row.name}
            </span>
            <span className="tabular-nums">
              {row.value}{" "}
              <span style={{ color: row.up ? "var(--up)" : "var(--down)" }}>
                {row.up ? "▲" : "▼"} {row.change}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-muted font-[family-name:var(--font-sans)]">
        Cifras indicativas de cierre. No constituyen recomendación.
      </p>
    </aside>
  );
}
