// components/sections/Benefits/index.tsx
import { benefits } from "./benefits.data";
import BenefitCard from "./BenefitCard";
import Reveal from "@/components/shared/Reveal";
import FloatingBubbles from "@/components/shared/FloatingBubbles";

export default function Benefits() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <FloatingBubbles />
      <div className="container-max section-padding relative">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} direction="up" delay={i * 0.08}>
              <BenefitCard benefit={benefit} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
