export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisineTypes: string[];
  priceRange: number; // 1-4 dollar signs
  distance: number; // in miles
  isNew?: boolean;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  popular?: boolean;
  customizable?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  restaurant: Restaurant;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  instructions?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  restaurant: Restaurant;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress: Address;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery?: Date;
}

export interface FilterOptions {
  cuisineTypes: string[];
  priceRange: number[];
  rating: number;
  deliveryTime: string;
  sortBy: 'recommended' | 'rating' | 'delivery-time' | 'distance';
}
