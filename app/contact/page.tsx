import Hero from "@/components/contact/Hero";
import Info from "@/components/contact/Info";

export const dynamic = "force-dynamic";

export default function Contact() {
  return (
    <div className="relative z-30">
      <Hero />
      <Info />
    </div>
  );
}
