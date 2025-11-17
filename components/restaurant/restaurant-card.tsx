import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, DollarSign } from 'lucide-react';
import { Restaurant } from '@/types';
import { formatPrice, getPriceRangeSymbol } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {restaurant.isNew && (
            <Badge variant="success" className="absolute left-2 top-2">
              New
            </Badge>
          )}
          {restaurant.featured && (
            <Badge variant="warning" className="absolute right-2 top-2">
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
            {restaurant.name}
          </h3>

          {/* Rating & Price */}
          <div className="mb-2 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{restaurant.rating}</span>
              <span className="text-gray-500">({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">
                {getPriceRangeSymbol(restaurant.priceRange)}
              </span>
            </div>
          </div>

          {/* Cuisine Types */}
          <div className="mb-3 flex flex-wrap gap-1">
            {restaurant.cuisineTypes.map((cuisine) => (
              <span
                key={cuisine}
                className="text-xs text-gray-500"
              >
                {cuisine}
                {restaurant.cuisineTypes.indexOf(cuisine) !==
                  restaurant.cuisineTypes.length - 1 && ' • '}
              </span>
            ))}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center justify-between border-t pt-3 text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span>
                {restaurant.deliveryFee === 0
                  ? 'Free'
                  : formatPrice(restaurant.deliveryFee)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
