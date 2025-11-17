import { CategoryNav } from '@/components/layout/category-nav';
import { RestaurantGrid } from '@/components/restaurant/restaurant-grid';
import { mockRestaurants } from '@/data/mock-data';

export default function Home() {
  return (
    <main className="flex-1">
      <CategoryNav />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Food delivery and takeout near you
          </h1>
          <p className="text-lg text-primary-100">
            Discover the best restaurants in your area
          </p>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            All Restaurants
          </h2>
          <p className="text-gray-600">
            {mockRestaurants.length} restaurants available
          </p>
        </div>

        <RestaurantGrid restaurants={mockRestaurants} />
      </div>
    </main>
  );
}
