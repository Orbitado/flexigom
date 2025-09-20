import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { COMPOSITIONS } from "../constants/products-constants";

interface CompositionFilterProps {
  selectedCompositions: string[];
  onCompositionChange: (composition: string, checked: boolean) => void;
}

export function CompositionFilter({
  selectedCompositions,
  onCompositionChange,
}: CompositionFilterProps) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full cursor-pointer">
        <h3 className="font-medium">Composición</h3>
        <ChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {COMPOSITIONS.map((composition) => (
          <div key={composition} className="flex items-center space-x-2">
            <Checkbox
              id={composition}
              checked={selectedCompositions.includes(composition)}
              onCheckedChange={(checked) =>
                onCompositionChange(composition, checked as boolean)
              }
            />
            <Label
              htmlFor={composition}
              className="font-normal text-sm cursor-pointer"
            >
              {composition}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
