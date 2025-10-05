import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function CheckoutSkeleton() {
  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <Skeleton className="mx-auto mb-2 w-64 h-9" />
          <Skeleton className="mx-auto w-96 h-5" />
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="gap-2 grid grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="rounded-full w-8 h-8" />
                <Skeleton className="mt-2 w-16 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-6 md:p-8">
          <Skeleton className="mb-6 w-48 h-8" />
          <div className="space-y-4">
            <div className="gap-4 grid grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-full h-10" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
            <div className="gap-4 grid grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-full h-10" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
            <div className="flex gap-3 mt-6">
              <Skeleton className="w-24 h-10" />
              <Skeleton className="flex-1 h-10" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
