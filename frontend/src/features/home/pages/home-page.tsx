import { HeroSection } from "@/features/home/sections/hero-section";
import { CategoriesSection } from "@/features/home/sections/categories-section";
import { FeaturedProductsSection } from "@/features/home/sections/featured-products-section";
import { WhyChooseFlexigomSection } from "@/features/home/sections/why-choose-flexigom-section";
import { TestimonialsSection } from "@/features/home/sections/testimonials-section";
import { HelpSection } from "@/features/home/sections/help-section";
import { FAQsSection } from "@/features/home/sections/faqs-section";
import { FooterSection } from "@/features/home/sections/footer-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseFlexigomSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <HelpSection />
      <FAQsSection />
      <TestimonialsSection />
      <FooterSection />
    </>
  );
}
