import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Image as ImageIcon } from 'lucide-react';
import { BusinessHoursModal } from '../../components/business/BusinessHoursModal';
import { ImageUploadModal } from '../../components/business/ImageUploadModal';
import type { Business } from '../../types';

const mockBusiness: Business = {
  id: '1',
  name: 'Urban Styles Salon',
  ownerId: 'owner1',
  category: 'Beauty & Wellness',
  description: 'Premium hair styling and beauty services in the heart of the city.',
  location: {
    address: '123 Main Street',
    city: 'Nairobi',
    coordinates: {
      lat: -1.2921,
      lng: 36.8219,
    },
  },
  contact: {
    phone: '+254712345678',
    email: 'contact@urbanstyles.com',
    website: 'www.urbanstyles.com',
  },
  mpesaNumber: '254712345678',
  images: {
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80',
    ],
  },
  rating: 4.8,
  reviewCount: 156,
  services: [],
  operatingHours: {
    monday: { isOpen: true, open: '09:00', close: '18:00' },
    tuesday: { isOpen: true, open: '09:00', close: '18:00' },
    wednesday: { isOpen: true, open: '09:00', close: '18:00' },
    thursday: { isOpen: true, open: '09:00', close: '18:00' },
    friday: { isOpen: true, open: '09:00', close: '18:00' },
    saturday: { isOpen: true, open: '10:00', close: '16:00' },
    sunday: { isOpen: false, open: '', close: '' },
  },
};

export function BusinessProfilePage() {
  const [business, setBusiness] = useState<Business>(mockBusiness);
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleSave = (updatedBusiness: Partial<Business>) => {
    setBusiness({ ...business, ...updatedBusiness });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Business Profile
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="relative h-64">
          <img
            src={business.images.banner}
            alt="Business banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <img
              src={business.images.logo}
              alt="Business logo"
              className="w-24 h-24 rounded-lg border-4 border-white shadow-lg"
            />
          </div>
          <button
            onClick={() => setIsImageModalOpen(true)}
            className="absolute bottom-4 right-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ImageIcon className="h-5 w-5 mr-2" />
            Manage Images
          </button>
        </div>

        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Business Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your business details and settings.
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Business Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{business.name}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900">{business.category}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{business.description}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                {business.location.address}, {business.location.city}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Contact Information</dt>
              <dd className="mt-1 space-y-2">
                <p className="text-sm text-gray-900 flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  {business.contact.phone}
                </p>
                <p className="text-sm text-gray-900 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  {business.contact.email}
                </p>
                {business.contact.website && (
                  <p className="text-sm text-gray-900 flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    {business.contact.website}
                  </p>
                )}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Operating Hours</dt>
              <dd className="mt-1">
                <button
                  onClick={() => setIsHoursModalOpen(true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  Manage Hours
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <BusinessHoursModal
        isOpen={isHoursModalOpen}
        onClose={() => setIsHoursModalOpen(false)}
        operatingHours={business.operatingHours}
        onSave={(hours) => handleSave({ operatingHours: hours })}
      />

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={business.images}
        onSave={(images) => handleSave({ images })}
      />
    </div>
  );
}