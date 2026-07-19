// src/pages/Dashboard/RecentLeadsTable.tsx
import type { Lead } from "@/services/leadService";

interface RecentLeadsTableProps {
  leads: Lead[];
}

export default function RecentLeadsTable({ leads }: RecentLeadsTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Recent Leads</h2>

      {leads.length === 0 ? (
        <p className="text-sm text-gray-500">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="text-gray-500">
              <tr>
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t border-gray-100">
                  <td className="py-2 pr-4">{lead.name}</td>
                  <td className="py-2 pr-4">{lead.email}</td>
                  <td className="py-2 pr-4 capitalize">{lead.status}</td>
                  <td className="py-2">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
