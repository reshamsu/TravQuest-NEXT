import Hero from "@/components/destinations/REDUCE STUFF/abu-dhabi/hotels-apartments/Hero";
import Welcome from "@/components/destinations/REDUCE STUFF/abu-dhabi/hotels-apartments/Welcome";
import DiscoverHotels from "@/components/destinations/REDUCE STUFF/abu-dhabi/hotels-apartments/DiscoverHotels";
import ShortcutUAE from "@/components/destinations/Shortcut";

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
