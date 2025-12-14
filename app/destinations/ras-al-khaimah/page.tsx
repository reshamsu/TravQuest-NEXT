import Hero from "@/components/destinations/ras-al-khaimah/Hero";
import Welcome from "@/components/destinations/ras-al-khaimah/Welcome";
import DiscoverUAE from "@/components/DiscoverUAE";
import ShortcutUAE from "@/components/ShortcutUAE";

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
