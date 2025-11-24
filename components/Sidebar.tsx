"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Side_Links } from "@/constants/SideLinks";
import { TbMenu, TbX, TbChevronDown } from "react-icons/tb";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setOpen(true)}
      >
        <TbMenu size={24} />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-70 bg-gray-900 text-white text-sm z-50 transform
          transition-transform duration-300 md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-8 md:hidden">
          <h2 className="text-base font-bold">Dashboard</h2>
          <button onClick={() => setOpen(false)}>
            <TbX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-8 px-4 py-6">
          <div className="flex items-center justify-center gap-2 lg:gap-4">
            <Link href="/" className="flex flex-col items-center gap-4">
              <Image
                src="/favicon.ico"
                alt="TQ"
                width={64}
                height={64}
                className="object-contain"
              />
              <Image
                src="/tq-logo.png"
                alt="TQ"
                width={180}
                height={180}
                className="object-contain"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {Side_Links.map((link) => (
              <div key={link.key}>
                {link.submenu ? (
                  <details className="group">
                    <summary
                      className={`flex items-center justify-between cursor-pointer px-6 py-3 rounded-2xl ${
                        isActive(link.href)
                          ? "bg-gray-800 font-bold"
                          : "hover:font-bold"
                      }`}
                    >
                      {link.label}
                      <TbChevronDown className="opacity-60 group-open:rotate-180 transition-transform" />
                    </summary>

                    {/* Submenu */}
                    <ul className="pl-6 mt-2 space-y-1">
                      {link.submenu.map((sublink) => (
                        <li key={sublink.href}>
                          <Link
                            href={sublink.href}
                            onClick={() => setOpen(false)}
                            className={`block px-6 py-3 rounded-md text-sm ${
                              isActive(sublink.href)
                                ? "bg-gray-800 font-bold"
                                : "hover:font-bold"
                            }`}
                          >
                            {sublink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={link.href}
                    className={`block px-6 py-3 rounded-2xl transition ${
                      isActive(link.href)
                        ? "bg-gray-800 font-bold"
                        : "hover:font-bold"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
