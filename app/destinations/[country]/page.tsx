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
  const params = useParams();

  const city = deslugify(params.country as string);

  console.log("📍 Hotel city:", city);

  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <Discovery city={city} />
      <Shortcut />
    </div>
  );
}
