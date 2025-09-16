import { useQuery } from "@tanstack/react-query";
import { FeaturedProductService } from "../services/featured-products-service";
import type { FeaturedProductSection } from "../types";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: FeaturedProductService.getFeaturedProducts,
  });
}

export function useFeaturedProduct(documentId: string) {
  return useQuery({
    queryKey: ["featured-product", documentId],
    queryFn: () => FeaturedProductService.getFeaturedProduct(documentId),
    enabled: !!documentId,
  });
}

export function useFeaturedProductsBySection(section: FeaturedProductSection) {
  return useQuery({
    queryKey: ["featured-products", "section", section],
    queryFn: () => FeaturedProductService.getFeaturedProductsBySection(section),
  });
}
