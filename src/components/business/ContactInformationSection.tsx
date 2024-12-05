import React from 'react';
import { cn, inputStyles } from '../../lib/utils';

interface ContactInformationSectionProps {
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  mpesaNumber: string;
  isProcessing: boolean;
  onContactChange: (field: 'phone' | 'email' | 'website', value: string) => void;
  onMpesaChange: (value: string) => void;
}

export function ContactInformationSection({
  contact,
  mpesaNumber,
  isProcessing,
  onContactChange,
  onMpesaChange,
}: ContactInformationSectionProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={inputStyles.label}>
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={contact.phone}
            onChange={e => onContactChange('phone', e.target.value)}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            required
            disabled={isProcessing}
          />
        </div>

        <div>
          <label htmlFor="email" className={inputStyles.label}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={contact.email}
            onChange={e => onContactChange('email', e.target.value)}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            required
            disabled={isProcessing}
          />
        </div>

        <div>
          <label htmlFor="website" className={inputStyles.label}>
            Website
          </label>
          <input
            type="url"
            id="website"
            value={contact.website || ''}
            onChange={e => onContactChange('website', e.target.value)}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            placeholder="https://"
            disabled={isProcessing}
          />
        </div>

        <div>
          <label htmlFor="mpesa" className={inputStyles.label}>
            M-Pesa Number *
          </label>
          <input
            type="tel"
            id="mpesa"
            value={mpesaNumber}
            onChange={e => onMpesaChange(e.target.value)}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            required
            placeholder="+254"
            disabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
} 