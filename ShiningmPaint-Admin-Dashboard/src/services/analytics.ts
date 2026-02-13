import { apiService } from './api';

export interface DashboardStats {
  revenue: {
    total: number;
    period: number;
    growth: number;
  };
  orders: {
    total: number;
    period: number;
    growth: number;
  };
  customers: {
    total: number;
    period: number;
    growth: number;
  };
  products: {
    total: number;
    period: number;
    growth: number;
  };
}

export interface RecentOrder {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  order_date: string;
  company_name?: string;
  contact_person: string;
}

export interface TopProduct {
  id: number;
  name: string;
  sku: string;
  price: number;
  total_sold: number;
  total_revenue: number;
  stock_quantity: number;
}

export interface ActivityLog {
  id: string;
  type: 'order' | 'product' | 'user' | 'customer';
  message: string;
  detail: string;
  date: string;
  status: string;
}

export interface MessageStats {
  distribution: Array<{ status: string; count: number }>;
  stats: { total_messages: number; new_messages: number };
}

export const analyticsService = {
  // ... existing methods ...
  async getDashboardStats(period: number = 30): Promise<DashboardStats> {
    const response: any = await apiService.get(`/analytics/dashboard?period=${period}`);
    return response.data as DashboardStats;
  },

  async getRecentOrders(limit: number = 10): Promise<RecentOrder[]> {
    const response: any = await apiService.get(`/analytics/recent-orders?limit=${limit}`);
    return response.data as RecentOrder[];
  },

  async getTopProducts(limit: number = 10, period: number = 30): Promise<TopProduct[]> {
    const response: any = await apiService.get(`/analytics/top-products?limit=${limit}&period=${period}`);
    return response.data as TopProduct[];
  },

  async getLowStockProducts(): Promise<any[]> {
    const response: any = await apiService.get('/analytics/low-stock');
    return response.data as any[];
  },

  async getSalesChart(period: number = 30): Promise<any[]> {
    const response: any = await apiService.get(`/analytics/sales-chart?period=${period}`);
    return response.data as any[];
  },

  async getOrderStatusDistribution(): Promise<any[]> {
    const response: any = await apiService.get('/analytics/order-status');
    return response.data as any[];
  },

  async getRecentActivity(limit: number = 10): Promise<ActivityLog[]> {
    const response: any = await apiService.get(`/analytics/activity?limit=${limit}`);
    return response.data as ActivityLog[];
  },

  async getCategorySales(period: number = 30): Promise<any[]> {
    const response: any = await apiService.get(`/analytics/sales-by-category?period=${period}`);
    return response.data as any[];
  },

  async getSalesByPriceRange(period: number = 30): Promise<any[]> {
    const response: any = await apiService.get(`/analytics/sales-by-price?period=${period}`);
    return response.data as any[];
  },

  async getMessageStats(): Promise<MessageStats> {
    const response: any = await apiService.get('/analytics/message-stats');
    return response.data as MessageStats;
  }
};
