"use client";

import { useParams } from "next/navigation";
import Hero from "@/components/destinations/Hero";
import Welcome from "@/components/destinations/Welcome";
import Discovery from "@/components/destinations/Discovery";
import Shortcut from "@/components/destinations/Shortcut";

const deslugify = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function Page() {
  const { country } = useParams<{ country?: string }>();

  // 🚨 REQUIRED GUARD
  if (!country) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-500">
        Loading destination…
      </div>
    );
  }

  const city = deslugify(country);

  console.log("📍 Destination city:", city);

  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <Discovery city={city} />
      <Shortcut />
    </div>
  );
}
