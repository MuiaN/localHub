import React from 'react';
import { Filter } from 'lucide-react';
import type { Payment } from '../../types';

interface TransactionFiltersProps {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  onDateRangeChange: (range: { start: Date | null; end: Date | null }) => void;
  status: Payment['status'] | 'all';
  onStatusChange: (status: Payment['status'] | 'all') => void;
}

export function TransactionFilters({
  dateRange,
  onDateRangeChange,
  status,
  onStatusChange,
}: TransactionFiltersProps) {
  return (
    <div className="flex space-x-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter className="h-5 w-5 text-gray-400" />
        </div>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as Payment['status'] | 'all')}
          className="block w-40 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <input
        type="date"
        value={dateRange.start?.toISOString().split('T')[0] || ''}
        onChange={(e) =>
          onDateRangeChange({
            ...dateRange,
            start: e.target.value ? new Date(e.target.value) : null,
          })
        }
        className="block w-40 px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />

      <input
        type="date"
        value={dateRange.end?.toISOString().split('T')[0] || ''}
        onChange={(e) =>
          onDateRangeChange({
            ...dateRange,
            end: e.target.value ? new Date(e.target.value) : null,
          })
        }
        className="block w-40 px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
}