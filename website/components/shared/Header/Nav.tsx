// components/shared/Header/Nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const menuVariants = {
  closed: { opacity: 0, y: -8 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0 },
};

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-gray-600 transition hover:text-brand-700"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#contact"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          Get a Quote
        </Link>
      </nav>

      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-md text-gray-700 md:hidden"
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <motion.path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            animate={
              open
                ? { d: "M6 6L18 18", opacity: 1 }
                : { d: "M3 6h18", opacity: 1 }
            }
            transition={{ duration: 0.25 }}
          />
          <motion.path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M3 12h18"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            animate={
              open
                ? { d: "M6 18L18 6", opacity: 1 }
                : { d: "M3 18h18", opacity: 1 }
            }
            transition={{ duration: 0.25 }}
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-x-0 top-[4.5rem] z-40 flex justify-center px-4 md:hidden"
          >
            <div className="w-full max-w-xs rounded-2xl border border-gray-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-2xl">
              <div className="flex flex-col items-center gap-5">
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-gray-700 transition hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <Link
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="mt-1 inline-block rounded-md bg-brand-600 px-6 py-2 text-center text-sm font-medium text-white transition hover:bg-brand-700"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
