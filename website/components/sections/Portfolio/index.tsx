// components/sections/Portfolio/index.tsx
import { getPortfolios } from "@/lib/portfolioService";
import Reveal from "@/components/shared/Reveal";
import PortfolioGrid from "./PortfolioGrid";

export default async function Portfolio() {
  const projects = await getPortfolios().catch(() => []);

  return (
    <section id="portfolio" className="bg-white">
      <div className="container-max section-padding">
        <Reveal direction="left" className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
            Our Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Real systems, built and shipped
          </h2>
          <p className="mt-4 text-gray-600">
            A selection of production platforms we've designed, built, and
            deployed.
          </p>
        </Reveal>

        <PortfolioGrid projects={projects} />
      </div>
    </section>
  );
}
