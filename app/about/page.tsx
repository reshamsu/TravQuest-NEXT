import Hero from "@/components/about/Hero";
import Welcome from "@/components/about/Welcome";
import Values from "@/components/about/Values";

export default function About() {
  return (
    <div className="relative z-30 pt-20">
      <Hero />
      <Welcome />
      <Values />
    </div>
  );
}
