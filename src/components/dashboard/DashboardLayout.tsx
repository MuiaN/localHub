import React, { useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Icons } from '../../lib/icons';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Icons.LayoutDashboard },
  { name: 'Services', href: '/dashboard/services', icon: Icons.Package },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Icons.Calendar },
  { name: 'Customers', href: '/dashboard/customers', icon: Icons.Users },
  { name: 'Business Profile', href: '/dashboard/profile', icon: Icons.Building2 },
  { name: 'Settings', href: '/dashboard/settings', icon: Icons.Settings },
];

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('DashboardLayout: Current location:', location.pathname);
    console.log('DashboardLayout: Full location object:', location);
    console.log('DashboardLayout: Window location:', window.location.href);
  }, [location]);

  console.log('DashboardLayout: Rendering with path:', location.pathname);

  useEffect(() => {
    console.log('DashboardLayout: About to render Outlet');
    return () => {
      console.log('DashboardLayout: Outlet unmounted');
    };
  }, []);

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
                  const isActive = location.pathname === item.href;
                  console.log('DashboardLayout: Menu item:', { href: item.href, isActive });
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        isActive
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
};

export default DashboardLayout;