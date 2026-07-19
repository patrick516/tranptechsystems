// src/pages/Quotes/index.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
} from "@/services/quoteService";
import type { Quote, QuoteInput } from "@/services/quoteService";
import QuoteForm from "@/components/forms/QuoteForm";
import QuoteTable from "./QuoteTable";

export default function QuotesPage() {
  const [searchParams] = useSearchParams();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Quote | null>(null);

  const loadQuotes = () => {
    setLoading(true);
    getQuotes()
      .then(setQuotes)
      .catch(() => setError("Failed to load quotes"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  // Auto-open the create form if navigated here from a Lead ("Create Quote" button)
  useEffect(() => {
    const leadId = searchParams.get("leadId");
    if (leadId) setShowForm(true);
  }, [searchParams]);

  const prefill: Partial<QuoteInput> | undefined = searchParams.get("leadId")
    ? {
        lead: searchParams.get("leadId") || undefined,
        clientName: searchParams.get("name") || "",
        clientEmail: searchParams.get("email") || "",
      }
    : undefined;

  const handleCreate = async (data: QuoteInput) => {
    await createQuote(data);
    setShowForm(false);
    loadQuotes();
  };

  const handleUpdate = async (data: QuoteInput) => {
    if (!editing) return;
    await updateQuote(editing._id, data);
    setEditing(null);
    loadQuotes();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quote?")) return;
    await deleteQuote(id);
    loadQuotes();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Quotes
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          + New Quote
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <QuoteTable
          quotes={quotes}
          onEdit={setEditing}
          onDelete={handleDelete}
          onSent={loadQuotes}
        />
      )}

      {(showForm || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {editing ? "Edit Quote" : "New Quote"}
            </h2>
            <QuoteForm
              initialData={
                editing ? { ...editing, lead: editing.lead?._id } : prefill
              }
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
