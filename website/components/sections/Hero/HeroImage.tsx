// components/sections/Hero/HeroImage.tsx
export default function HeroImage() {
  return (
    <div className="hidden lg:block">
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <div className="mb-4 flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-gray-300" />
          <span className="h-3 w-3 rounded-full bg-gray-300" />
          <span className="h-3 w-3 rounded-full bg-gray-300" />
        </div>
        <pre className="overflow-hidden text-xs leading-relaxed text-gray-600">
          <code>{`const business = {
  systems: "smart",
  impact: "bigger",
  growth: true
};

function transform(business) {
  return build(
    business,
    withSecurity(),
    withScale()
  );
}

transform(business);
// → Stronger Business ✓`}</code>
        </pre>
      </div>
    </div>
  );
}
