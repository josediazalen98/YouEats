import { Skeleton } from '@/components/ui/skeleton';

export function RestaurantCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image Skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />

      {/* Content */}
      <div className="p-4">
        {/* Restaurant Name */}
        <Skeleton className="mb-2 h-6 w-3/4" />

        {/* Rating and Review Count */}
        <div className="mb-2 flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Cuisine Types */}
        <Skeleton className="mb-3 h-4 w-full" />

        {/* Delivery Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function RestaurantGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
}
