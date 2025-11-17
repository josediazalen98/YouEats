import { RestaurantGridSkeleton } from '@/components/restaurant/restaurant-card-skeleton';

export default function Loading() {
  return (
    <main className="flex-1">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 h-12 w-3/4 max-w-2xl animate-pulse rounded-lg bg-primary-500/30" />
          <div className="mx-auto h-6 w-1/2 max-w-md animate-pulse rounded-lg bg-primary-500/30" />
        </div>
      </div>

      {/* Restaurants Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="mb-2 h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-5 w-36 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <RestaurantGridSkeleton />
      </div>
    </main>
  );
}
