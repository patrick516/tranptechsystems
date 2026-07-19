// src/pages/Settings/SiteSettingsForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { updateSiteSettings } from "@/services/settingsService";
import type { SiteSettings } from "@/services/settingsService";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
const labelClass = "mb-1 block text-sm text-gray-700";

interface SiteSettingsFormProps {
  settings: SiteSettings;
  onUpdated: (settings: SiteSettings) => void;
}

const ViewRow = ({ label, value }: { label: string; value?: string }) => {
  const isLink = value?.startsWith("http");

  return (
    <div className="grid grid-cols-3 gap-4 py-3">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="col-span-2 min-w-0 text-sm text-gray-900">
        {!value ? (
          "—"
        ) : isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            title={value}
            className="block truncate text-brand-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="block truncate" title={value}>
            {value}
          </span>
        )}
      </dd>
    </div>
  );
};

export default function SiteSettingsForm({
  settings,
  onUpdated,
}: SiteSettingsFormProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (
    platform: keyof SiteSettings["socials"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      socials: { ...prev.socials, [platform]: value },
    }));
  };

  const handleBankChange = (
    field: keyof SiteSettings["bankDetails"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const updated = await updateSiteSettings(form);
      onUpdated(updated);
      setMessage("Site settings updated successfully");
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update site settings");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(settings);
    setError("");
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Site Contact Info
          </h2>
          <button
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            Edit
          </button>
        </div>
        <p className="mb-2 text-sm text-gray-500">
          Used on the public website's footer and contact section.
        </p>

        {message && <p className="mb-3 text-sm text-brand-600">{message}</p>}

        <dl className="divide-y divide-gray-100">
          <ViewRow label="Contact Email" value={settings.contactEmail} />
          <ViewRow label="Contact Phone" value={settings.contactPhone} />
          <ViewRow label="Address" value={settings.address} />
          <ViewRow label="LinkedIn" value={settings.socials?.linkedin} />
          <ViewRow label="GitHub" value={settings.socials?.github} />
          <ViewRow label="Twitter / X" value={settings.socials?.twitter} />
          <ViewRow label="Facebook" value={settings.socials?.facebook} />
          <ViewRow label="Bank Name" value={settings.bankDetails?.bankName} />
          <ViewRow
            label="Account Name"
            value={settings.bankDetails?.accountName}
          />
          <ViewRow
            label="Account Number"
            value={settings.bankDetails?.accountNumber}
          />
        </dl>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold text-gray-900">
        Edit Site Contact Info
      </h2>
      <p className="mb-4 text-sm text-gray-500">
        Used on the public website's footer and contact section.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Contact Email</label>
            <input
              value={form.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Contact Phone</label>
            <input
              value={form.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Address</label>
          <input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>LinkedIn</label>
            <input
              value={form.socials.linkedin}
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>GitHub</label>
            <input
              value={form.socials.github}
              onChange={(e) => handleSocialChange("github", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Twitter / X</label>
            <input
              value={form.socials.twitter}
              onChange={(e) => handleSocialChange("twitter", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Facebook</label>
            <input
              value={form.socials.facebook}
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
          <div>
            <label className={labelClass}>Bank Name</label>
            <input
              value={form.bankDetails.bankName}
              onChange={(e) => handleBankChange("bankName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Account Name</label>
            <input
              value={form.bankDetails.accountName}
              onChange={(e) => handleBankChange("accountName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Account Number</label>
            <input
              value={form.bankDetails.accountNumber}
              onChange={(e) =>
                handleBankChange("accountNumber", e.target.value)
              }
              className={inputClass}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Site Settings"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
