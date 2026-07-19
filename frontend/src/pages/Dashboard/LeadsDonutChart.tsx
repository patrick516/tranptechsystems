// src/pages/Dashboard/LeadsDonutChart.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { LeadsByStatus } from "@/services/statsService";

interface LeadsDonutChartProps {
  data: LeadsByStatus[];
}

const STATUS_COLORS: Record<string, string> = {
  new: "#059669",
  contacted: "#34d399",
  in_progress: "#fbbf24",
  closed: "#9ca3af",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  closed: "Closed",
};

export default function LeadsDonutChart({ data }: LeadsDonutChartProps) {
  const chartData = data.map((d) => ({
    name: STATUS_LABELS[d.status] ?? d.status,
    value: d.count,
    status: d.status,
  }));

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">
        Leads by Status
      </h2>

      {total === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">No leads yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status] ?? "#d1d5db"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
