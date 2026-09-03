import Image from "next/image";

export function PressPhoto({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-[16/9] overflow-hidden bg-paper-2">
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
