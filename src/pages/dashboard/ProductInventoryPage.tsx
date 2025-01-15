import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { InventoryTable } from '../../components/products/inventory/InventoryTable';
import { ProductForm } from '../../components/products/ProductForm';
import { StockUpdateModal } from '../../components/products/StockUpdateModal';
import type { Product } from '../../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Coffee Beans',
    description: 'Premium Arabica coffee beans from Ethiopia',
    price: 1200,
    category: 'Beverages',
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'],
    sku: 'COF001',
    stock: 50,
    unit: 'kg',
    minOrderQuantity: 1,
    maxOrderQuantity: 10,
    status: 'in_stock',
  },
];

export function ProductInventoryPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (product: Product) => {
    setProducts([...products, { ...product, id: String(Date.now()) }]);
    setIsProductModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts(products.map((p) => 
      p.id === productId 
        ? { 
            ...p, 
            stock: newStock,
            status: newStock === 0 ? 'out_of_stock' : newStock <= 5 ? 'low_stock' : 'in_stock'
          }
        : p
    ));
    setIsStockModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
        <button
          onClick={() => setIsProductModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-40 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <InventoryTable
          products={filteredProducts}
          onEdit={(product) => {
            setSelectedProduct(product);
            setIsProductModalOpen(true);
          }}
          onDelete={handleDeleteProduct}
          onUpdateStock={(product) => {
            setSelectedProduct(product);
            setIsStockModalOpen(true);
          }}
        />
      </div>

      <ProductForm
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        product={selectedProduct}
      />

      {selectedProduct && (
        <StockUpdateModal
          isOpen={isStockModalOpen}
          onClose={() => {
            setIsStockModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onUpdate={handleUpdateStock}
        />
      )}
    </div>
  );
}