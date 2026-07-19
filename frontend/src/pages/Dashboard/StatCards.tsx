// src/pages/Dashboard/StatCards.tsx
import type { DashboardStats } from "@/services/statsService";

interface StatCardsProps {
  stats: DashboardStats;
}

export default function StatCards({ stats }: StatCardsProps) {
  const newLeads =
    stats.leadsByStatus.find((s) => s.status === "new")?.count ?? 0;

  const cards = [
    { label: "Total Leads", value: stats.totalLeads },
    { label: "New Leads", value: newLeads },
    { label: "Published Projects", value: stats.publishedPortfolios },
    { label: "Featured Projects", value: stats.featuredPortfolios },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{card.label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
