// components/sections/Hero/HeroStats.tsx
const stats = [
  {
    value: "100%",
    label: "Custom-Built Solutions",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    value: "Cloud",
    label: "Ready & Scalable",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 15a4 4 0 004 4h10a4 4 0 000-8 5 5 0 00-9.6-1.5A4 4 0 003 15z"
        />
      </svg>
    ),
  },
  {
    value: "API",
    label: "Integrations & Automation",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    value: "Secure",
    label: "By Design",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z"
        />
      </svg>
    ),
  },
];

export default function HeroStats() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
      <p className="mb-6 text-sm font-medium uppercase tracking-wider text-gray-500">
        What You Get
      </p>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group -m-3 rounded-xl border border-transparent p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-white hover:shadow-md"
          >
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
              {stat.icon}
            </div>
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
