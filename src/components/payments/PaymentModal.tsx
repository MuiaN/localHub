import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useMpesaStore } from '../../store/mpesa';
import type { Booking, Payment } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onPaymentComplete: (payment: Payment) => void;
}

export function PaymentModal({ isOpen, onClose, booking, onPaymentComplete }: PaymentModalProps) {
  const { config } = useMpesaStore();
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const serviceFee = (booking.totalAmount * config.serviceFeePercentage) / 100;
  const totalAmount = booking.totalAmount + serviceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const payment: Payment = {
        id: String(Date.now()),
        bookingId: booking.id,
        amount: booking.totalAmount,
        serviceFee,
        status: 'completed',
        mpesaNumber,
        transactionId: 'MP' + Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      onPaymentComplete(payment);
      setIsProcessing(false);
      onClose();
    }, 2000);
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

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                M-Pesa Payment
              </h3>

              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Service Amount:</span>
                  <span className="text-gray-900">KES {booking.totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Service Fee ({config.serviceFeePercentage}%):</span>
                  <span className="text-gray-900">KES {serviceFee}</span>
                </div>
                <div className="flex justify-between font-medium text-base mt-2 pt-2 border-t border-gray-200">
                  <span>Total Amount:</span>
                  <span>KES {totalAmount}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-4">
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

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isProcessing}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}