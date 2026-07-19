// src/components/Layout/Topbar/index.tsx
import { useEffect, useState } from "react";
import { getMe } from "@/services/authService";
import type { Admin } from "@/services/authService";

export default function Topbar() {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    getMe()
      .then(setAdmin)
      .catch(() => setAdmin(null));
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6">
      <span className="text-sm text-gray-600">
        {admin ? admin.name : "..."}
      </span>
    </header>
  );
}
