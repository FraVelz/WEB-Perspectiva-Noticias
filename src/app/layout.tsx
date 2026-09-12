import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CHANNELS } from "@/lib/channels";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const siteUrl = new URL("https://perspectiva-noticias.vercel.app");
const siteDescription =
  "Periódico digital. Más contexto, mejores decisiones. Informamos, analizamos y conectamos.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Perspectiva Noticias",
    template: "%s · Perspectiva Noticias",
  },
  description: siteDescription,
  applicationName: "Perspectiva Noticias",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "Perspectiva Noticias",
    title: "Perspectiva Noticias",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Perspectiva Noticias",
    description: siteDescription,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Perspectiva Noticias",
  url: siteUrl.href,
  sameAs: CHANNELS.map((channel) => channel.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} ${playfair.variable} ${sourceSerif.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
