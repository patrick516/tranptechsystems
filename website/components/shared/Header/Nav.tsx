// components/shared/Header/Nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

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
        className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 md:hidden"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-16 z-40 w-full border-b border-gray-200 bg-white p-4 shadow-sm md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-md bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
