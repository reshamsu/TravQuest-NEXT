import Hero from "@/components/destinations/dubai/Hero";
import Welcome from "@/components/destinations/dubai/Welcome";
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
