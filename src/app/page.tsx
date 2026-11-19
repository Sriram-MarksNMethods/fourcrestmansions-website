import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Crests from "@/components/home/Crests";
import FloorPlan from "@/components/home/FloorPlan";
import Platform from "@/components/home/Platform";
import WhyUs from "@/components/home/WhyUs";
import UseCases from "@/components/home/UseCases";
import Cta from "@/components/home/Cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Crests />
      <FloorPlan />
      <Platform />
      <WhyUs />
      <UseCases />
      <Cta />
    </>
  );
}
