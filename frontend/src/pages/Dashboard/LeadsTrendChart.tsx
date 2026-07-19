// src/pages/Dashboard/LeadsTrendChart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { LeadsByMonth } from "@/services/statsService";

interface LeadsTrendChartProps {
  data: LeadsByMonth[];
}

export default function LeadsTrendChart({ data }: LeadsTrendChartProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">
        Leads Trend (6 Months)
      </h2>

      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          Not enough data yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#9ca3af" fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#leadsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
