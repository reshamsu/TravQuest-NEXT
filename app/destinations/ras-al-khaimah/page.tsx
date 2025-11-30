import Hero from "@/components/destinations/ras-al-khaimah/Hero";
import Welcome from "@/components/destinations/ras-al-khaimah/Welcome";
import Discovery from "@/components/destinations/ras-al-khaimah/Discovery";
import Shortcut from "@/components/destinations/ras-al-khaimah/Shortcut";

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
