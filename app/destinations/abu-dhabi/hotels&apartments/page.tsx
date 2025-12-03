import Hero from "@/components/destinations/abu-dhabi/hotels&apartments/Hero";
import Welcome from "@/components/destinations/abu-dhabi/hotels&apartments/Welcome";
import Discovery from "@/components/destinations/abu-dhabi/hotels&apartments/Discovery";
import Shortcut from "@/components/destinations/abu-dhabi/hotels&apartments/Shortcut";

export default function Destinations() {
  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <Discovery />
      <Shortcut />
    </div>
  );
}
