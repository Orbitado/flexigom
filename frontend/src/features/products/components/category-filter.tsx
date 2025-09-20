import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCategories } from "@/features/home/hooks/use-categories";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
}

export function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full">
          <h3 className="font-medium">Categoría</h3>
          <ChevronDown className="size-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-24 h-5" />
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-sm">
        No se pudieron cargar las categorías. Intente más tarde.
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">
        No hay categorías disponibles.
      </div>
    );
  }

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full cursor-pointer">
        <h3 className="font-medium">Categoría</h3>
        <ChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.documentId}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id={`category-${category.documentId}`}
              checked={selectedCategories.includes(category.slug)}
              onCheckedChange={(checked) =>
                onCategoryChange(category.slug, checked as boolean)
              }
            />
            <Label
              htmlFor={`category-${category.documentId}`}
              className="font-normal text-sm cursor-pointer"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
