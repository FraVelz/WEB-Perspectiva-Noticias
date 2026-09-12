import Image from "next/image";
import Link from "next/link";

export function BrandMark({
  size = 64,
  href = "/",
  stacked = false,
}: {
  size?: number;
  href?: string | null;
  stacked?: boolean;
}) {
  const inner = (
    <span className={`flex items-center ${stacked ? "flex-col gap-2 text-center" : "gap-3"}`}>
      <Image
        src="/brand/logo-p.png"
        alt=""
        width={size}
        height={size}
        className="shrink-0 bg-transparent object-contain"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-cond)] font-semibold tracking-[0.12em] ${
            stacked ? "text-[1.7rem] sm:text-[2.15rem]" : "text-[1.2rem] sm:text-[1.85rem]"
          }`}
        >
          P<span className="e-mark">E</span>RSPECTIVA
        </span>
        <span
          className={`masthead-lockup mt-1 font-[family-name:var(--font-sans)] ${
            stacked ? "tracking-[0.62em] text-[0.72rem]" : "tracking-[0.5em] text-[0.62rem] sm:text-[0.7rem]"
          }`}
        >
          NOTICIAS
        </span>
      </span>
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} className="hover:text-ink" aria-label="Perspectiva Noticias">
      {inner}
    </Link>
  );
}

export function Tagline({ ruled = false }: { ruled?: boolean }) {
  return (
    <p
      className={`font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.28em] text-muted ${
        ruled
          ? "mx-auto mt-3 flex max-w-md items-center gap-3 before:h-px before:flex-1 before:bg-ink after:h-px after:flex-1 after:bg-ink"
          : "mt-2"
      }`}
    >
      Más contexto, mejores decisiones
    </p>
  );
}
