"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const HideFooter = () => {
  const pathname = usePathname();
  const noNavRoutes = [
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/destinations",
    "/dashboard/destinations/add",
  ];

  if (noNavRoutes.includes(pathname)) return null;

  return <Footer />;
};

export default HideFooter;
