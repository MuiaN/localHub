import React from 'react';
import { Icons } from '../../lib/icons';
import type { Service } from '../../types';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemToDelete?: string;
  title?: string;
  message?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemToDelete,
  title = "Delete Item",
  message,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <Icons.AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-lg font-medium text-gray-900 text-center mb-2">
          {title}
        </h2>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          {message || (
            <>
              Are you sure you want to delete {itemToDelete && (
                <span className="font-medium text-gray-900">"{itemToDelete}"</span>
              )}? 
              This action cannot be undone.
            </>
          )}
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 