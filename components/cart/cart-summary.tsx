'use client';

import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

export function CartSummary({ subtotal, deliveryFee, tax, total }: CartSummaryProps) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>

      <div className="space-y-3 border-b pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">{formatPrice(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
