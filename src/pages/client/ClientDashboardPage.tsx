import React from 'react';
import { format } from 'date-fns';
import { Calendar, Package, CreditCard, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

const mockData = {
  recentBookings: [
    {
      id: '1',
      serviceName: 'Haircut & Styling',
      businessName: 'Urban Styles Salon',
      date: new Date('2024-03-25T10:00:00'),
      status: 'upcoming',
      price: 1500,
    }
  ],
  recentOrders: [
    {
      id: '1',
      productName: 'Organic Coffee Beans',
      quantity: 2,
      price: 1200,
      status: 'delivered',
      date: new Date('2024-03-20'),
    }
  ],
  stats: {
    totalSpent: 15000,
    activeBookings: 2,
    completedOrders: 5,
  }
};

export function ClientDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Spent</dt>
                  <dd className="text-lg font-semibold text-gray-900">KES {mockData.stats.totalSpent}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Bookings</dt>
                  <dd className="text-lg font-semibold text-gray-900">{mockData.stats.activeBookings}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Orders</dt>
                  <dd className="text-lg font-semibold text-gray-900">{mockData.stats.completedOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
          <div className="mt-4 divide-y divide-gray-200">
            {mockData.recentBookings.map((booking) => (
              <div key={booking.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.serviceName}</p>
                    <p className="text-sm text-gray-500">{booking.businessName}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-500">
                      {format(booking.date, 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">KES {booking.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          <div className="mt-4 divide-y divide-gray-200">
            {mockData.recentOrders.map((order) => (
              <div key={order.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.productName}</p>
                    <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-500">
                      {format(order.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">KES {order.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}