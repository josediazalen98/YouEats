import Link from 'next/link';
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;

  // Mock order data - in production this would fetch from an API
  const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Success Message */}
          <div className="mb-8 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          {/* Order Details */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-6 border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Order #{orderId}</h2>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date().toLocaleDateString()}
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Confirmed
                </span>
              </div>
            </div>

            {/* Delivery Progress */}
            <div className="mb-6">
              <h3 className="mb-4 font-semibold">Delivery Status</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-gray-600">
                      Your order has been received
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Preparing</p>
                    <p className="text-sm text-gray-400">
                      Restaurant is preparing your order
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <Truck className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Out for Delivery</p>
                    <p className="text-sm text-gray-400">
                      Driver is on the way
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <CheckCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Delivered</p>
                    <p className="text-sm text-gray-400">Order complete</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="rounded-lg bg-primary-50 p-4">
              <div className="flex items-center space-x-2 text-primary-900">
                <Clock className="h-5 w-5" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm">
                    {estimatedDelivery.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
            <Link href={`/orders/${orderId}`} className="flex-1">
              <Button size="lg" className="w-full">
                Track Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
