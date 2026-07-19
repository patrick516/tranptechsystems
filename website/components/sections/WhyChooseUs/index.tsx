// components/sections/WhyChooseUs/index.tsx
import { features } from "./features.data";
import FeatureCard from "./FeatureCard";
import Reveal from "@/components/shared/Reveal";

export default function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="container-max section-padding">
        <Reveal direction="right" className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
            Why TranpTech
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built different, built for you
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.1}
            >
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
