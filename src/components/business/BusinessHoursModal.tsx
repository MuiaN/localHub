import React, { useState } from 'react';
import { Icons } from '../../lib/icons';
import { cn, inputStyles } from '../../lib/utils';
import type { TimeSlot } from '../../types';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

interface BusinessHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  operatingHours: Record<typeof DAYS[number], TimeSlot>;
  onSave: (hours: Record<typeof DAYS[number], TimeSlot>) => void;
}

export function BusinessHoursModal({
  isOpen,
  onClose,
  operatingHours,
  onSave,
}: BusinessHoursModalProps) {
  const [hours, setHours] = useState(operatingHours);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDayToggle = (day: typeof DAYS[number]) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
      },
    }));
  };

  const handleTimeChange = (
    day: typeof DAYS[number],
    field: 'open' | 'close',
    value: string
  ) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await onSave(hours);
      onClose();
    } catch (error) {
      console.error('Failed to save operating hours:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Operating Hours
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className={cn(
              "text-gray-400 hover:text-gray-500",
              isProcessing && inputStyles.disabled
            )}
          >
            <Icons.X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-sm text-gray-500">
            Set your business hours for each day of the week.
          </p>

          <div className="space-y-4">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-32">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={hours[day].isOpen}
                      onChange={() => handleDayToggle(day)}
                      disabled={isProcessing}
                      className={cn(
                        "rounded border-gray-300 text-blue-600 focus:ring-blue-400",
                        isProcessing && inputStyles.disabled
                      )}
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
                      disabled={!hours[day].isOpen || isProcessing}
                      className={cn(
                        inputStyles.base,
                        (!hours[day].isOpen || isProcessing) && inputStyles.disabled
                      )}
                    />
                  </div>
                  <div>
                    <input
                      type="time"
                      value={hours[day].close}
                      onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                      disabled={!hours[day].isOpen || isProcessing}
                      className={cn(
                        inputStyles.base,
                        (!hours[day].isOpen || isProcessing) && inputStyles.disabled
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className={cn(
                "px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200",
                isProcessing && inputStyles.disabled
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={cn(
                "px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                isProcessing && inputStyles.disabled
              )}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Save Hours'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}