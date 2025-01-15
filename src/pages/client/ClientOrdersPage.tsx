import React from 'react';
import { format } from 'date-fns';
import { Package, MapPin, Truck } from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    items: [
      { name: 'Organic Coffee Beans', quantity: 2, price: 1200 }
    ],
    status: 'delivered',
    date: new Date('2024-03-20'),
    total: 2400,
    deliveryAddress: 'Karen, Nairobi',
    trackingNumber: 'TRK123456789',
  },
];

export function ClientOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {mockOrders.map((order) => (
            <li key={order.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Order #{order.id}
                      </span>
                    </div>
                    <div className="mt-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-500">
                          {item.quantity}x {item.name} - KES {item.price}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {order.deliveryAddress}
                    </p>
                    {order.trackingNumber && (
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Truck className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span className="font-medium text-gray-900">
                      KES {order.total}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}