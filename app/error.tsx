'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Something went wrong!
        </h1>
        <p className="mb-6 text-gray-600">
          We encountered an unexpected error. Please try again.
        </p>
        {error.message && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-left">
            <p className="text-sm text-red-800">
              <strong>Error details:</strong> {error.message}
            </p>
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()} size="lg">
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="outline"
            size="lg"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
