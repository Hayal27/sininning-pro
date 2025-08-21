import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Calendar, Package, DollarSign } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { ordersService, type Order, type OrderFilters } from '../services/orders';
import { formatCurrency, formatDate } from '../utils/format';

const Orders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    limit: 20
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersService.getOrders(filters);
      setOrders(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      page: 1
    }));
  };

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: status === 'all' ? undefined : status,
      page: 1
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Track and manage all customer orders</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={!filters.status ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filters.status === 'pending' ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filters.status === 'processing' ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusFilter('processing')}
              >
                Processing
              </Button>
              <Button
                variant={filters.status === 'shipped' ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusFilter('shipped')}
              >
                Shipped
              </Button>
              <Button
                variant={filters.status === 'delivered' ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusFilter('delivered')}
              >
                Delivered
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
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
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              #{order.order_number}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.items?.length || 0} items
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.company_name || order.customer_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.contact_person}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          {formatDate(order.order_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.payment_status)}`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                          {formatCurrency(order.total_amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">No orders match your current filters</p>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, page: pagination.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            
            {[...Array(pagination.pages)].map((_, index) => {
              const page = index + 1;
              return (
                <Button
                  key={page}
                  variant={pagination.page === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters(prev => ({ ...prev, page }))}
                  className="w-10"
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, page: pagination.page + 1 }))}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
