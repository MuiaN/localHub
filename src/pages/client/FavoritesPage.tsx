import React from 'react';
import { Heart, MapPin, Star } from 'lucide-react';

const mockFavorites = [
  {
    id: '1',
    name: 'Urban Styles Salon',
    category: 'Beauty & Wellness',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    location: 'Karen, Nairobi',
  },
  {
    id: '2',
    name: 'Organic Market',
    category: 'Food & Groceries',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    location: 'Westlands, Nairobi',
  }
];

export function FavoritesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Favorites</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockFavorites.map((favorite) => (
          <div key={favorite.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={favorite.image}
                alt={favorite.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm">
                <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{favorite.name}</h3>
              <p className="text-sm text-gray-500">{favorite.category}</p>
              <div className="mt-2 flex items-center">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <span className="ml-1 text-sm text-gray-600">{favorite.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({favorite.reviewCount} reviews)</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {favorite.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}