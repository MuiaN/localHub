import React, { useState } from 'react';
import { format } from 'date-fns';
import { Icons } from '../../lib/icons';
import type { Booking } from '../../types';
import { cn, inputStyles } from '../../lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onSubmit: (booking: Booking) => void;
}

export function BookingModal({ isOpen, onClose, booking, onSubmit }: BookingModalProps) {
  const [formData, setFormData] = useState(booking);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Update Booking
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <Icons.X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
              <p className="mt-1 text-sm text-gray-500">
                {format(new Date(booking.date), 'MMMM d, yyyy')} at {booking.startTime}
              </p>
            </div>

            <div>
              <label htmlFor="status" className={inputStyles.label}>
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Booking['status'] })}
                className={inputStyles.select}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className={inputStyles.label}>
                Notes
              </label>
              <textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className={inputStyles.textarea}
                placeholder="Add any notes about this booking..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 
                hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                bg-blue-600 hover:bg-blue-700 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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