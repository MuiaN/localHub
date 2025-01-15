import React from 'react';
import { Users, Building2, CreditCard, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const stats = [
  { name: 'Total Businesses', value: '48', icon: Building2, change: '+12%', changeType: 'increase' },
  { name: 'Total Users', value: '2,340', icon: Users, change: '+15%', changeType: 'increase' },
  { name: 'Monthly Revenue', value: 'KES 245,000', icon: TrendingUp, change: '+18%', changeType: 'increase' },
  { name: 'Service Fees', value: 'KES 12,250', icon: CreditCard, change: '+18%', changeType: 'increase' },
];

export function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      
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
                  <div className="absolute bg-indigo-500 rounded-md p-3">
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