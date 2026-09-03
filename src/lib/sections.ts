import type { SectionSlug } from "./types";

export const SECTIONS: {
  slug: SectionSlug;
  label: string;
  kicker: string;
}[] = [
  { slug: "politica", label: "Política", kicker: "Política" },
  { slug: "economia", label: "Economía", kicker: "Economía" },
  { slug: "mundo", label: "Mundo", kicker: "Mundo" },
  { slug: "cultura", label: "Cultura", kicker: "Cultura" },
  { slug: "opinion", label: "Opinión", kicker: "Opinión" },
  { slug: "investigacion", label: "Investigación", kicker: "Investigación" },
];

export function sectionBySlug(slug: string) {
  return SECTIONS.find((s) => s.slug === slug);
}
