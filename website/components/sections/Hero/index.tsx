import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import HeroSpotlight from "./HeroSpotlight";
import Reveal from "@/components/shared/Reveal";
import FloatingBubbles from "@/components/shared/FloatingBubbles";
import GridPattern from "@/components/shared/GridPattern";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <GridPattern />
      <FloatingBubbles />
      <div className="container-max relative grid grid-cols-1 items-center gap-12 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:grid-cols-2 lg:pt-12">
        <Reveal direction="left">
          <HeroContent />
        </Reveal>
        <Reveal direction="right" delay={0.15}>
          <div className="flex flex-col gap-8">
            <HeroSpotlight />
            <HeroStats />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
