import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/seed-data";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "Perspectiva Noticias";

const PAPER = "#f4f0e6";
const INK = "#121212";
const MUTED = "#5c574c";
const BLUE = "#0b4f9c";

const LOCKUP = { width: 560, height: 474 };
const WORDMARK = { width: 360, height: 72 };
const MARK = { width: 64, height: 60 };

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 700;
  style: "normal";
};

async function loadGoogleFont(family: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((res) => res.text());
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Fuente no encontrada: ${family}`);
  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) throw new Error(`No se pudo descargar ${family}`);
  return fontRes.arrayBuffer();
}

async function loadFonts(): Promise<OgFont[]> {
  try {
    const [playfair, inter] = await Promise.all([
      loadGoogleFont("Playfair Display", 700),
      loadGoogleFont("Inter", 500),
    ]);
    return [
      { name: "Playfair Display", data: playfair, weight: 700, style: "normal" },
      { name: "Inter", data: inter, weight: 500, style: "normal" },
    ];
  } catch {
    return [];
  }
}

async function fileToDataUrl(path: string, mime: string) {
  const data = await readFile(path, "base64");
  return `data:${mime};base64,${data}`;
}

function brandFile(name: string) {
  return join(process.cwd(), "public/brand", name);
}

async function loadCoverSrc(src?: string) {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      const res = await fetch(src);
      if (!res.ok) return null;
      const mime = res.headers.get("content-type") || "image/jpeg";
      const data = Buffer.from(await res.arrayBuffer()).toString("base64");
      return `data:${mime};base64,${data}`;
    } catch {
      return null;
    }
  }
  const relative = src.replace(/^\//, "");
  const path = join(process.cwd(), "public", relative);
  const mime = relative.endsWith(".png") ? "image/png" : "image/jpeg";
  try {
    return await fileToDataUrl(path, mime);
  } catch {
    return null;
  }
}

function clipText(text: string, max: number) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const at = slice.lastIndexOf(" ");
  return `${(at > 40 ? slice.slice(0, at) : slice).trim()}…`;
}

function Hairline({ weight }: { weight: number }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: weight,
        background: INK,
      }}
    />
  );
}

export async function renderSiteOgImage() {
  const [fonts, lockupSrc] = await Promise.all([
    loadFonts(),
    fileToDataUrl(brandFile("lockup-og.png"), "image/png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          padding: "36px 48px",
        }}
      >
        <Hairline weight={3} />
        <div style={{ display: "flex", height: 5 }} />
        <Hairline weight={1} />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={lockupSrc} width={LOCKUP.width} height={LOCKUP.height} />
          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontFamily: "Inter",
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {SITE.city} · Periódico digital
          </div>
        </div>

        <Hairline weight={1} />
        <div style={{ display: "flex", height: 5 }} />
        <Hairline weight={3} />
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

export async function renderArticleOgImage(article: {
  title: string;
  dek?: string;
  kicker?: string;
  authorName?: string;
  coverImage?: string;
}) {
  const [fonts, logoSrc, wordmarkSrc, coverSrc] = await Promise.all([
    loadFonts(),
    fileToDataUrl(brandFile("logo-p-og.png"), "image/png"),
    fileToDataUrl(brandFile("wordmark-og.png"), "image/png"),
    loadCoverSrc(article.coverImage),
  ]);

  const titleSize = article.title.length > 88 ? 42 : article.title.length > 56 ? 50 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 520,
            height: "100%",
            overflow: "hidden",
            background: "#1a1a1a",
          }}
        >
          {coverSrc ? (
            <img
              src={coverSrc}
              width={520}
              height={630}
              style={{ objectFit: "cover", filter: "grayscale(1) contrast(1.08)" }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                background: PAPER,
              }}
            >
              <img src={logoSrc} width={180} height={169} />
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            padding: "42px 44px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Inter",
                fontSize: 18,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: BLUE,
              }}
            >
              {article.kicker || "Perspectiva"}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: "Playfair Display",
                fontSize: titleSize,
                lineHeight: 1.12,
                fontWeight: 700,
              }}
            >
              {article.title}
            </div>
            {article.dek ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 16,
                  fontFamily: "Inter",
                  fontSize: 22,
                  lineHeight: 1.35,
                  color: MUTED,
                }}
              >
                {clipText(article.dek, 132)}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {article.authorName ? (
              <div
                style={{
                  display: "flex",
                  marginBottom: 18,
                  fontFamily: "Inter",
                  fontSize: 16,
                  color: MUTED,
                }}
              >
                Por {article.authorName}
              </div>
            ) : null}
            <Hairline weight={1} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
              <img src={logoSrc} width={MARK.width} height={MARK.height} />
              <img src={wordmarkSrc} width={WORDMARK.width} height={WORDMARK.height} />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
