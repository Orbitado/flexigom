import { useQuery } from "@tanstack/react-query";
import { FAQService } from "../services/faq-service";

export function useFAQs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: FAQService.getFAQs,
  });
}

export function useFAQ(documentId: string) {
  return useQuery({
    queryKey: ["faq", documentId],
    queryFn: () => FAQService.getFAQ(documentId),
    enabled: !!documentId,
  });
}