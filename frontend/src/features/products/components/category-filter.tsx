import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCategories } from "@/features/home/hooks/use-categories";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
}

export function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const { data: categories } = useCategories();

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full">
        <h3 className="font-medium">Categoría</h3>
        <ChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {categories?.map((category) => (
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
