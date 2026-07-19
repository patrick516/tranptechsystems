// src/pages/Settings/index.tsx
import { useEffect, useState } from "react";
import { getMe } from "@/services/authService";
import type { Admin } from "@/services/authService";
import { getSiteSettings } from "@/services/settingsService";
import type { SiteSettings } from "@/services/settingsService";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import SiteSettingsForm from "./SiteSettingsForm";

export default function SettingsPage() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMe(), getSiteSettings()])
      .then(([adminData, settingsData]) => {
        setAdmin(adminData);
        setSiteSettings(settingsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading settings...</p>;
  if (!admin || !siteSettings) return null;

  return (
    <div className="max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Settings
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ProfileForm admin={admin} onUpdated={setAdmin} />
          <PasswordForm />
        </div>

        <div>
          <SiteSettingsForm
            settings={siteSettings}
            onUpdated={setSiteSettings}
          />
        </div>
      </div>
    </div>
  );
}
