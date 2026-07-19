// components/shared/FloatingBubbles.tsx
"use client";

import { motion } from "framer-motion";

interface Bubble {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  color: string;
}

const bubbles: Bubble[] = [
  {
    size: 120,
    top: "10%",
    left: "5%",
    duration: 9,
    delay: 0,
    color: "bg-brand-100",
  },
  {
    size: 80,
    top: "65%",
    left: "10%",
    duration: 7,
    delay: 1,
    color: "bg-brand-50",
  },
  {
    size: 60,
    top: "20%",
    left: "85%",
    duration: 8,
    delay: 0.5,
    color: "bg-brand-100",
  },
  {
    size: 140,
    top: "70%",
    left: "80%",
    duration: 10,
    delay: 1.5,
    color: "bg-brand-50",
  },
  {
    size: 50,
    top: "45%",
    left: "92%",
    duration: 6,
    delay: 0.8,
    color: "bg-brand-100",
  },
  {
    size: 90,
    top: "85%",
    left: "45%",
    duration: 8.5,
    delay: 0.3,
    color: "bg-brand-50",
  },
];

export default function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full opacity-40 blur-2xl ${b.color}`}
          style={{ width: b.size, height: b.size, top: b.top, left: b.left }}
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
