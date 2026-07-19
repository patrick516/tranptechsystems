// src/pages/Leads/index.tsx
import { useEffect, useState } from "react";
import { getLeads } from "@/services/leadService";
import type { Lead } from "@/services/leadService";
import LeadModal from "./LeadModal";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  const loadLeads = () => {
    getLeads()
      .then(setLeads)
      .catch(() => setError("Failed to load leads"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleUpdated = () => {
    loadLeads();
    setSelected(null);
  };

  if (loading) return <p className="text-gray-500">Loading leads...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Leads</h1>

      {leads.length === 0 ? (
        <p className="text-gray-500">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  onClick={() => setSelected(lead)}
                  className="cursor-pointer border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="max-w-xs truncate px-4 py-3">
                    {lead.message}
                  </td>
                  <td className="px-4 py-3 capitalize">{lead.status}</td>
                  <td className="px-4 py-3">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <LeadModal
        lead={selected}
        onClose={() => setSelected(null)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
