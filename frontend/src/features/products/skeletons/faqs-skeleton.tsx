import { Skeleton } from "@/components/ui/skeleton";

interface FAQsSkeletonProps {
  count?: number;
}

export function FAQsSkeleton({ count = 6 }: FAQsSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center">
              <Skeleton className="flex-1 mr-4 h-6" />
              <Skeleton className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}