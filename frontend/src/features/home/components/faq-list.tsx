import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./faq-item";
import type { FAQ } from "../types";

interface FAQListProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQList({ faqs, className }: FAQListProps) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-gray-600 text-lg">
          No hay preguntas frecuentes disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className={cn("space-y-4", className)}>
      {faqs.map((faq) => (
        <FAQItem key={faq.documentId} faq={faq} />
      ))}
    </Accordion>
  );
}
