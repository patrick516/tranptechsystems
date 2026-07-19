// components/sections/Benefits/BenefitCard.tsx
import { Benefit } from "./benefits.data";

interface BenefitCardProps {
  benefit: Benefit;
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d={benefit.icon} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-900">{benefit.title}</p>
    </div>
  );
}
