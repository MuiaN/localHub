export interface Booking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  serviceName: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  customerId?: string;
  customerName?: string;
  serviceId: string;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: number;
  category: string;
  images: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bookings?: Booking[];
}

export interface BusinessProfile {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  operatingHours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  location?: {
    lat: number;
    lng: number;
  };
} 