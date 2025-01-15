import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
              Welcome to LocalHub
            </h1>
            <p className="text-xl text-center text-gray-600 mb-12">
              Your neighborhood services and products marketplace
            </p>
            
            {/* Add your landing page content here */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600">
                Connect with local businesses and service providers in your area. 
                Find everything you need, from professional services to unique products.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}