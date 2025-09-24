import { cn } from "@/lib/utils";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FAQ } from "../types";

interface FAQItemProps {
  faq: FAQ;
  className?: string;
}

export function FAQItem({ faq, className }: FAQItemProps) {
  return (
    <AccordionItem
      value={faq.documentId}
      className={cn(
        "border border-gray-200 rounded-lg overflow-hidden",
        className,
      )}
    >
      <AccordionTrigger className="hover:bg-gray-50 px-6 py-4 text-left font-semibold text-gray-900 text-lg transition-colors duration-200 [&[data-state=open]>svg]:text-red-600">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">
        <p className="text-gray-700 text-base leading-relaxed">{faq.answer}</p>
      </AccordionContent>
    </AccordionItem>
  );
}
