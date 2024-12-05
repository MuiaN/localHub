import React from 'react';
import { cn, inputStyles } from '../../lib/utils';
import type { OperatingHours } from '../../types';

interface OperatingHoursSectionProps {
  operatingHours: OperatingHours;
  isProcessing: boolean;
  onEditClick: () => void;
}

export function OperatingHoursSection({
  operatingHours,
  isProcessing,
  onEditClick,
}: OperatingHoursSectionProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Operating Hours</h3>
        <button
          type="button"
          onClick={onEditClick}
          disabled={isProcessing}
          className={cn(
            "px-6 py-3 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200",
            isProcessing && inputStyles.disabled
          )}
        >
          Edit Hours
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(operatingHours).map(([day, hours]) => (
          <div key={day} className="flex items-center justify-between py-2">
            <div className="w-32">
              <span className="text-sm font-medium text-gray-900 capitalize">{day}</span>
            </div>
            {hours.isOpen ? (
              <div className="text-sm text-gray-600">
                {hours.open} - {hours.close}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Closed</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 