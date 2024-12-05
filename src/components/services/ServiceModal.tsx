import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import type { Service } from '../../types';
import { cn, inputStyles } from '../../lib/utils';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: Omit<Service, 'id'>) => void;
  service?: Service;
}

export function ServiceModal({ isOpen, onClose, onSubmit, service }: ServiceModalProps) {
  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    name: service?.name ?? '',
    description: service?.description ?? '',
    price: service?.price ?? 0,
    duration: service?.duration ?? 30,
    category: service?.category ?? '',
    images: service?.images ?? [],
  });

  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }
    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  const handleAddImage = () => {
    if (!imageUrl) return;
    if (!imageUrl.startsWith('http')) {
      setError('Please enter a valid image URL');
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUrl]
    }));
    setImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {service ? 'Edit Service' : 'Add New Service'}
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
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className={inputStyles.label}>
              Service Name *
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
            <label htmlFor="category" className={inputStyles.label}>
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className={inputStyles.select}
              required
            >
              <option value="">Select a category</option>
              <option value="Hair">Hair</option>
              <option value="Nails">Nails</option>
              <option value="Massage">Massage</option>
              <option value="Facial">Facial</option>
              <option value="Makeup">Makeup</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className={inputStyles.label}>
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className={inputStyles.textarea}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className={inputStyles.label}>
                Price (KES) *
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                min="0"
                step="50"
                className={inputStyles.base}
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className={inputStyles.label}>
                Duration (minutes)
              </label>
              <select
                id="duration"
                value={formData.duration}
                onChange={e => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                className={inputStyles.select}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className={inputStyles.label}>
              Service Images
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className={inputStyles.base}
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="h-12 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg
                hover:bg-blue-700 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {formData.images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Service ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icons.X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 
              hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
              bg-blue-600 hover:bg-blue-700 transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              {service ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}