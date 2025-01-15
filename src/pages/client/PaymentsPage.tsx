import React from 'react';
import { format } from 'date-fns';
import { CreditCard, Download, Store, Package } from 'lucide-react';
import type { Payment } from '../../types';

const mockPayments: Payment[] = [
  {
    id: '1',
    bookingId: 'booking1',
    amount: 1500,
    serviceFee: 75,
    status: 'completed',
    mpesaNumber: '254712345678',
    transactionId: 'MP123456789',
    createdAt: new Date('2024-03-20T10:30:00'),
    updatedAt: new Date('2024-03-20T10:32:00'),
    details: {
      type: 'service',
      name: 'Haircut & Styling',
      businessName: 'Urban Styles Salon',
      location: 'Karen, Nairobi',
      appointmentDate: new Date('2024-03-22T14:00:00'),
    }
  },
  {
    id: '2',
    bookingId: 'booking2',
    amount: 2000,
    serviceFee: 100,
    status: 'completed',
    mpesaNumber: '254712345678',
    transactionId: 'MP987654321',
    createdAt: new Date('2024-03-15T15:45:00'),
    updatedAt: new Date('2024-03-15T15:47:00'),
    details: {
      type: 'product',
      name: 'Organic Coffee Beans (2kg)',
      businessName: 'Artisan Coffee Co.',
      location: 'Westlands, Nairobi',
      orderNumber: 'ORD123456',
      deliveryStatus: 'Delivered'
    }
  },
];

export function PaymentsPage() {
  const handleDownloadReceipt = (payment: Payment) => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for payment:', payment.id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Payment History</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <CreditCard className="h-8 w-8 text-gray-400" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">M-Pesa Payments</h3>
              <p className="text-sm text-gray-500">Your registered M-Pesa number: 254712345678</p>
            </div>
          </div>

          <div className="space-y-6">
            {mockPayments.map((payment) => (
              <div key={payment.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {payment.details.type === 'service' ? (
                      <Store className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Package className="h-6 w-6 text-green-500" />
                    )}
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">{payment.details.name}</h4>
                      <p className="text-sm text-gray-500">{payment.details.businessName}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    payment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Transaction ID</p>
                    <p className="font-medium">{payment.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{format(payment.createdAt, 'MMM d, yyyy HH:mm')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">{payment.details.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      {payment.details.type === 'service' ? 'Appointment' : 'Order Number'}
                    </p>
                    <p className="font-medium">
                      {payment.details.type === 'service' 
                        ? format(payment.details.appointmentDate, 'MMM d, yyyy HH:mm')
                        : payment.details.orderNumber}
                    </p>
                  </div>
                  {payment.details.type === 'product' && (
                    <div>
                      <p className="text-gray-500">Delivery Status</p>
                      <p className="font-medium">{payment.details.deliveryStatus}</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-lg font-semibold text-gray-900">KES {payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Service Fee: KES {payment.serviceFee}</p>
                    </div>
                    <button
                      onClick={() => handleDownloadReceipt(payment)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}