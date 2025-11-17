'use client';

import Link from 'next/link';
import { ShoppingCart, MapPin, User, Search } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { Button } from '@/components/ui/button';

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600">
            <span className="text-xl font-bold text-white">Y</span>
          </div>
          <span className="text-xl font-bold text-gray-900">YouEats</span>
        </Link>

        {/* Location & Search - Desktop */}
        <div className="hidden items-center space-x-4 md:flex md:flex-1 md:px-8">
          <button className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
            <MapPin className="h-5 w-5 text-gray-600" />
            <div className="text-left">
              <div className="text-xs text-gray-500">Deliver to</div>
              <div className="text-sm font-semibold">Current Location</div>
            </div>
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for restaurants or dishes"
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <User className="mr-2 h-5 w-5" />
            Sign In
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants"
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>
      </div>
    </header>
  );
}
