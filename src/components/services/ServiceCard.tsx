import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={service.images[0]}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{service.category}</p>
          </div>
          <p className="text-lg font-semibold text-gray-900">${service.price}</p>
        </div>
        <p className="mt-2 text-sm text-gray-600">{service.description}</p>
        {service.duration && (
          <p className="mt-2 text-sm text-gray-500">Duration: {service.duration} minutes</p>
        )}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}