import Hero from "@/components/destinations/abu-dhabi/Hero";
import Welcome from "@/components/destinations/abu-dhabi/Welcome";
import DiscoverTypes from "@/components/destinations/abu-dhabi/DiscoverTypes";
import ShortcutUAE from "@/components/ShortcutUAE";

export default function Destinations() {
  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <DiscoverTypes />
      <ShortcutUAE />
    </div>
  );
}
