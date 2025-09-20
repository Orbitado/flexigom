import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MEASUREMENTS } from "../constants/products-constants";

interface MeasurementFilterProps {
  selectedMeasurements: string[];
  onMeasurementChange: (measurement: string, checked: boolean) => void;
}

export function MeasurementFilter({
  selectedMeasurements,
  onMeasurementChange,
}: MeasurementFilterProps) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full cursor-pointer">
        <h3 className="font-medium">Tamaño</h3>
        <ChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {MEASUREMENTS.map((measurement) => (
          <div key={measurement} className="flex items-center space-x-2">
            <Checkbox
              id={measurement}
              checked={selectedMeasurements.includes(measurement)}
              onCheckedChange={(checked) =>
                onMeasurementChange(measurement, checked as boolean)
              }
            />
            <Label
              htmlFor={measurement}
              className="font-normal text-sm capitalize cursor-pointer"
            >
              {measurement}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
