// components/shared/GridPattern.tsx
export default function GridPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="hero-grid"
          width={40}
          height={40}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            className="text-gray-100"
          />
        </pattern>
        <radialGradient id="hero-grid-fade" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </radialGradient>
        <mask id="hero-grid-mask">
          <rect width="100%" height="100%" fill="white" />
          <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#hero-grid)"
        mask="url(#hero-grid-mask)"
      />
    </svg>
  );
}
