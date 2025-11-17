import { Skeleton } from '@/components/ui/skeleton';

export function MenuItemSkeleton() {
  return (
    <div className="flex gap-4 rounded-lg border bg-white p-4">
      <Skeleton className="h-24 w-24 flex-shrink-0 rounded-md" />
      <div className="flex-1">
        <Skeleton className="mb-2 h-5 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function MenuSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <MenuItemSkeleton key={i} />
      ))}
    </div>
  );
}
