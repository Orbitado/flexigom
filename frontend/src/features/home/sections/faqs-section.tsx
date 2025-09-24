import { cn } from "@/lib/utils";
import { SectionTitle } from "../components/section-title";
import { FAQList } from "../components/faq-list";
import { useFAQs } from "../hooks/use-faqs";
import type { FAQsSectionProps } from "../types";

function FAQSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex-1 bg-gray-200 mr-4 rounded h-6 animate-pulse" />
              <div className="bg-gray-200 rounded w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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
            <FAQSkeleton />
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
