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
import {
  validateSearchInput,
  showSearchError,
  shouldShowError,
  logSecurityEvent,
  SecurityErrorType,
} from "@/lib/utils";
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
    getRecentSearches({ maxItems: maxRecentSearches }),
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

      const validation = validateSearchInput(debouncedQuery);
      if (!validation.isValid) {
        logSecurityEvent(SecurityErrorType.INVALID_INPUT, {
          query: debouncedQuery,
          error: validation.error,
        });
        throw new Error("Invalid search input");
      }

      try {
        return await ProductService.getProducts({
          pageSize: maxResults * 2,
          sortBy: "name",
        });
      } catch (error) {
        logSecurityEvent(SecurityErrorType.SEARCH_FAILED, {
          query: validation.sanitized,
          error: error instanceof Error ? error.message : "Unknown error",
        });
        throw error;
      }
    },
    enabled: shouldSearch,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message === "Invalid search input") {
        return false;
      }
      return failureCount < 2;
    },
  });

  const products = useMemo(() => {
    if (!searchResponse?.data || !shouldSearch) return [];

    // Filter products by search term
    const filteredProducts = filterProductsBySearchTerm(
      searchResponse.data,
      debouncedQuery,
    );

    // Sort by relevance and limit results
    const sortedProducts = sortProductsByRelevance(
      filteredProducts,
      debouncedQuery,
    );

    return sortedProducts.slice(0, maxResults);
  }, [searchResponse, debouncedQuery, shouldSearch, maxResults]);

  // Handle errors when they occur
  if (error && shouldShowError(error)) {
    showSearchError(error instanceof Error ? error : undefined);
  }

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  const addToRecentSearches = useCallback(
    (search: string) => {
      // Validate and sanitize before adding to recent searches
      const validation = validateSearchInput(search);
      if (!validation.isValid || !isValidSearchTerm(validation.sanitized)) {
        return;
      }

      const updatedSearches = addRecentSearch(validation.sanitized, {
        maxItems: maxRecentSearches,
      });
      setRecentSearches(updatedSearches);
    },
    [maxRecentSearches],
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
