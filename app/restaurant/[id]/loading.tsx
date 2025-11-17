import { Skeleton } from '@/components/ui/skeleton';
import { MenuSkeleton } from '@/components/restaurant/menu-item-skeleton';

export default function RestaurantLoading() {
  return (
    <main className="flex-1">
      {/* Restaurant Header Skeleton */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-4 h-10 w-64" />
          <div className="mb-4 flex items-center space-x-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>
      </div>

      {/* Menu Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-6 h-8 w-48" />
        <MenuSkeleton />
      </div>
    </main>
  );
}
