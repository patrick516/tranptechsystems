"use client";

import { useState } from "react";
import { Portfolio } from "@/lib/portfolioService";
import Reveal from "@/components/shared/Reveal";
import PortfolioCard from "./PortfolioCard";
import PortfolioModal from "./PortfolioModal";

interface PortfolioGridProps {
  projects: Portfolio[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [selected, setSelected] = useState<Portfolio | null>(null);

  if (projects.length === 0) {
    return (
      <p className="mt-12 text-center text-sm text-gray-400">
        Projects coming soon.
      </p>
    );
  }

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project._id} direction="up" delay={i * 0.08}>
            <PortfolioCard
              project={project}
              onSelect={() => setSelected(project)}
            />
          </Reveal>
        ))}
      </div>

      <PortfolioModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
