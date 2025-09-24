import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back button skeleton */}
      <Skeleton className="h-10 w-40" />

      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="gap-8 grid lg:grid-cols-2">
        {/* Image carousel skeleton */}
        <div className="space-y-4">
          <Skeleton className="w-full rounded-lg aspect-square" />
          <div className="flex gap-2">
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-18" />
            <Skeleton className="h-6 w-14" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Stock status */}
          <Skeleton className="h-5 w-28" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Add to cart button */}
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      {/* Specifications skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}