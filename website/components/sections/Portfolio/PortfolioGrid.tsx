"use client";

import { useRef, useState } from "react";
import { Portfolio } from "@/lib/portfolioService";
import Reveal from "@/components/shared/Reveal";
import PortfolioCard from "./PortfolioCard";
import PortfolioModal from "./PortfolioModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioGridProps {
  projects: Portfolio[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [selected, setSelected] = useState<Portfolio | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (projects.length === 0) {
    return (
      <p className="mt-12 text-center text-sm text-gray-400">
        Projects coming soon.
      </p>
    );
  }

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="relative mt-12">
        <div
          ref={scrollRef}
          className="portfolio-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {projects.map((project, i) => (
            <Reveal key={project._id} direction="up" delay={i * 0.08}>
              <PortfolioCard
                project={project}
                onSelect={() => setSelected(project)}
              />
            </Reveal>
          ))}
        </div>

        {projects.length > 1 && (
          <div className="mt-4 hidden justify-end gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-brand-600 hover:text-brand-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-brand-600 hover:text-brand-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <PortfolioModal project={selected} onClose={() => setSelected(null)} />

      <style jsx>{`
        .portfolio-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .portfolio-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
