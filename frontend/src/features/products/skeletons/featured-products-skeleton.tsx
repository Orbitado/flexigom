import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedProductsSkeletonProps {
  count?: number;
}

export function FeaturedProductsSkeleton({ count = 6 }: FeaturedProductsSkeletonProps) {
  return (
    <div className="gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <Skeleton className="mb-4 rounded-lg aspect-[4/3] h-80" />
          <div className="space-y-2">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}