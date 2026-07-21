// app/about/page.tsx
import type { Metadata } from "next";
import Team from "@/components/sections/Team";
import Reveal from "@/components/shared/Reveal";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME} — our mission, our story, and the team building custom software solutions for businesses.`,
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="container-max section-padding">
          <Reveal direction="left" className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
              About Us
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Building smart systems for growing businesses
            </h1>
            <p className="mt-4 text-gray-600">
              TranpTech Systems was founded on a simple belief: businesses of
              every size deserve software that's built around how they actually
              work, not the other way around. We combine full-stack development
              with practical infrastructure and networking expertise to deliver
              complete, reliable systems — from concept to deployment and
              everything that keeps it running afterward.
            </p>

            <a
              href="/documents/TranpTech-Systems-Company-Profile.docx"
              download
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Download Company Profile
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

      <Team />
    </main>
  );
}
