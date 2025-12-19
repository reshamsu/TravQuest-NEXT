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
    "/dashboard/hero/all",
    "/dashboard/hero/add",
    "/dashboard/destinations",
    "/dashboard/destinations/all",
    "/dashboard/destinations/add",
    "/dashboard/hotels",
    "/dashboard/hotels/all",
    "/dashboard/hotels/add",
    "/dashboard/shortcuts",
    "/dashboard/shortcuts/all",
    "/dashboard/shortcuts/add",
    "/dashboard/packages",
    "/dashboard/packages/all",
    "/dashboard/packages/add",
  ];

  if (noNavRoutes.includes(pathname)) return null;

  return <Footer />;
};

export default HideFooter;
