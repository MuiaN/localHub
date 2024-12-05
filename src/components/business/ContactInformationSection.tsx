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

const formatPhoneNumber = (phone: string) => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    return '254' + cleaned.slice(1);
  }
  
  // If it doesn't start with 254, add it
  if (!cleaned.startsWith('254')) {
    return '254' + cleaned;
  }
  
  return cleaned;
};

export function ContactInformationSection({
  contact,
  mpesaNumber,
  isProcessing,
  onContactChange,
  onMpesaChange,
}: ContactInformationSectionProps) {
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onContactChange('phone', formatted);
  };

  const handleMpesaBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onMpesaChange(formatted);
  };

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
            onBlur={handlePhoneBlur}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            required
            disabled={isProcessing}
            placeholder="0712345678"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter number starting with 0, it will be formatted automatically
          </p>
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
            onBlur={handleMpesaBlur}
            className={cn(inputStyles.base, isProcessing && inputStyles.disabled)}
            required
            placeholder="0712345678"
            disabled={isProcessing}
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter number starting with 0, it will be formatted automatically
          </p>
        </div>
      </div>
    </div>
  );
} 