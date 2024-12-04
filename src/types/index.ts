export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: Date;
  lastVisit: Date;
  totalSpent: number;
  bookingCount: number;
  notes?: string;
  tags: string[];
  status: 'active' | 'inactive';
}

export interface Business {
  id: string;
  name: string;
  ownerId: string;
  category: string;
  description: string;
  location: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  mpesaNumber: string;
  images: {
    logo?: string;
    banner?: string;
    gallery: string[];
  };
  rating: number;
  reviewCount: number;
  services: Service[];
  operatingHours: OperatingHours;
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

export interface OperatingHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

export interface TimeSlot {
  isOpen: boolean;
  open: string;
  close: string;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  businessId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  serviceFee: number;
  payment: Payment;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  serviceFee: number;
  status: 'pending' | 'completed' | 'failed';
  mpesaNumber: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MpesaConfig {
  serviceFeePercentage: number;
  adminMpesaNumber: string;
}