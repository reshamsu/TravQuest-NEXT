import Hero from "@/components/destinations/REDUCE STUFF/abu-dhabi/Hero";
import Welcome from "@/components/destinations/REDUCE STUFF/abu-dhabi/Welcome";
import DiscoverTypes from "@/components/destinations/REDUCE STUFF/abu-dhabi/DiscoverTypes";
import ShortcutUAE from "@/components/destinations/Shortcut";

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
