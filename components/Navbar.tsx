"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Nav_Links } from "@/constants/NavLinks";
import { TbMenu, TbX, TbChevronDown, TbPhone, TbUser } from "react-icons/tb";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <header className="fixed z-40 w-full select-none">
      <nav className="max-w-6xl lg:mt-4 mx-auto bg-black/60 backdrop-blur-3xl select-none shadow-xl lg:rounded-full flex items-center justify-between py-4 px-6">
        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="TQ"
              width={60}
              height={60}
              className="object-contain"
            />
          </Link>

          <Link href="/" className="flex items-center">
            <Image
              src="/tq-logo.png"
              alt="TQ"
              width={160}
              height={160}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="block md:hidden">
          <Link href="/" className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="TQ"
              width={60}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="block md:hidden">
          <Link href="/" className="flex items-center">
            <Image
              src="/tq-logo.png"
              alt="TQ"
              width={160}
              height={160}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden h-full gap-1 lg:flex text-[12px]">
          {Nav_Links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(link.href + "/");

            return (
              <li key={link.key} className="relative group">
                {link.submenu ? (
                  <button
                    className={`flex items-center cursor-pointer font-medium transition-all duration-500 rounded-full py-2 px-4
                      ${
                        isActive
                          ? "bg-[#f2836f]/10 font-medium text-[#f2836f]"
                          : "hover:font-bold text-white hover:text-[#f2836f]/70"
                      }`}
                  >
                    {link.label}
                    <TbChevronDown size={16} className="ml-1" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center cursor-pointer font-medium transition-all duration-500 rounded-full py-2 px-4
                      ${
                        isActive
                          ? "bg-[#f2836f]/10 font-medium text-[#f2836f]"
                          : "hover:font-bold text-white hover:text-[#f2836f]/80"
                      }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Desktop Dropdown */}
                {link.submenu && (
                  <ul className="absolute top-full left-0 mt-2 w-44 p-2.5 bg-white backdrop-blur-3xl font-medium rounded-xl shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {link.submenu.map((sublink) => (
                      <li
                        key={sublink.href}
                        className="py-2.5 px-4 rounded-xl text-black hover:text-[#f2836f] hover:bg-[#f2836f]/10 transition"
                      >
                        <Link href={sublink.href} className="block w-full">
                          {sublink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Right Side */}
        <div className="flex items-center gap-4 text-sm select-none">
          <div className="hidden md:flex gap-2">
            <Link
              href="/login"
              className="select-none btn-dark-glass btn-dynamic"
            >
              <TbUser size={22} className="text-white" />
            </Link>
            <Link
              href="https://wa.me/971529991223"
              className="select-none btn-orange-sm btn-dynamic"
            >
              <TbPhone size={22} /> Inquire Now
            </Link>
          </div>
          <button
            aria-label="Open menu"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <TbX className="w-8 h-8 cursor-pointer text-[#f2836f]" />
            ) : (
              <TbMenu className="w-8 h-8 cursor-pointer text-[#05B0AA] " />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white/90 backdrop-blur-3xl rounded-b-4xl text-black overflow-hidden xl:hidden select-none shadow-xl transition-transform duration-300 ease-in-out origin-top ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <ul className="flex flex-col gap-2 p-6 text-sm">
          {Nav_Links.map((link) => (
            <li key={link.key}>
              {link.submenu ? (
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer rounded-full w-full py-3 px-6 transition-all duration-500 hover:bg-white/5">
                    {link.label}
                    <TbChevronDown className="ml-1" />
                  </summary>

                  <ul className="flex flex-col my-2 px-10 text-black/90">
                    {link.submenu.map((sublink) => (
                      <li key={sublink.href} className="py-3">
                        <Link
                          href={sublink.href}
                          onClick={() => setIsOpen(false)}
                          className="block hover:text-[#f2836f]"
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
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between transition-all duration-500 rounded-full w-full py-3 px-6 hover:bg-white/5 text-black"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <div className="p-4 flex md:hidden items-center gap-4 text-sm">
            <Link
              href="/login"
              className="select-none btn-dark-glass btn-dynamic"
            >
              <TbUser size={22} />
            </Link>
            <Link
              href="https://wa.me/971529991223"
              className="select-none btn-orange-sm btn-dynamic"
            >
              <TbPhone size={22} /> Inquire Now
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
