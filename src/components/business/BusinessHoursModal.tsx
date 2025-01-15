import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { OperatingHours } from '../../types';

interface BusinessHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  operatingHours: OperatingHours;
  onSave: (hours: OperatingHours) => void;
}

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export function BusinessHoursModal({
  isOpen,
  onClose,
  operatingHours,
  onSave,
}: BusinessHoursModalProps) {
  const [hours, setHours] = useState<OperatingHours>(operatingHours);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(hours);
    onClose();
  };

  const handleDayToggle = (day: keyof OperatingHours) => {
    setHours({
      ...hours,
      [day]: {
        ...hours[day],
        isOpen: !hours[day].isOpen,
      },
    });
  };

  const handleTimeChange = (
    day: keyof OperatingHours,
    field: 'open' | 'close',
    value: string
  ) => {
    setHours({
      ...hours,
      [day]: {
        ...hours[day],
        [field]: value,
      },
    });
  };

  if (!isOpen) return null;

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
              <h3 className="text-lg font-medium text-gray-900">Operating Hours</h3>
              <p className="mt-1 text-sm text-gray-500">
                Set your business hours for each day of the week.
              </p>
            </div>

            <div className="space-y-4">
              {DAYS.map((day) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-28">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={hours[day].isOpen}
                        onChange={() => handleDayToggle(day)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 capitalize">
                        {day}
                      </span>
                    </label>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="time"
                        value={hours[day].open}
                        onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                        disabled={!hours[day].isOpen}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <input
                        type="time"
                        value={hours[day].close}
                        onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                        disabled={!hours[day].isOpen}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                Save Hours
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}