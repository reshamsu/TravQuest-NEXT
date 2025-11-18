import type { Metadata } from "next";
import "./globals.css";
import HideNavbar from "@/components/HideNavbar";
import HideFooter from "@/components/HideFooter";

export const metadata: Metadata = {
  title: "TravQuest - The Travel Hub",
  description: "TravQuest UAE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HideNavbar />
      <body className="relative overflow-hidden">{children}</body>
      <HideFooter />
    </html>
  );
}
