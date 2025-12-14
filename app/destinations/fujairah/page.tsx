import Hero from "@/components/destinations/fujairah/Hero";
import Welcome from "@/components/destinations/fujairah/Welcome";
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
