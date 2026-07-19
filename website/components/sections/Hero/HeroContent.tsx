// components/sections/Hero/HeroContent.tsx
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="max-w-xl">
      <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
        Code Today. Transform Tomorrow. Lead Forever.
      </p>

      <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
        Smart systems. Bigger impact. Stronger business.
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        Custom digital solutions that drive growth, efficiency and innovation —
        built to fit your business, not the other way around.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="#contact"
          className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Let's Build Something Amazing Together →
        </Link>
        <Link
          href="#portfolio"
          className="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          View Our Work
        </Link>
      </div>
    </div>
  );
}
