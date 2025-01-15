import React, { useState } from 'react';
import { format, startOfWeek, addDays, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookingModal } from '../../components/bookings/BookingModal';
import { WeeklyCalendar } from '../../components/bookings/WeeklyCalendar';
import type { Booking } from '../../types';

const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: 'customer1',
    serviceId: 'service1',
    businessId: 'business1',
    date: '2024-03-20',
    startTime: '10:00',
    endTime: '11:00',
    status: 'confirmed',
    totalAmount: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    customerId: 'customer2',
    serviceId: 'service2',
    businessId: 'business1',
    date: '2024-03-20',
    startTime: '14:00',
    endTime: '15:30',
    status: 'pending',
    totalAmount: 80,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function BookingsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handlePreviousWeek = () => {
    setCurrentDate((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => addDays(prev, 7));
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings(bookings.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousWeek}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-lg font-medium text-gray-900">
            {format(startOfWeek(currentDate), 'MMM d')} -{' '}
            {format(addDays(startOfWeek(currentDate), 6), 'MMM d, yyyy')}
          </span>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <WeeklyCalendar
        currentDate={currentDate}
        bookings={bookings}
        onBookingClick={handleBookingClick}
      />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
        onSubmit={handleUpdateBooking}
      />
    </div>
  );
}