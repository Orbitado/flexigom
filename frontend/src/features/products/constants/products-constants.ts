import type { ProductFilters } from "@/types";

export const DEFAULT_FILTERS: ProductFilters = {
  brands: [],
  sortBy: "name",
  page: 1,
  pageSize: 6,
};

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 150000,
  STEP: 1000,
} as const;

export const DEFAULT_PRICE_RANGE = [PRICE_RANGE.MIN, PRICE_RANGE.MAX];

export const POPULAR_PRICE_RANGES = [
  { label: "$ 0 - $ 50.000", min: 0, max: 50000 },
  { label: "$ 50.000 - $ 80.000", min: 50000, max: 80000 },
  { label: "$ 80.000 - $ 120.000", min: 80000, max: 120000 },
  { label: "$ 120.000 - $ 150.000", min: 120000, max: 150000 },
] as const;

export const BRANDS = ["Flexigom", "Premium", "Comfort"] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Relevancia" },
  { value: "price_asc", label: "Precio: Menor a mayor" },
  { value: "price_desc", label: "Precio: Mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "newest", label: "Más recientes" },
] as const;
