// src/pages/Dashboard/index.tsx
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/statsService";
import type { DashboardStats } from "@/services/statsService";
import StatCards from "./StatCards";
import LeadsDonutChart from "./LeadsDonutChart";
import LeadsTrendChart from "./LeadsTrendChart";
import RecentLeadsTable from "./RecentLeadsTable";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setError("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Dashboard
      </h1>

      <StatCards stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LeadsDonutChart data={stats.leadsByStatus} />
        <LeadsTrendChart data={stats.leadsByMonth} />
      </div>

      <RecentLeadsTable leads={stats.recentLeads} />
    </div>
  );
}
