// src/pages/Portfolio/index.tsx
import { useEffect, useState } from "react";
import {
  getPortfoliosAdmin,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "@/services/portfolioService";
import type { Portfolio, PortfolioInput } from "@/services/portfolioService";
import PortfolioForm from "@/components/forms/PortfolioForm";
import PortfolioTable from "./PortfolioTable";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);

  const loadPortfolios = () => {
    setLoading(true);
    getPortfoliosAdmin()
      .then(setPortfolios)
      .catch(() => setError("Failed to load portfolio items"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  const handleCreate = async (data: PortfolioInput) => {
    await createPortfolio(data);
    setShowForm(false);
    loadPortfolios();
  };

  const handleUpdate = async (data: PortfolioInput) => {
    if (!editing) return;
    await updatePortfolio(editing._id, data);
    setEditing(null);
    loadPortfolios();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;
    await deletePortfolio(id);
    loadPortfolios();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          + Add Project
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <PortfolioTable
          portfolios={portfolios}
          onEdit={(item) => setEditing(item)}
          onDelete={handleDelete}
        />
      )}

      {(showForm || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {editing ? "Edit Project" : "Add Project"}
            </h2>
            <PortfolioForm
              initialData={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
              submitLabel={editing ? "Update" : "Create"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
