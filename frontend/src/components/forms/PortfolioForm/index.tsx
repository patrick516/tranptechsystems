// src/components/forms/PortfolioForm/index.tsx
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { PortfolioInput } from "@/services/portfolioService";
import { uploadImage } from "@/services/uploadService";

interface PortfolioFormProps {
  initialData?: Partial<PortfolioInput>;
  onSubmit: (data: PortfolioInput) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

const emptyForm: PortfolioInput = {
  title: "",
  slug: "",
  description: "",
  category: "",
  techStack: [],
  coverImage: "",
  images: [],
  liveUrl: "",
  featured: false,
  published: true,
};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
const labelClass = "mb-1 block text-sm text-gray-700";

export default function PortfolioForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: PortfolioFormProps) {
  const [form, setForm] = useState<PortfolioInput>({
    ...emptyForm,
    ...initialData,
  });
  const [techStackInput, setTechStackInput] = useState(
    form.techStack.join(", "),
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const url = await uploadImage(file, "portfolio");
      handleChange("coverImage", url);
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (
    field: keyof PortfolioInput,
    value: string | boolean,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const techStack = techStackInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await onSubmit({ ...form, techStack });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save portfolio item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Slug</label>
        <input
          required
          value={form.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="e.g. mobilehealth-malawi"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <input
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="e.g. Web App"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Live URL</label>
          <input
            value={form.liveUrl}
            onChange={(e) => handleChange("liveUrl", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tech Stack (comma separated)</label>
        <input
          value={techStackInput}
          onChange={(e) => setTechStackInput(e.target.value)}
          placeholder="React, Node.js, MongoDB"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Cover Image</label>

        {form.coverImage && (
          <img
            src={form.coverImage}
            alt="Cover preview"
            className="mb-2 h-32 w-full rounded-md border border-gray-200 object-cover"
          />
        )}

        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
          />
          {uploading && (
            <span className="text-xs text-gray-500">Uploading...</span>
          )}
        </div>

        <input
          value={form.coverImage}
          onChange={(e) => handleChange("coverImage", e.target.value)}
          placeholder="or paste an image URL directly"
          className={`${inputClass} mt-2`}
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => handleChange("featured", e.target.checked)}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => handleChange("published", e.target.checked)}
          />
          Published
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
