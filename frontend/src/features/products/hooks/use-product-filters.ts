import { useState } from "react";
import type { ProductFilters } from "@/types";
import {
  DEFAULT_FILTERS,
  DEFAULT_PRICE_RANGE,
} from "../constants/products-constants";

export function useProductFilters() {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [tempPriceRange, setTempPriceRange] =
    useState<number[]>(DEFAULT_PRICE_RANGE);

  const handleBrandFilter = (brand: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      brands: checked
        ? [...(prev.brands || []), brand]
        : (prev.brands || []).filter((b) => b !== brand),
      page: 1,
    }));
  };

  const handleCompositionFilter = (composition: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      compositions: checked
        ? [...(prev.compositions || []), composition]
        : (prev.compositions || []).filter((c) => c !== composition),
      page: 1,
    }));
  };

  const handleMeasurementFilter = (measurement: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      measurements: checked
        ? [...(prev.measurements || []), measurement]
        : (prev.measurements || []).filter((m) => m !== measurement),
      page: 1,
    }));
  };

  const handlePriceRangeChange = (values: number[]) => {
    setTempPriceRange(values);
    setFilters((prev) => ({
      ...prev,
      priceRange: { min: values[0], max: values[1] },
      page: 1,
    }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortBy as ProductFilters["sortBy"],
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setTempPriceRange(DEFAULT_PRICE_RANGE);
  };

  const hasActiveFilters = () => {
    return (
      (filters.brands && filters.brands.length > 0) ||
      (filters.compositions && filters.compositions.length > 0) ||
      (filters.measurements && filters.measurements.length > 0) ||
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
    handlePriceRangeChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
    hasActiveFilters,
  };
}
