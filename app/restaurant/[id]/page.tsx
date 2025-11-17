import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, Clock, DollarSign, MapPin } from 'lucide-react';
import { mockRestaurants, mockMenuItems } from '@/data/mock-data';
import { MenuItemCard } from '@/components/restaurant/menu-item-card';
import { formatPrice, getPriceRangeSymbol, formatDistance } from '@/lib/utils';

export function generateStaticParams() {
  return mockRestaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = mockRestaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    notFound();
  }

  const menuItems = mockMenuItems.filter(
    (item) => item.restaurantId === params.id
  );

  // Group menu items by category
  const menuByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <main className="flex-1">
      {/* Restaurant Header */}
      <div className="relative h-64 w-full bg-gray-200 md:h-80">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="text-gray-200">
                  ({restaurant.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{getPriceRangeSymbol(restaurant.priceRange)}</span>
                <span>•</span>
                <span>{restaurant.cuisineTypes.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <DollarSign className="h-5 w-5" />
              <span>
                {restaurant.deliveryFee === 0
                  ? 'Free delivery'
                  : `${formatPrice(restaurant.deliveryFee)} delivery fee`}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{formatDistance(restaurant.distance)} away</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
        </div>

        {Object.entries(menuByCategory).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              {category}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  restaurant={restaurant}
                />
              ))}
            </div>
          </div>
        ))}

        {menuItems.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>No menu items available yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
