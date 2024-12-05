'use client';

import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { CustomerModal } from '../../components/customers/CustomerModal';
import type { Customer } from '../../types';
import { EmptyState } from '../../components/shared/EmptyState';
import { DeleteConfirmationModal } from '../../components/services/DeleteConfirmationModal';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'joinedDate' | 'lastVisit' | 'totalSpent' | 'bookingCount'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust_${Date.now()}`,
      joinedDate: new Date(),
      lastVisit: new Date(),
      totalSpent: 0,
      bookingCount: 0,
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const handleEditCustomer = (customerData: Omit<Customer, 'id' | 'joinedDate' | 'lastVisit' | 'totalSpent' | 'bookingCount'>) => {
    if (!selectedCustomer) return;
    
    setCustomers(prev => prev.map(customer => 
      customer.id === selectedCustomer.id 
        ? { ...customer, ...customerData }
        : customer
    ));
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return;
    
    setCustomers(prev => prev.filter(customer => customer.id !== selectedCustomer.id));
    setSelectedCustomer(null);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your customer relationships
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Icons.Plus className="h-4 w-4 mr-2" />
          Add Customer
        </button>
      </div>

      {customers.length === 0 ? (
        <EmptyState
          icon={<Icons.Users className="h-12 w-12" />}
          title="No customers yet"
          description="Start adding customers to manage your client relationships effectively."
          action={{
            label: 'Add Customer',
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <div className="bg-white shadow-sm rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Joined {new Date(customer.joinedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.bookingCount} bookings
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    KES {customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button 
                      onClick={() => openEditModal(customer)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Icons.Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(customer)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Icons.Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={selectedCustomer ? handleEditCustomer : handleAddCustomer}
        customer={selectedCustomer}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleDeleteCustomer}
        title="Delete Customer"
        message={`Are you sure you want to delete ${selectedCustomer?.name}? This action cannot be undone.`}
      />
    </div>
  );
} 