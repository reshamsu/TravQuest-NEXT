import Hero from "@/components/destinations/Hero";
import Welcome from "@/components/destinations/Welcome";
import DiscoverUAE from "@/components/destinations/REDUCE STUFF/DiscoverUAE";
import ShortcutUAE from "@/components/destinations/Shortcut";

export default function Destinations() {
  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <DiscoverUAE />
      <ShortcutUAE />
    </div>
  );
}
