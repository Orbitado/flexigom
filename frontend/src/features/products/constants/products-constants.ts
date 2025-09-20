import type { ProductFilters } from "@/types";

export const DEFAULT_FILTERS: ProductFilters = {
  brands: [],
  sortBy: "name",
  page: 1,
  pageSize: 6,
};

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 3000000,
  STEP: 1000,
} as const;

export const DEFAULT_PRICE_RANGE = [PRICE_RANGE.MIN, PRICE_RANGE.MAX];

export const POPULAR_PRICE_RANGES = [
  { label: "$ 0 - $ 300.000", min: 0, max: 300000 },
  { label: "$ 300.000 - $ 800.000", min: 300000, max: 800000 },
  { label: "$ 800.000 - $ 1.200.000", min: 800000, max: 1200000 },
  { label: "$ 1.200.000 - $ 1.500.000", min: 1200000, max: 1500000 },
] as const;

export const BRANDS = ["Flexigom", "Premium", "Comfort"] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Relevancia" },
  { value: "price_asc", label: "Precio: Menor a mayor" },
  { value: "price_desc", label: "Precio: Mayor a menor" },
  { value: "newest", label: "Más recientes" },
] as const;
