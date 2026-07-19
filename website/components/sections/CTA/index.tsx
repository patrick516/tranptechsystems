// components/sections/CTA/index.tsx
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import FloatingBubbles from "@/components/shared/FloatingBubbles";

export default function CTA() {
  return (
    <section className="bg-white">
      <div className="container-max section-padding">
        <div className="relative overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 px-8 py-14 text-center">
          <FloatingBubbles />
          <Reveal direction="fade" className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Let's build something amazing together
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Your vision. Our technology. Endless possibilities.
            </p>
            <Link
              href="#contact"
              className="mt-6 inline-block rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Start Your Project →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
