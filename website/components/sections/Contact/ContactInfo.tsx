// components/sections/Contact/ContactInfo.tsx
import { SiteSettings } from "@/lib/siteSettingsService";

interface ContactInfoProps {
  settings: SiteSettings | null;
}

export default function ContactInfo({ settings }: ContactInfoProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
        Get In Touch
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Let's build something amazing together
      </h2>
      <p className="mt-4 text-gray-600">
        Tell us about your project and we'll get back to you within one business
        day.
      </p>

      <div className="mt-8 space-y-4">
        {settings?.contactEmail && (
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="text-sm text-gray-500 hover:text-brand-700"
            >
              {settings.contactEmail}
            </a>
          </div>
        )}

        {settings?.contactPhone && (
          <div>
            <p className="text-sm font-medium text-gray-900">Phone</p>
            <a
              href={`tel:${settings.contactPhone}`}
              className="text-sm text-gray-500 hover:text-brand-700"
            >
              {settings.contactPhone}
            </a>
          </div>
        )}

        {settings?.address && (
          <div>
            <p className="text-sm font-medium text-gray-900">Location</p>
            <p className="text-sm text-gray-500">{settings.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}
