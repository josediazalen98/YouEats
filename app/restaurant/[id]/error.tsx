'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RestaurantError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Restaurant page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Restaurant Not Found
        </h1>
        <p className="mb-6 text-gray-600">
          We couldn't load this restaurant. It may not exist or there was an error loading it.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()} size="lg">
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
