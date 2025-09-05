import { HeroSection } from "@/features/home/sections/hero-section";
import { WhyChooseFlexigomSection } from "@/features/home/sections/why-choose-flexigom-section";
import { TestimonialsSection } from "@/features/home/sections/testimonials-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseFlexigomSection />
      <TestimonialsSection />
    </>
  );
}
