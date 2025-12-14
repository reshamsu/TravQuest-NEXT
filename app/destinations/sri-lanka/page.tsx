import Hero from "@/components/destinations/sri-lanka/Hero";
import Welcome from "@/components/destinations/sri-lanka/Welcome";
import DiscoverASIA from "@/components/DiscoverASIA";
import ShortcutASIA from "@/components/ShortcutASIA";

export default function Destinations() {
  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <DiscoverASIA />
      <ShortcutASIA />
    </div>
  );
}
