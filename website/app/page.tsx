import Hero from "@/components/sections/Hero";
import ClientLogos from "@/components/sections/ClientLogos";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Benefits from "@/components/sections/Benefits";
import Portfolio from "@/components/sections/Portfolio";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <Services />
      <WhyChooseUs />
      <Benefits />
      <Portfolio />
      <CTA />
      <Contact />
    </main>
  );
}
