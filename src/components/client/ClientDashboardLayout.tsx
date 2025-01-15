import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  CreditCard,
  Heart,
  MapPin,
  User,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/auth';

const navigation = [
  { name: 'Overview', href: '/client', icon: LayoutDashboard },
  { name: 'Browse', href: '/client/browse', icon: ShoppingBag },
  { name: 'My Bookings', href: '/client/bookings', icon: Calendar },
  { name: 'Orders', href: '/client/orders', icon: ShoppingBag },
  { name: 'Payments', href: '/client/payments', icon: CreditCard },
  { name: 'Favorites', href: '/client/favorites', icon: Heart },
  { name: 'Addresses', href: '/client/addresses', icon: MapPin },
  { name: 'Profile', href: '/client/profile', icon: User },
];

export function ClientDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-600">
              <h1 className="text-xl font-bold text-white">LocalHub</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-blue-700 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        location.pathname === item.href
                          ? 'bg-blue-800 text-white'
                          : 'text-blue-100 hover:bg-blue-600',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <Icon className="mr-3 flex-shrink-0 h-6 w-6" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-blue-800 p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-blue-600 w-full"
                >
                  <LogOut className="mr-3 flex-shrink-0 h-6 w-6" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}