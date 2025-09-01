import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/products-service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getProducts,
  });
}

export function useProduct(documentId: string) {
  return useQuery({
    queryKey: ["product", documentId],
    queryFn: () => ProductService.getProduct(documentId),
  });
}
