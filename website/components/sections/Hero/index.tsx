// components/sections/Hero/index.tsx
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import Reveal from "@/components/shared/Reveal";
import FloatingBubbles from "@/components/shared/FloatingBubbles";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <FloatingBubbles />
      <div className="container-max section-padding relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal direction="left">
          <HeroContent />
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <HeroStats />
        </Reveal>
      </div>
    </section>
  );
}
