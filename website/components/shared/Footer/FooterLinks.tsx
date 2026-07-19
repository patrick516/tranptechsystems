// components/shared/Footer/FooterLinks.tsx
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function FooterLinks() {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-gray-900">Quick Links</h3>
      <ul className="space-y-2">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-500 transition hover:text-brand-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
