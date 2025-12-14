import Hero from "@/components/destinations/abu-dhabi/hotels&apartments/Hero";
import Welcome from "@/components/destinations/abu-dhabi/hotels&apartments/Welcome";
import DiscoverHotels from "@/components/destinations/abu-dhabi/hotels&apartments/DiscoverHotels";
import ShortcutUAE from "@/components/ShortcutUAE";

export default function Destinations() {
  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <DiscoverHotels />
      <ShortcutUAE />
    </div>
  );
}
