import React, { useState } from 'react';
import { Download, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { TransactionTable } from '../../components/transactions/TransactionTable';
import { TransactionFilters } from '../../components/transactions/TransactionFilters';
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

export function TransactionsPage() {
  const [transactions] = useState<Payment[]>(mockTransactions);
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

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = filteredTransactions.reduce((sum, t) => sum + t.serviceFee, 0);

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
    a.download = `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-5 w-5 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {filteredTransactions.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            KES {totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Service Fees</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            KES {totalFees.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
  );
}