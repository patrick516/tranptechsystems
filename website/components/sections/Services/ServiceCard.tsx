// components/sections/Services/ServiceCard.tsx
import { Service } from "./services.data";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-brand-200 hover:shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d={service.icon} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3 className="mb-2 text-base font-semibold text-gray-900">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-500">
        {service.description}
      </p>
    </div>
  );
}
