import { ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  PRICE_RANGE,
  POPULAR_PRICE_RANGES,
} from "../constants/products-constants";
import { formatPrice } from "@/lib/utils";

interface PriceRangeFilterProps {
  tempPriceRange: number[];
  onTempPriceRangeChange: (values: number[]) => void;
  onPriceRangeCommit: (values: number[]) => void;
}

export function PriceRangeFilter({
  tempPriceRange,
  onTempPriceRangeChange,
  onPriceRangeCommit,
}: PriceRangeFilterProps) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full cursor-pointer">
        <h3 className="font-medium">Precio</h3>
        <ChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        <div className="space-y-4">
          <Slider
            min={PRICE_RANGE.MIN}
            max={PRICE_RANGE.MAX}
            step={PRICE_RANGE.STEP}
            value={tempPriceRange}
            onValueChange={onTempPriceRangeChange}
            onValueCommit={onPriceRangeCommit}
            className="w-full"
          />
          <div className="flex justify-between text-gray-600 text-sm">
            <span>{formatPrice(tempPriceRange[0])}</span>
            <span>{formatPrice(tempPriceRange[1])}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700 text-sm">
            Rangos populares:
          </h4>
          {POPULAR_PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => onPriceRangeCommit([range.min, range.max])}
              className="block hover:bg-gray-50 px-3 py-1 rounded w-full text-gray-600 hover:text-gray-900 text-sm text-left"
            >
              {range.label}
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
