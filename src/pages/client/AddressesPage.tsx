import React, { useState } from 'react';
import { MapPin, Plus, Home, Briefcase, Edit2, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    label: 'Home',
    type: 'home',
    street: '123 Riverside Drive',
    city: 'Nairobi, Kenya',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Office',
    type: 'work',
    street: '456 Westlands Road',
    city: 'Nairobi, Kenya',
    isDefault: false,
  }
];

export function AddressesPage() {
  const [addresses] = useState<Address[]>(mockAddresses);

  const getAddressIcon = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5" />;
      case 'work':
        return <Briefcase className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Addresses</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            {address.isDefault && (
              <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Default
              </span>
            )}
            <div className="flex items-start">
              <div className="flex-shrink-0 text-gray-400">
                {getAddressIcon(address.type)}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{address.label}</h3>
                <div className="mt-2 text-gray-500">
                  <p>{address.street}</p>
                  <p>{address.city}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button className="inline-flex items-center text-sm text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}