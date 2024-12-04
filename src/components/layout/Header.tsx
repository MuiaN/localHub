import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function Header() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">LocalHub</h1>
            </Link>
          </div>

          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search services..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <User className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}