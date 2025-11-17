'use client';

import { useState } from 'react';
import { Restaurant } from '@/types';
import { RestaurantCard } from './restaurant-card';

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  const [filteredRestaurants] = useState(restaurants);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
