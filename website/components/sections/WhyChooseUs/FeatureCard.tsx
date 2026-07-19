// components/sections/WhyChooseUs/FeatureCard.tsx
import { Feature } from "./features.data";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d={feature.icon} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mb-1 text-base font-semibold text-gray-900">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-500">{feature.description}</p>
    </div>
  );
}
