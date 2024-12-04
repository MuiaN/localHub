import React from 'react';
import { Icons } from '../../lib/icons';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      
      <div className="mt-8 space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <Icons.User className="h-6 w-6 text-gray-400" />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
              <p className="text-sm text-gray-500">Update your account information</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <Icons.Bell className="h-6 w-6 text-gray-400" />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500">Manage your notification preferences</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <Icons.Shield className="h-6 w-6 text-gray-400" />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Security</h3>
              <p className="text-sm text-gray-500">Update your security settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}