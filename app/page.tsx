import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Background from "@/components/home/Background";
import Discovery from "@/components/home/Discovery";
import Packages from "@/components/home/Packages";
import Shortcut from "@/components/home/Shortcut";
import Corporate from "@/components/home/Corperate";

export default function Home() {
  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <Background />
      <Shortcut />
      {/* <Discovery /> */}
      <Packages />
      <Corporate />
    </div>
  );
}
