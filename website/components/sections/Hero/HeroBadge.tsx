// components/sections/Hero/HeroBadge.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Web Apps", "Mobile Apps", "Cloud Systems", "AI Integrations"];

export default function HeroBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
      </span>
      <span className="shrink-0">Building:</span>
      <span className="relative inline-block h-5 min-w-[110px] text-left">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute left-0 top-0 whitespace-nowrap font-semibold text-brand-600"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
