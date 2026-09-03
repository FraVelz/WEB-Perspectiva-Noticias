import Image from "next/image";

export function PressPhoto({
  src,
  alt,
  caption,
  priority = false,
  className = "",
  ratio = "16/9",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  ratio?: "16/9" | "4/3" | "1/1";
}) {
  const aspect = ratio === "4/3" ? "aspect-[4/3]" : ratio === "1/1" ? "aspect-square" : "aspect-[16/9]";
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="photo-press object-cover"
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-[family-name:var(--font-sans)] text-[11px] leading-snug text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
