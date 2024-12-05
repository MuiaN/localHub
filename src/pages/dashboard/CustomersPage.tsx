'use client';

import React from 'react';
import { Icons } from '../../lib/icons';
import { EmptyState } from '../../components/shared/EmptyState';

export default function CustomersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            View your customer relationships
          </p>
        </div>
      </div>

      <EmptyState
        icon={<Icons.Users className="h-12 w-12" />}
        title="Waiting for customers"
        description="Customers will appear here automatically after they purchase your services. You don't need to add or manage them manually."
      />
    </div>
  );
}