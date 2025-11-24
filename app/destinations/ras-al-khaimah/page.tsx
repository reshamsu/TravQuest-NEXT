import Hero from "@/components/destinations/ras-al-khaimah/Hero";
import Shortcut from "@/components/destinations/ras-al-khaimah/Shortcut";
import Welcome from "@/components/destinations/ras-al-khaimah/Welcome";

export default function Contact() {
  return (
    <div className="relative z-30 pt-20">
      <Hero />
      <Welcome />
      <Shortcut />
    </div>
  );
}
