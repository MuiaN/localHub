import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';

const mockBookings = [
  {
    id: '1',
    serviceName: 'Haircut & Styling',
    businessName: 'Urban Styles Salon',
    date: new Date('2024-03-25T10:00:00'),
    status: 'upcoming',
    location: 'Karen, Nairobi',
    price: 1500,
  },
];

export function ClientBookingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {mockBookings.map((booking) => (
            <li key={booking.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="text-lg font-medium text-blue-600 truncate">
                      {booking.serviceName}
                    </p>
                    <p className="sm:ml-2 text-sm text-gray-500">
                      at {booking.businessName}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {format(booking.date, 'MMMM d, yyyy')}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {format(booking.date, 'h:mm a')}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {booking.location}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span className="font-medium text-gray-900">
                      KES {booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}