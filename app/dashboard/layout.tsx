import Link from "next/link";
import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      
      {/* SIDEBAR */}
     <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>

    </div>
  );
}
