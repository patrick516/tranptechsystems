// components/sections/WhyChooseUs/FeatureCard.tsx
import { Feature } from "./features.data";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div className="group text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/20">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="mb-1 text-base font-semibold text-gray-900">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-500">{feature.description}</p>
    </div>
  );
}
