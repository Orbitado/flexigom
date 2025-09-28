import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductService } from "../services/products-service";
import {
  filterProductsBySearchTerm,
  sortProductsByRelevance,
  isValidSearchTerm,
} from "@/lib/utils/search";
import {
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches as clearRecentSearchesUtil,
} from "@/lib/utils/recentSearches";
import type { Product } from "@/types";

interface UseProductSearchOptions {
  maxResults?: number;
  enabled?: boolean;
  debounceMs?: number;
  maxRecentSearches?: number;
}

interface UseProductSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  clearSearch: () => void;
  recentSearches: string[];
  addToRecentSearches: (search: string) => void;
  clearRecentSearches: () => void;
}

export function useProductSearch({
  maxResults = 10,
  enabled = true,
  debounceMs = 300,
  maxRecentSearches = 5,
}: UseProductSearchOptions = {}): UseProductSearchReturn {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    getRecentSearches({ maxItems: maxRecentSearches })
  );

  const debouncedQuery = useDebounce(query, debounceMs);
  const shouldSearch = enabled && isValidSearchTerm(debouncedQuery);

  const {
    data: searchResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-search", debouncedQuery, maxResults],
    queryFn: async () => {
      if (!shouldSearch) return { data: [] };

      return ProductService.getProducts({
        pageSize: maxResults * 2, // Get more products to filter locally for better relevance
        sortBy: "name",
      });
    },
    enabled: shouldSearch,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const products = useMemo(() => {
    if (!searchResponse?.data || !shouldSearch) return [];

    // Filter products by search term
    const filteredProducts = filterProductsBySearchTerm(
      searchResponse.data,
      debouncedQuery
    );

    // Sort by relevance and limit results
    const sortedProducts = sortProductsByRelevance(
      filteredProducts,
      debouncedQuery
    );

    return sortedProducts.slice(0, maxResults);
  }, [searchResponse, debouncedQuery, shouldSearch, maxResults]);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  const addToRecentSearches = useCallback(
    (search: string) => {
      if (!isValidSearchTerm(search)) return;

      const updatedSearches = addRecentSearch(search, {
        maxItems: maxRecentSearches,
      });
      setRecentSearches(updatedSearches);
    },
    [maxRecentSearches]
  );

  const clearRecentSearches = useCallback(() => {
    const updatedSearches = clearRecentSearchesUtil({
      maxItems: maxRecentSearches,
    });
    setRecentSearches(updatedSearches);
  }, [maxRecentSearches]);

  return {
    query,
    setQuery,
    products,
    isLoading: shouldSearch && isLoading,
    error: error as Error | null,
    clearSearch,
    recentSearches,
    addToRecentSearches,
    clearRecentSearches,
  };
}