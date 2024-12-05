import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO } from 'date-fns';
import { Icons } from '../../lib/icons';
import { cn } from '../../lib/utils';
import type { Booking } from '../../types';
import { useLocation } from 'react-router-dom';

const BookingsPage: React.FC = () => {
  console.log('BookingsPage: Initial render');
  const location = useLocation();
  console.log('BookingsPage: Component rendering at path:', location.pathname);

  useEffect(() => {
    console.log('BookingsPage: Component mounted');
    console.log('BookingsPage: Current location:', location);
    console.log('BookingsPage: Window location:', window.location.href);

    return () => {
      console.log('BookingsPage: Component unmounting');
    };
  }, [location]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookings] = useState<Booking[]>([]);

  // Get days for the current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Navigation functions
  const previousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get bookings for a specific date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      format(parseISO(booking.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Bookings Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your bookings
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={goToToday}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Today
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Icons.ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 w-32 text-center">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Icons.ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="px-4 py-3 text-sm font-semibold text-gray-900 text-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {monthDays.map((day) => {
            const dayBookings = getBookingsForDate(day);
            const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');

            return (
              <div
                key={day.toString()}
                className={cn(
                  'min-h-[120px] bg-white px-3 py-2 cursor-pointer hover:bg-gray-50',
                  !isSameMonth(day, currentDate) && 'bg-gray-50 text-gray-500',
                  isSelected && 'bg-blue-50'
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isToday(day) && 'bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  {dayBookings.length > 0 && (
                    <span className="flex items-center justify-center bg-blue-100 text-blue-700 text-xs font-semibold rounded-full w-6 h-6">
                      {dayBookings.length}
                    </span>
                  )}
                </div>

                {/* Bookings preview */}
                <div className="mt-2 space-y-1">
                  {dayBookings.slice(0, 2).map((booking) => (
                    <div
                      key={booking.id}
                      className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-700 truncate"
                    >
                      {format(parseISO(booking.startTime), 'HH:mm')} - {booking.serviceName}
                    </div>
                  ))}
                  {dayBookings.length > 2 && (
                    <div className="text-xs text-gray-500 pl-2">
                      +{dayBookings.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Bookings for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="bg-white shadow rounded-lg divide-y">
            {getBookingsForDate(selectedDate).length > 0 ? (
              getBookingsForDate(selectedDate).map(booking => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{booking.serviceName}</p>
                      <p className="text-sm text-gray-500">
                        {format(parseISO(booking.startTime), 'HH:mm')} - {format(parseISO(booking.endTime), 'HH:mm')}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        {
                          'bg-yellow-100 text-yellow-800': booking.status === 'pending',
                          'bg-green-100 text-green-800': booking.status === 'confirmed',
                          'bg-red-100 text-red-800': booking.status === 'cancelled',
                          'bg-gray-100 text-gray-800': booking.status === 'completed',
                        }
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                  <Icons.Calendar className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">No bookings for this date</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Bookings will appear here when customers make appointments.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;