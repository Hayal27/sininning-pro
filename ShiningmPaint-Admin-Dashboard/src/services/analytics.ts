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
}

export const analyticsService = {
  async getDashboardStats(period: number = 30): Promise<DashboardStats> {
    const response = await apiService.get(`/analytics/dashboard?period=${period}`);
    return response.data;
  },

  async getRecentOrders(limit: number = 10): Promise<RecentOrder[]> {
    const response = await apiService.get(`/analytics/recent-orders?limit=${limit}`);
    return response.data;
  },

  async getTopProducts(limit: number = 10, period: number = 30): Promise<TopProduct[]> {
    const response = await apiService.get(`/analytics/top-products?limit=${limit}&period=${period}`);
    return response.data;
  },

  async getLowStockProducts(): Promise<any[]> {
    const response = await apiService.get('/analytics/low-stock');
    return response.data;
  },

  async getSalesChart(period: number = 30): Promise<any[]> {
    const response = await apiService.get(`/analytics/sales-chart?period=${period}`);
    return response.data;
  },

  async getOrderStatusDistribution(): Promise<any[]> {
    const response = await apiService.get('/analytics/order-status');
    return response.data;
  }
};
