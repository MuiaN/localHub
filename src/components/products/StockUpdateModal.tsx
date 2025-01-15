import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { Product } from '../../types';

interface StockUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onUpdate: (productId: string, newStock: number) => void;
}

export function StockUpdateModal({
  isOpen,
  onClose,
  product,
  onUpdate,
}: StockUpdateModalProps) {
  const [quantity, setQuantity] = useState(0);
  const [operation, setOperation] = useState<'add' | 'remove'>('add');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStock = operation === 'add' 
      ? product.stock + quantity 
      : product.stock - quantity;
    onUpdate(product.id, Math.max(0, newStock));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Update Stock</h3>
              <p className="mt-1 text-sm text-gray-500">
                Current stock: {product.stock} {product.unit}s
              </p>
            </div>

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

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Update Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}