import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthForm } from '../../components/auth/AuthForm';
import { BusinessTypeSelector } from '../../components/business/BusinessTypeSelector';
import { useAuthStore } from '../../store/auth';

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'customer';
  const [step, setStep] = useState<'auth' | 'type'>('auth');
  const [businessType, setBusinessType] = useState<'service' | 'product' | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleRegister = (userData: any) => {
    if (userType === 'provider') {
      setStep('type');
    } else {
      // Create customer account
      setUser({
        id: '1',
        name: userData.name,
        email: userData.email,
        role: 'customer',
        createdAt: new Date(),
      });
      navigate('/'); // Customers go back to landing page
    }
  };

  const handleTypeSelection = (type: 'service' | 'product') => {
    setBusinessType(type);
    // Create provider account with business type
    setUser({
      id: '1',
      name: 'Business Owner',
      email: 'owner@example.com',
      role: 'provider',
      businessType: type,
      createdAt: new Date(),
    });
    navigate('/dashboard'); // Providers go to dashboard
  };

  if (step === 'type' && userType === 'provider') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            What type of business do you have?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This cannot be changed later. Choose carefully.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <BusinessTypeSelector
              selectedType={businessType}
              onSelect={handleTypeSelection}
            />
          </div>
        </div>
      </div>
    );
  }

  return <AuthForm type="register" onSubmit={handleRegister} />;
}