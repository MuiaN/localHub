import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import type { Booking } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSubmit: (booking: Booking) => void;
}

export function BookingModal({ isOpen, onClose, booking, onSubmit }: BookingModalProps) {
  const [formData, setFormData] = useState<Partial<Booking>>({});

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    } else {
      setFormData({});
    }
  }, [booking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (booking && formData) {
      onSubmit({ ...booking, ...formData });
    }
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
              <p className="mt-1 text-sm text-gray-500">
                {format(new Date(booking.date), 'MMMM d, yyyy')} at {booking.startTime}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Booking['status'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Add any notes about this booking..."
              />
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Update Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}