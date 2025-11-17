import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatDistance(miles: number): string {
  return `${miles.toFixed(1)} mi`;
}

export function getPriceRangeSymbol(range: number): string {
  return '$'.repeat(range);
}
