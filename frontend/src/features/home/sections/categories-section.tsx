import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { SectionTitle } from "../components/section-title";
import { CategoryCard } from "../components/category-card";
import { categoriesConfig } from "../config/categories-config";
import type { CategoriesSectionProps, CategoryItem } from "../types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

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
          aria-label={`Go to category ${index + 1}`}
        />
      ))}
    </div>
  );
}

export function CategoriesSection({
  content,
  className,
}: CategoriesSectionProps = {}) {
  const sectionContent = { ...categoriesConfig, ...content };
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const shouldShowCarousel = sectionContent.categories.length > 3;

  useEffect(() => {
    if (!api || !shouldShowCarousel) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, shouldShowCarousel]);

  const scrollToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  const renderCategories = (categories: CategoryItem[]) => {
    if (shouldShowCarousel) {
      return (
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            orientation="horizontal"
            className="mx-auto w-full max-w-sm md:max-w-xl xl:max-w-6xl"
            setApi={setApi}
          >
            <CarouselContent className="-ml-1">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-6 basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <CategoryCard category={category} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <DotIndicators
            totalSlides={count}
            currentSlide={current - 1}
            onDotClick={scrollToSlide}
          />
        </div>
      );
    }

    return (
      <div className="gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    );
  };

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title={sectionContent.title}
          subtitle={sectionContent.subtitle}
          className="mb-12 md:mb-16"
        />

        {renderCategories(sectionContent.categories)}
      </div>
    </section>
  );
}
