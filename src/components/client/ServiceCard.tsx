import React from 'react';

interface ServiceCardProps {
  image: string;
  title: string;
  category: string;
  price: number;
  onBook: () => void;
}

export function ServiceCard({ image, title, category, price, onBook }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{category}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">KES {price}</span>
          <button 
            onClick={onBook}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}