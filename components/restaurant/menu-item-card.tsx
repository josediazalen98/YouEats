'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { MenuItem, Restaurant } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/cart-store';
import { useToast } from '@/components/ui/toast';

interface MenuItemCardProps {
  item: MenuItem;
  restaurant: Restaurant;
}

export function MenuItemCard({ item, restaurant }: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addItem({
      menuItem: item,
      quantity: 1,
      restaurant,
    });
    showToast(`${item.name} added to cart`, 'success');
  };

  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      <div className="flex-1">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            {item.popular && (
              <Badge variant="warning" className="mt-1">
                Popular
              </Badge>
            )}
          </div>
        </div>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(item.price)}
          </span>
          <Button onClick={handleAddToCart} size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      {item.image && (
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      )}
    </div>
  );
}
