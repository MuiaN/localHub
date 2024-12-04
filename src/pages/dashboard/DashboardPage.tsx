import React from 'react';
import { Icons } from '../../lib/icons';
import { cn } from '../../lib/utils';

const stats = [
  { name: 'Total Customers', value: '120', icon: Icons.Users, change: '+12%', changeType: 'increase' },
  { name: 'Active Services', value: '15', icon: Icons.Package, change: '+3%', changeType: 'increase' },
  { name: 'Monthly Bookings', value: '250', icon: Icons.Calendar, change: '+8%', changeType: 'increase' },
  { name: 'Revenue', value: '$12,500', icon: Icons.BarChart, change: '+15%', changeType: 'increase' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <div className="absolute bg-blue-500 rounded-md p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p
                    className={cn(
                      "ml-2 flex items-baseline text-sm font-semibold",
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {stat.change}
                  </p>
                </dd>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 bg-white shadow rounded-lg p-6">
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    </div>
  );
}