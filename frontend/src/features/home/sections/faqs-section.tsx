import { cn } from "@/lib/utils";
import { SectionTitle } from "../components/section-title";
import { FAQList } from "../components/faq-list";
import { useFAQs } from "../hooks/use-faqs";
import type { FAQsSectionProps } from "../types";
import { FAQsSkeleton } from "@/features/products/skeletons/faqs-skeleton";

function FAQError() {
  return (
    <div className="py-8 text-center">
      <p className="mb-4 text-gray-600 text-lg">
        No se pudieron cargar las preguntas frecuentes.
      </p>
      <p className="text-gray-500 text-sm">
        Por favor, intenta nuevamente más tarde.
      </p>
    </div>
  );
}

export function FAQsSection({ content, className }: FAQsSectionProps = {}) {
  const { data: faqs, isLoading, isError } = useFAQs();

  const defaultContent = {
    title: "Preguntas Frecuentes",
    subtitle:
      "Resolvemos las dudas más comunes sobre nuestros productos y servicios",
  };

  const sectionContent = { ...defaultContent, ...content };

  if (!isLoading && !isError && (!faqs || faqs.length === 0)) {
    return null;
  }

  return (
    <section className={cn("bg-gray-50 py-12 md:py-16", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Title */}
        <SectionTitle
          title={sectionContent.title}
          subtitle={sectionContent.subtitle}
          className="mb-12 md:mb-16"
        />

        {/* FAQ Content */}
        <div className="mx-auto max-w-4xl">
          {isLoading ? (
            <FAQsSkeleton />
          ) : isError ? (
            <FAQError />
          ) : (
            <FAQList faqs={faqs || []} />
          )}
        </div>
      </div>
    </section>
  );
}
