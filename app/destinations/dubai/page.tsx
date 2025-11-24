import Hero from "@/components/destinations/dubai/Hero";
import Welcome from "@/components/destinations/dubai/Welcome";
import Discovery from "@/components/destinations/dubai/Discovery";
import Shortcut from "@/components/destinations/dubai/Shortcut";

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
