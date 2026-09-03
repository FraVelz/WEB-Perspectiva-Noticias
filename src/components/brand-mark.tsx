import Image from "next/image";
import Link from "next/link";

export function BrandMark({
  size = 64,
  href = "/",
}: {
  size?: number;
  href?: string;
}) {
  const inner = (
    <span className="flex items-center gap-3">
      <Image
        src="/brand/logo-p.png"
        alt="Perspectiva Noticias"
        width={size}
        height={size}
        className="shrink-0 object-contain"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-cond)] text-[1.55rem] sm:text-[1.85rem] font-semibold tracking-[0.12em]">
          PERSP<span className="e-mark">E</span>CTIVA
        </span>
        <span className="masthead-lockup mt-1 text-[0.7rem] tracking-[0.55em] font-[family-name:var(--font-sans)]">
          NOTICIAS
        </span>
      </span>
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="hover:text-ink">
      {inner}
    </Link>
  );
}

export function Tagline() {
  return (
    <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-muted font-[family-name:var(--font-sans)]">
      Más contexto, mejores decisiones
    </p>
  );
}
