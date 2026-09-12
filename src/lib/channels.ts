export type ChannelId = "instagram" | "tiktok" | "youtube";

export type Channel = {
  id: ChannelId;
  label: string;
  href: string;
};

export const CHANNELS: Channel[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/perspectiva._noticias/",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@perspectiva_noticias/",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@perspectiva_noticias/",
  },
];
