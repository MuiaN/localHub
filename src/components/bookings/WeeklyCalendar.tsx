import React from 'react';
import { format, startOfWeek, addDays, parseISO } from 'date-fns';
import { cn } from '../../lib/utils';
import type { Booking } from '../../types';

interface WeeklyCalendarProps {
  currentDate: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM
const DAYS = Array.from({ length: 7 }, (_, i) => i);

export function WeeklyCalendar({ currentDate, bookings, onBookingClick }: WeeklyCalendarProps) {
  const weekStart = startOfWeek(currentDate);

  const getBookingsForDateAndTime = (date: Date, hour: number) => {
    return bookings.filter((booking) => {
      const bookingDate = format(parseISO(booking.date), 'yyyy-MM-dd');
      const currentDateStr = format(date, 'yyyy-MM-dd');
      const bookingHour = parseInt(booking.startTime.split(':')[0], 10);
      return bookingDate === currentDateStr && bookingHour === hour;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-8 border-b">
        <div className="py-2 text-center text-sm font-medium text-gray-500">Time</div>
        {DAYS.map((dayOffset) => {
          const date = addDays(weekStart, dayOffset);
          return (
            <div
              key={dayOffset}
              className="py-2 text-center border-l"
            >
              <div className="text-sm font-medium text-gray-900">
                {format(date, 'EEE')}
              </div>
              <div className="text-sm text-gray-500">
                {format(date, 'MMM d')}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-8">
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <div className="py-3 text-center text-sm text-gray-500 border-b">
              {format(new Date().setHours(hour), 'ha')}
            </div>
            {DAYS.map((dayOffset) => {
              const date = addDays(weekStart, dayOffset);
              const dayBookings = getBookingsForDateAndTime(date, hour);

              return (
                <div
                  key={`${hour}-${dayOffset}`}
                  className="relative py-3 px-2 border-l border-b min-h-[80px]"
                >
                  {dayBookings.map((booking) => (
                    <button
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className={cn(
                        "w-full text-left p-1 rounded text-xs mb-1",
                        booking.status === 'confirmed' && "bg-blue-100 text-blue-800",
                        booking.status === 'pending' && "bg-yellow-100 text-yellow-800",
                        booking.status === 'cancelled' && "bg-red-100 text-red-800",
                        booking.status === 'completed' && "bg-green-100 text-green-800"
                      )}
                    >
                      <div className="font-medium truncate">
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="truncate">Customer #{booking.customerId}</div>
                    </button>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}