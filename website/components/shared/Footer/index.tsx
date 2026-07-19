import Image from "next/image";
import { getSiteSettings } from "@/lib/siteSettingsService";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import FooterLinks from "./FooterLinks";
import SocialLinks from "./SocialLinks";

export default async function Footer() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container-max grid grid-cols-1 gap-10 py-16 md:grid-cols-3">
        <div>
          <Image
            src="/images/SYstemsLogo.png"
            alt={SITE_NAME}
            width={220}
            height={55}
            className="mb-4 h-16 w-auto"
          />
          <p className="max-w-xs text-sm text-gray-500">{SITE_TAGLINE}</p>
        </div>

        <FooterLinks />

        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm text-gray-500">
            {settings?.contactEmail && (
              <li>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-brand-700"
                >
                  {settings.contactEmail}
                </a>
              </li>
            )}
            {settings?.contactPhone && (
              <li>
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="hover:text-brand-700"
                >
                  {settings.contactPhone}
                </a>
              </li>
            )}
            {settings?.address && <li>{settings.address}</li>}
          </ul>

          {settings?.socials && (
            <div className="mt-5">
              <SocialLinks socials={settings.socials} />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 py-6">
        <p className="container-max text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {SITE_NAME} — Powering Digital
          Transformation.
        </p>
      </div>
    </footer>
  );
}
