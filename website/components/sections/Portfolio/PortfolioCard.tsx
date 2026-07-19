// components/sections/Portfolio/PortfolioCard.tsx
import { Portfolio } from "@/lib/portfolioService";

interface PortfolioCardProps {
  project: Portfolio;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-brand-200 hover:shadow-sm">
      {project.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-gray-50 text-sm text-gray-400">
          No preview image
        </div>
      )}

      <div className="p-6">
        {project.category && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-700">
            {project.category}
          </p>
        )}

        <h3 className="mb-2 text-base font-semibold text-gray-900">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-500">
          {project.description}
        </p>

        {project.techStack.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            View Live →
          </a>
        )}
      </div>
    </div>
  );
}
