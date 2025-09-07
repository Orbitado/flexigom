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

export function useCategoryById(contractId: string) {
  return useQuery({
    queryKey: ["categories", contractId],
    queryFn: () => categoryService.getCategoryById(contractId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!contractId,
  });
}
