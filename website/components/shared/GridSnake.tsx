// components/shared/GridSnake.tsx
"use client";

import { motion } from "framer-motion";

const paths = [
  "M 0 20 L 20 20 L 20 40 L 45 40 L 45 10 L 70 10 L 70 30 L 100 30",
  "M 100 65 L 75 65 L 75 85 L 50 85 L 50 55 L 25 55 L 25 90 L 0 90",
];

export default function GridSnake() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="snake-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#snake-gradient)"
          strokeWidth={0.3}
          strokeLinecap="round"
          strokeDasharray="6 94"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5,
          }}
        />
      ))}
    </svg>
  );
}
