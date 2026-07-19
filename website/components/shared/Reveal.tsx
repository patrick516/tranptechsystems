// components/shared/Reveal.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: -48 },
  right: { x: 48 },
  fade: {},
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
