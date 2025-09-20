interface ProductsGridSkeletonProps {
  count?: number;
}

export function ProductsGridSkeleton({ count = 6 }: ProductsGridSkeletonProps) {
  return (
    <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 mb-4 rounded-lg aspect-[4/3]"></div>
          <div className="space-y-2">
            <div className="bg-gray-200 rounded w-3/4 h-4"></div>
            <div className="bg-gray-200 rounded w-1/2 h-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
