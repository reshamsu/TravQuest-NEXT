import Hero from "@/components/destinations/sri-lanka/Hero";
import Welcome from "@/components/destinations/sri-lanka/Welcome";
import Discovery from "@/components/destinations/sri-lanka/Discovery";
import Shortcut from "@/components/destinations/sri-lanka/Shortcut";

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
