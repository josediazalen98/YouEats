'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart-store';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrease = () => {
    updateQuantity(item.menuItem.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.menuItem.id, item.quantity - 1);
    } else {
      removeItem(item.menuItem.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.menuItem.id);
  };

  const itemTotal = item.menuItem.price * item.quantity;

  return (
    <div className="flex gap-4 border-b py-4 last:border-b-0">
      {item.menuItem.image && (
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.menuItem.image}
            alt={item.menuItem.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{item.menuItem.name}</h3>
            <p className="text-sm text-gray-600">{item.restaurant.name}</p>
          </div>
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {item.specialInstructions && (
          <p className="mb-2 text-sm text-gray-500">
            Note: {item.specialInstructions}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrease}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleIncrease}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <span className="font-semibold text-gray-900">
            {formatPrice(itemTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
