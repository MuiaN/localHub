import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useMpesaStore } from '../../store/mpesa';

interface MpesaSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export function MpesaSetupModal({ isOpen, onClose, isAdmin = false }: MpesaSetupModalProps) {
  const { config, setConfig } = useMpesaStore();
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [serviceFeePercentage, setServiceFeePercentage] = useState(config.serviceFeePercentage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdmin) {
      setConfig({
        ...config,
        adminMpesaNumber: mpesaNumber,
        serviceFeePercentage,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {isAdmin ? 'Admin M-Pesa Setup' : 'Business M-Pesa Setup'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {isAdmin
                  ? 'Configure the M-Pesa number for receiving service fees'
                  : 'Set up your M-Pesa number for receiving payments'}
              </p>
            </div>

            <div>
              <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700">
                M-Pesa Number
              </label>
              <input
                type="tel"
                id="mpesaNumber"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                placeholder="e.g., 254712345678"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter the number in international format (254...)
              </p>
            </div>

            {isAdmin && (
              <div>
                <label htmlFor="serviceFee" className="block text-sm font-medium text-gray-700">
                  Service Fee Percentage
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="serviceFee"
                    value={serviceFeePercentage}
                    onChange={(e) => setServiceFeePercentage(Number(e.target.value))}
                    className="block w-full pr-8 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Save M-Pesa Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}