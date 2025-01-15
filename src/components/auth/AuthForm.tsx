import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit?: (data: any) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.currentTarget.email.value;

    // Demo login logic without password
    if (type === 'login') {
      switch (email) {
        case 'admin@localhub.com':
          setUser({
            id: '1',
            name: 'Admin User',
            email: 'admin@localhub.com',
            role: 'admin',
            createdAt: new Date(),
          });
          navigate('/admin');
          break;

        case 'business@localhub.com':
          setUser({
            id: '2',
            name: 'Business Owner',
            email: 'business@localhub.com',
            role: 'provider',
            businessType: 'service',
            createdAt: new Date(),
          });
          navigate('/dashboard');
          break;

        case 'customer@localhub.com':
          setUser({
            id: '3',
            name: 'John Customer',
            email: 'customer@localhub.com',
            role: 'customer',
            createdAt: new Date(),
          });
          navigate('/client');
          break;

        default:
          alert('Invalid email. Please use one of the demo accounts.');
      }
    } else if (onSubmit) {
      onSubmit({
        name: e.currentTarget.name?.value,
        email,
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {type === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {type === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? 'Loading...' : type === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}