import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { SectionTitle } from "../components/section-title";
import { testimonialsConfig } from "../config/testimonials-config";
import type { TestimonialsSectionProps, TestimonialItem } from "../types";
import { Separator } from "@/components/ui/separator";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white shadow-lg hover:shadow-xl p-6 border border-gray-100 rounded-xl transition-shadow duration-300">
      {/* Star Rating */}
      <div className="flex mb-4">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="fill-current w-5 h-5 text-red-600" />
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="mb-6 text-gray-700 text-base italic leading-relaxed">
        "{testimonial.testimonial}"
      </blockquote>

      <Separator className="my-4" />

      {/* Customer Info */}
      <div className="space-y-2 leading-relaxed">
        <h4 className="font-bold text-black text-lg">
          {testimonial.customerName}
        </h4>
        <p className="text-gray-600 text-sm">{testimonial.customerLocation}</p>
        <p className="font-medium text-red-600 text-xs">
          Cliente desde {testimonial.customerSince}
        </p>
      </div>
    </div>
  );
}

export function TestimonialsSection({
  content,
  className,
}: TestimonialsSectionProps = {}) {
  const sectionContent = { ...testimonialsConfig, ...content };

  return (
    <section className={cn("bg-gray-50 py-12 md:py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        <SectionTitle
          title={sectionContent.title}
          subtitle={sectionContent.subtitle}
          className="mb-12 md:mb-16"
        />

        {/* Testimonials Grid */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sectionContent.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
