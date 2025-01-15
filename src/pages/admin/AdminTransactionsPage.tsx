import React, { useState } from 'react';
import { Download, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { TransactionTable } from '../../components/transactions/TransactionTable';
import { TransactionFilters } from '../../components/transactions/TransactionFilters';
import { useMpesaStore } from '../../store/mpesa';
import type { Payment } from '../../types';

const mockTransactions: Payment[] = [
  {
    id: '1',
    bookingId: 'booking1',
    amount: 1500,
    serviceFee: 75,
    status: 'completed',
    mpesaNumber: '254712345678',
    transactionId: 'MP123456789',
    createdAt: new Date('2024-03-20T10:30:00'),
    updatedAt: new Date('2024-03-20T10:32:00'),
  },
  {
    id: '2',
    bookingId: 'booking2',
    amount: 2000,
    serviceFee: 100,
    status: 'completed',
    mpesaNumber: '254723456789',
    transactionId: 'MP987654321',
    createdAt: new Date('2024-03-19T15:45:00'),
    updatedAt: new Date('2024-03-19T15:47:00'),
  },
];

export function AdminTransactionsPage() {
  const { config } = useMpesaStore();
  const [transactions, setTransactions] = useState<Payment[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [statusFilter, setStatusFilter] = useState<Payment['status'] | 'all'>('all');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.mpesaNumber.includes(searchQuery) ||
      transaction.transactionId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.bookingId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;

    const matchesDate =
      (!dateRange.start ||
        transaction.createdAt >= dateRange.start) &&
      (!dateRange.end ||
        transaction.createdAt <= dateRange.end);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalServiceFees = filteredTransactions.reduce((sum, t) => sum + t.serviceFee, 0);
  const totalTransactions = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  const handleExport = () => {
    const csv = [
      ['Date', 'Transaction ID', 'M-Pesa Number', 'Amount', 'Service Fee', 'Status'].join(','),
      ...filteredTransactions.map((t) => [
        format(t.createdAt, 'yyyy-MM-dd HH:mm:ss'),
        t.transactionId,
        t.mpesaNumber,
        t.amount,
        t.serviceFee,
        t.status,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Platform Transactions
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-5 w-5 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Total Service Fees</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                KES {totalServiceFees.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Receiving M-Pesa: {config.adminMpesaNumber || 'Not configured'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Total Transactions</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                KES {totalTransactions.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Service Fee Rate: {config.serviceFeePercentage}%
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Transaction Count</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {filteredTransactions.length}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <TransactionFilters
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                status={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            <TransactionTable transactions={filteredTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}