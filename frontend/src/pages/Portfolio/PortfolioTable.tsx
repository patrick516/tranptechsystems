// src/pages/Portfolio/PortfolioTable.tsx
import type { Portfolio } from "@/services/portfolioService";

interface PortfolioTableProps {
  portfolios: Portfolio[];
  onEdit: (portfolio: Portfolio) => void;
  onDelete: (id: string) => void;
}

export default function PortfolioTable({
  portfolios,
  onEdit,
  onDelete,
}: PortfolioTableProps) {
  if (portfolios.length === 0) {
    return <p className="text-gray-500">No portfolio items yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Published</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((item) => (
            <tr key={item._id} className="border-t border-gray-200">
              <td className="px-4 py-3">{item.title}</td>
              <td className="px-4 py-3">{item.category || "—"}</td>
              <td className="px-4 py-3">{item.featured ? "Yes" : "No"}</td>
              <td className="px-4 py-3">{item.published ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="mr-3 text-brand-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
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
