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
    <header className="flex h-16 items-center justify-end border-b border-slate-800 bg-slate-900 px-6">
      <span className="text-sm text-slate-300">
        {admin ? admin.name : "..."}
      </span>
    </header>
  );
}
