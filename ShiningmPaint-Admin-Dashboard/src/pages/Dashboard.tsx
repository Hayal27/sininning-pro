import React, { useState, useEffect } from 'react';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/format';
import { analyticsService, type DashboardStats, type RecentOrder, type TopProduct } from '../services/analytics';
import { toast } from 'react-hot-toast';





const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, ordersData, productsData] = await Promise.all([
          analyticsService.getDashboardStats(),
          analyticsService.getRecentOrders(5),
          analyticsService.getTopProducts(5)
        ]);

        setStats(statsData);
        setRecentOrders(ordersData);
        setTopProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Failed to load dashboard data</div>
      </div>
    );
  }

  // Transform stats data for display
  const displayStats = [
    {
      name: 'Total Revenue',
      value: stats.revenue.total,
      change: stats.revenue.growth,
      changeType: stats.revenue.growth >= 0 ? 'increase' : 'decrease',
      icon: CurrencyDollarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Total Orders',
      value: stats.orders.total,
      change: stats.orders.growth,
      changeType: stats.orders.growth >= 0 ? 'increase' : 'decrease',
      icon: ClipboardDocumentListIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Total Customers',
      value: stats.customers.total,
      change: stats.customers.growth,
      changeType: stats.customers.growth >= 0 ? 'increase' : 'decrease',
      icon: UserGroupIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Total Products',
      value: stats.products.total,
      change: stats.products.growth,
      changeType: stats.products.growth >= 0 ? 'increase' : 'decrease',
      icon: ShoppingBagIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.name.includes('Revenue') 
                    ? formatCurrency(stat.value)
                    : formatNumber(stat.value)
                  }
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`ml-1 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatPercentage(Math.abs(stat.change))}
              </span>
              <span className="ml-1 text-sm text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and tables grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-soft">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.order_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.company_name || order.contact_person}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.total_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-200">
            <a href="/orders" className="text-sm text-primary-600 hover:text-primary-500">
              View all orders →
            </a>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-soft">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatNumber(product.total_sold)} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(product.total_revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-3 border-t border-gray-200">
            <a href="/products" className="text-sm text-primary-600 hover:text-primary-500">
              View all products →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
