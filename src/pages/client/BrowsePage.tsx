import React, { useState } from 'react';
import { SearchBar } from '../../components/client/SearchBar';
import { LocationInput } from '../../components/client/LocationInput';
import { CategoryFilter } from '../../components/client/CategoryFilter';
import { ServiceCard } from '../../components/client/ServiceCard';

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'beauty', label: 'Beauty & Wellness' },
  { value: 'health', label: 'Health & Fitness' },
  { value: 'home', label: 'Home Services' },
  { value: 'food', label: 'Food & Beverages' },
];

export function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');

  const handleBook = () => {
    // Implement booking logic
    console.log('Booking...');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search services or products..."
            />
            <LocationInput 
              value={location}
              onChange={setLocation}
            />
            <CategoryFilter 
              value={category}
              onChange={setCategory}
              categories={CATEGORIES}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
          title="Haircut & Styling"
          category="Beauty & Wellness"
          price={1500}
          onBook={handleBook}
        />
      </div>
    </div>
  );
}