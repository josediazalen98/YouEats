'use client';

import { useState } from 'react';
import { cuisineCategories } from '@/data/mock-data';
import { cn } from '@/lib/utils';

interface CategoryNavProps {
  onCategoryChange?: (category: string) => void;
}

export function CategoryNav({ onCategoryChange }: CategoryNavProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex space-x-2 overflow-x-auto py-4 scrollbar-hide">
          {cuisineCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
