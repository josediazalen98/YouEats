'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, getTotal } = useCartStore();

  const subtotal = getTotal();
  const deliveryFee = items.length > 0 ? items[0].restaurant.deliveryFee : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mb-6 text-gray-600">
              Add items to get started
            </p>
            <Link href="/">
              <Button size="lg">Browse Restaurants</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold">Items</h2>
              <div className="space-y-0">
                {items.map((item) => (
                  <CartItem key={item.menuItem.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <CartSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                tax={tax}
                total={total}
              />
              <Link href="/checkout" className="mt-4 block">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/" className="mt-3 block">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
