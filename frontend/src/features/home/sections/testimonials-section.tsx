import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { SectionTitle } from "../components/section-title";
import { testimonialsConfig } from "../config/testimonials-config";
import type { TestimonialsSectionProps, TestimonialItem } from "../types";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

interface DotIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}

function DotIndicators({
  totalSlides,
  currentSlide,
  onDotClick,
}: DotIndicatorsProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "rounded-full w-2 h-2 transition-all duration-300 cursor-pointer",
            currentSlide === index
              ? "bg-red-600 w-8"
              : "bg-gray-300 hover:bg-gray-400",
          )}
          onClick={() => onDotClick(index)}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  );
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className={cn("bg-gray-50 py-12 md:py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        <SectionTitle
          title={sectionContent.title}
          subtitle={sectionContent.subtitle}
          className="mb-12 md:mb-16"
        />

        {/* Testimonials Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            orientation="horizontal"
            className="mx-auto w-full max-w-sm md:max-w-xl xl:max-w-6xl"
            setApi={setApi}
          >
            <CarouselContent className="-ml-1">
              {sectionContent.testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-6 basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Dot Indicators */}
          <DotIndicators
            totalSlides={count}
            currentSlide={current - 1}
            onDotClick={scrollToSlide}
          />
        </div>
      </div>
    </section>
  );
}
