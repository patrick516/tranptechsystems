import { useState } from "react";
import type { FormEvent } from "react";
import type { Admin } from "@/services/authService";
import { updateProfile } from "@/services/settingsService";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
const labelClass = "mb-1 block text-sm text-gray-700";

interface ProfileFormProps {
  admin: Admin;
  onUpdated: (admin: Admin) => void;
}

export default function ProfileForm({ admin, onUpdated }: ProfileFormProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const updated = await updateProfile({ name, email });
      onUpdated(updated);
      setMessage("Profile updated successfully");
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(admin.name);
    setEmail(admin.email);
    setError("");
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
          <button
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            Edit
          </button>
        </div>

        {message && <p className="mb-3 text-sm text-brand-600">{message}</p>}

        <dl className="divide-y divide-gray-100">
          <div className="grid grid-cols-3 gap-4 py-3">
            <dt className="text-sm text-gray-500">Name</dt>
            <dd className="col-span-2 text-sm text-gray-900">{admin.name}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 py-3">
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="col-span-2 text-sm text-gray-900">{admin.email}</dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
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
