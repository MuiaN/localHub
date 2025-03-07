import React from 'react';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Product } from '../../../types';

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onUpdateStock: (product: Product) => void;
}

export function InventoryTable({ products, onEdit, onDelete, onUpdateStock }: InventoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover" 
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.sku}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onUpdateStock(product)}
                  className="hover:text-blue-600"
                >
                  {product.stock} {product.unit}s
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                KES {product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={cn(
                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                  {
                    'bg-green-100 text-green-800': product.stock > 5,
                    'bg-yellow-100 text-yellow-800': product.stock <= 5 && product.stock > 0,
                    'bg-red-100 text-red-800': product.stock === 0,
                  }
                )}>
                  {product.stock === 0 ? 'Out of Stock' : product.stock <= 5 ? 'Low Stock' : 'In Stock'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}