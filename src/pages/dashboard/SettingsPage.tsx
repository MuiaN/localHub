import React, { useState } from 'react';
import { Settings as SettingsIcon, CreditCard, Bell, Shield, User } from 'lucide-react';
import { MpesaSetupModal } from '../../components/payments/MpesaSetupModal';
import { useAuthStore } from '../../store/auth';

export function SettingsPage() {
  const { user } = useAuthStore();
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const settingsSections = [
    {
      id: 'payments',
      name: 'Payment Settings',
      description: 'Configure your payment methods and M-Pesa details',
      icon: CreditCard,
      action: () => setIsMpesaModalOpen(true),
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Manage your notification preferences',
      icon: Bell,
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Update your security settings and password',
      icon: Shield,
    },
    {
      id: 'account',
      name: 'Account Settings',
      description: 'Manage your account details and preferences',
      icon: User,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Settings
          </h2>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:bg-gray-50 transition-colors duration-200"
            >
              <button
                onClick={section.action}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{section.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <MpesaSetupModal
        isOpen={isMpesaModalOpen}
        onClose={() => setIsMpesaModalOpen(false)}
        isAdmin={isAdmin}
      />
    </div>
  );
}