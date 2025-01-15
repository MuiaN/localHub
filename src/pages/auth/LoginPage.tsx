import React from 'react';
import { AuthForm } from '../../components/auth/AuthForm';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Demo Credentials */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Demo Accounts</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Admin Dashboard</h4>
              <p className="text-sm text-gray-500">Email: admin@localhub.com</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700">Business Dashboard</h4>
              <p className="text-sm text-gray-500">Email: business@localhub.com</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Customer Dashboard</h4>
              <p className="text-sm text-gray-500">Email: customer@localhub.com</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 border-t pt-4">
            Simply enter any of the above emails to access the respective dashboard. No password required for demo purposes.
          </p>
        </div>
      </div>

      <AuthForm type="login" />
    </div>
  );
}