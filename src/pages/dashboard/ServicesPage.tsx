import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ServiceCard } from '../../components/services/ServiceCard';
import { ServiceModal } from '../../components/services/ServiceModal';
import type { Service } from '../../types';

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Haircut & Styling',
    description: 'Professional haircut and styling service for all hair types',
    price: 50,
    duration: 60,
    category: 'Beauty',
    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: '2',
    name: 'Deep Tissue Massage',
    description: 'Therapeutic massage focusing on muscle tension and stress relief',
    price: 80,
    duration: 90,
    category: 'Wellness',
    images: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'],
  },
];

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAddService = (service: Service) => {
    setServices([...services, { ...service, id: String(Date.now()) }]);
    setIsModalOpen(false);
  };

  const handleEditService = (service: Service) => {
    setServices(services.map((s) => (s.id === service.id ? service : s)));
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((s) => s.id !== serviceId));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={() => {
              setEditingService(service);
              setIsModalOpen(true);
            }}
            onDelete={() => handleDeleteService(service.id)}
          />
        ))}
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        onSubmit={editingService ? handleEditService : handleAddService}
        service={editingService}
      />
    </div>
  );
}