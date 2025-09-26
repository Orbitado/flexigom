import { Skeleton } from "@/components/ui/skeleton";

interface TestimonialsSkeletonProps {
  count?: number;
}

export function TestimonialsSkeleton({ count = 3 }: TestimonialsSkeletonProps) {
  return (
    <div className="gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="flex flex-col bg-white shadow-lg p-6 border border-gray-100 rounded-xl w-full h-full min-h-[300px]">
            {/* Star Rating Skeleton */}
            <div className="flex mb-4 gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Skeleton key={starIndex} className="w-5 h-5" />
              ))}
            </div>

            {/* Testimonial Text Skeleton */}
            <div className="flex flex-col space-y-2 mb-6 flex-grow">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>

            {/* Separator Skeleton */}
            <Skeleton className="my-4 w-full h-px" />

            {/* Customer Info Skeleton */}
            <div className="space-y-2 mt-auto">
              <Skeleton className="w-2/3 h-5" />
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-1/3 h-3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}