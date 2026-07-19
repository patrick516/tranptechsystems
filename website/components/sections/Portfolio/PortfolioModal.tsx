// components/sections/Portfolio/PortfolioModal.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portfolio } from "@/lib/portfolioService";

interface PortfolioModalProps {
  project: Portfolio | null;
  onClose: () => void;
}

export default function PortfolioModal({
  project,
  onClose,
}: PortfolioModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            {project.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={project.title}
                className="h-64 w-full object-cover"
              />
            )}

            <div className="p-8">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  {project.category && (
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-700">
                      {project.category}
                    </p>
                  )}
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <p className="mb-6 leading-relaxed text-gray-600">
                {project.description}
              </p>

              {project.techStack.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
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
                  className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  View Live Demo
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7v9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
