// src/pages/Settings/PasswordForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { updatePassword } from "@/services/settingsService";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
const labelClass = "mb-1 block text-sm text-gray-700";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updatePassword({ currentPassword, newPassword });
      setMessage("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Current Password</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>New Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {message && <p className="text-sm text-brand-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
