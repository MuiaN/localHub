import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Product } from '../../../types';

interface StockUpdateFormProps {
  product: Product;
  onUpdate: (quantity: number, operation: 'add' | 'remove') => void;
}

export function StockUpdateForm({ product, onUpdate }: StockUpdateFormProps) {
  const [quantity, setQuantity] = useState(0);
  const [operation, setOperation] = useState<'add' | 'remove'>('add');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(quantity, operation);
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setOperation('add')}
          className={cn(
            'flex-1 inline-flex justify-center items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium',
            operation === 'add'
              ? 'border-transparent text-white bg-blue-600 hover:bg-blue-700'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
          )}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Stock
        </button>
        <button
          type="button"
          onClick={() => setOperation('remove')}
          className={cn(
            'flex-1 inline-flex justify-center items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium',
            operation === 'remove'
              ? 'border-transparent text-white bg-red-600 hover:bg-red-700'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
          )}
        >
          <Minus className="h-5 w-5 mr-2" />
          Remove Stock
        </button>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity ({product.unit}s)
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10)))}
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
      >
        Update Stock
      </button>
    </form>
  );
}