import { CHANNELS, type ChannelId } from "@/lib/channels";
import { IconInstagram, IconTikTok, IconYouTube } from "./icons";

const ICONS: Record<ChannelId, typeof IconInstagram> = {
  instagram: IconInstagram,
  tiktok: IconTikTok,
  youtube: IconYouTube,
};

export function ChannelLinks({
  variant = "list",
  onNavigate,
}: {
  variant?: "icons" | "list" | "menu";
  onNavigate?: () => void;
}) {
  const isIcons = variant === "icons";

  return (
    <ul
      className={
        isIcons
          ? "flex items-center gap-0.5"
          : variant === "menu"
            ? "mt-3 flex flex-col gap-2"
            : "mt-3 space-y-1 text-sm"
      }
    >
      {CHANNELS.map((channel) => {
        const Icon = ICONS[channel.id];
        return (
          <li key={channel.id}>
            <a
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              aria-label={`${channel.label} (se abre en una pestaña nueva)`}
              className={
                isIcons
                  ? "inline-flex p-2 hover:text-blue"
                  : "inline-flex items-center gap-2"
              }
            >
              <Icon />
              {isIcons ? null : channel.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
