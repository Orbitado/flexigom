import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { SORT_OPTIONS } from "../constants/products-constants";
import type { ProductFilters } from "@/types";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { PriceRangeFilter } from "./price-range-filter";
import { BrandFilter } from "./brand-filter";
import { CompositionFilter } from "./composition-filter";
import { MeasurementFilter } from "./measurement-filter";
import { CategoryFilter } from "./category-filter";
import { Separator } from "@/components/ui/separator";

interface ProductsHeaderProps {
  isLoading: boolean;
  totalProducts: number;
  currentPage?: number;
  totalPages?: number;
  sortBy: ProductFilters["sortBy"];
  onSortChange: (sortBy: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  filters: ProductFilters;
  tempPriceRange: number[];
  onBrandChange: (brand: string, checked: boolean) => void;
  onCompositionChange: (composition: string, checked: boolean) => void;
  onMeasurementChange: (measurement: string, checked: boolean) => void;
  onCategoryChange: (category: string, checked: boolean) => void;
  onTempPriceRangeChange: (values: number[]) => void;
  onPriceRangeCommit: (values: number[]) => void;
}

export function ProductsHeader({
  isLoading,
  totalProducts,
  currentPage,
  totalPages,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
  filters,
  tempPriceRange,
  onBrandChange,
  onCompositionChange,
  onMeasurementChange,
  onCategoryChange,
  onTempPriceRangeChange,
  onPriceRangeCommit,
}: ProductsHeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const getCountText = () => {
    if (isLoading) return "Cargando...";
    if (currentPage && totalPages) {
      return `${totalProducts} productos encontrados (Página ${currentPage} de ${totalPages})`;
    }
    return `${totalProducts} productos encontrados`;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brands?.length) count += filters.brands.length;
    if (filters.compositions?.length) count += filters.compositions.length;
    if (filters.measurements?.length) count += filters.measurements.length;
    if (filters.categories?.length) count += filters.categories.length;
    if (
      filters.priceRange?.min !== undefined ||
      filters.priceRange?.max !== undefined
    )
      count += 1;
    return count;
  };

  const filterCount = getActiveFiltersCount();

  // Versión desktop original
  if (!isMobile) {
    return (
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-gray-900 text-3xl">Productos</h1>
          <p className="mt-1 text-gray-600">{getCountText()}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Sort Controls */}
          <span className="hidden sm:block text-sm">Ordenar por:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-36 sm:w-48">
              <SelectValue placeholder="Seleccionar orden" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  // Versión mobile mejorada
  return (
    <div className="md:hidden flex flex-col gap-4 mb-6">
      <div className="flex flex-col justify-between items-start gap-4">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl">Productos</h1>
          <p className="mt-1 text-gray-600 text-sm">{getCountText()}</p>
        </div>
        <div className="flex items-center gap-2 w-full">
          {/* Mobile Filter Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`relative flex-1 ${hasActiveFilters ? "border-primary" : ""}`}
              >
                <SlidersHorizontal className="mr-2 size-4" />
                Filtros
                {hasActiveFilters && filterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-full sm:max-w-md">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="size-4" />
                  Filtros de productos
                </SheetTitle>
                <SheetDescription>
                  Filtra los productos por categoría, marca, composición y
                  precio.
                </SheetDescription>
              </SheetHeader>
              <div className="px-4 py-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <div className="space-y-6">
                  <PriceRangeFilter
                    tempPriceRange={tempPriceRange}
                    onTempPriceRangeChange={onTempPriceRangeChange}
                    onPriceRangeCommit={onPriceRangeCommit}
                  />

                  <Separator />

                  <CategoryFilter
                    selectedCategories={filters.categories || []}
                    onCategoryChange={onCategoryChange}
                  />

                  <Separator />

                  <BrandFilter
                    selectedBrands={filters.brands || []}
                    onBrandChange={onBrandChange}
                  />

                  <Separator />

                  <CompositionFilter
                    selectedCompositions={filters.compositions || []}
                    onCompositionChange={onCompositionChange}
                  />

                  <Separator />

                  <MeasurementFilter
                    selectedMeasurements={filters.measurements || []}
                    onMeasurementChange={onMeasurementChange}
                  />
                </div>
              </div>
              <SheetFooter className="p-4 border-t">
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Cerrar
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      onClearFilters();
                      if (filterCount > 0) {
                        setIsSheetOpen(false);
                      }
                    }}
                    disabled={!hasActiveFilters}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Sort Controls */}
          <div className="flex flex-1 items-center gap-2">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Active filters display for mobile */}
      {hasActiveFilters && filterCount > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>Filtros activos: {filterCount}</span>
            <button
              className="ml-1 hover:text-destructive cursor-pointer"
              onClick={onClearFilters}
            >
              ×
            </button>
          </Badge>
        </div>
      )}
    </div>
  );
}
