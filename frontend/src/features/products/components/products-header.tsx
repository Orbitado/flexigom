import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "../constants/products-constants";
import type { ProductFilters } from "@/types";

interface ProductsHeaderProps {
  isLoading: boolean;
  totalProducts: number;
  currentPage?: number;
  totalPages?: number;
  sortBy: ProductFilters["sortBy"];
  onSortChange: (sortBy: string) => void;
}

export function ProductsHeader({
  isLoading,
  totalProducts,
  currentPage,
  totalPages,
  sortBy,
  onSortChange,
}: ProductsHeaderProps) {
  const getCountText = () => {
    if (isLoading) return "Cargando...";
    if (currentPage && totalPages) {
      return `${totalProducts} productos encontrados (Página ${currentPage} de ${totalPages})`;
    }
    return `${totalProducts} productos encontrados`;
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="font-bold text-gray-900 text-3xl">Productos</h1>
        <p className="mt-1 text-gray-600">{getCountText()}</p>
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="sort" className="text-sm">
          Ordenar por:
        </Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
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
