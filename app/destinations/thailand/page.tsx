import Hero from "@/components/destinations/thailand/Hero";
import Welcome from "@/components/destinations/thailand/Welcome";
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
