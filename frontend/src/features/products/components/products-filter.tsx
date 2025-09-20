import { Filter, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PriceRangeFilter } from "./price-range-filter";
import { BrandFilter } from "./brand-filter";
import { CompositionFilter } from "./composition-filter";
import { MeasurementFilter } from "./measurement-filter";
import { CategoryFilter } from "./category-filter";

interface ProductsFilterProps {
  selectedBrands: string[];
  selectedCompositions: string[];
  selectedMeasurements: string[];
  selectedCategories: string[];
  tempPriceRange: number[];
  hasActiveFilters: boolean;
  onBrandChange: (brand: string, checked: boolean) => void;
  onCompositionChange: (composition: string, checked: boolean) => void;
  onMeasurementChange: (measurement: string, checked: boolean) => void;
  onCategoryChange: (category: string, checked: boolean) => void;
  onTempPriceRangeChange: (values: number[]) => void;
  onPriceRangeCommit: (values: number[]) => void;
  onClearFilters: () => void;
}

export function ProductsFilter({
  selectedBrands,
  selectedCompositions,
  selectedMeasurements,
  selectedCategories,
  tempPriceRange,
  hasActiveFilters,
  onBrandChange,
  onCompositionChange,
  onMeasurementChange,
  onCategoryChange,
  onTempPriceRangeChange,
  onPriceRangeCommit,
  onClearFilters,
}: ProductsFilterProps) {
  return (
    <div className="space-y-6 mt-2">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Filter className="size-4" />
        <h2 className="font-semibold">Filtrar por</h2>
      </div>

      <PriceRangeFilter
        tempPriceRange={tempPriceRange}
        onTempPriceRangeChange={onTempPriceRangeChange}
        onPriceRangeCommit={onPriceRangeCommit}
      />
      
      <Separator className="my-4" />

      <CategoryFilter
        selectedCategories={selectedCategories}
        onCategoryChange={onCategoryChange}
      />
      
      <Separator className="my-4" />

      <BrandFilter
        selectedBrands={selectedBrands}
        onBrandChange={onBrandChange}
      />
      
      <Separator className="my-4" />

      <CompositionFilter
        selectedCompositions={selectedCompositions}
        onCompositionChange={onCompositionChange}
      />
      
      <Separator className="my-4" />

      <MeasurementFilter
        selectedMeasurements={selectedMeasurements}
        onMeasurementChange={onMeasurementChange}
      />

      <div className="pt-4 border-t">
        <Button
          variant="outline"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="flex justify-center items-center gap-2 w-full"
        >
          <RefreshCcw className="size-4" />
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
}
