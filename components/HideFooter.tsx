"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const HideFooter = () => {
  const pathname = usePathname();
  const noNavRoutes = [
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/hero/",
    "/dashboard/hero/add",
    "/dashboard/destinations",
    "/dashboard/destinations/add",
    "/dashboard/packages",
    "/dashboard/packages/add",
  ];

  if (noNavRoutes.includes(pathname)) return null;

  return <Footer />;
};

export default HideFooter;
