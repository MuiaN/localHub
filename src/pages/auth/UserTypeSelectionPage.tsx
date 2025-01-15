import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export function UserTypeSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              How would you like to use LocalHub?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Choose your account type to get started
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/register?type=customer')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center">
                    <ShoppingBag className="h-8 w-8 text-blue-600 mr-4" />
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-gray-900">I want to Buy</h3>
                      <p className="text-sm text-gray-500">Browse and purchase from local businesses</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>

                <button
                  onClick={() => navigate('/register?type=provider')}
                  className="w-full flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Store className="h-8 w-8 text-blue-600 mr-4" />
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-gray-900">I want to Sell</h3>
                      <p className="text-sm text-gray-500">List your products or services</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}