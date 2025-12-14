import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Background from "@/components/home/Background";
import Discovery from "@/components/home/Discovery";
import Packages from "@/components/home/Packages";
import ShortcutASIA from "@/components/ShortcutASIA";
import Corporate from "@/components/home/Corperate";
import MonthlyStays from "@/components/home/MonthlyStays";
import Transfers from "@/components/home/Transfers";

export default function Home() {
  return (
    <div className="relative z-30">
      <Hero />
      <Welcome />
      <Background />
      <ShortcutASIA />
      {/* <Discovery /> */}
      <Packages />
      <Corporate />
      <MonthlyStays />
      <Transfers />
    </div>
  );
}
