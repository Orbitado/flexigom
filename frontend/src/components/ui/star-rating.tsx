import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
  size?: "sm" | "default" | "lg";
  showReviewCount?: boolean;
}

export function StarRating({
  rating = 0,
  reviewCount = 0,
  className,
  size = "default",
  showReviewCount = true,
}: StarRatingProps) {
  const maxStars = 5;
  const filledStars = Math.floor(rating);
  const hasPartialStar = rating % 1 !== 0;

  const sizeClasses = {
    sm: "size-3",
    default: "size-4",
    lg: "size-5",
  };

  const starSizeClass = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxStars }, (_, index) => {
          const starIndex = index + 1;
          const isFilled = starIndex <= filledStars;
          const isPartial = starIndex === filledStars + 1 && hasPartialStar;

          return (
            <Star
              key={index}
              className={cn(
                starSizeClass,
                "transition-colors",
                isFilled || isPartial
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200",
              )}
            />
          );
        })}
      </div>
      {showReviewCount && reviewCount > 0 && (
        <span className="text-gray-600 text-sm">
          ({reviewCount} reseña{reviewCount !== 1 ? "s" : ""})
        </span>
      )}
    </div>
  );
}
