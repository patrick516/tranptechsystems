// src/components/Layout/Sidebar/index.tsx
import { NavLink } from "react-router-dom";
import { logout } from "@/services/authService";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Leads", to: "/leads" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Settings", to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-56 flex-col border-r border-slate-800 bg-slate-900 p-4">
      <div className="mb-8 text-lg font-bold text-white">TranpTech</div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-4 rounded-md px-3 py-2 text-left text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
      >
        Logout
      </button>
    </aside>
  );
}
