// components/sections/Hero/HeroStats.tsx
const stats = [
  { value: "100%", label: "Custom-Built Solutions" },
  { value: "Cloud", label: "Ready & Scalable" },
  { value: "API", label: "Integrations & Automation" },
  { value: "Secure", label: "By Design" },
];

export default function HeroStats() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
      <p className="mb-6 text-sm font-medium uppercase tracking-wider text-gray-500">
        What You Get
      </p>

      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-bold tracking-tight text-brand-700">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
