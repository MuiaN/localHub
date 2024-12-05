'use client';

import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { ServiceModal } from '../../components/services/ServiceModal';
import type { Service } from '../../types';
import { EmptyState } from '../../components/shared/EmptyState';
import { DeleteConfirmationModal } from '../../components/services/DeleteConfirmationModal';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);

  const handleAddService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: `serv_${Date.now()}`,
    };
    setServices(prev => [...prev, newService]);
  };

  const handleEditService = (serviceData: Omit<Service, 'id'>) => {
    if (!selectedService) return;
    
    setServices(prev => prev.map(service => 
      service.id === selectedService.id 
        ? { ...service, ...serviceData }
        : service
    ));
    setSelectedService(undefined);
  };

  const handleDeleteService = () => {
    if (!selectedService) return;
    
    setServices(prev => prev.filter(service => service.id !== selectedService.id));
    setSelectedService(undefined);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const openDeleteModal = (service: Service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your service offerings
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Icons.Plus className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <EmptyState
          icon={<Icons.Package className="h-12 w-12" />}
          title="No services yet"
          description="Start by adding services that you offer to your customers."
          action={{
            label: 'Add Service',
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                {service.images[0] ? (
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icons.Image className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                    <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                  </div>
                  {service.duration && (
                    <span className="inline-flex items-center text-sm text-gray-500">
                      <Icons.Clock className="h-4 w-4 mr-1" />
                      {service.duration} min
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-gray-900">
                    KES {service.price.toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button 
                    onClick={() => openEditModal(service)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Icons.Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                  <button 
                    onClick={() => openDeleteModal(service)}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Icons.Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(undefined);
        }}
        onSubmit={selectedService ? handleEditService : handleAddService}
        service={selectedService}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedService(undefined);
        }}
        onConfirm={handleDeleteService}
        itemToDelete={selectedService?.name}
        title="Delete Service"
        message={`Are you sure you want to delete "${selectedService?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}