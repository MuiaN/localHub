'use client';

import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { cn, inputStyles } from '../../lib/utils';
import { LocationSelector } from '../../components/business/LocationSelector';
import { BusinessHoursModal } from '../../components/business/BusinessHoursModal';
import { BasicInformationSection } from '../../components/business/BasicInformationSection';
import { ContactInformationSection } from '../../components/business/ContactInformationSection';
import { OperatingHoursSection } from '../../components/business/OperatingHoursSection';
import { ImagesSection } from '../../components/business/ImagesSection';
import { EmptyState } from '../../components/shared/EmptyState';
import { defaultBusinessData } from '../../data/defaultBusinessData';
import type { Business, OperatingHours } from '../../types';
import { MapContainer } from '../../components/business/MapContainer';
import { useGoogleMapsScript } from '../../hooks/useGoogleMapsScript';

export default function BusinessProfilePage() {
  const [business, setBusiness] = useState<Omit<Business, 'id' | 'ownerId' | 'rating' | 'reviewCount'> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultBusinessData);
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBasicInfoChange = (field: 'name' | 'category' | 'description', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: 'phone' | 'email' | 'website', value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleMpesaChange = (value: string) => {
    setFormData(prev => ({ ...prev, mpesaNumber: value }));
  };

  const handleHoursUpdate = async (hours: OperatingHours) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: hours,
    }));
  };

  const handleImageUpload = async (type: 'logo' | 'banner' | 'gallery') => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    // Handle file selection
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        // Convert the file to a data URL
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          
          setFormData(prev => ({
            ...prev,
            images: type === 'gallery'
              ? {
                  ...prev.images,
                  gallery: [...prev.images.gallery, imageUrl],
                }
              : {
                  ...prev.images,
                  [type]: imageUrl,
                }
          }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    };

    // Trigger file selection
    input.click();
  };

  const handleImageRemove = (type: 'logo' | 'banner' | 'gallery', index?: number) => {
    setFormData(prev => ({
      ...prev,
      images: type === 'gallery'
        ? {
            ...prev.images,
            gallery: prev.images.gallery.filter((_, i) => i !== index),
          }
        : {
            ...prev.images,
            [type]: undefined,
          },
    }));
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      // TODO: Implement save functionality
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBusiness(formData);
      setIsEditing(false);
      console.log('Saving business profile:', formData);
    } catch (error) {
      console.error('Failed to save business profile:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderBusinessForm = () => (
    <div className="space-y-6">
      <BasicInformationSection
        name={formData.name}
        category={formData.category}
        description={formData.description}
        isProcessing={isProcessing}
        onChange={handleBasicInfoChange}
      />

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
        <LocationSelector
          address={formData.location.address}
          city={formData.location.city}
          coordinates={formData.location.coordinates}
          onChange={(location) => setFormData(prev => ({
            ...prev,
            location
          }))}
        />
      </div>

      <ContactInformationSection
        contact={formData.contact}
        mpesaNumber={formData.mpesaNumber}
        isProcessing={isProcessing}
        onContactChange={handleContactChange}
        onMpesaChange={handleMpesaChange}
      />

      <OperatingHoursSection
        operatingHours={formData.operatingHours}
        isProcessing={isProcessing}
        onEditClick={() => setIsHoursModalOpen(true)}
      />

      <ImagesSection
        images={formData.images}
        isProcessing={isProcessing}
        onImageUpload={handleImageUpload}
        onImageRemove={handleImageRemove}
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => {
            setFormData(business || defaultBusinessData);
            setIsEditing(false);
          }}
          disabled={isProcessing}
          className={cn(
            "px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200",
            isProcessing && inputStyles.disabled
          )}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isProcessing}
          className={cn(
            "px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
            isProcessing && inputStyles.disabled
          )}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              Saving...
            </div>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );

  const renderBusinessProfile = () => (
    <div className="space-y-6">
      {/* Basic Info Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-32 sm:h-48">
          {business?.images.banner ? (
            <img
              src={business.images.banner}
              alt="Business banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Icons.Image className="h-12 w-12 text-gray-400" />
            </div>
          )}
          {business?.images.logo && (
            <div className="absolute -bottom-12 left-6">
              <img
                src={business.images.logo}
                alt="Business logo"
                className="h-24 w-24 rounded-lg border-4 border-white object-cover bg-white"
              />
            </div>
          )}
        </div>
        
        <div className="pt-16 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{business?.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{business?.category}</p>
            </div>
            <button
              onClick={() => {
                const currentData = business || defaultBusinessData;
                setFormData(currentData);
                setIsEditing(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Icons.Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
          <p className="mt-4 text-gray-600">{business?.description}</p>
        </div>
      </div>

      {/* Contact & Location Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact & Location</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center text-gray-600">
                <Icons.Phone className="h-5 w-5 mr-2 text-gray-400" />
                {business?.contact.phone}
              </li>
              <li className="flex items-center text-gray-600">
                <Icons.Mail className="h-5 w-5 mr-2 text-gray-400" />
                {business?.contact.email}
              </li>
              {business?.contact.website && (
                <li className="flex items-center text-gray-600">
                  <Icons.Globe className="h-5 w-5 mr-2 text-gray-400" />
                  <a href={business.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {business.contact.website}
                  </a>
                </li>
              )}
              <li className="flex items-center text-gray-600">
                <Icons.CreditCard className="h-5 w-5 mr-2 text-gray-400" />
                M-Pesa: {business?.mpesaNumber}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Location</h4>
            <div className="mt-3 space-y-3">
              <p className="flex items-start text-gray-600">
                <Icons.MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                <span>{business?.location.address}, {business?.location.city}</span>
              </p>
              {business?.location.coordinates && (
                <div className="h-[250px] w-full rounded-lg border-2 border-gray-200 overflow-hidden">
                  <StaticMap coordinates={business.location.coordinates} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Operating Hours</h3>
        <div className="space-y-2">
          {business && Object.entries(business.operatingHours).map(([day, hours]) => (
            <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm font-medium text-gray-500 capitalize w-32">{day}</span>
              <span className="text-sm text-gray-600">
                {hours.isOpen ? (
                  `${hours.open} - ${hours.close}`
                ) : (
                  <span className="text-gray-400">Closed</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Card */}
      {business?.images.gallery.length ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {business.images.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="h-32 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Business Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your business information and settings
          </p>
        </div>
        {!business && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Icons.Plus className="h-4 w-4 mr-2" />
            Add Business Details
          </button>
        )}
      </div>

      {(!business && !isEditing) ? (
        <EmptyState
          icon={<Icons.Building2 className="h-12 w-12" />}
          title="Set up your business profile"
          description="Add your business details to help customers find and connect with you."
          action={{
            label: 'Add Business Details',
            onClick: () => {
              setFormData(defaultBusinessData);
              setIsEditing(true);
            },
          }}
        />
      ) : isEditing ? (
        renderBusinessForm()
      ) : (
        renderBusinessProfile()
      )}

      <BusinessHoursModal
        isOpen={isHoursModalOpen}
        onClose={() => setIsHoursModalOpen(false)}
        operatingHours={formData.operatingHours}
        onSave={handleHoursUpdate}
      />
    </div>
  );
}

function StaticMap({ coordinates }: { coordinates: { lat: number; lng: number } }) {
  const { isLoaded } = useGoogleMapsScript();
  
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={coordinates}
        onMapLoad={(map) => {
          // Create and add the marker
          const marker = new window.google.maps.Marker({
            position: coordinates,
            map,
            title: 'Business Location'
          });

          // Ensure proper centering
          google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
            map.setCenter(coordinates);
            map.setZoom(16);
          });
        }}
      />
    </div>
  );
}