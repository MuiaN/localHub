import React, { useState, useEffect } from 'react';
import { Icons } from '../../lib/icons';
import type { Customer } from '../../types';
import { cn, inputStyles } from '../../lib/utils';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: Omit<Customer, 'id' | 'joinedDate' | 'lastVisit' | 'totalSpent' | 'bookingCount'>) => void;
  customer?: Customer | null;
}

type CustomerFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  tags: string[];
  status: 'active' | 'inactive';
};

export function CustomerModal({ isOpen, onClose, onSubmit, customer }: CustomerModalProps) {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    tags: [],
    status: 'active',
  });

  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        notes: customer.notes || '',
        tags: customer.tags,
        status: customer.status,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
        tags: [],
        status: 'active',
      });
    }
  }, [customer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  const handleAddTag = () => {
    if (!newTag) return;
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, newTag.trim()]
    }));
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <Icons.X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className={inputStyles.error}>
              <Icons.AlertTriangle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={inputStyles.label}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={inputStyles.base}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className={inputStyles.label}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={inputStyles.base}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className={inputStyles.label}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={inputStyles.base}
                required
                placeholder="+254 XXX XXX XXX"
              />
            </div>

            <div>
              <label htmlFor="status" className={inputStyles.label}>
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                className={inputStyles.select}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="address" className={inputStyles.label}>
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className={inputStyles.base}
              placeholder="Street address, City"
            />
          </div>

          <div>
            <label htmlFor="notes" className={inputStyles.label}>
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className={inputStyles.textarea}
              placeholder="Any additional notes about the customer..."
            />
          </div>

          <div>
            <label className={inputStyles.label}>Tags</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className={inputStyles.base}
                placeholder="Add tags (e.g., VIP, Regular)"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="h-12 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg
                hover:bg-blue-700 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                <Icons.Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1.5 inline-flex items-center justify-center text-blue-400 hover:text-blue-500"
                    >
                      <Icons.X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              {customer ? 'Save Changes' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}