import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import type { CategoryItem } from "../types";

interface CategoryCardProps {
  category: CategoryItem;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "group bg-white shadow-lg hover:shadow-xl border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-300",
        className,
      )}
    >
      <div className="relative flex justify-center items-center bg-gray-200 aspect-[4/3] overflow-hidden">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <ImageIcon className="w-12 h-12 text-gray-400" />
        )}
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="font-bold text-black text-xl">{category.name}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>

        <Button
          asChild
          className="bg-red-600 hover:bg-red-700 w-full font-medium text-white"
        >
          <a href={category.href}>Ver Productos</a>
        </Button>
      </div>
    </div>
  );
}
