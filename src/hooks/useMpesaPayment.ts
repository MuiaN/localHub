import { useState } from 'react';
import { initiateMpesaPayment, checkPaymentStatus } from '../services/mpesa';
import type { Payment } from '../types';

interface UseMpesaPaymentProps {
  onSuccess: (payment: Payment) => void;
  onError: (error: Error) => void;
}

export function useMpesaPayment({ onSuccess, onError }: UseMpesaPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async (
    phoneNumber: string,
    amount: number,
    bookingId: string
  ) => {
    try {
      setIsProcessing(true);

      // Initiate payment
      const response = await initiateMpesaPayment({
        phoneNumber,
        amount,
        accountReference: bookingId,
        transactionDesc: `Payment for booking ${bookingId}`,
      });

      // Check payment status
      const status = await checkPaymentStatus(response.CheckoutRequestID);

      if (status === 'completed') {
        const payment: Payment = {
          id: response.MerchantRequestID,
          bookingId,
          amount,
          serviceFee: 0, // Calculate based on your fee structure
          status,
          mpesaNumber: phoneNumber,
          transactionId: response.CheckoutRequestID,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        onSuccess(payment);
      } else {
        throw new Error('Payment failed or expired');
      }
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing,
  };
}