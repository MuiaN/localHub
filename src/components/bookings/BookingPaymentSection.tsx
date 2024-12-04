import React, { useState } from 'react';
import { PaymentModal } from '../payments/PaymentModal';
import { useMpesaPayment } from '../../hooks/useMpesaPayment';
import type { Booking } from '../../types';

interface BookingPaymentSectionProps {
  booking: Booking;
  onPaymentComplete: () => void;
}

export function BookingPaymentSection({ booking, onPaymentComplete }: BookingPaymentSectionProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { processPayment, isProcessing } = useMpesaPayment({
    onSuccess: () => {
      setIsPaymentModalOpen(false);
      onPaymentComplete();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className="mt-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsPaymentModalOpen(true)}
        disabled={isProcessing}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing Payment...' : 'Pay with M-Pesa'}
      </button>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        booking={booking}
        onPaymentComplete={onPaymentComplete}
      />
    </div>
  );
}