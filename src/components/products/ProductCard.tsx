import React from 'react';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const stockStatus = product.stock <= 0 
    ? 'out_of_stock'
    : product.stock <= 5 
    ? 'low_stock' 
    : 'in_stock';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>
          </div>
          <p className="text-lg font-semibold text-gray-900">KES {product.price}</p>
        </div>
        
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              {
                'bg-green-100 text-green-800': stockStatus === 'in_stock',
                'bg-yellow-100 text-yellow-800': stockStatus === 'low_stock',
                'bg-red-100 text-red-800': stockStatus === 'out_of_stock',
              }
            )}>
              {stockStatus === 'out_of_stock' && <AlertCircle className="mr-1 h-4 w-4" />}
              {product.stock} {product.unit}s in stock
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center p-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}