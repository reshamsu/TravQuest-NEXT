import Section1 from "@/components/dashboard/hompage/HPSection1";
import Section2 from "@/components/dashboard/hompage/HPSection2";
import Section3 from "@/components/dashboard/hompage/HPSection3";

export default function Dashboard() {
  return (
    <div className="relative z-30">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}
