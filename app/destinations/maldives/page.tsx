import Hero from "@/components/destinations/maldives/Hero";
import Welcome from "@/components/destinations/maldives/Welcome";
import Discovery from "@/components/destinations/maldives/Discovery";
import Shortcut from "@/components/destinations/maldives/Shortcut";

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
