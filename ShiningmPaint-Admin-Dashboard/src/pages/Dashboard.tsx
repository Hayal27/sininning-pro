import React, { useEffect, useState } from 'react';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CubeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { formatCurrency, formatNumber } from '../utils/format';
import { analyticsService, type TopProduct, type MessageStats, type DashboardStats } from '../services/analytics';
import { userService } from '../services/users';
import { apiService } from '../services/api';
import type { User } from '../types';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

// Interfaces
interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
}

const STATUS_COLORS = {
  new: '#3B82F6', // Blue
  in_progress: '#F59E0B', // Amber
  resolved: '#10B981', // Emerald
  closed: '#6B7280' // Gray
};

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [messageStats, setMessageStats] = useState<MessageStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const roles = user?.role ? [user.role] : [];
        const isOwnerAdmin = user?.role === 'owner' || user?.role === 'admin';
        const isContentManager = user?.role === 'content-manager';
        const isHR = user?.role === 'hr';

        // Fetch data based on roles
        const dashboardStats = await analyticsService.getDashboardStats().catch(e => { console.error('Dashboard Stats Error:', e); return null; });
        setStats(dashboardStats);

        if (isOwnerAdmin || isContentManager) {
          analyticsService.getTopProducts().then(setTopProducts).catch(e => console.error('Top Products Error:', e));
          analyticsService.getMessageStats().then(setMessageStats).catch(e => console.error('Message Stats Error:', e));
          apiService.get('/contact?limit=5').then((msgResp: any) => {
            if (msgResp.data && Array.isArray(msgResp.data.data)) {
              setRecentMessages(msgResp.data.data.slice(0, 5));
            } else if (msgResp.data && Array.isArray(msgResp.data)) {
              setRecentMessages(msgResp.data.slice(0, 5));
            } else if (msgResp.data && msgResp.data.success && Array.isArray(msgResp.data.data)) {
              setRecentMessages(msgResp.data.data.slice(0, 5));
            }
          }).catch(e => console.error('Recent Messages Error:', e));
        }

        if (isOwnerAdmin) {
          analyticsService.getSalesByPriceRange().then(setCategoryData).catch(e => console.error('Sales by Price Error:', e));
          userService.getUsers({ page: 1, limit: 5 }).then(res => {
            if (res.data) setRecentUsers(res.data);
          }).catch(e => console.error('Users Error:', e));
        }

      } catch (error) {
        console.error('Error in dashboard initialization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const displayStats = [
    {
      name: 'Total Products',
      value: stats?.products.total || 0,
      icon: CubeIcon,
      change: stats?.products.growth || 0,
      changeType: (stats?.products.growth || 0) >= 0 ? 'increase' : 'decrease',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: 'Total Customers',
      value: stats?.customers.total || 0,
      icon: UserGroupIcon,
      change: stats?.customers.growth || 0,
      changeType: (stats?.customers.growth || 0) >= 0 ? 'increase' : 'decrease',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      name: 'Total Messages',
      value: messageStats?.stats.total_messages || 0,
      icon: ChatBubbleLeftRightIcon,
      change: 0,
      changeType: 'neutral',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: 'New Messages',
      value: messageStats?.stats.new_messages || 0,
      icon: ExclamationTriangleIcon,
      change: 0,
      changeType: 'neutral',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary truncate">👋 Welcome back, {user?.firstName}!</h1>
        <p className="text-text-secondary">
          {user?.role === 'hr' ? 'Manage your career portals and applicant flow.' :
            user?.role === 'content-manager' ? 'Manage your messages, news, and products.' :
              'Here is what is happening with your system today.'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat) => (
          <div key={stat.name} className="bg-surface rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-secondary">{stat.name}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{formatNumber(stat.value)}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            {stat.change !== 0 && (
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' :
                  stat.changeType === 'decrease' ? 'text-red-600 dark:text-red-400' : 'text-gray-600'
                  }`}>
                  {stat.changeType === 'increase' ? '+' : ''}{stat.change}%
                </span>
                <span className="text-sm text-text-secondary ml-2">vs last month</span>
              </div>
            )}
          </div>
        ))}
      </div>



      {/* Lists Section: Top Products and Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Analytics (Status Distribution) - Show for Owner/Admin/ContentManager */}
        {(user?.role === 'owner' || user?.role === 'admin' || user?.role === 'content-manager') && (
          <div className="bg-surface rounded-xl shadow-sm p-6 border border-border">
            <h3 className="text-lg font-bold text-text-primary mb-6">Message Analytics</h3>
            <div className="h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={messageStats?.distribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="status"
                  >
                    {(messageStats?.distribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] || '#CBD5E1'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-3xl font-bold text-text-primary">{messageStats?.stats.total_messages || 0}</p>
                  <p className="text-xs text-text-secondary">Total</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Products - Show for Owner/Admin/ContentManager */}
        {(user?.role === 'owner' || user?.role === 'admin' || user?.role === 'content-manager') && (
          <div className="bg-surface rounded-xl shadow-sm border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold text-text-primary">Top Performing Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {topProducts.length > 0 ? topProducts.map((product, index) => {
                  return (
                    <div key={product.id} className="flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-sm dark:bg-blue-900/30 dark:text-blue-400">
                        {index + 1}
                      </span>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-text-primary truncate max-w-[150px]">{product.name}</span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{formatCurrency(product.price)}</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min((product.stock_quantity || 0) / 10, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-text-secondary">SKU: {product.sku}</p>
                          <p className="text-xs text-text-secondary">Stock: {formatNumber(product.stock_quantity || 0)}</p>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-text-secondary text-center py-10">No product data available</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Global Recent Activity (Recent Users/Messages) - Grid wrapper */}
        <div className={`space-y-6 ${(user?.role === 'owner' || user?.role === 'admin') ? '' : 'lg:col-span-2'}`}>
          {/* Recent Users - OWNER/ADMIN ONLY */}
          {(user?.role === 'owner' || user?.role === 'admin') && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Users (Newest)</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {recentUsers.map((u) => (
                    <li key={u.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                          {u.avatar ? <img src={u.avatar} className="h-10 w-10 rounded-full bg-cover" alt="" /> : (u.firstName[0] + u.lastName[0] || '?').toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{u.firstName} {u.lastName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{u.email} • {u.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </li>
                  ))}
                  {recentUsers.length === 0 && <p className="text-sm text-gray-500 text-center">No recent user activity.</p>}
                </ul>
              </div>
            </div>
          )}

          {/* Recent Messages - OWNER/ADMIN/CONTENT_MANAGER */}
          {(user?.role === 'owner' || user?.role === 'admin' || user?.role === 'content-manager') && (
            <div className="bg-surface rounded-xl shadow-sm border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-text-primary">Recent Contact Submissions</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {recentMessages.map((msg) => (
                    <li key={msg.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-text-primary">{msg.subject}</p>
                          <p className="text-xs text-text-secondary">From: {msg.email}</p>
                        </div>
                        <span className="text-xs text-text-secondary">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${msg.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          msg.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            'bg-background text-text-primary'
                          }`}>
                          {msg.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </li>
                  ))}
                  {recentMessages.length === 0 && (
                    <p className="text-sm text-text-secondary text-center">No recent messages.</p>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* HR Empty State / Quick Actions on Dashboard */}
          {user?.role === 'hr' && (
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-teal-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <BriefcaseIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">HR Management Hub</h3>
              </div>
              <p className="text-teal-50 mb-8 max-w-md">Your role is focused on recruitment and career management. Access all job postings and applicant data from the Careers section.</p>
              <Link to="/careers" className="inline-flex items-center px-6 py-3 bg-white text-teal-600 font-bold rounded-2xl hover:bg-teal-50 transition-colors shadow-lg">
                Go to Careers Center
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
