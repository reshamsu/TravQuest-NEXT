import Hero from "@/components/destinations/thailand/Hero";
import Welcome from "@/components/destinations/thailand/Welcome";
import Discovery from "@/components/destinations/thailand/Discovery";
import Shortcut from "@/components/destinations/thailand/Shortcut";

export default function Destinations() {
  return (
    <div className="relative z-30 pt-20">
      <Hero />
      <Welcome />
      <Discovery />
      <Shortcut />
    </div>
  );
}
