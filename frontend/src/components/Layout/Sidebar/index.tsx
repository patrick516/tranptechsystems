import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "@/services/authService";
import { getLeads } from "@/services/leadService";
import logo from "@/assets/tranptech-logo.png";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Leads", to: "/leads" },
  { label: "Quotes", to: "/quotes" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Settings", to: "/settings" },
];
export default function Sidebar() {
  const [newLeadsCount, setNewLeadsCount] = useState(0);

  useEffect(() => {
    getLeads("new")
      .then((leads) => setNewLeadsCount(leads.length))
      .catch(() => setNewLeadsCount(0));
  }, []);

  return (
    <aside className="sticky top-0 flex h-screen w-56 flex-col overflow-y-auto border-r border-gray-200 bg-white p-4">
      <div className="mb-8 px-1">
        <img src={logo} alt="TranpTech Systems" className="h-9 w-auto" />
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium tracking-tight transition ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span>{item.label}</span>
            {item.to === "/leads" && newLeadsCount > 0 && (
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                {newLeadsCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-4 rounded-md px-3 py-2 text-left text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      >
        Logout
      </button>
    </aside>
  );
}
