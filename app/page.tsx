import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Background from "@/components/home/Background";
import Discovery from "@/components/home/Discovery";
import Destinations from "@/components/home/Destinations";
import Shortcut from "@/components/home/Shortcut";

export default function Home() {
  return (
    <div className="relative z-30 pt-20">
      <Hero />
      <Welcome />
      <Background />
      <Discovery />
      <Destinations />
      <Shortcut />
    </div>
  );
}
