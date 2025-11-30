import Hero from "@/components/destinations/abu-dhabi/Hero";
import Welcome from "@/components/destinations/abu-dhabi/Welcome";
import Discovery from "@/components/destinations/abu-dhabi/Discovery";
import Shortcut from "@/components/destinations/abu-dhabi/Shortcut";

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
