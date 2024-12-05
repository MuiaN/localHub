import React from 'react';
import { cn, inputStyles } from '../../lib/utils';

interface BasicInformationSectionProps {
  name: string;
  category: string;
  description: string;
  isProcessing: boolean;
  onChange: (field: 'name' | 'category' | 'description', value: string) => void;
}

export function BasicInformationSection({
  name,
  category,
  description,
  isProcessing,
  onChange,
}: BasicInformationSectionProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={inputStyles.label}>
            Business Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => onChange('name', e.target.value)}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            required
            disabled={isProcessing}
          />
        </div>

        <div>
          <label htmlFor="category" className={inputStyles.label}>
            Business Category *
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={e => onChange('category', e.target.value)}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            required
            disabled={isProcessing}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={inputStyles.label}>
            Description *
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={e => onChange('description', e.target.value)}
            className={cn(inputStyles.textarea, isProcessing && inputStyles.disabled)}
            required
            disabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
} 