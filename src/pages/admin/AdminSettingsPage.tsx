import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { MpesaSetupModal } from '../../components/payments/MpesaSetupModal';
import { useMpesaStore } from '../../store/mpesa';

export function AdminSettingsPage() {
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false);
  const { config } = useMpesaStore();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Platform Settings
          </h2>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Payment Settings
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Configure platform-wide payment settings and service fees.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">M-Pesa Integration</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Admin M-Pesa Number: {config.adminMpesaNumber || 'Not configured'}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Current Service Fee: {config.serviceFeePercentage}%
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMpesaModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Configure M-Pesa
                  </button>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <MpesaSetupModal
        isOpen={isMpesaModalOpen}
        onClose={() => setIsMpesaModalOpen(false)}
        isAdmin={true}
      />
    </div>
  );
}