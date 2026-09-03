import type { Article } from "@/lib/types";
import { BreakingTicker } from "./breaking-ticker";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function EditionShell({
  children,
  current,
  ticker = [],
}: {
  children: React.ReactNode;
  current?: string;
  ticker?: Article[];
}) {
  return (
    <div className={ticker.length ? "min-h-screen pb-14" : "min-h-screen"}>
      <SiteHeader current={current} />
      {children}
      <SiteFooter />
      <BreakingTicker items={ticker} />
    </div>
  );
}
