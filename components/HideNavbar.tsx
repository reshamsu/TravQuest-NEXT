"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const HideNavbar = () => {
  const pathname = usePathname();
  const noNavRoutes = [
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/destinations",
    "/dashboard/destinations/add",
  ];

  if (noNavRoutes.includes(pathname)) return null;

  return <Navbar />;
};

export default HideNavbar;
