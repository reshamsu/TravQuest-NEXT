import Hero from "@/components/attractions/Hero";
import Info from "@/components/attractions/Intro";
import DiscoverASIA from "@/components/DiscoverASIA";

export const dynamic = "force-dynamic";

export default function Contact() {
  return (
    <div className="relative z-30">
      <Hero />
      <Info />
      <DiscoverASIA />
    </div>
  );
}
