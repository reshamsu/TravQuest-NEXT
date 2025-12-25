"use client";

import { useParams } from "next/navigation";
import Hero from "@/components/discovery/Hero";
import Welcome from "@/components/discovery/Welcome";
import Hotels from "@/components/discovery/Hotels";
import Shortcut from "@/components/discovery/Shortcut";

const deslugify = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function Page() {
  const params = useParams();

  const city = deslugify(params.country as string);

  console.log("📍 Discovery city:", city);

  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <Hotels city={city} />
      <Shortcut />
    </div>
  );
}
