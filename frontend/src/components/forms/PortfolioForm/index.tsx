// src/components/forms/PortfolioForm/index.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { PortfolioInput } from "@/services/portfolioService";

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
  const [error, setError] = useState("");

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
        <label className="mb-1 block text-sm text-slate-300">Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Slug</label>
        <input
          required
          value={form.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="e.g. mobilehealth-malawi"
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Description</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-slate-300">Category</label>
          <input
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="e.g. Web App"
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Live URL</label>
          <input
            value={form.liveUrl}
            onChange={(e) => handleChange("liveUrl", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">
          Tech Stack (comma separated)
        </label>
        <input
          value={techStackInput}
          onChange={(e) => setTechStackInput(e.target.value)}
          placeholder="React, Node.js, MongoDB"
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">
          Cover Image URL
        </label>
        <input
          value={form.coverImage}
          onChange={(e) => handleChange("coverImage", e.target.value)}
          placeholder="https://..."
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => handleChange("featured", e.target.checked)}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => handleChange("published", e.target.checked)}
          />
          Published
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
