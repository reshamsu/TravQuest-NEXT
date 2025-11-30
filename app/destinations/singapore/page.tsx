import Hero from "@/components/destinations/singapore/Hero";
import Welcome from "@/components/destinations/singapore/Welcome";
import Discovery from "@/components/destinations/singapore/Discovery";
import Shortcut from "@/components/destinations/singapore/Shortcut";

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
