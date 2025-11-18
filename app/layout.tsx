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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HideNavbar />
        <main className="relative overflow-hidden">{children}</main>
        <HideFooter />
      </body>
    </html>
  );
}
