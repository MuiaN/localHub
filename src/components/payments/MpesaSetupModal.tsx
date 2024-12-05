import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { cn, inputStyles } from '../../lib/utils';

interface MpesaSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export function MpesaSetupModal({ isOpen, onClose, isAdmin = false }: MpesaSetupModalProps) {
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onClose();
    } catch (error) {
      console.error('Failed to save M-Pesa setup:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isAdmin ? 'Admin M-Pesa Setup' : 'Business M-Pesa Setup'}
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className={cn(
              "text-gray-400 hover:text-gray-500",
              isProcessing && inputStyles.disabled
            )}
          >
            <Icons.X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">
                {isAdmin
                  ? 'Configure the M-Pesa number for receiving service fees'
                  : 'Set up your M-Pesa number for receiving payments'}
              </p>
            </div>

            <div>
              <label htmlFor="mpesaNumber" className={inputStyles.label}>
                M-Pesa Number
              </label>
              <input
                type="tel"
                id="mpesaNumber"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                placeholder="e.g., 254712345678"
                className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
                required
                disabled={isProcessing}
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter the number in international format (254...)
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className={cn(
                  "px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200",
                  isProcessing && inputStyles.disabled
                )}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className={cn(
                  "px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  isProcessing && inputStyles.disabled
                )}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}