import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category-service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useCategoryById(documentId: string) {
  return useQuery({
    queryKey: ["categories", documentId],
    queryFn: () => categoryService.getCategoryById(documentId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!documentId,
  });
}
