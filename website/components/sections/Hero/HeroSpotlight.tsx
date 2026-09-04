// components/sections/Hero/HeroSpotlight.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { services } from "@/components/sections/Services/services.data";

const CONTACT_NUMBER = "+265 995 049 331";

type SpotlightItem = {
  label: string;
  isContact?: boolean;
};

const items: SpotlightItem[] = [
  ...services.map((s) => ({ label: s.title })),
  { label: CONTACT_NUMBER, isContact: true },
];

export default function HeroSpotlight() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const current = items[index];

  return (
    <div className="relative flex h-20 w-full items-center justify-center lg:h-24">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          {current.isContact ? (
            <>
              <span className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                Talk to us
              </span>
              <span className="text-2xl font-bold text-brand-600">
                {current.label}
              </span>
            </>
          ) : (
            <>
              <span className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                What we build
              </span>
              <span className="max-w-xs text-xl font-semibold leading-snug text-gray-700">
                {current.label}
              </span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
