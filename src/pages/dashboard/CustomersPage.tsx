import React from 'react';
import { Icons } from '../../lib/icons';

export default function CustomersPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Icons.Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Customer
        </button>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">No customers found</p>
      </div>
    </div>
  );
}