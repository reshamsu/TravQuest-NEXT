import Hero from "@/components/monthly_stays/Hero";
// import Welcome from "@/components/home/Welcome";
// import Corporate from "@/components/home/Corperate";
import MonthlyStays from "@/components/home/MonthlyStays";
// import Transfers from "@/components/home/Transfers";

export default function Home() {
  return (
    <div className="relative z-30">
      <Hero />
      {/* <Welcome /> */}
      {/* <Corporate /> */}
      <MonthlyStays />
      {/* <Transfers /> */}
    </div>
  );
}
