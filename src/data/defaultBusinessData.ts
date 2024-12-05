import type { Business } from '../types';

export const defaultBusinessData: Omit<Business, 'id' | 'ownerId' | 'rating' | 'reviewCount'> = {
  name: '',
  category: '',
  description: '',
  location: {
    address: '',
    city: '',
    coordinates: { lat: -1.2921, lng: 36.8219 },
  },
  contact: {
    phone: '',
    email: '',
    website: '',
  },
  mpesaNumber: '',
  operatingHours: {
    monday: { isOpen: true, open: '09:00', close: '17:00' },
    tuesday: { isOpen: true, open: '09:00', close: '17:00' },
    wednesday: { isOpen: true, open: '09:00', close: '17:00' },
    thursday: { isOpen: true, open: '09:00', close: '17:00' },
    friday: { isOpen: true, open: '09:00', close: '17:00' },
    saturday: { isOpen: true, open: '09:00', close: '17:00' },
    sunday: { isOpen: false, open: '09:00', close: '17:00' },
  },
  images: {
    logo: '',
    banner: '',
    gallery: [],
  },
  services: [],
}; 