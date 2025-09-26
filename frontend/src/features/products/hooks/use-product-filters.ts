import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { ProductFilters } from "@/types";
import {
  DEFAULT_FILTERS,
  DEFAULT_PRICE_RANGE,
} from "../constants/products-constants";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [tempPriceRange, setTempPriceRange] =
    useState<number[]>(DEFAULT_PRICE_RANGE);

  // Initialize filters from URL parameters on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const brandParam = searchParams.get("brand");
    const compositionParam = searchParams.get("composition");
    const measurementParam = searchParams.get("measurement");
    const sortParam = searchParams.get("sort");
    const pageParam = searchParams.get("page");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const initialFilters: ProductFilters = {
      ...DEFAULT_FILTERS,
      categories: categoryParam ? [categoryParam] : undefined,
      brands: brandParam ? brandParam.split(",") : undefined,
      compositions: compositionParam ? compositionParam.split(",") : undefined,
      measurements: measurementParam ? measurementParam.split(",") : undefined,
      sortBy: (sortParam as ProductFilters["sortBy"]) || DEFAULT_FILTERS.sortBy,
      page: pageParam ? parseInt(pageParam, 10) : DEFAULT_FILTERS.page,
      priceRange:
        minPriceParam && maxPriceParam
          ? {
              min: parseInt(minPriceParam, 10),
              max: parseInt(maxPriceParam, 10),
            }
          : DEFAULT_FILTERS.priceRange,
    };

    setFilters(initialFilters);

    // Update temp price range if price params exist
    if (minPriceParam && maxPriceParam) {
      setTempPriceRange([
        parseInt(minPriceParam, 10),
        parseInt(maxPriceParam, 10),
      ]);
    }
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = (newFilters: ProductFilters) => {
    const params = new URLSearchParams();

    if (newFilters.categories?.length) {
      params.set("category", newFilters.categories[0]);
    }
    if (newFilters.brands?.length) {
      params.set("brand", newFilters.brands.join(","));
    }
    if (newFilters.compositions?.length) {
      params.set("composition", newFilters.compositions.join(","));
    }
    if (newFilters.measurements?.length) {
      params.set("measurement", newFilters.measurements.join(","));
    }
    if (newFilters.sortBy && newFilters.sortBy !== DEFAULT_FILTERS.sortBy) {
      params.set("sort", newFilters.sortBy);
    }
    if (newFilters.page && newFilters.page !== DEFAULT_FILTERS.page) {
      params.set("page", newFilters.page.toString());
    }
    if (
      newFilters.priceRange &&
      (newFilters.priceRange.min !== DEFAULT_PRICE_RANGE[0] ||
        newFilters.priceRange.max !== DEFAULT_PRICE_RANGE[1])
    ) {
      params.set("minPrice", newFilters.priceRange.min.toString());
      params.set("maxPrice", newFilters.priceRange.max.toString());
    }

    setSearchParams(params, { replace: true });
  };

  const handleBrandFilter = (brand: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      brands: checked
        ? [...(filters.brands || []), brand]
        : (filters.brands || []).filter((b) => b !== brand),
      page: 1,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleCompositionFilter = (composition: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      compositions: checked
        ? [...(filters.compositions || []), composition]
        : (filters.compositions || []).filter((c) => c !== composition),
      page: 1,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleMeasurementFilter = (measurement: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      measurements: checked
        ? [...(filters.measurements || []), measurement]
        : (filters.measurements || []).filter((m) => m !== measurement),
      page: 1,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleCategoryFilter = (category: string, checked: boolean) => {
    const newFilters = {
      ...filters,
      categories: checked
        ? [...(filters.categories || []), category]
        : (filters.categories || []).filter((c) => c !== category),
      page: 1,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setTempPriceRange(values);
    const newFilters = {
      ...filters,
      priceRange: { min: values[0], max: values[1] },
      page: 1,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = {
      ...filters,
      sortBy: sortBy as ProductFilters["sortBy"],
      page: 1,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = {
      ...filters,
      page,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setTempPriceRange(DEFAULT_PRICE_RANGE);
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = () => {
    return (
      (filters.brands && filters.brands.length > 0) ||
      (filters.compositions && filters.compositions.length > 0) ||
      (filters.measurements && filters.measurements.length > 0) ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.priceRange &&
        (filters.priceRange.min !== DEFAULT_PRICE_RANGE[0] ||
          filters.priceRange.max !== DEFAULT_PRICE_RANGE[1]))
    );
  };

  return {
    filters,
    tempPriceRange,
    setTempPriceRange,
    handleBrandFilter,
    handleCompositionFilter,
    handleMeasurementFilter,
    handleCategoryFilter,
    handlePriceRangeChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
    hasActiveFilters,
  };
}
