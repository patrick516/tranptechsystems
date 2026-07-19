// components/shared/Footer/SocialLinks.tsx
import { SiteSettings } from "@/lib/siteSettingsService";

interface SocialLinksProps {
  socials: SiteSettings["socials"];
}

const iconPaths: Record<string, string> = {
  linkedin:
    "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.8c0-1.62-.03-3.7-2.26-3.7-2.26 0-2.6 1.77-2.6 3.6V23h-4V8z",
  github:
    "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z",
  twitter:
    "M23.95 4.57a10 10 0 01-2.82.77 4.9 4.9 0 002.16-2.72c-.95.56-2 .96-3.13 1.19a4.92 4.92 0 00-8.38 4.48A13.94 13.94 0 011.67 3.15a4.92 4.92 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06a4.92 4.92 0 003.95 4.82 4.9 4.9 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.86 9.86 0 010 19.54a13.9 13.9 0 007.55 2.21c9.06 0 14-7.5 14-14v-.64a10 10 0 002.4-2.54z",
  facebook:
    "M22.68 0H1.32C.6 0 0 .6 0 1.32v21.36C0 23.4.6 24 1.32 24h11.5v-9.3H9.7v-3.6h3.12V8.4c0-3.1 1.9-4.79 4.66-4.79 1.32 0 2.46.1 2.8.14v3.24h-1.92c-1.5 0-1.8.72-1.8 1.77v2.32h3.6l-.47 3.6h-3.13V24h6.13c.73 0 1.32-.6 1.32-1.32V1.32C24 .6 23.4 0 22.68 0z",
};

export default function SocialLinks({ socials }: SocialLinksProps) {
  const entries = Object.entries(socials).filter(([, url]) => url);

  if (entries.length === 0) return null;

  return (
    <div className="flex gap-3">
      {entries.map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-brand-600 hover:text-brand-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d={iconPaths[platform]} />
          </svg>
        </a>
      ))}
    </div>
  );
}
