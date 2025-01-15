import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: Array<{ value: string; label: string }>;
}

export function CategoryFilter({ value, onChange, categories }: CategoryFilterProps) {
  return (
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {categories.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}