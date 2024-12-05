import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import type { Booking } from '../../types';
import { cn, inputStyles } from '../../lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onPaymentComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, booking, onPaymentComplete }: PaymentModalProps) {
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentComplete();
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Complete Payment
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter your M-Pesa number to complete the payment
              </p>
            </div>
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

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service Total:</span>
              <span className="font-medium text-gray-900">
                KES {booking.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
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

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className={cn(
                  "mt-3 sm:mt-0 px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200",
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
                  'Pay Now'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}