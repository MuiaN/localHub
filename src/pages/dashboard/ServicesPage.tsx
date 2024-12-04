import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { ServiceModal } from '../../components/services/ServiceModal';
import type { Service } from '../../types';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();

  const handleAddService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString(), // In a real app, this would come from the backend
    };
    setServices(prev => [...prev, newService]);
    setIsModalOpen(false);
  };

  const handleUpdateService = (serviceData: Omit<Service, 'id'>) => {
    if (!editingService) return;
    
    const updatedService: Service = {
      ...serviceData,
      id: editingService.id,
    };

    setServices(prev => 
      prev.map(service => 
        service.id === editingService.id ? updatedService : service
      )
    );
    setIsModalOpen(false);
    setEditingService(undefined);
  };

  const handleEditService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <button
          onClick={() => {
            setEditingService(undefined);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Icons.Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Service
        </button>
      </div>

      <div className="mt-8">
        {services.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <Icons.Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No services</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new service.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setEditingService(undefined);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Icons.Plus className="-ml-1 mr-2 h-5 w-5" />
                  Add Service
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  {service.images[0] ? (
                    <img
                      src={service.images[0]}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Icons.Image className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{service.category}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {service.duration} min
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500 line-clamp-2">{service.description}</p>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-gray-900">
                      KES {service.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditService(service.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Icons.Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
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
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(undefined);
        }}
        onSubmit={editingService ? handleUpdateService : handleAddService}
        service={editingService}
      />
    </div>
  );
}