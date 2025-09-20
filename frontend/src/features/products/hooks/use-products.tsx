import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/products-service";
import type { ProductFilters } from "@/types";

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => ProductService.getProducts(filters),
    select: (data) => ({
      products: data.data,
      pagination: data.meta.pagination,
    }),
  });
}

export function useProduct(documentId: string) {
  return useQuery({
    queryKey: ["product", documentId],
    queryFn: () => ProductService.getProduct(documentId),
  });
}
