import React from 'react';
import { Store, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BusinessTypeSelectorProps {
  selectedType: 'service' | 'product' | null;
  onSelect: (type: 'service' | 'product') => void;
}

export function BusinessTypeSelector({ selectedType, onSelect }: BusinessTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onSelect('service')}
        className={cn(
          'relative rounded-lg border p-4 flex flex-col items-center',
          selectedType === 'service'
            ? 'border-blue-500 ring-2 ring-blue-500'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        <Briefcase
          className={cn(
            'h-8 w-8 mb-2',
            selectedType === 'service' ? 'text-blue-500' : 'text-gray-400'
          )}
        />
        <h3 className="text-sm font-medium text-gray-900">Service Business</h3>
        <p className="mt-1 text-xs text-gray-500">
          Offer services like salon, spa, consulting, etc.
        </p>
      </button>

      <button
        type="button"
        onClick={() => onSelect('product')}
        className={cn(
          'relative rounded-lg border p-4 flex flex-col items-center',
          selectedType === 'product'
            ? 'border-blue-500 ring-2 ring-blue-500'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        <Store
          className={cn(
            'h-8 w-8 mb-2',
            selectedType === 'product' ? 'text-blue-500' : 'text-gray-400'
          )}
        />
        <h3 className="text-sm font-medium text-gray-900">Product Shop</h3>
        <p className="mt-1 text-xs text-gray-500">
          Sell physical products with inventory management
        </p>
      </button>
    </div>
  );
}