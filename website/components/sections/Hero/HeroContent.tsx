import Link from "next/link";
import HeroBadge from "./HeroBadge";

export default function HeroContent() {
  return (
    <div className="max-w-xl">
      <HeroBadge />
      <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
        Code Today. Transform Tomorrow. Lead Forever.
      </p>

      <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
        Smart systems.{" "}
        <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
          Bigger impact.
        </span>{" "}
        Stronger business.
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        Custom digital solutions that drive growth, efficiency and innovation —
        built to fit your business, not the other way around.
      </p>

      <div className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-4">
        <Link
          href="#contact"
          className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-brand-600 px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25 sm:px-6 sm:py-3 sm:text-sm"
        >
          <span className="hidden sm:inline">
            Let's Build Something Amazing Together
          </span>
          <span className="sm:hidden">Let's Build Together</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="#portfolio"
          className="whitespace-nowrap rounded-md border border-gray-300 px-3 py-2.5 text-xs font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md sm:px-6 sm:py-3 sm:text-sm"
        >
          View Our Work
        </Link>
      </div>
    </div>
  );
}
