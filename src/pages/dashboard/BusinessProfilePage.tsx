import React from 'react';
import { Icons } from '../../lib/icons';

export default function BusinessProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Business Profile</h1>
      
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <Icons.Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No business profile</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your business profile.</p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Icons.Plus className="-ml-1 mr-2 h-5 w-5" />
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}