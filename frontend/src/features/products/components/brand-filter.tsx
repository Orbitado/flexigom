import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BRANDS } from "../constants/products-constants";

interface BrandFilterProps {
  selectedBrands: string[];
  onBrandChange: (brand: string, checked: boolean) => void;
}

export function BrandFilter({
  selectedBrands,
  onBrandChange,
}: BrandFilterProps) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full">
        <h3 className="font-medium">Marca</h3>
        <ChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {BRANDS.map((brand) => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={(checked) =>
                onBrandChange(brand, checked as boolean)
              }
            />
            <Label
              htmlFor={brand}
              className="font-normal text-sm cursor-pointer"
            >
              {brand}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
