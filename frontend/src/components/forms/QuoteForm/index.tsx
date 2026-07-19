// src/components/forms/QuoteForm/index.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { QuoteInput, QuoteItem } from "@/services/quoteService";

interface QuoteFormProps {
  initialData?: Partial<QuoteInput>;
  onSubmit: (data: QuoteInput) => Promise<void>;
  onCancel: () => void;
}

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
const labelClass = "mb-1 block text-sm text-gray-700";

const emptyItem: QuoteItem = { description: "", quantity: 1, unitPrice: 0 };

export default function QuoteForm({
  initialData,
  onSubmit,
  onCancel,
}: QuoteFormProps) {
  const [form, setForm] = useState<QuoteInput>({
    clientName: initialData?.clientName || "",
    clientEmail: initialData?.clientEmail || "",
    projectTitle: initialData?.projectTitle || "",
    items: initialData?.items?.length ? initialData.items : [{ ...emptyItem }],
    discount: initialData?.discount || 0,
    currency: initialData?.currency || "MWK",
    paymentTerms:
      initialData?.paymentTerms || "50% Deposit | 50% on Completion",
    notes:
      initialData?.notes ||
      "This quote excludes domain purchase, hosting, business email and third-party services/plugins.",
    status: initialData?.status || "draft",
    lead: initialData?.lead,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateItem = (
    index: number,
    field: keyof QuoteItem,
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    setForm((prev) => ({ ...prev, items: [...prev.items, { ...emptyItem }] }));
  };

  const removeItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const subtotal = form.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const total = subtotal - (form.discount || 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSubmit(form);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save quote");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Client Name</label>
          <input
            required
            value={form.clientName}
            onChange={(e) =>
              setForm((p) => ({ ...p, clientName: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Client Email</label>
          <input
            type="email"
            value={form.clientEmail}
            onChange={(e) =>
              setForm((p) => ({ ...p, clientEmail: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Project Title</label>
        <input
          required
          value={form.projectTitle}
          onChange={(e) =>
            setForm((p) => ({ ...p, projectTitle: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Line Items</label>
        <div className="space-y-2">
          {form.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                required
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
                className={`${inputClass} flex-1`}
              />
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(i, "quantity", Number(e.target.value))
                }
                className={`${inputClass} w-16`}
              />
              <input
                type="number"
                min={0}
                placeholder="Unit price"
                value={item.unitPrice}
                onChange={(e) =>
                  updateItem(i, "unitPrice", Number(e.target.value))
                }
                className={`${inputClass} w-32`}
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                disabled={form.items.length === 1}
                className="rounded-md px-2 text-red-500 hover:bg-red-50 disabled:opacity-30"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-2 text-sm font-medium text-brand-600 hover:underline"
        >
          + Add line item
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Currency</label>
          <input
            value={form.currency}
            onChange={(e) =>
              setForm((p) => ({ ...p, currency: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Discount</label>
          <input
            type="number"
            min={0}
            value={form.discount}
            onChange={(e) =>
              setForm((p) => ({ ...p, discount: Number(e.target.value) }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                status: e.target.value as QuoteInput["status"],
              }))
            }
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Payment Terms</label>
        <input
          value={form.paymentTerms}
          onChange={(e) =>
            setForm((p) => ({ ...p, paymentTerms: e.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          rows={2}
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-between rounded-md bg-gray-50 px-4 py-3 text-sm">
        <span className="text-gray-500">
          Subtotal: {form.currency} {subtotal.toLocaleString()}
        </span>
        <span className="font-semibold text-gray-900">
          Total: {form.currency} {total.toLocaleString()}
        </span>
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
          {saving ? "Saving..." : "Save Quote"}
        </button>
      </div>
    </form>
  );
}
