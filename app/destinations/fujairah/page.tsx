import Hero from "@/components/destinations/fujairah/Hero";
import Welcome from "@/components/destinations/fujairah/Welcome";
import Discovery from "@/components/destinations/fujairah/Discovery";
import Shortcut from "@/components/destinations/fujairah/Shortcut";

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
