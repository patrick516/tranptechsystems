// components/sections/Services/ServiceCard.tsx
import { Service } from "./services.data";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group h-full rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={22} strokeWidth={1.8} />
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
