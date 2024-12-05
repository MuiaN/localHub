import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { cn, inputStyles } from '../../lib/utils';
import type { Booking } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onPaymentComplete: () => void;
}

const formatPhoneNumber = (phone: string) => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    return '254' + cleaned.slice(1);
  }
  
  // If it doesn't start with 254, add it
  if (!cleaned.startsWith('254')) {
    return '254' + cleaned;
  }
  
  return cleaned;
};

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

  const handleMpesaBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setMpesaNumber(formatted);
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
                onBlur={handleMpesaBlur}
                placeholder="0712345678"
                className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
                required
                disabled={isProcessing}
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter number starting with 0, it will be formatted automatically
              </p>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center">
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