export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  serviceFee: number;
  status: 'completed' | 'pending' | 'failed';
  mpesaNumber: string;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
  details: {
    type: 'service' | 'product';
    name: string;
    businessName: string;
    location: string;
    appointmentDate?: Date;
    orderNumber?: string;
    deliveryStatus?: string;
  };
}