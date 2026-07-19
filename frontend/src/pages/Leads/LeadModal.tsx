// src/pages/Leads/LeadModal.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { updateLead } from "@/services/leadService";
import type { Lead } from "@/services/leadService";

interface LeadModalProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdated: () => void;
}

const statusOptions: Lead["status"][] = [
  "new",
  "contacted",
  "in_progress",
  "closed",
];

export default function LeadModal({
  lead,
  onClose,
  onUpdated,
}: LeadModalProps) {
  const [saving, setSaving] = useState(false);

  if (!lead) return null;

  const handleStatusChange = async (status: Lead["status"]) => {
    setSaving(true);
    try {
      await updateLead(lead._id, { status });
      onUpdated();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{lead.name}</h2>
            <p className="text-sm text-gray-500">{lead.email}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 text-sm">
          {lead.phone && (
            <div>
              <span className="font-medium text-gray-700">Phone: </span>
              <span className="text-gray-600">{lead.phone}</span>
            </div>
          )}
          {lead.company && (
            <div>
              <span className="font-medium text-gray-700">Company: </span>
              <span className="text-gray-600">{lead.company}</span>
            </div>
          )}
          {lead.serviceInterest && (
            <div>
              <span className="font-medium text-gray-700">Interested in: </span>
              <span className="text-gray-600">{lead.serviceInterest}</span>
            </div>
          )}
          <div>
            <span className="font-medium text-gray-700">Received: </span>
            <span className="text-gray-600">
              {new Date(lead.createdAt).toLocaleString()}
            </span>
          </div>
          <div>
            <p className="mb-1 font-medium text-gray-700">Message</p>
            <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-gray-600">
              {lead.message}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={lead.status}
            disabled={saving}
            onChange={(e) =>
              handleStatusChange(e.target.value as Lead["status"])
            }
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Close
          </button>
          <Link
            to={`/quotes?leadId=${lead._id}&name=${encodeURIComponent(lead.name)}&email=${encodeURIComponent(lead.email)}`}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Create Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
