import { useState } from "react";
import { openQuotePdf, sendQuoteEmail } from "@/services/quoteService";
import type { Quote } from "@/services/quoteService";
interface QuoteTableProps {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (id: string) => void;
  onSent: () => void;
}
const statusStyles: Record<Quote["status"], string> = {
  draft: "bg-gray-100 text-gray-600",
  sent: "bg-blue-50 text-blue-600",
  accepted: "bg-brand-50 text-brand-700",
  rejected: "bg-red-50 text-red-600",
};

export default function QuoteTable({
  quotes,
  onEdit,
  onDelete,
  onSent,
}: QuoteTableProps) {
  const [sendingId, setSendingId] = useState<string | null>(null);

  if (quotes.length === 0) {
    return <p className="text-gray-500">No quotes yet.</p>;
  }

  const handleSend = async (id: string) => {
    setSendingId(id);
    try {
      await sendQuoteEmail(id);
      onSent();
    } catch {
      alert("Failed to send quote email. Check Brevo settings.");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-4 py-3">Quote #</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote._id} className="border-t border-gray-200">
              <td className="px-4 py-3 font-medium">{quote.quoteNumber}</td>
              <td className="px-4 py-3">{quote.clientName}</td>
              <td className="px-4 py-3">{quote.projectTitle}</td>
              <td className="px-4 py-3">
                {quote.currency} {quote.total.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[quote.status]}`}
                >
                  {quote.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSend(quote._id)}
                  disabled={sendingId === quote._id || !quote.clientEmail}
                  className="mr-3 font-medium text-brand-600 hover:underline disabled:opacity-40"
                >
                  {sendingId === quote._id ? "Sending..." : "Send Email"}
                </button>
                <button
                  onClick={() => openQuotePdf(quote._id)}
                  className="mr-3 text-brand-600 hover:underline"
                >
                  PDF
                </button>
                <button
                  onClick={() => onEdit(quote)}
                  className="mr-3 text-gray-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(quote._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
