"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbMenu, TbX } from "react-icons/tb";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/users", label: "Users" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-black bg-white p-2 rounded-md shadow"
        onClick={() => setOpen(true)}
      >
        <TbMenu size={24} />
      </button>

      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 h-screen bg-gray-900 text-white flex-col p-4">
        <nav className="space-y-3 mt-6">
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-lg transition
                ${
                  isActive(link.href)
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-800"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE SIDEBAR PANEL */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 md:hidden transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setOpen(false)}>
            <TbX size={28} className="text-white" />
          </button>
        </div>

        <nav className="space-y-3 p-4">
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg transition
                ${
                  isActive(link.href)
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-800"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
